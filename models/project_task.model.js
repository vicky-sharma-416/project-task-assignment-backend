const { Model, Deferrable } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    var ProjectTask = sequelize.define('projectTask', {
        project_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'projects',
                key: 'id',
                deferrable: Deferrable.NOT
            }
        },
        task_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'tasks',
                key: 'id',
                deferrable: Deferrable.NOT
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id',
                deferrable: Deferrable.NOT
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
                ProjectTask.belongsTo(models.Project);
                ProjectTask.belongsTo(models.Task.scopes('details'));
                ProjectTask.belongsTo(models.User);
            }
        }
    });

    return ProjectTask;
};