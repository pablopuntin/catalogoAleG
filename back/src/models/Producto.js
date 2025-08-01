
const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  poster: { type: String, required: true },
  disponible: { type: [String], required: true },
  seccion: { type: String, required: true },
  subcategoria: { type: String, required: true },  // ahora requerido
  stock: { type: Number, required: true }
});



 const Producto = mongoose.model('Producto', productoSchema);

 module.exports = Producto;
