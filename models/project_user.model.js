const { Model, Deferrable } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    var ProjectUser = sequelize.define('projectUser', {
        project_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'projects',
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
                ProjectUser.belongsTo(models.User);
            }
        }
    });

    return ProjectUser;
};