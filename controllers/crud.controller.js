const db = require("../models");
const Op = db.Sequelize.Op;
const splitedValue = require("../lib/split.js");

// Create and Save a new user
exports.create = (req, res) => {
  // console.log(req.baseUrl, " -- req.body :- ", req.body);

  const modelObj = db[splitedValue(req.baseUrl, 3)];

  // Save user in the database
  modelObj.create(req.body)
    .then(data => {
      res.send(req.body.message || data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  // console.log(' -- req :- ', req);
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  const modelObj = db[splitedValue(req.baseUrl, 3)];

  modelObj
    .findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  const modelObj = db[splitedValue(req.baseUrl, 3)];

  modelObj.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const modelObj = db[splitedValue(req.baseUrl, 3)];

  modelObj.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const modelObj = db[splitedValue(req.baseUrl, 3)];

  modelObj.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};