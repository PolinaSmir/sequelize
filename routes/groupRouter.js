const { Router } = require("express");
const GroupController = require("../controllers/Group.controller");
const { getUserInstance } = require("../middlewares/user.mw");

const groupRouter = Router();

groupRouter.post("/", GroupController.createGroup);
groupRouter.put("/:userId/:groupId", getUserInstance, GroupController.addUserToGroup);
groupRouter.get("/:userId", getUserInstance, GroupController.getUserGroups);
groupRouter.delete("/:userId/:groupId", getUserInstance, GroupController.deleteUserFromGroup);

module.exports = groupRouter;
