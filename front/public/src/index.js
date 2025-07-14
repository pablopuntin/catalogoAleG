console.log("imdex.js cargado");

import renderProd from "./renderProductos.js";
import { loginAdmin, } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnAdmin = document.getElementById("btn-admin");

  // ✅ MOSTRAR PRODUCTOS AL CARGAR LA PÁGINA
  fetch("/productos")
    .then(res => res.json())
    .then(data => renderProd(data))
    .catch(err => {
      console.error("Error al cargar productos:", err);
    });
 

  // ✅ LÓGICA PARA EL BOTÓN ADMIN
  btnAdmin.addEventListener("click", async () => {
    const user = prompt("Ingrese usuario administrador:");
    if (!user) return;

    const password = prompt("Ingrese contraseña:");
    if (!password) return;

    const exito = await loginAdmin(user, password);
    if (exito) {
      window.location.href = "formulario.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });
});



  btnAdmin.addEventListener("click", async () => {
    const user = prompt("Ingrese usuario administrador:");
    if (!user) return;

    const password = prompt("Ingrese contraseña:");
    if (!password) return;

    const exito = await loginAdmin(user, password);
    if (exito) {
      window.location.href = "formulario.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });
