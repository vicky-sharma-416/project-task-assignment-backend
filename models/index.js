const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize and pass sequelize instance
db.role = require("./role.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.token = require("./token.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.task = require("./task.model.js")(sequelize, Sequelize);
db.projectTask = require("./project_task.model.js")(sequelize, Sequelize);
db.projectUser = require("./project_user.model.js")(sequelize, Sequelize);

// Dynamic Relations extracted from classMethods on each model file
Object
    .keys(db)
    .forEach(function (modelName) {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
    });

module.exports = db;

