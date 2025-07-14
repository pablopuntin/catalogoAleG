const express = require("express");
const router = express.Router();

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

router.post("/", (req, res) => {
  const { user, password } = req.body;

  if (user === ADMIN_USER && password === ADMIN_PASSWORD) {
    res.status(200).json({ acceso: true });
  } else {
    res.status(401).json({ 
      acceso: false, 
      mensaje: "Usuario o contraseña incorrectos" 
    });
  }
});

module.exports = router;