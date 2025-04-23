const express = require('express');
const router = express.Router();
const cartController = require('./cartController');

router.get('/', cartController.getCarts);
router.get('/:id', cartController.getCartById);
router.post('/', cartController.addCart);
router.put('/:id', cartController.updateCart);
router.delete('/:id', cartController.deleteCart);

module.exports = router;