const { Router } = require("express");
const usersCtrl = require("./users.controller");

const router = new Router();

router.post("/register", usersCtrl.register);
router.post("/login", usersCtrl.login);

module.exports = router;
