const Producto = require("../models/Producto");
const path = require("path");
const fs = require("fs");

exports.obtenerProductos = async (req, res) => {
 try { const productos = await Producto.find();
  res.json(productos);
} catch (error){
  console.error("Error al obtener productos", error.message);
  res.status(500).json({mensaje: "Error al obtener productos", error: error.message});
}
};



exports.crearProducto = async (req, res) => {
  try {
  const { nombre, descripcion, precio, seccion, disponible, stock } = req.body;
  const poster = req.file?.filename || null;

  const nuevoProducto = new Producto({ nombre, 
    descripcion, 
    precio, 
    seccion, 
    disponible: disponible.split(',').map(t => t.trim()), 
    stock, 
    poster });
  await nuevoProducto.save();
  res.status(201).json(nuevoProducto);
} catch (error){
console.error("Error al crear el producto", error.message);
res.status(500).json({mensaje: "error al crear el producto", error: error.message});
}
};



exports.actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, seccion, disponible, stock } = req.body;
    const imagenNueva = req.file?.filename;

    const producto = await Producto.findById(id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

    // 🖼️ Si se subió una imagen nueva
    if (imagenNueva) {
      const rutaImagenAnterior = path.join(__dirname, `../../front/public/img/${producto.poster}`);
      const rutaImagenNueva = path.join(__dirname, `../../front/public/img/${imagenNueva}`);

      // Si ya hay imagen, la reemplazamos renombrando la nueva
      if (producto.poster && fs.existsSync(rutaImagenAnterior)) {
        fs.unlinkSync(rutaImagenAnterior); // borrar la anterior si existía
      }

      // Sobrescribimos usando el mismo nombre anterior, o usamos la nueva si no había
      const nuevoNombreFinal = producto.poster || imagenNueva;
      const rutaFinal = path.join(__dirname, `../../front/public/img/${nuevoNombreFinal}`);

      try {
  fs.renameSync(rutaImagenNueva, rutaFinal);
  producto.poster = nuevoNombreFinal;
} catch (err) {
  console.error("Error al mover imagen:", err.message);
  return res.status(500).json({ mensaje: "Error al guardar imagen", error: err.message });
}

    }

    // ✅ Actualizar solo los campos enviados
    if (nombre !== undefined) producto.nombre = nombre;
    if (descripcion !== undefined) producto.descripcion = descripcion;
    if (precio !== undefined) producto.precio = precio;
    if (seccion !== undefined) producto.seccion = seccion;
    if (stock !== undefined) producto.stock = stock;

    if (disponible !== undefined) {
      producto.disponible = Array.isArray(disponible)
        ? disponible
        : (typeof disponible === "string"
            ? disponible.split(",").map(t => t.trim())
            : []);
    }

    await producto.save();
    res.json(producto);
  } catch (error) {
    console.error("Error al actualizar el producto", error.message);
    res.status(500).json({ mensaje: "Error al actualizar el producto", error: error.message });
  }
};




exports.eliminarProducto = async (req, res) => {
  try {
  const { id } = req.params;
  const producto = await Producto.findByIdAndDelete(id);
  if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

  const imgPath = path.join(__dirname, `../../front/public/img/${producto.poster}`);
  if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath); // borrar imagen si existe

  res.json({ mensaje: "Producto eliminado correctamente" });
} catch (error){
   console.error("Error al eliminar el producto", error.message);
    res.status(500).json({ mensaje: "Error al eliminar el producto", error: error.message });
}

};

exports.obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto por ID:", error.message);
    res.status(500).json({ mensaje: "Error del servidor", error: error.message });
  }
};

