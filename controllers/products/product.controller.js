const { db } = require('../../models');
const { Product } = db;
const { validateProductFields } = require("../../utils/validations");

const categoriesList = ['electronics', 'furniture', 'clothing', 'toys', 'books'];
const priceThreshold = 1000;

const createProduct = async (req, res) => {
  const { name, description, category, price, available, approval_code } = req.body;

  const validationError = validateProductFields(req.body);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  if (!categoriesList.includes(category)) {
    return res.status(400).json({ success: false, message: 'Invalid category' });
  }

  if (price > priceThreshold && !approval_code) {
    return res.status(400).json({ success: false, message: 'Approval code is required for products priced above $1000' });
  }

  try {
    const product = await Product.create({
      name,
      description,
      category,
      price,
      available,
      approvalCode: price > priceThreshold ? approval_code : null,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        available: product.available,
        created_at: product.createdAt,
      },
    });
  } catch (err) {
    console.log('Error in creating product: ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
    createProduct
};
