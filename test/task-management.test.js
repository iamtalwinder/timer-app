const TasksDAO = require("../src/dao/tasksDAO");

const testTask = {
  _id: "6075619bb9fbc4ef3522e2a4",
  user_id: "5035619bb9fbc4ef3522e2a6",
  title: "test",
  description: "This is a test task",
  time: {
    hours: 0,
    minutes: 0,
    seconds: 5,
  },
};

describe("Task Management", () => {
  beforeAll(async () => {
    await TasksDAO.injectDB(global.taskClient);
  });

  test("Can add a task to the database", async () => {
    const { _id, user_id, title, description, time } = testTask;
    const response = await TasksDAO.addTask(
      user_id,
      title,
      description,
      time,
      _id
    );

    expect(response.success).toBeTruthy();
    expect(response.error).toBeUndefined();

    const task = await TasksDAO.getTask(_id);

    expect(task).toEqual({
      title,
      description,
      time,
      _id: ObjectId(_id),
      user_id: ObjectId(user_id),
    });
  });

  test("Can delete a task from the database", async () => {
    const { _id } = testTask;
    const response = await TasksDAO.deleteTask(_id);

    expect(response.success).toBeTruthy();
    expect(response.error).toBeUndefined();
  });
});
