const task = require("../controllers/task.controller.js");
const router = require("express").Router();
const checkPermission = require("../lib/checkPermission.js");

/* INFO :: Task model contains some hooks to perform necessary check before or after CRUD,
*  CRUD can perform by ADMIN or user if project belongs to them only
*/
module.exports = app => {

  // Create a new task
  router.post("/", checkPermission.fetchTokenData, task.create);

  // Retrieve all task
  router.get("/", checkPermission.fetchTokenData, task.findAll);

  // Retrieve a single task with id
  router.get("/:id", checkPermission.fetchTokenData, task.findOne);

  // Update a task with id
  router.put("/:id", checkPermission.fetchTokenData, task.update);

  // Delete a task with id
  router.delete("/:id", checkPermission.fetchTokenData, task.delete);

  app.use("/api/v1/task", router);
};