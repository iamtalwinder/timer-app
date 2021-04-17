const Joi = require("joi");

const addTaskSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(3).max(40).required(),
  time: {
    hours: Joi.number().required(),
    minutes: Joi.number().required(),
    seconds: Joi.number().required(),
  },
});

const updateTaskSchema = addTaskSchema.keys({
  taskId: Joi.string().required(),
});

const deleteTaskSchema = Joi.object({
  taskId: Joi.string().required(),
});

module.exports = {
  addTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
};
