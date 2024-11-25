const checkPermission = require("../lib/checkPermission");
const db = require("../models");
const CRUD = require("./crud.controller");
const User = db.user;
const Op = db.Sequelize.Op;
const splitedValue = require("../lib/split");

// Create and Save a new user
exports.create = (req, res) => {
  let successMsg = "User created successfully";

  if(splitedValue(req.baseUrl, 3) === 'registration') {
    successMsg = "User registed successfully";
  }

  // Save user in the database
  User
    .scope({method: ['details', req]})
    .create(req.body)
    .then(data => {
      res.send({message: successMsg});
    })
    .catch(err => {
      console.log(" -- User Create Error :- ", err);

      // In case of duplicate email, it comes under parent object
      res.status(500).send({
        message: (err.parent.detail || err.message || "Some error occurred while creating the user.")
      });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  CRUD.findAll(req, res);
};

// Find a single user with an id
exports.findOne = (req, res, next) => {
  CRUD.findOne(req, res);
};

// Update a user by the id in the request
exports.update = (req, res) => {

  if(!req.decodedToken.userData.is_admin && !checkPermission.sameUser(req, {user_id: req.params.id})) {
    return res.status(400).send({message: "You can update only your profile, please provie correct id"});
  }

  if(!req.decodedToken.userData.is_admin && (req.body.role || req.body.active || req.body.is_admin || req.body.role_id)) {
    return res.status(403).send({message: "Missing permission"});
  }

  delete req.body.id;
  delete req.body.createdAt;
  delete req.body.updateAt;

  CRUD.update(req, res);
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  if(checkPermission.sameUser(req, {user_id: req.params.id})) {
    return res.status(400).send({message: "You can delete yourself, please contact to admin"});
  }

  CRUD.delete(req, res);
};