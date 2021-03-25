const { Router } = require("express");
const UsersController = require("./users.controller");
const { validator } = require("./middlewares");
const { registerSchema, loginSchema } = require("./users.controller.schema");

const router = new Router();

router.post("/register", validator(registerSchema), UsersController.register);
router.post("/login", validator(loginSchema), UsersController.login);

module.exports = router;
