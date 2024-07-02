const express = require("express");
const router = express.Router();
const userActivityController = require("../controllers/user/userActive.controller")

router.post('/', userActivityController.changeUserActivity);
// router.get('/users', userActivityController.getUsers);
module.exports = router;  