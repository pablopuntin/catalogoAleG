// scripts/renderProductos.js
import { renderNavbar } from "./navbar.js";
import { loginAdmin, isAdminLogged, logoutAdmin } from "./auth.js";

renderNavbar();

const seccionesConSubcategorias = {
  calzas: ["short", "biker", "capri"],
  remeras: ["top", "musculosas", "remeras"]
};

const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  if (seccionesConSubcategorias[seccion] && !subcategoria) {
  renderSubcategorias(seccion);
  return;
}

  const params = new URLSearchParams(window.location.search);
  const seccion = params.get("seccion");
  const subcategoria = params.get("subcategoria");

  const titulo = document.getElementById("titulo-seccion");
  const contenedor = document.getElementById("contenedor-productos");

  if (!seccion) {
    titulo.textContent = "Sección no especificada";
    contenedor.innerHTML = "<p class='text-danger'>No se puede mostrar la vista.</p>";
    return;
  }

  // Actualizamos el título
  titulo.textContent = subcategoria
    ? `${seccion.toUpperCase()} - ${subcategoria.toUpperCase()}`
    : `${seccion.toUpperCase()}`;

  try {
    let url = `${apiBase}/productos?seccion=${encodeURIComponent(seccion)}`;
    if (subcategoria) url += `&subcategoria=${encodeURIComponent(subcategoria)}`;

    const response = await fetch(url);
    const productos = await response.json();

    if (!Array.isArray(productos)) throw new Error("Respuesta no válida");

    renderProductos(productos);
  } catch (error) {
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = `<p class="text-danger">Error al cargar productos.</p>`;
  }

  // Botón volver al inicio
  const btnVolver = document.getElementById("btn-volver");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  // Botón Admin (igual que en index.js)
  const btnAdmin = document.getElementById("btn-admin");
  if (btnAdmin) {
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
        window.location.href = "formulario.html";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }
});

// Función para renderizar tarjetas de productos
function renderProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles en esta categoría.</p>";
    return;
  }

  lista.forEach((prod) => {
    if (isAdminLogged()) {
  card.innerHTML += `
    <div class="card-footer d-flex justify-content-between">
      <button class="btn btn-sm btn-warning">Editar</button>
      <button class="btn btn-sm btn-danger">Eliminar</button>
    </div>
  `;
}

    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm";

    card.innerHTML = `
     <img src="${prod.poster}" class="card-img-top" alt="${prod.nombre}" style="object-fit: cover; height: 250px;" />

      <div class="card-body">
        <h5 class="card-title">${prod.nombre}</h5>
        <p class="card-text">${prod.descripcion}</p>
        <p class="fw-bold">$${prod.precio}</p>
      </div>
    `;

    col.appendChild(card);
    contenedor.appendChild(col);
  });
}
