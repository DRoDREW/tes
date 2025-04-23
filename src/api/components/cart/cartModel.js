const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

module.exports = mongoose.model('Cart', cartSchema);