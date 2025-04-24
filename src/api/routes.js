const express = require('express');
const router = express.Router();

const productRoutes = require('./components/PRODUCTS/products-route');
const userRoutes = require('./components/USERS/users-route');
const cartRoutes = require('./components/CARTS/cart-route');

router.use('/product', productRoutes); 
router.use('/user', userRoutes);       
router.use('/cart', cartRoutes); 


module.exports = router;
