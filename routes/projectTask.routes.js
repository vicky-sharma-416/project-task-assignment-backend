const projectTask = require("../controllers/crud.controller.js");
const router = require("express").Router();
const checkPermission = require("../lib/checkPermission.js");

// INFO :: Only ADMIN can perform CRUD
module.exports = app => {

  // Create a new projectTask
  router.post("/", checkPermission.fetchTokenData, checkPermission.isAdmin, projectTask.create);

  // Retrieve all projectTask
  router.get("/", checkPermission.fetchTokenData, checkPermission.isAdmin, projectTask.findAll);

  // Retrieve a single projectTask with id
  router.get("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, projectTask.findOne);

  // Update a projectTask with id
  router.put("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, projectTask.update);

  // Delete a projectTask with id
  router.delete("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, projectTask.delete);

  app.use("/api/v1/projectTask", router);
};