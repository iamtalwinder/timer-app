const { ObjectId } = require("bson");
const TasksDAO = require("../src/dao/tasksDAO");

const tasks = [
  {
    _id: "6075619bb9fbc4ef3522e2a1",
    user_id: "5035619bb9fbc4ef3522e2a6",
    title: "Task 1",
    description: "This is a test task 1",
    time: {
      hours: 0,
      minutes: 0,
      seconds: 5,
    },
    date: "2021-04-14T11:04:16.190Z",
  },
  {
    _id: "6075619bb9fbc4ef3522e2a2",
    user_id: "5035619bb9fbc4ef3522e2a6",
    title: "Task 2",
    description: "This is a test task 2",
    time: {
      hours: 0,
      minutes: 0,
      seconds: 5,
    },
    date: "2021-04-14T11:04:17.190Z",
  },
  {
    _id: "6075619bb9fbc4ef3522e2a3",
    user_id: "5035619bb9fbc4ef3522e2a6",
    title: "Task 3",
    description: "This is a test task 3",
    time: {
      hours: 0,
      minutes: 0,
      seconds: 5,
    },
    date: "2021-04-14T11:04:15.190Z",
  },
];

describe("Task Management", () => {
  beforeAll(async () => {
    await TasksDAO.injectDB(global.taskClient);
  });

  afterAll(async () => {
    await global.taskClient
      .db(process.env.TASK_NS)
      .collection("tasks")
      .deleteMany({ user_id: tasks[0].user_id });
  });

  test("Can add a task to the database", async () => {
    const { _id, user_id, title, description, time, date } = tasks[0];
    const response = await TasksDAO.addTask(
      user_id,
      title,
      description,
      time,
      date,
      _id
    );

    expect(response.success).toBeTruthy();
    expect(response.error).toBeUndefined();

    const task = await TasksDAO.getTask(_id);

    expect(task).toEqual({
      title,
      description,
      time,
      date,
      _id: ObjectId(_id),
      user_id: ObjectId(user_id),
    });
  });

  test("Can update a task from the database", async () => {
    const { _id, user_id, title, description, time, date } = {
      ...tasks[0],
      title: "New title",
      description: "New description",
      time: { hours: 1, minutes: 1, seconds: 1 },
    };

    const response = await TasksDAO.updateTask(
      _id,
      user_id,
      title,
      description,
      time,
      date
    );

    expect(response.success).toBeTruthy();
    expect(response.error).toBeUndefined();

    const updatedTaskFromDB = await TasksDAO.getTask(_id);

    expect(updatedTaskFromDB).toEqual({
      title: title,
      description: description,
      time: time,
      date: date,
      _id: ObjectId(_id),
      user_id: ObjectId(user_id),
    });
  });

  test("Can delete a task from the database", async () => {
    const { _id } = tasks[0];
    const response = await TasksDAO.deleteTask(_id);

    expect(response.success).toBeTruthy();
    expect(response.error).toBeUndefined();
  });

  test("Tasks should be sorted by date", async () => {
    await global.taskClient
      .db(process.env.TASK_NS)
      .collection("tasks")
      .insertMany(tasks);

    const dbTasks = await TasksDAO.getAllTasks(tasks[0].user_id);

    expect(dbTasks).toEqual(
      tasks.sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  });
});
