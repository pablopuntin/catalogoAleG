// scripts/navbar.js
export function renderNavbar() {
  const navbarHTML = `
    <nav class="navbar">
      <ul>
        <li><a href="./index.html">Inicio</a></li>
        <li><a href="./productos.html?seccion=calzas&subcategoria=short">Calzas</a></li>
        <li><a href="./productos.html?seccion=remeras&subcategoria=top">Remeras</a></li>
        <li><a href="./productos.html?seccion=marroquineria&subcategoria=mochilas">Marroquinería</a></li>
        <li><a href="./admin/login.html">Admin</a></li>
      </ul>
    </nav>
  `;

  const contenedor = document.getElementById("navbar-container");
  if (contenedor) contenedor.innerHTML = navbarHTML;
}
