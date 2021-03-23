const { MongoClient } = require("mongodb");
const app = require("./server");
const userDAO = require("../dao/userDAO");

MongoClient.connect(process.env.TASK_DB_URI, { useUnifiedTopology: true })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await userDAO.injectDB(client);

    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  });
