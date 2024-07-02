const express = require("express");
const router = express.Router();
const productController = require("../controllers/products/product.controller")

router.post('/', productController.createProduct);
// router.get('/users', userActivityController.getUsers);
module.exports = router;  