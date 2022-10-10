const express = require("express");
const { getCategories } = require("./controllers/categories.controller");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ message: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500).send({ msg: "Server issue" });
});

module.exports = app;