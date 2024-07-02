// routes/users.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user/user.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - roleId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         roleId:
 *           type: integer
 *           description: The role id of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was last updated
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john@example.com
 *         roleId: 2
 *         createdAt: 2024-07-02T12:00:00.000Z
 *         updatedAt: 2024-07-02T12:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               roleId:
 *                 type: integer
 *                 description: The role id of the user
 *             example:
 *               name: John Doe
 *               email: john@example.com
 *               roleId: 2
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: The role of the user
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter users by active status
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of users to return per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to return
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: The field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: The order to sort by
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.get('/', userController.getUsers);

module.exports = router;
