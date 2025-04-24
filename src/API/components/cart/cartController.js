const mongoose = require('mongoose');
const Cart = require('./cartModel');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// ambil semua cart
exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data cart', error });
    }
};

// ambil satu cart
exports.getSingleCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Cart tidak ditemukan' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil cart', error });
    }
};

// POST cart baru
exports.addCart = async (req, res) => {
    try {
        const { id, userId, date, products } = req.body;

        const newCart = new Cart({ id, userId, date, products });
        const savedCart = await newCart.save();

        res.status(201).json({ message: 'Cart dibuat.', cart: savedCart });
    } catch (error) {
        console.error('Gagal membuat cart' , error); 
        res.status(500).json({ message: 'Terjadi kesalahan', error });
    }
};

// update cart
exports.editCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCart) return res.status(404).json({ message: 'Cart tidak ada' });
        res.status(200).json({ message: 'Cart diperbarui', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ message: 'Gagal memperbarui cart', error });
    }
};

// hapus cart
exports.deleteCart = async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);

        if (!deletedCart) return res.status(404).json({ message: 'Cart tidak ada' });
        res.status(200).json({ message: 'Cart dihapus', cart: deletedCart });
        
    } catch (error) {
        res.status(500).json({ message: 'gagal menghapus cart', error });
    }
};