const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server  = express();
const Producto = require('./models/Producto');
const authRouter = require("./routes/authRouter");
const productoRouter = require("./routes/productoRouter");
const path = require("path");

//Midleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json( ));

// Middleware para servir archivos estáticos del backend
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//rutas
server.use("/productos", productoRouter);

server.use("/login", authRouter);

module.exports = server;