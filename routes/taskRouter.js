const { Router } = require("express");
const TaskController = require("../controllers/Task.controller");
const { validateTask } = require("../middlewares/task.mw");
const { getUserInstance } = require("../middlewares/user.mw");

const taskRouter = Router();

taskRouter.post("/:userId", validateTask, getUserInstance, TaskController.createTask);
taskRouter.get("/:userId", getUserInstance, TaskController.getAllUserTasks);
taskRouter.get("/count/:userId", getUserInstance, TaskController.getCountOfTasks);

module.exports = taskRouter;
