const { Task, User } = require("../models/index");

module.exports.createTask = async (req, res, next) => {
  const { userInstance, body } = req;
  try {
    const result = await userInstance.createTask(body);

    return res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUserTasks = async (req, res, next) => {
  const { userInstance } = req;
  try {
    const tasks = await userInstance.getTasks();

    return res.status(200).send(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports.getCountOfTasks = async (req, res, next) => {
  const { userInstance } = req;
  try {
    const tasksCount = await userInstance.countTasks();

    return res.status(200).send(`${tasksCount}`);
  } catch (error) {
    next(error);
  }
};
