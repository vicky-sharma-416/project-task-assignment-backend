module.exports = (sequelize, Sequelize) => {
    var Role = sequelize.define('role', {
        name: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: 'Member',
            values: ['Admin', 'Member']
        },
        is_admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        classMethods: {
            associate: function(models) {
                Role.hasMany(models.User);
            }            
        }
    });

    return Role;
};