// controllers/auth.controller.js
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const isValid = await admin.isValidPassword(password);
    if (!isValid) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({ token, username: admin.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { login };
