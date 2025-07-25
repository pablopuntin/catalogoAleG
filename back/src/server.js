const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const server  = express();
const Producto = require('./models/Producto');
const authRouter = require("./routes/authRouter");
const productoRouter = require("./routes/productoRouter");

//Midleware
server.use(cors({
  origin: "https://catalogo-ale-g.vercel.app",
  credentials: true, // si usás cookies o auth headers
}));
server.use(morgan("dev"));
server.use(express.json( ));

// Middleware para servir archivos estáticos del backend
server.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//rutas
server.use("/productos", productoRouter);

server.use("/login", authRouter);

module.exports = server;