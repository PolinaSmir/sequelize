const { Router } = require("express");
const userRouter = require("./userRouter");
const taskRouter = require("./taskRouter");
const groupRouter = require("./groupRouter");

const router = Router();

// user
router.use("/users", userRouter);

// task
router.use("/tasks", taskRouter);

// group
router.use("/groups", groupRouter);

module.exports = router;
