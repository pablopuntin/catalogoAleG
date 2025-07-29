//mejorado con autentificacion y token
const express = require('express');
const router = express.Router();
const {
obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/productoController');

const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // o como se llame tu config de multer+cloudinary

// Pública
router.get('/', obtenerProductos);

// Protegidas
router.post('/', authMiddleware, upload.single('poster'), crearProducto);
router.delete('/:id', authMiddleware, eliminarProducto);
router.put('/:id', authMiddleware, upload.single('poster'), actualizarProducto); // si usás imagen nueva

module.exports = router;
