const projectUser = require("../controllers/crud.controller.js");
const checkPermission = require("../lib/checkPermission.js");
var router = require("express").Router();

// INFO :: Only ADMIN can perform CRUD
module.exports = app => {

  // Create a new projectUser
  router.post("/", checkPermission.fetchTokenData, checkPermission.isAdmin, projectUser.create);

  // Retrieve all projectUser
  router.get("/", checkPermission.fetchTokenData, checkPermission.isAdmin, projectUser.findAll);

  // Retrieve a single projectUser with id
  router.get("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, projectUser.findOne);

  // Update a projectUser with id
  router.put("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, projectUser.update);

  // Delete a projectUser with id
  router.delete("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, projectUser.delete);

  app.use("/api/v1/projectUser", router);
};