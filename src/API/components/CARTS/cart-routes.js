const express = require('express');
const router = express.Router();
const cartController = require('./cart-controller');

// Ambil semua cart
router.get('/', cartController.getAllCarts);

// Ambil cart berdasarkan id
router.get('/:id', cartController.getSingleCart);

// Menambah cart
router.post('/', cartController.addCart);

// update cart
router.put('/:id', cartController.editCart);

// hapus cart
router.delete('/:id', cartController.deleteCart);

module.exports = router;