// scripts/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Admin = require('./models/admin');

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const passwordHash = await bcrypt.hash('Galvan-Emprendimiento', 10);

  const admin = new Admin({
    username: 'SuperRoot',
    passwordHash,
  });

  await admin.save();
  console.log('Admin creado');
  process.exit();
}

createAdmin();
