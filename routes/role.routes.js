// routes/roles.routes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/user/role.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the role
 *         name:
 *           type: string
 *           description: The name of the role
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the role was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the role was last updated
 *       example:
 *         id: 1
 *         name: Admin
 *         createdAt: 2024-07-02T12:00:00.000Z
 *         updatedAt: 2024-07-02T12:00:00.000Z
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: The role was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: A list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Internal server error
 */

router.post('/', roleController.createRole);
router.get('/', roleController.getRole);

module.exports = router;
