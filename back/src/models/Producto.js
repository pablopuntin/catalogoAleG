const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: Number,
  imagen: String,
  seccion: String, // ej: "remeras", "pantalones", "accesorios"
  stock: Number,
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
