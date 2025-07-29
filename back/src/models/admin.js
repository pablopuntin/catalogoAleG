// models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

// Método para verificar password
adminSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.passwordHash);
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
