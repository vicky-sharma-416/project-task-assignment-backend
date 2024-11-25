const { Model, Deferrable } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    var Token = sequelize.define('token', {
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id',
                deferrable: Deferrable.NOT
            }
        },
        expiry: {
            type: Sequelize.BIGINT
        },
        uuid: {
            type: Sequelize.UUID,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Token.belongsTo(models.User, { onDelete: 'cascade', hooks: true });
            }
        }
    });

    return Token;
};