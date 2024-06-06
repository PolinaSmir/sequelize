const { Router } = require("express");
const UserController = require("../controllers/User.controller");
const TaskController = require("../controllers/Task.controller");
const { getUserInstance } = require("../middlewares/user.mw");

const router = Router();

router.post("/user", UserController.createUser);
router.get("/users", UserController.findAll);
router.get("/user/:userId", getUserInstance, UserController.findByPk);
router.delete("/user/:userId", UserController.deleteByPk);
router.put("/user/:userId", getUserInstance, UserController.updateUser);

router.post("/task/:userId", getUserInstance, TaskController.createTask);
router.get("/tasks/:userId", getUserInstance, TaskController.getAllUserTasks);
router.get("/tasks-count/:userId", getUserInstance, TaskController.getCountOfTasks);

module.exports = router;
