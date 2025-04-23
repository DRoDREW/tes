const Cart = require('./cartModel');
const User = require('../user/userModel');
const Product = require('../product/productModel');
const mongoose = require('mongoose');

exports.addCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid user_id or product_id format'
            });
        }

        // Check if user exists
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Check if product exists and get details
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }

        // Calculate total price
        const totalPrice = product.price * quantity;

        // Create new cart
        const cart = new Cart({
            user_id: new mongoose.Types.ObjectId(user_id),
            product_id: new mongoose.Types.ObjectId(product_id),
            quantity: quantity
        });

        const savedCart = await cart.save();

        res.status(201).json({
            status: 'success',
            data: {
                id: savedCart._id,
                user_id: savedCart.user_id,
                product_details: {
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                    total_price: totalPrice
                },
                created_at: savedCart.created_at
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get all carts
exports.getCarts = async (req, res) => {
    try {
        const carts = await Cart.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $project: {
                    user_id: 1,
                    product_name: '$product.name',
                    product_price: '$product.price',
                    quantity: 1,
                    total_price: { $multiply: ['$quantity', '$product.price'] },
                    created_at: 1
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: carts
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get cart by ID
exports.getCartById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid cart ID'
            });
        }

        const cart = await Cart.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $project: {
                    user_id: 1,
                    product_name: '$product.name',
                    product_price: '$product.price',
                    quantity: 1,
                    total_price: { $multiply: ['$quantity', '$product.price'] },
                    created_at: 1
                }
            }
        ]);

        if (!cart.length) {
            return res.status(404).json({
                status: 'error',
                message: 'Cart not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: cart[0]
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update cart
exports.updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid cart ID'
            });
        }

        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(404).json({
                status: 'error',
                message: 'Cart not found'
            });
        }

        const product = await Product.findById(cart.product_id);
        cart.quantity = quantity;
        const updatedCart = await cart.save();

        res.status(200).json({
            status: 'success',
            data: {
                id: updatedCart._id,
                user_id: updatedCart.user_id,
                product_details: {
                    name: product.name,
                    price: product.price,
                    quantity: updatedCart.quantity,
                    total_price: product.price * updatedCart.quantity
                },
                created_at: updatedCart.created_at
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete cart
exports.deleteCart = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid cart ID'
            });
        }

        const cart = await Cart.findByIdAndDelete(id);
        if (!cart) {
            return res.status(404).json({
                status: 'error',
                message: 'Cart not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Cart deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};