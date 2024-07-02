module.exports = (sequelize, Sequelize) => {
  const USER_ACTIVITY = sequelize.define("USER_ACTIVITY", {
    last_active: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return USER_ACTIVITY;
};
