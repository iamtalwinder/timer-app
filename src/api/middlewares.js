const User = require("./user");

const validator = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(406).send({
        field: error.details[0].context.label,
        msg: error.details[0].message,
      });
    } else {
      next();
    }
  };
};

const auth = async (req, res, next) => {
  try {
    const userJwt = req.get("Authorization").slice("Bearer ".length);

    req.user = await User.decoded(userJwt);
    next();
  } catch (e) {
    res.status(401).send({ msg: "Invalid token" });
  }
};

module.exports = {
  validator,
  auth,
};
