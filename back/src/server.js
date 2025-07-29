// const path = require("path");
// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");

// const server  = express();
// const Producto = require('./models/Producto');
// const authRouter = require("./routes/authRouter");
// const productoRouter = require("./routes/productoRouter");

// //Midleware
// server.use(cors(
//   {
//   origin: "https://catalogo-ale-g.vercel.app",
//   credentials: true, // si usás cookies o auth headers
// }
// ));
// server.use(morgan("dev"));
// server.use(express.json( ));

// // Middleware para servir archivos estáticos del backend
// server.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// //rutas
// server.use("/productos", productoRouter);

// server.use("/login", authRouter);

// module.exports = server;



const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const server = express();

const Producto = require('./models/Producto');
const authRoutes = require("./routes/authRouter");       // nota: auth.routes.js
const productoRouter = require("./routes/productoRouter");

// Middleware
server.use(cors({
  origin: "https://catalogo-ale-g.vercel.app",
  credentials: true, // si usás cookies o headers de auth
}));

server.use(morgan("dev"));
server.use(express.json());

// Middleware para servir archivos estáticos del backend
server.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
server.use("/api/auth", authRoutes);        // Login y auth aquí
server.use("/productos", productoRouter);

// Exportar servidor
module.exports = server;
