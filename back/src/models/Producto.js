
const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
   descripcion: { type: String, required: true },
   precio: { type: Number, required: true },
   poster: { type: String, required: true }, // la imagen principal
   disponible: { type: [String], required: true }, // ej: ["S", "M", "L"]
   seccion: { type: String, required: true }, // ej: "remeras", "pantalones", etc
   stock: { type: Number, required: true }
 });

 const Producto = mongoose.model('Producto', productoSchema);

 module.exports = Producto;
