const server = require('./server');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Crear config.js en public con la URL del backend
const configContent = `window.env = {
  API_URL: "${process.env.API_URL}"
};`;

fs.writeFileSync(path.join(__dirname, "../../front/public/config.js"), configContent);


const conectarDB = require('./config/db');
conectarDB();
const PORT = process.env.PORT || 3001;


server.listen(PORT, (req, res) => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
 
}).on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});



