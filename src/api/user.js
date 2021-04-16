const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class User {
  constructor({ _id, name, email, password }) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  info() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
    };
  }

  async comparePassword(plainText) {
    return await bcrypt.compare(plainText, this.password);
  }

  encoded() {
    return jwt.sign(
      {
        ...this.info(),
      },
      process.env.TOKEN_SECRET
    );
  }

  static async decoded(userJwt) {
    return jwt.verify(userJwt, process.env.TOKEN_SECRET, (e, res) => {
      if (e) {
        throw e;
      }
      return new User(res);
    });
  }
};
