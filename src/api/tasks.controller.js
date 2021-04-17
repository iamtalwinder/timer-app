const TasksDAO = require("../dao/tasksDAO");

module.exports = class TasksController {
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
        res.status(200).send({ task, msg: "Task added" });
      } else {
        res.status(500).send({ msg: "Unable to add task" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ msg: "Internal server error" });
    }
  }
};
