const { Router } = require("express");
const UserController = require("../controllers/User.controller");
const { getUserInstance, validateUser } = require("../middlewares/user.mw");

const userRouter = Router();

userRouter.post("/", validateUser, UserController.createUser);
userRouter.get("/", UserController.findAll);
userRouter.get("/:userId", getUserInstance, UserController.findByPk);
userRouter.delete("/:userId", UserController.deleteByPk);
userRouter.put("/:userId", getUserInstance, UserController.updateUser);
userRouter.get("/groups/:userId", UserController.getUserWithGroups);

module.exports = userRouter;
