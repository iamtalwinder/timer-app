const express = require("express");

const app = express();
app.use(express.json());

app.use("*", (req, res) => res.status(404).send({ error: "not found" }));

module.exports = app;
