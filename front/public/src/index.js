import renderProductos from "./renderProductos.js";
import { loginAdmin, isAdminLogged, logoutAdmin } from "./auth.js";

const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";
const btnAdmin = document.getElementById("btn-admin");

document.addEventListener("DOMContentLoaded", () => {
  // Mostrar cards iniciales
  if (isAdminLogged()) {
    btnAdmin.textContent = "Logout";
    btnAdmin.classList.remove("btn-outline-dark");
    btnAdmin.classList.add("btn-danger");
    btnAdmin.addEventListener("click", () => {
      logoutAdmin();
      location.reload();
    });
  }

  // Agregar eventos a botones de catálogo
  document.querySelectorAll(".btn-ver-catalogo").forEach((btn) => {
    btn.addEventListener("click", () => {
      e.preventDefault();
      const seccion = btn.dataset.seccion;

      // Ocultar sección inicial
      document.querySelector(".hero-section").style.display = "none";


            renderProd(seccion); // ya hace el fetch y render interno

      // Agregar botón volver
      const volverBtn = document.createElement("button");
      volverBtn.textContent = "← Volver al inicio";
      volverBtn.classList.add("btn", "btn-secondary", "mt-3");
      volverBtn.addEventListener("click", () => window.location.reload());

      document.getElementById("productos").before(volverBtn);


    });
  });
});

// Login de admin
btnAdmin.addEventListener("click", async () => {
  if (isAdminLogged()) {
    logoutAdmin();
    location.reload();
    return;
  }

  const user = prompt("Ingrese usuario administrador:");
  if (!user) return;
  const password = prompt("Ingrese contraseña:");
  if (!password) return;

  const exito = await loginAdmin(user, password);
  if (exito) {
    console.log("Login exitoso");
    window.location.href = "formulario.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});
