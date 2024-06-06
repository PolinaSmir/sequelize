const { Router } = require("express");
const UserController = require("../controllers/User.controller");
const TaskController = require("../controllers/Task.controller");

const router = Router();

router.post("/user", UserController.createUser);
router.get("/users", UserController.findAll);
router.get("/user/:id", UserController.findByPk);
router.delete("/user/:id", UserController.deleteByPk);
router.put("/user/:id", UserController.updateUser);

router.post("/task/:userId", TaskController.createTask);
router.get("/tasks/:userId", TaskController.getAllUserTasks);
router.get("/tasks-count/:userId", TaskController.getCountOfTasks);

module.exports = router;
