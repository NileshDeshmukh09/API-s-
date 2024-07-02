const { Op } = require("sequelize");
const { db } = require("../models");
const { User, Role, UserActivity } = db;

const createUser = async (req, res) => {
  try {
    const { name, email, roleId } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!roleId) {
      return res
        .status(400)
        .json({ success: false, message: "RoleID is required" });
    }

    const existingRole = await Role.findOne({
      where: {
        id: roleId,
      },
    });

    if (!existingRole) {
      return res
        .status(400)
        .json({ success: false, message: "RoleID is not Present" });
    }

    const newUser = await User.create({
      name,
      email,
      roleId,
    });

    // Respond with success message
    res.status(201).json({
      success: true,
      message: `${newUser.dataValues.name} created successfully!`,

      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

const getUsers = async (req, res) => {
  try {
    const { role,  } = req.query;

    const where = {};

    if (role) {
      const roleObj = await Role.findOne({ where: { name: role } });
      where.roleId = roleObj ? roleObj.id : null;
    }

    // if (active) {
    //   const userIDs = await UserActivity.findAll({
    //     where: { is_active: active },
    //     attributes: ["userId"],
    //   });
    //   where.id = { [Op.in]: userIDs };
    // }

    const users = await User.findAll({
      where,
    });

    res.status(200).json({
      success: true,
      message: "Fetched all users!",
      TotalUser: users.length,
      users,
    });
  } catch (err) {
    console.log("Error in fetch user : ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  createUser,
  getUsers,
};
