const { Router } = require("express");
const UsersController = require("./users.controller");

const router = new Router();

console.log(UsersController);

router.post("/register", UsersController.register);
router.post("/login", UsersController.login);

module.exports = router;
