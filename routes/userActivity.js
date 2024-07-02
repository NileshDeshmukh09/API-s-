// routes/userActivity.routes.js
const express = require("express");
const router = express.Router();
const userActivityController = require("../controllers/user/userActive.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserActivity:
 *       type: object
 *       required:
 *         - userId
 *         - isActive
 *       properties:
 *         userId:
 *           type: integer
 *           description: The ID of the user
 *         isActive:
 *           type: boolean
 *           description: The active status of the user
 *       example:
 *         userId: 1
 *         isActive: true
 */

/**
 * @swagger
 * tags:
 *   name: User Activity
 *   description: API to manage user activity status
 */

/**
 * @swagger
 * /userActivity:
 *   post:
 *     summary: Change the activity status of a user
 *     tags: [User Activity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user
 *               isActive:
 *                 type: boolean
 *                 description: The new activity status of the user
 *             example:
 *               userId: 1
 *               isActive: false
 *     responses:
 *       200:
 *         description: The activity status of the user was successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserActivity'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
router.post('/', userActivityController.changeUserActivity);

module.exports = router;
