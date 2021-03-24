const bcrypt = require("bcryptjs");
const UsersDAO = require("../dao/usersDAO");
const User = require("./user");

const hashPassword = async (password) => await bcrypt.hash(password, 10);

module.exports = class UsersController {
  static async register(req, res) {
    try {
      const userFromBody = req.body;

      let errors = {};

      if (userFromBody && userFromBody.password.length < 8) {
        errors.password = "Your password must be at least 8 characters.";
      }

      if (userFromBody && userFromBody.name.length < 3) {
        errors.name = "You must specify a name of at least 3 characters.";
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).send(errors);
        return;
      }

      const userInfo = {
        ...userFromBody,
        password: await hashPassword(userFromBody.password),
      };

      const insertResult = await UsersDAO.addUser(userInfo);

      if (!insertResult.success) {
        errors.email = insertResult.error;
      }

      const userFromDB = await UsersDAO.getUser(userFromBody.email);

      if (!userFromDB) {
        errors.general = "Internal error, please try again later";
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).send(errors);
        return;
      }

      const user = new User(userFromDB);

      res.status(201).send({
        auth_token: user.encoded(),
        info: user.info(),
      });
    } catch (e) {
      res.status(500).send({ error: e });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || typeof email !== "string") {
        res.status(400).send({ error: "Bad email format, expected string." });
        return;
      }

      if (!password || typeof password !== "string") {
        res
          .status(400)
          .send({ error: "Bad password format, expected string." });
        return;
      }

      let userData = await UsersDAO.getUser(email);

      if (!userData) {
        res.status(401).send({ error: "Make sure your email is correct." });
        return;
      }

      const user = new User(userData);

      if (!(await user.comparePassword(password))) {
        res.status(401).send({ error: "Make sure your password is correct." });
        return;
      }

      res.status(200).send({ auth_token: user.encoded(), info: user.info() });
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }
};
