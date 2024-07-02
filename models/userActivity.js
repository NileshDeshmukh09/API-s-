module.exports = (sequelize, Sequelize) => {
  const USER_ACTIVITY = sequelize.define("USER_ACTIVITY", {
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return USER_ACTIVITY;
};
