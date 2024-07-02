// models/User.js
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      name : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
      },
    },
    {
      timestamps: true,
    }
  );

  return User;
};
