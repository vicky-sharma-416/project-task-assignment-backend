module.exports = app => {
  const registration = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.post("/", registration.create);

  app.use("/api/v1/registration", router);
};