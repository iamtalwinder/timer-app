const { MongoClient } = require("mongodb");
const NodeEnvironment = require("jest-environment-node");

class MongoEnvironment extends NodeEnvironment {
  async setup() {
    this.global.taskClient = await MongoClient.connect(
      process.env.TASK_DB_URI,
      {
        useUnifiedTopology: true,
      }
    );
    await super.setup();
  }

  async teardown() {
    this.global.taskClient.close();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
