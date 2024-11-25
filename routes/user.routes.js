const user = require("../controllers/user.controller.js");
const checkPermission = require("../lib/checkPermission.js");
const router = require("express").Router();

module.exports = app => {

  // Create a new user
  router.post("/", checkPermission.fetchTokenData, checkPermission.isAdmin, user.create);

  // Retrieve all user
  router.get("/", checkPermission.fetchTokenData, checkPermission.isAdmin, user.findAll);

  // Retrieve a single user with id
  router.get("/:id", checkPermission.fetchTokenData, user.findOne);

  // Update a user with id
  router.put("/:id", checkPermission.fetchTokenData, user.update);

  // Delete a user with id
  router.delete("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, user.delete);

  app.use("/api/v1/user", router);
};