const { Op } = require("sequelize");
const { db } = require("../../models");
const { User, Role, UserActivity } = db;

const changeUserActivity = async (req, res) => {
  try {
    const { userId , is_active , last_active } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "user Id is required" });
    }
   

    const existingUser = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID" });
    }

    const existingUserActiveStatus = await UserActivity.findOne({
        where: {
          userId: userId,
        },
      });

      if (existingUserActiveStatus) {
        return res
          .status(400)
          .json({ success: false, message: "User already has an active status" });
      }
  

    const userActiveStatus = await UserActivity.create({
      userId,
      is_active,
      last_active
    });

    // Respond with success message
    res.status(201).json({
      success: true,
      message: `User with ID ${userId}  active status created successfully!`,
        userActiveStatus,
    });
  } catch (error) {
    console.error("Error creating user activity:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


module.exports = {
    changeUserActivity,

};
