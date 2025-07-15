import renderProd from "./renderProductos.js";
import { loginAdmin, } from "./auth.js";
const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";



const btnAdmin = document.getElementById("btn-admin");

document.addEventListener("DOMContentLoaded", () => {

 
  try {
    fetch(`${apiBase}/productos`)
      .then(res => {
        if (!res.ok) throw new Error("Respuesta no OK del servidor");
        return res.json();
      })
      .then(data => renderProd(data))
      .catch(err => console.error("Error al obtener productos:", err));
  } catch (e) {
    console.error("Error general en index.js:", e);
  }
});

  // ✅ LÓGICA PARA EL BOTÓN ADMIN
  btnAdmin.addEventListener("click", async () => {
    const user = prompt("Ingrese usuario administrador:");
    if (!user) return;

    const password = prompt("Ingrese contraseña:");
    if (!password) return;

    const exito = await loginAdmin(user, password);
    if (exito) {
      console.log("Login exitoso, redirigiendo...");
    window.location.href = "formulario.html";
  } else {
    console.log("Login fallido.");
    alert("Usuario o contraseña incorrectos");
  }
});



