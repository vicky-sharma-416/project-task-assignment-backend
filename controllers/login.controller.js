const uuid = require('uuid');
const models = require("../models");
const token = require("../lib/token");
const CRUD = require("./crud.controller");
const User = models.user;
const UserRole = models.userrole;
const Op = models.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {
  console.log(" -- Login req.body :- ", req.body);

  let uuidValue = uuid.v4();
  let expiryTime = new Date();
  expiryTime.setDate(expiryTime.getDate() + 7);
  expiryTime = parseInt(expiryTime.getTime() / 1000)

  User
    .findAll({where: {
      email: req.body.email,
      password: req.body.password
    }})
    .then(function (users) {
      if (users.length === 1) {
        return users[0];
      } else {
        res.status(401).send({message: 'Invalid Email & Password'});
      }
    })

    // Now findOrCreate a new token
    .then(function (user) {
      // console.log(" -- user :- ", user);
      return models.token
        .findOrCreate({
        where: {
          user_id: user.id
        },
        defaults: {
          user_id: user.id,
          expiry: expiryTime,
          uuid: uuidValue
        }
      })
      .then(function (tokenValue) {
        var tokenObj = {};
        tokenObj.uuid = tokenValue[0].uuid;
        tokenObj.userData = {
          is_admin: user.is_admin,
          name: user.name
        };

        console.log(tokenObj, " -- tokenValue :- ", tokenValue[0])
  
        let response = token.generate(tokenObj, expiryTime);
  
        res.status(200).send({token: response});
  
      })
    })
    .catch(function (error) {
      console.log(" -- error :- ", error);
      res.status(500).send({message: error.message});
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  res.status(405).send({message: 'Method not allowed'});
};

// Find a single user with an id
exports.findOne = (req, res) => {
  res.status(405).send({message: 'Method not allowed'});
};

// Update a user by the id in the request
exports.update = (req, res) => {
  res.status(405).send({message: 'Method not allowed'});
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  res.status(405).send({message: 'Method not allowed'});
};