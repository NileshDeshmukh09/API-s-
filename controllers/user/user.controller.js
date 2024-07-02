const { Op } = require("sequelize");
const { db } = require("../../models");
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
    const { role, active, pageSize = 10, page = 1, sort = 'createdAt', order = 'ASC' } = req.query;

    const where = {};
    const activityWhere = {};

    if (role) {
      const roleObj = await Role.findOne({ where: { name: role } });
      where.roleId = roleObj ? roleObj.id : null;
    }

    if (active !== undefined) {
      activityWhere.is_active = active === 'true';
    }

    const users = await User.findAndCountAll({
      where,
      include: [
        { model: Role, attributes: ['name'], as: 'Role' },
        { model: UserActivity, attributes: ['is_active'], as: 'UserActivity', where: activityWhere },
      ],
      limit: parseInt(pageSize),
      offset: (page - 1) * pageSize,
      order: [[sort, order.toUpperCase()]],
    });

    const result = users?.rows?.map(user => ({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.Role?.name,
      is_active: user?.UserActivity?.is_active,
      created_at: user?.createdAt,
    }));

    res.status(200).json({
      success: true,
      message: "Fetched all users!",
      totalUsers: users.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(users.count / pageSize),
      users: result
    });
  } catch (err) {
    console.log("Error in fetching users: ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  getUsers,
};
