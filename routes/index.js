const { Router } = require("express");
const UserController = require("../controllers/User.controller");
const TaskController = require("../controllers/Task.controller");
const { getUserInstance, validateUser } = require("../middlewares/user.mw");
const { validateTask } = require("../middlewares/task.mw");
const GroupController = require("../controllers/Group.controller");

const router = Router();

// user
router.post("/user", validateUser, UserController.createUser);
router.get("/users", UserController.findAll);
router.get("/user/:userId", getUserInstance, UserController.findByPk);
router.delete("/user/:userId", UserController.deleteByPk);
router.put("/user/:userId", getUserInstance, UserController.updateUser);
router.get("/users/groups/:userId", UserController.getUserWithGroups);

// task
router.post("/task/:userId", validateTask, getUserInstance, TaskController.createTask);
router.get("/tasks/:userId", getUserInstance, TaskController.getAllUserTasks);
router.get("/tasks-count/:userId", getUserInstance, TaskController.getCountOfTasks);

// group
router.post("/groups", GroupController.createGroup);
router.put("/groups/:userId/:groupId", getUserInstance, GroupController.addUserToGroup);
router.get("/groups/:userId", getUserInstance, GroupController.getUserGroups);

module.exports = router;
