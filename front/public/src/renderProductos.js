// scripts/renderProductos.js
import { renderNavbar } from "./navbar.js";
renderNavbar();

const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const seccion = params.get("seccion");
  const subcategoria = params.get("subcategoria");

  const titulo = document.getElementById("titulo-seccion");
  titulo.textContent = `${seccion.toUpperCase()} - ${subcategoria.toUpperCase()}`;

  try {
    const response = await fetch(`${apiBase}/producto?seccion=${seccion}&subcategoria=${subcategoria}`);
    const productos = await response.json();

    if (!Array.isArray(productos)) throw new Error("Respuesta no válida");

    renderProductos(productos);
  } catch (error) {
    console.error("Error al cargar productos:", error);
    document.getElementById("contenedor-productos").innerHTML = `<p>Error al cargar productos.</p>`;
  }

  document.getElementById("btn-volver").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

function renderProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No hay productos en esta subcategoría.</p>";
    return;
  }

  lista.forEach((prod) => {
    const card = document.createElement("div");
    card.className = "producto-card";

    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" />
      <h3>${prod.nombre}</h3>
      <p>${prod.descripcion}</p>
      <p><strong>$${prod.precio}</strong></p>
    `;

    contenedor.appendChild(card);
  });
}
