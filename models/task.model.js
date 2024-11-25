let reqObj = null;

module.exports = (sequelize, Sequelize) => {
    var Task = sequelize.define('task', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: 'Not Started',
            values: ['Not Started', 'In Progress', 'Completed']
        },
        priority_level: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: 'Low',
            values: ['Low', 'Medium', 'High']
        },
        target_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Task.hasMany(models.ProjectTask);
            }
        },

        scopes: {
            details: (req) => {
                // Hold request object to utilize during hooks
                reqObj = req;

                var obj = {
					include: [],
					attributes: {
						exclude: ['createdBy']
					}
				}

				return obj;
            }
        },

        hooks: {

            beforeFind: async function(instance, options) {
                // console.log(instance, ' ---------> ', options);

                // For Admin
                if(reqObj.decodedToken.userData.is_admin) {
                    return instance;
                }

                let errorObj = {
                    status: 401,
                    message: 'Unauthorized'
                }

                let whereObj = {
                    user_id: reqObj.tokenData.user_id
                }

                if(instance.where && instance.where.id) {
                    whereObj.task_id = instance.where.id;

                    errorObj.status = 404;
                    errorObj.message = `Cannot find Task with id = ${instance.where.id}.`
                }

                let projectTaskData = await sequelize
                    .models
                    .projectTask
                    .findAll({
                        where: whereObj,
                        attributes: ['task_id'],
                        raw: true
                    });

                // console.log(" -- projectTaskData :- ", projectTaskData);

                if(projectTaskData && projectTaskData.length > 0) {
                    let taskIds = [];

                    for(let obj of projectTaskData) {
                        taskIds.push(obj.task_id);
                    }

                    instance.where = {
                        id: taskIds
                    }

                    return instance;
                }

                return Promise.reject({status: errorObj.status, message: errorObj.message });
            },
			
			beforeCreate: async function(taskObj, options) {
                const checkPermission = require("../lib/checkPermission");

                let projectUserData = await sequelize
                    .models
                    .projectUser
                    .findOne({ // TODO :: Can optimize to use direct find or create with serialization or without, need to check 
                        where: {
                            project_id: reqObj.body.project_id,
                            user_id: reqObj.tokenData.user_id
                        }
                    })

                // console.log(" -- projectUserData :- ", projectUserData)

                if((reqObj.body.project_id && reqObj.decodedToken.userData.is_admin)
                    ||
                    (projectUserData && (reqObj.body.project_id === projectUserData.project_id) && checkPermission.sameUser(reqObj, projectUserData))
                ) {
                    return projectUserData;
                } else {
                    return Promise.reject({status:401, message: 'Unauthorized' });
                }
            },
            
			afterCreate: async function(taskObj, options, fn) {

				// console.log(reqObj.body, ' -- afterCreate_projectUserData: ', taskObj.id);

                let insertObj = {
                    project_id: reqObj.body.project_id,
                    task_id: taskObj.id,
                }

                if(!reqObj.decodedToken.userData.is_admin) {
                    insertObj.user_id = reqObj.tokenData.user_id;
                }

				let projectUserData = await sequelize
                    .models
                    .projectTask
                    .create(insertObj);

                    // console.log(' -- afterCreate_projectUserData: ', projectUserData);

                return projectUserData;
            },

            beforeUpdate: async function(options, instance, fn) {
                return checkAndVerifyTask(reqObj, instance, options);
            },

            beforeDestroy: async function(options, instance, fn) {
                return checkAndVerifyTask(reqObj, instance, options)
            }
		},
    });

    return Task;
};

async function checkAndVerifyTask(reqObj, instance, options) {
    console.log(reqObj.decodedToken.userData, ' --> ', instance, ' ===> ', options)

    // For Admin
    if(reqObj.decodedToken.userData.is_admin) {
        return instance;
    }

    let errorObj = {
        status: 401,
        message: 'Unauthorized'
    }

    let whereObj = {
        user_id: reqObj.tokenData.user_id
    }

    if(instance.where && instance.where.id) {
        whereObj.task_id = instance.where.id;

        errorObj.status = 404;
        errorObj.message = `User is not associate with Task id = ${instance.where.id}.`
    }

    let projectTaskData = await sequelize
        .models
        .projectTask
        .findAll({
            where: whereObj,
            attributes: ['task_id'],
            raw: true
        });

    console.log(" -- projectTaskData :- ", projectTaskData);

    if(projectTaskData && projectTaskData.length > 0) {
        return instance;
    }

    return Promise.reject({status: errorObj.status, message: errorObj.message });
}