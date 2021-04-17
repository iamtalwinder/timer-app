const { Router } = require("express");
const TasksController = require("./tasks.controller");
const { validator, auth } = require("./middlewares");
const {
  addTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
} = require("./tasks.controller.schema");

const router = new Router();
router.use(auth);

router.post("/", validator(addTaskSchema), TasksController.apiAddTask);
router.put("/", validator(updateTaskSchema), TasksController.apiUpdateTask);
router.delete("/", validator(deleteTaskSchema), TasksController.apiDeleteTask);

module.exports = router;
