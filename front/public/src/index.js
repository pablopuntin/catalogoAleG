// main.js
import renderProductos from "./renderProductos.js";
import { loginAdmin, isAdminLogged, logoutAdmin } from "./auth.js";

const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";
const btnAdmin = document.getElementById("btn-admin");

document.addEventListener("DOMContentLoaded", () => {
  // Actualiza el botón de admin según el estado
  if (isAdminLogged()) {
    btnAdmin.textContent = "Logout";
    btnAdmin.classList.remove("btn-outline-dark");
    btnAdmin.classList.add("btn-danger");
  } else {
    btnAdmin.textContent = "Admin";
    btnAdmin.classList.remove("btn-danger");
    btnAdmin.classList.add("btn-outline-dark");
  }

  // Evento botón admin
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

  // Agregar eventos a botones de sección
  document.querySelectorAll(".btn-ver-catalogo").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault(); // ahora está correcto

      const seccion = btn.dataset.seccion;

      // Ocultar sección inicial
      const hero = document.querySelector(".hero-section");
      if (hero) hero.style.display = "none";

      // Mostrar productos de la sección
      await renderProductos(seccion);

      // Botón para volver al inicio
      const volverBtn = document.createElement("button");
      volverBtn.textContent = "← Volver al inicio";
      volverBtn.classList.add("btn", "btn-secondary", "mt-3");
      volverBtn.addEventListener("click", () => window.location.reload());

      // Insertarlo antes del contenedor de productos
      const productosSection = document.getElementById("productos");
      if (productosSection) productosSection.before(volverBtn);
    });
  });
});
