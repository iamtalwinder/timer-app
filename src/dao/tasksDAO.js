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
   * Finds all tasks related to a user in 'tasks' collection
   * @param {string} userId - The _id of the user
   * @returns {Array | null} Returns either a sorted(most recent to least) array of tasks or nothing
   */

  static async getAllTasks(userId) {
    return (
      await tasks.aggregate([
        { $match: { user_id: ObjectId(userId) } },
        { $sort: { date: -1 } },
      ])
    ).toArray();
  }

  /**
   * Add a task to 'tasks' collection
   * @param {string} userId - The _id field of a user in 'users' collection
   * @param {string} title - The title of the task
   * @param {string} description - The description of the task
   * @param {Time} time - The time of the task
   * @param {string} date - The date on which the task was created
   * @param {string} taskId - The _id of the task to add
   * @returns {DAOResponse} - Returns either a "DBresponse" or an "error" Object
   */

  static async addTask(userId, title, description, time, date, taskId) {
    try {
      const newTask = {
        user_id: ObjectId(userId),
        title: title,
        description: description,
        time: time,
        date: date,
      };

      if (taskId) {
        newTask["_id"] = ObjectId(taskId);
      }

      return await tasks.insertOne(newTask);
    } catch (e) {
      console.error(`Error occured while adding new task, ${e}`);
      return { error: e };
    }
  }

  /**
   * Update a task from the 'tasks' collection
   * @param {string} taskId - The _id of the task to update
   * @param {string} userId - The user_id field of the task to update
   * @param {string} title - The title of the task
   * @param {string} description - The description of the task
   * @param {Time} time - The time of the task
   * @param {string} date - The date on which the task was updated
   * @returns {DAOResponse} - Returns either a "success" or an "error" Object
   */

  static async updateTask(taskId, userId, title, description, time, date) {
    try {
      await tasks.updateOne(
        { _id: ObjectId(taskId), user_id: ObjectId(userId) },
        {
          $set: {
            title: title,
            description: description,
            time: time,
            date: date,
          },
        }
      );

      return { success: true };
    } catch (e) {
      console.error(`Unable to update task:, ${e}`);
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
 * Task document in the database
 * @typedef Task
 * @property {string} _id
 * @property {string} user_id - The id of user in users collection
 * @property {string} title
 * @property {string} description
 * @property {Time} time
 * @property {string} date
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
