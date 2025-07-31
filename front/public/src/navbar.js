

import { isAdminLogged, loginAdmin, logoutAdmin } from "./auth.js";

export function renderNavbar() {
  const contenedor = document.getElementById("navbar-container");
  if (!contenedor) return;

  // Inyectar modal login
  const modal = `
    <div id="login-modal" class="mi-modal oculto">
      <div class="modal-content p-4 rounded shadow">
        <button id="btn-close-modal" class="btn-close float-end"></button>
        <h2 class="modal-title">Login</h2>
        <input type="text" id="admin-user" class="form-control mb-2" placeholder="Usuario">
        <input type="password" id="admin-pass" class="form-control mb-3" placeholder="Contraseña">
        <button id="btn-submit-login" class="btn btn-dark w-100">Iniciar sesión</button>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modal);

  // Verificar si está logueado
  const logged = isAdminLogged();

  // Inyectar navbar
  contenedor.innerHTML = `
    <nav class="navbar navbar-expand-lg custom-navbar shadow-sm sticky-top">
      <div class="container">
        <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="index.html">
          <i class="bi bi-shop me-2"></i>Mi Catálogo</a>
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

  // Lógica del botón Admin
  const btnAdmin = document.getElementById("btn-admin");
  if (logged) {
    btnAdmin.addEventListener("click", () => {
      logoutAdmin();
      window.location.href = "index.html";
    });
  } else {
    btnAdmin.addEventListener("click", () => {
      document.getElementById("login-modal").classList.remove("oculto");
    });
  }

  // Cerrar modal
  const btnCerrarModal = document.getElementById("btn-close-modal");
  btnCerrarModal?.addEventListener("click", () => {
    document.getElementById("login-modal").classList.add("oculto");
  });

  // Navegación por secciones
  const navLinks = contenedor.querySelectorAll(".nav-link[data-seccion]");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const seccion = link.getAttribute("data-seccion");
      window.location.href = `productos.html?seccion=${seccion}`;
    });
  });
}


// ... (todo el renderNavbar actual) ...

  // Login desde modal
  const btnSubmitLogin = document.getElementById("btn-submit-login");
  btnSubmitLogin?.addEventListener("click", async () => {
    const user = document.getElementById("admin-user").value.trim();
    const pass = document.getElementById("admin-pass").value.trim();

    if (!user || !pass) {
      alert("Debe completar usuario y contraseña");
      return;
    }

    const exito = await loginAdmin(user, pass);
    if (exito) {
      window.location.href = "formulario.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });






















//  contenedor.innerHTML = `
//     <nav class="navbar navbar-expand-lg custom-navbar shadow-sm sticky-top">
//       <div class="container">
//         <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="index.html">
//           <i class="bi bi-shop me-2"></i>Mi Catálogo</a>
//         <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarNav">
//           <ul class="navbar-nav ms-auto align-items-center">
//             <li class="nav-item"><a class="nav-link" href="#" data-seccion="inicio">Inicio</a></li>
//             <li class="nav-item"><a class="nav-link" href="#" data-seccion="calzas">Calzas</a></li>
//             <li class="nav-item"><a class="nav-link" href="#" data-seccion="remeras">Remeras</a></li>
//             <li class="nav-item"><a class="nav-link" href="#" data-seccion="buzos">Buzos</a></li>
//             <li class="nav-item"><a class="nav-link" href="#" data-seccion="marroquineria">Marroquinería</a></li>
//             <li class="nav-item"><a class="nav-link" href="#" data-seccion="conjuntos">Conjuntos</a></li>
//           </ul>
//           <button id="btn-admin" class="btn btn-outline-dark ms-3">
//             ${logged ? "Cerrar sesión" : "Admin"}
//           </button>
//         </div>
//       </div>
//     </nav>`;