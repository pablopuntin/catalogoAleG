const express = require ("express");
const app = express();  
const port = 3000;

app.get("./", (req, res) => {
    res.send("Hola catagolo, jajaj");
});

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});