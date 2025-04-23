const express = require('express');
const router = express.Router();

const productRoutes = require('./components/product/product-route');
const userRoutes = require('./components/user/user-route');
const cartRoutes = require('./components/cart/cartRoutes');

router.use('/product', productRoutes); 
router.use('/user', userRoutes);       
router.use('/cart', cartRoutes); 


module.exports = router;
