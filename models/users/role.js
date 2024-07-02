// models/User.js
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define(
      "Role",
      {
        name : {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
    );
  
    return Role;
  };
  