module.exports = (sequelize, Sequelize) => {
    var Project = sequelize.define('project', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        target_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
    }, {
        classMethods: {
            associate: function(models) {
                Project.hasMany(models.ProjectTask);
            }
        }
    });

    return Project;
};