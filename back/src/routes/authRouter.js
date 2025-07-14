const express = require("express");
const router = express.Router();

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "1234";

router.post("/", (req, res) => {
  const { user, password } = req.body;

  if (user === ADMIN_USER && password === ADMIN_PASS) {
    return res.status(200).json({ acceso: true });
  }

  return res.status(401).json({ acceso: false, mensaje: "Usuario o contraseña incorrectos" });
});

module.exports = router;
