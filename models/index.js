const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE|| "api-db" ,
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD || "root",
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    sslmode: "require",
  }
);

const db = {};

db.sequelize = sequelize;
db.User = require("./users/user")(sequelize, Sequelize);
db.Role = require("./users/role")(sequelize, Sequelize);
db.UserActivity = require("./users/userActivity")(sequelize, Sequelize);
db.Product = require("./products/product")(sequelize, Sequelize);



db.Role.hasOne(db.User, {
  foreignKey: "roleId",
  as: "User",
});
db.User.belongsTo(db.Role, {
  foreignKey: "roleId",
  as: "Role",
});

db.User.hasOne(db.UserActivity, {
  foreignKey: "userId",
  as: "UserActivity",
});
db.UserActivity.belongsTo(db.User, {
  foreignKey: "userId",
  as: "User",
});




module.exports = { db };
