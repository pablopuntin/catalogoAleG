const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server  = express();
const Producto = require('./models/Producto');


//Midleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json( ));


//rutas
server.get("/productos", async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    }catch(error){
        res.status(500).json({ error: "error al obtener el producto" });
    }
});

module.exports = server;