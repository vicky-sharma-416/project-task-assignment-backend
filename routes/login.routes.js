module.exports = app => {
  const login = require("../controllers/login.controller.js");
  var router = require("express").Router();

  router.post("/", login.create);

  app.use("/api/v1/login", router);
};