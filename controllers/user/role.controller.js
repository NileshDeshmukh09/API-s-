const { db } = require("../../models");
const { Role } = db;


const createRole = async ( req , res ) => {
    const { name } = req.body;

    const newRole = await Role.create({ name });    
    return res.status(201).json({
        success: true,
        message: "Role Created Successfully!",
        role : newRole,
      });
}

const getRole = async (req, res) => {
    try {
  
    
  
      const roles = await Role.findAll();
  
      res.status(200).json({
        success : true, 
        message : "Fetched all role!",
        TotalRole : roles.length,
        roles
      })
    } catch (err) {
      console.log("Error in fetch user : ", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

module.exports = {
    createRole,
    getRole
}