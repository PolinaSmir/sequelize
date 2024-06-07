const { Router } = require("express");
const GroupController = require("../controllers/Group.controller");
const { getUserInstance } = require("../middlewares/user.mw");
const pagination = require("../middlewares/pagination.mw");
const multer = require("multer");
const path = require("path");

// const upload = multer({ dest: path.resolve(__dirname, "../public/images") });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const groupRouter = Router();

groupRouter.post("/", GroupController.createGroup);
groupRouter.put("/:userId/:groupId", getUserInstance, GroupController.addUserToGroup);
groupRouter.get("/:userId", getUserInstance, GroupController.getUserGroups);
groupRouter.delete("/:userId/:groupId", getUserInstance, GroupController.deleteUserFromGroup);
groupRouter.get("/:groupId/members", pagination, GroupController.getGroupWithMembers);
groupRouter.post("/:groupId", upload.single("groupAvatar"), GroupController.createGroupImage);

module.exports = groupRouter;
