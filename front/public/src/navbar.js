// scripts/navbar.js
export function renderNavbar() {
  const contenedor = document.getElementById("navbar-container");
  if (!contenedor) return;

  contenedor.innerHTML = `
    <nav class="navbar navbar-expand-lg custom-navbar shadow-sm sticky-top">
      <div class="container">
        <!-- Logo -->
        <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="index.html">
          <i class="bi bi-shop me-2"></i>Mi Catálogo
        </a>

        <!-- Botón toggle (responsive) -->
        <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menú colapsable -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item"><a class="nav-link" href="#" data-seccion="inicio">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="#" data-seccion="calzas">Calzas</a></li>
            <li class="nav-item"><a class="nav-link" href="#" data-seccion="remeras">Remeras</a></li>
            <li class="nav-item"><a class="nav-link" href="#" data-seccion="buzos">Buzos</a></li>
            <li class="nav-item"><a class="nav-link" href="#" data-seccion="marroquineria">Marroquinería</a></li>
            <li class="nav-item"><a class="nav-link" href="#" data-seccion="conjuntos">Conjuntos</a></li>
          </ul>

          <!-- Botón Admin -->
          <button id="btn-admin" class="btn btn-outline-dark ms-3">Admin</button>
        </div>
      </div>
    </nav>
  `;
}
