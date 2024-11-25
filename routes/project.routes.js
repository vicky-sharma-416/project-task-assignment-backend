const crud = require("../controllers/crud.controller.js");
const router = require("express").Router();
const checkPermission = require("../lib/checkPermission.js");

// INFO :: Only ADMIN can perform CRUD
module.exports = app => {

  // Create a new crud
  router.post("/", checkPermission.fetchTokenData, checkPermission.isAdmin, correctDateFormat, crud.create);

  router.get("/", checkPermission.fetchTokenData, checkPermission.isAdmin, crud.findAll);

  // Retrieve a single crud with id
  router.get("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, crud.findOne);

  // Update a crud with id
  router.put("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, crud.update);

  // Delete a crud with id
  router.delete("/:id", checkPermission.fetchTokenData, checkPermission.isAdmin, crud.delete);

  app.use("/api/v1/project", router);
};

function correctDateFormat(req, res, next) {
  // console.log(' -- req.body :- ', req.body);

  next();

  // let updateDateFormat();

  // console.log()
}