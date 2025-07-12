const server = require('./index');
require('dotenv').config();

const conectarDB = require('./config/db');
conectarDB();
const PORT = process.env.PORT || 3001;


server.listen(PORT, () => {

  console.log(`Servidor corriendo en http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});
console.log('Proceso sigue activo...');