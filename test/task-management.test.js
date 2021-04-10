const TasksDAO = require("../src/dao/tasksDAO");

const testTask = {
  _id: "6075619bb9fbc4ef3522e2a4",
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

  afterAll(async () => {
    await TasksDAO.deleteTask(testTask._id);
  });

  test("Can add a task to the database", async () => {
    const response = await TasksDAO.addTask(testTask);

    expect(response.success).toBeTruthy();
    expect(response.error).toBeUndefined();

    const task = await TasksDAO.getTask(testTask._id);

    expect(task).toEqual(testTask);
  });

  test("Can delete a task from the database", async () => {
    const response = await TasksDAO.deleteTask(testTask._id);

    expect(response.success).toBeTruthy();
    expect(response.error).toBeUndefined();
  });
});
