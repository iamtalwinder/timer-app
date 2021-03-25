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

module.exports = {
  validator,
};
