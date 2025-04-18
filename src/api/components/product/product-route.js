const express = require('express');
const router = express.Router();
const productController = require('./product-controller');

// Definisikan semua route
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Pastikan ini
module.exports = router; // ✅ Export router langsung
