const express = require('express');
const router = express.Router();

const productRoutes = require('./components/product/product-route');
const userRoutes = require('./components/user/user-route');

router.use('/product', productRoutes); // ✅ OK
router.use('/user', userRoutes);       // ✅ OK

module.exports = router;
