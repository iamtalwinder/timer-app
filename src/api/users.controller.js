const bcrypt = require("bcryptjs");
const UsersDAO = require("../dao/usersDAO");
const User = require("./user");

const hashPassword = async (password) => await bcrypt.hash(password, 10);

module.exports = class UsersController {
  static async register(req, res) {
    try {
      const userFromBody = req.body;

      const userInfo = {
        ...userFromBody,
        password: await hashPassword(userFromBody.password),
      };

      const insertResult = await UsersDAO.addUser(userInfo);

      if (
        String(insertResult.error).startsWith(
          "MongoError: E11000 duplicate key error"
        )
      ) {
        res.status(409).send({
          field: "email",
          msg: "A user with the given email already exists.",
        });
        return;
      }

      const userFromDB = await UsersDAO.getUser(userFromBody.email);

      if (!userFromDB) throw Error("Database error");

      const user = new User(userFromDB);

      res.status(201).send({
        authToken: user.encoded(),
        info: user.info(),
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: "Internal server error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      let userData = await UsersDAO.getUser(email);

      if (!userData) {
        res
          .status(406)
          .send({ field: "email", msg: "Make sure your email is correct." });
        return;
      }

      const user = new User(userData);

      if (!(await user.comparePassword(password))) {
        res.status(406).send({
          field: "password",
          msg: "Make sure your password is correct.",
        });
        return;
      }

      res.status(200).send({ authToken: user.encoded(), info: user.info() });
    } catch (e) {
      res.status(400).send({ msg: "Internal server error" });
      return;
    }
  }
};
