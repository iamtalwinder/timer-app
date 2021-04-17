const { Router } = require("express");
const TasksController = require("./tasks.controller");
const { validator, auth } = require("./middlewares");
const { addTaskSchema } = require("./tasks.controller.schema");

const router = new Router();
router.use(auth);

router.post("/", validator(addTaskSchema), TasksController.apiAddTask);

module.exports = router;
