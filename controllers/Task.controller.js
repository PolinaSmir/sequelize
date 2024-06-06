const { Task, User } = require("../models/index");

module.exports.createTask = async (req, res, next) => {
  const {
    body,
    params: { userId },
  } = req;
  try {
    const user = await User.findByPk(userId);

    const result = await user.createTask(body);

    return res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUserTasks = async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  try {
    const user = await User.findByPk(userId);

    const tasks = await user.getTasks();

    return res.status(200).send(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports.getCountOfTasks = async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  try {
    const user = await User.findByPk(userId);

    const tasksCount = await user.countTasks();

    return res.status(200).send(`${tasksCount}`);
  } catch (error) {
    next(error);
  }
};
