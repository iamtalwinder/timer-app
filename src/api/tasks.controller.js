const TasksDAO = require("../dao/tasksDAO");

module.exports = class TasksController {
  static async apiGetTasks(req, res) {
    try {
      const tasks = await TasksDAO.getAllTasks(req.user._id);
      res.status(200).send({ tasks });
    } catch (e) {
      console.error(e);
      res.status(500).send({ msg: "Internal server error" });
    }
  }

  static async apiAddTask(req, res) {
    try {
      const { title, description, time } = req.body;
      const insertResult = await TasksDAO.addTask(
        req.user._id,
        title,
        description,
        time,
        new Date()
      );

      if (insertResult.insertedCount === 1) {
        const task = await TasksDAO.getTask(insertResult.insertedId);
        res.status(201).send({ task, msg: "Task added" });
      } else {
        res.status(500).send({ msg: "Unable to add task" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ msg: "Internal server error" });
    }
  }

  static async apiUpdateTask(req, res) {
    try {
      const { taskId, title, description, time } = req.body;

      await TasksDAO.updateTask(
        taskId,
        req.user._id,
        title,
        description,
        time,
        new Date()
      );

      const updatedTaskFromDB = await TasksDAO.getTask(taskId);
      res.status(200).send({ msg: "Task updated", task: updatedTaskFromDB });
    } catch (e) {
      console.error(e);
      res.status(500).send({ msg: "Internal server error" });
    }
  }

  static async apiDeleteTask(req, res) {
    try {
      const { taskId } = req.body;

      const deleteResult = await TasksDAO.deleteTask(taskId);

      if (deleteResult.success) {
        res.status(200).send({ msg: "Task deleted" });
      } else {
        res.status(500).send({ mag: deleteResult.error });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ msg: "Internal server error" });
    }
  }
};
