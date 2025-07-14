const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const upload = require("../middleware/upload");

router.get("/", productoController.obtenerProductos);

//  usamos multer para recibir la imagen
router.post("/", upload.single("poster"), productoController.crearProducto);

router.put("/:id", upload.single("poster"), productoController.actualizarProducto);

router.delete("/:id", productoController.eliminarProducto);




module.exports = router;
