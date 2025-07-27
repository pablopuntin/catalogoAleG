// scripts/renderIndex.js
import { renderNavbar } from "./navbar.js";
renderNavbar();

const subsecciones = [
  { seccion: "calzas", subcategoria: "short" },
  { seccion: "calzas", subcategoria: "biker" },
  { seccion: "remeras", subcategoria: "top" },
  { seccion: "marroquineria", subcategoria: "mochilas" },
];

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("categorias");

  subsecciones.forEach(({ seccion, subcategoria }) => {
    const card = document.createElement("div");
    card.className = "card-subseccion";
    card.innerHTML = `
      <h3>${subcategoria.toUpperCase()}</h3>
      <p>${seccion}</p>
    `;
    card.addEventListener("click", () => {
      irAProductos(seccion, subcategoria);
    });
    contenedor.appendChild(card);
  });
});

function irAProductos(seccion, subcategoria) {
  window.location.href = `./productos.html?seccion=${seccion}&subcategoria=${subcategoria}`;
}
