const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server  = express();
const Producto = require('./models/Producto');
const authRouter = require("./routes/authRouter");
const productosRouter = require("./routes/productoRouter");

//Midleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json( ));


//rutas
server.use("/productos", productosRouter);

server.get("/productos", async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    }catch(error){
        res.status(500).json({ error: "error al obtener el producto" });
    }
});

server.use("/login", authRouter);

module.exports = server;