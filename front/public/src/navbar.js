// scripts/navbar.js
import { isAdminLogged, logoutAdmin } from "./auth.js";

export function renderNavbar() {
  const contenedor = document.getElementById("navbar-container");
  if (!contenedor) return;

  const logged = isAdminLogged();

  contenedor.innerHTML = `
    <nav class="navbar navbar-expand-lg custom-navbar shadow-sm sticky-top">
      <div class="container">
        <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="index.html">
          <i class="bi bi-shop me-2"></i>Mi Catálogo
        </a>
        <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item"><a class="nav-link" href="#" data-seccion="inicio">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="#" data-seccion="calzas">Calzas</a></li>
            <li class="nav-item"><a class="nav-link" href="#" data-seccion="remeras">Remeras</a></li>
            <li class="nav-item"><a class="nav-link" href="#" data-seccion="buzos">Buzos</a></li>
            <li class="nav-item"><a class="nav-link" href="#" data-seccion="marroquineria">Marroquinería</a></li>
            <li class="nav-item"><a class="nav-link" href="#" data-seccion="conjuntos">Conjuntos</a></li>
          </ul>
          <button id="btn-admin" class="btn btn-outline-dark ms-3">
            ${logged ? "Cerrar sesión" : "Admin"}
          </button>
        </div>
      </div>
    </nav>
  `;

  const btnAdmin = document.getElementById("btn-admin");
  if (btnAdmin) {
    if (logged) {
      btnAdmin.addEventListener("click", () => {
        logoutAdmin();
        window.location.href = "index.html";
      });
    } else {
      btnAdmin.addEventListener("click", () => {
        window.location.href = "login.html";
      });
    }
   // Agregar funcionalidad a los botones de sección
const navLinks = contenedor.querySelectorAll(".nav-link[data-seccion]");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const seccion = link.getAttribute("data-seccion");

    // Redirigir a productos.html con la sección como query param
    window.location.href = `productos.html?seccion=${seccion}`;
  });
});
 
  }
}
