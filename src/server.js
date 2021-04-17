const express = require("express");
const cors = require("cors");
const users = require("./api/users.route");
const tasks = require("./api/tasks.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", users);
app.use("/api/v1/task", tasks);
app.use("*", (req, res) => res.status(404).send({ error: "not found" }));

module.exports = app;
