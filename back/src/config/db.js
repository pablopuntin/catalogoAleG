const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

async function conectarDB() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        });
        console.log("Conectado a MongoDb");
            
    } catch(error){
        console.log("Error al conectar a MongoDB; ", error.message  );
    }
}

module.exports = conectarDB;