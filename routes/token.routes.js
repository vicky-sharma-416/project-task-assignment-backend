// WARNING :: Only Admin can perform CRUD, need to update for superAdmin only
module.exports = app => {
  const token = require("../controllers/crud.controller.js");
  const checkPermission = require("../lib/checkPermission.js");
  var router = require("express").Router();

  // Create a new token
  router.post("/", checkPermission.fetchTokenData, checkPermission.isAdmin, token.create);

  // Retrieve all token
  router.get("/", checkPermission.fetchTokenData, checkPermission.isAdmin, token.findAll);

  // Retrieve a single token with id
  router.get("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, token.findOne);

  // Update a token with id
  router.put("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, token.update);

  // Delete a token with id
  router.delete("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, token.delete);

  app.use("/api/v1/token", router);
};