const { Router } = require("express");
const UsersController = require("./users.controller");

const router = new Router();

router.post("/register", UsersController.register);
router.post("/login", UsersController.login);

module.exports = router;
