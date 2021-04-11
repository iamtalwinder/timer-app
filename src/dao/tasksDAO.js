const { ObjectId } = require("bson");
let tasks;

module.exports = class TasksDAO {
  static async injectDB(conn) {
    if (tasks) return;

    try {
      tasks = await conn.db(process.env.TASK_NS).collection("tasks");
    } catch (e) {
      console.error(`Unable to establish collection handles in tasksDAO: ${e}`);
    }
  }

  /**
   * Finds a task in 'tasks' collection
   * @param {string} taskId - The _id of the task in the `tasks` collection
   * @returns {Object | null} Returns either a single task or nothing
   */

  static async getTask(taskId) {
    return await tasks.findOne({ _id: ObjectId(taskId) });
  }

  /**
   * Add a task to 'tasks' collection
   * @param {TaskInfo} taskInfo - The information of the task to add
   * @returns {DAOResponse} - Returns either a "success" or an "error" Object
   */

  static async addTask(taskInfo) {
    try {
      await tasks.insertOne(taskInfo);
      return { success: true };
    } catch (e) {
      console.error(`Error occured while adding new task, ${e}`);
      return { error: e };
    }
  }

  /**
   * Delete a task from the 'tasks' collection
   * @param {string} taskId - The _id of the task in the `tasks` collection
   * @returns {DAOResponse} - Returns either a "success" or an "error" Object
   */

  static async deleteTask(taskId) {
    try {
      await tasks.deleteOne({ _id: ObjectId(taskId) });

      if (!(await this.getTask(taskId))) {
        return { success: true };
      } else {
        console.error("Deletion unsuccessful");
        return { error: "Deletion unsuccessful" };
      }
    } catch (e) {
      console.log(`Error occured while,${e}`);
      return { error: e };
    }
  }
};

/**
 * Parameter passed to addTask method
 * @typedef TaskInfo
 * @property {string} title
 * @property {string} description
 * @property {Time} time
 * @property {string} user_id - The id of user in users collection
 */

/**
 * Time subdocument
 * @typedef Time
 * @property {number} hours
 * @property {numeber} minutes
 * @property {number} seconds
 */

/**
 * Success/Error return object
 * @typedef DAOResponse
 * @property {boolean} [success] - Success
 * @property {string} [error] - Error
 */
