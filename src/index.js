const { MongoClient } = require("mongodb");
const app = require("./server");
const UsersDAO = require("./dao/usersDAO");
const TasksDAO = require("./dao/tasksDAO");

MongoClient.connect(process.env.TASK_DB_URI, { useUnifiedTopology: true })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await UsersDAO.injectDB(client);
    await TasksDAO.injectDB(client);

    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  });
