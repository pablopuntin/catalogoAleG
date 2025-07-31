
//version limpia sin prompt
// scripts/renderIndex.js
import { renderNavbar } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();

  // Navegación desde las tarjetas estáticas del index.html
  const botones = document.querySelectorAll(".btn-ver-catalogo");
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const seccion = btn.dataset.seccion;
      window.location.href = `./productos.html?seccion=${encodeURIComponent(seccion)}`;
    });
  });
});
