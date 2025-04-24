const express = require('express');
const router = express.Router();
const productController = require('./products-controller');

// Get all products with optional limit and sort
router.get('/', productController.getAllProducts);

// Get products by category - Must be before /:id to avoid conflict
router.get('/category/:categoryName', productController.getProductsByCategory);

// Get specific product by ID
router.get('/:id', productController.getProduct);

// Create new product
router.post('/', productController.createProduct);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
