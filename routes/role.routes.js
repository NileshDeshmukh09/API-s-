const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller")

router.post('/roles', roleController.createRole);
router.get('/roles', roleController.getRole);
module.exports = router;