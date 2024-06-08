const express = require("express");
const router = require("./routes/index");
const { errorHandler } = require("./errorHandler");
const { STATIC_PATH } = require("./config/path.config");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static(STATIC_PATH));
app.use("/api", router);

app.use(errorHandler);

module.exports = app;
