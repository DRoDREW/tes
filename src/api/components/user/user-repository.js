// src/api/components/user/user-repository.js
const User = require('./user-model');

// Dapatkan semua user
const getAllUsers = async () => {
  return await User.find();
};

// Dapatkan user berdasarkan ID
const getUserById = async (id) => {
  return await User.findById(id);
};

// Cari user berdasarkan email (bisa untuk login)
const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Buat user baru
const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Perbarui user
const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

// Hapus user
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
