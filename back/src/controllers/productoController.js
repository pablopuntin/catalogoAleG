const Producto = require("../models/Producto");
const path = require("path");
const fs = require("fs");

// ✅ Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos", error.message);
    res.status(500).json({ mensaje: "Error al obtener productos", error: error.message });
  }
};

// ✅ Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
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

// ✅ Crear producto
const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, disponible, seccion } = req.body;

    // Validación básica
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Imagen (poster) obligatoria" });
    }

    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio: Number(precio),
      stock: Number(stock),
      disponible: disponible.split(',').map(t => t.trim()),
      seccion,
      poster: req.file.path, // ruta pública de Cloudinary
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear producto", detalles: error.message });
  }
};

// ✅ Actualizar producto
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, seccion, disponible, stock } = req.body;
    const imagenNueva = req.file?.filename;

    const producto = await Producto.findById(id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

    if (imagenNueva) {
      const rutaImagenAnterior = path.join(__dirname, `../../front/public/img/${producto.poster}`);
      const rutaImagenNueva = path.join(__dirname, `../../front/public/img/${imagenNueva}`);

      if (producto.poster && fs.existsSync(rutaImagenAnterior)) {
        fs.unlinkSync(rutaImagenAnterior);
      }

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

// ✅ Eliminar producto
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByIdAndDelete(id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

    const imgPath = path.join(__dirname, `../../front/public/img/${producto.poster}`);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el producto", error.message);
    res.status(500).json({ mensaje: "Error al eliminar el producto", error: error.message });
  }
};

// ✅ Exportar todo junto
module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
