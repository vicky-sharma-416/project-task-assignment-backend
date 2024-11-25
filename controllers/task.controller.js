const checkPermission = require("../lib/checkPermission");
const models = require("../models");
const CRUD = require("./crud.controller");
const Task = models.task;
const Op = models.Sequelize.Op;

// Create and Save a new Task and also add into projectTask for reference
exports.create = (req, res) => {
    req.body.createdBy = req.tokenData.user_id;

    Task
        .scope({method: ['details', req]})
        .create(req.body)
        .then(taskData => {
            // console.log(' -- taskData :- ', taskData);
            res.send({message: "Task created successfully"});
        })
        .catch(err => {
            console.log(" -- Create_task_error :- ", err);
            res.status(err.status || 500).send({
                message: (err.message || "Some error occurred while creating the Task.")
            });
        });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {

  Task
    .scope({method: ['details', req]})
    .findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        console.log(" -- Fetch_task_error :- ", err);
        res.status(err.status || 500).send({
            message: (err.message || "Some error occurred while retrieving Tasks")
        });
    });
};

// Find a single Task with an id
exports.findOne = (req, res) => {

    if(!req.params.id) {
       return res.status(400).send({message: "Please provide task id to search"});
    }
  
  Task
    .scope({method: ['details', req]})
    .findOne({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({message: `Cannot find Task with id = ${req.params.id}.`});
      }
    })
    .catch(err => {
        console.log(" -- FindOne_task_error :- ", err);
        res.status(err.status || 500).send({
            message: (err.message || "Error retrieving Task with id = " + req.params.id)
        });
    });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if(!id) {
    res.status(400).send({message: "Please provide task id to update"});
  } else if(!req.body) {
    res.status(400).send({message: "Please provide data to update"});
  }

  // Delete attributes if exists in payload
  delete req.body.id;
  delete req.body.createAt;
  delete req.body.updateAt;

  Task
    .scope({method: ['details', req]})
    .update(req.body, {
        where: { id: id },
        individualHooks: true,
    })
    .then(num => {
        res.send({message: "Task was updated successfully."});
    })
    .catch(err => {
        console.log(" -- Update_task_error :- ", err);
        res.status(err.status || 500).send({
            message: (err.message || "Error updating Task with id = " + req.params.id)
        });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  if(!id) {
    res.status(400).send({message: "Please provide task id to delete"});
  }

  Task
    .scope({method: ['details', req]})
    .destroy({
        where: { id: id },
        individualHooks: true
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
        });
      }
    })
    .catch(err => {
        console.log(" -- Delete_task_error :- ", err);
        res.status(err.status || 500).send({
            message: (err.message || "Could not delete Task with id = " + req.params.id)
        });
    });
};
