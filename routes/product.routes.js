// routes/products.routes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/products/product.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - price
 *         - available
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         available:
 *           type: boolean
 *           description: Availability of the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the product was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the product was last updated
 *       example:
 *         id: 1
 *         name: Example Product
 *         description: This is an example product
 *         category: electronics
 *         price: 100
 *         available: true
 *         createdAt: 2024-07-02T12:00:00.000Z
 *         updatedAt: 2024-07-02T12:00:00.000Z
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);

module.exports = router;
