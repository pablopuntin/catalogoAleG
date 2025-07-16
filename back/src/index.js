const server = require('./server');
require('dotenv').config();
const fs = require('fs');
const path = require('path');



const conectarDB = require('./config/db');
conectarDB();
const PORT = process.env.PORT || 3001;


server.listen(PORT, (req, res) => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
 
}).on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});



