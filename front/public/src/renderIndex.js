// scripts/renderIndex.js
import { renderNavbar } from "./navbar.js";
renderNavbar();

// Lista de subsecciones fijas según tu backend
const subsecciones = [
  { seccion: "calzas", subcategoria: "short" },
  { seccion: "calzas", subcategoria: "biker" },
  { seccion: "calzas", subcategoria: "capri" },
  { seccion: "remeras", subcategoria: "top" },
  { seccion: "remeras", subcategoria: "musculosas" },
  { seccion: "remeras", subcategoria: "remeras" },
  { seccion: "marroquineria", subcategoria: "mochilas" }
];

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("categorias");

  // Renderizar tarjetas dinámicas de subsecciones
  subsecciones.forEach(({ seccion, subcategoria }) => {
    const card = document.createElement("div");
    card.className = "card-subseccion";
    card.innerHTML = `
      <h3>${subcategoria.toUpperCase()}</h3>
      <p>${seccion}</p>
    `;

    card.addEventListener("click", () => {
      window.location.href = `./productos.html?seccion=${encodeURIComponent(seccion)}&subcategoria=${encodeURIComponent(subcategoria)}`;
    });

    contenedor.appendChild(card);
  });

  // Navegación desde las tarjetas de sección principales (estáticas en el HTML)
  const botones = document.querySelectorAll(".btn-ver-catalogo");
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const seccion = btn.dataset.seccion;
      window.location.href = `./productos.html?seccion=${encodeURIComponent(seccion)}`;
    });
  });
});
