const { Model, Deferrable } = require('sequelize');
let reqObj = null;

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING
        },
        mobile_phone: {
            type: Sequelize.STRING
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        is_admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        role_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'roles',
                key: 'id',
                deferrable: Deferrable.NOT
            }    
        }
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Role);
                User.hasMany(models.Token);
                User.hasMany(models.projectUser);
            }
        },

        scopes: {
            details: (req) => {
                // Hold request object to utilize during hooks
                reqObj = req;

				return reqObj;
            }
        },

        hooks: {
            beforeCreate: async function(userObj, options) {

                let roleData = await sequelize
                    .models
                    .role
                    .findOrCreate({
                        where: {
                            is_admin: reqObj.body.is_admin || false
                        },
                        defaults: {
                            is_admin: reqObj.body.is_admin,
                            name: reqObj.body.is_admin ? 'Admin' : 'Member'
                        }
                    })

                if(roleData) {
                    userObj.role_id = roleData[0].id;
                    userObj.role = roleData[0].name;

                    return userObj;
                }
            }
        }
    });

    return User;
};