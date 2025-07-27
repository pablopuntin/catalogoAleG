import { renderNavbar } from "./navbar.js";
import { loginAdmin, isAdminLogged, logoutAdmin } from "./auth.js";

renderNavbar();

const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

const seccionesConSubcategorias = {
  calzas: ["short", "biker", "capri"],
  remeras: ["top", "musculosas", "remeras"]
};

document.addEventListener("DOMContentLoaded", async () => {
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

  // Si tiene subcategorías pero no se eligió una: mostrar tarjetas de subcategoría
  if (seccionesConSubcategorias[seccion] && !subcategoria) {
    titulo.textContent = seccion.toUpperCase();
    renderSubcategorias(seccion);
    return;
  }

  // Título completo
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

  const btnVolver = document.getElementById("btn-volver");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

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

function renderSubcategorias(seccion) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  const subcategorias = seccionesConSubcategorias[seccion];
  subcategorias.forEach(sub => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    const card = document.createElement("div");
    card.className = "card shadow-sm h-100";

    card.innerHTML = `
      <div class="card-body text-center">
        <h5 class="card-title text-capitalize">${sub}</h5>
        <button class="btn btn-primary">Ver productos</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", () => {
      window.location.href = `./productos.html?seccion=${encodeURIComponent(seccion)}&subcategoria=${encodeURIComponent(sub)}`;
    });

    col.appendChild(card);
    contenedor.appendChild(col);
  });
}

function renderProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles en esta categoría.</p>";
    return;
  }

  lista.forEach((prod) => {
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

    // Si está logueado el admin, agregamos botones CRUD
    if (isAdminLogged()) {
      const footer = document.createElement("div");
      footer.className = "card-footer d-flex justify-content-between";

      const btnEditar = document.createElement("button");
      btnEditar.className = "btn btn-sm btn-warning";
      btnEditar.textContent = "Editar";
      // A futuro: conectar lógica de edición

     const btnEliminar = document.createElement("button");
btnEliminar.className = "btn btn-sm btn-danger";
btnEliminar.textContent = "Eliminar";

btnEliminar.addEventListener("click", async () => {
  const confirmar = confirm(`¿Estás seguro de que querés eliminar "${prod.nombre}"?`);
  if (!confirmar) return;

  try {
    const response = await fetch(`${apiBase}/productos/${prod._id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Error al eliminar producto");

    alert("Producto eliminado exitosamente");
    location.reload();
  } catch (error) {
    console.error("Error al eliminar:", error);
    alert("Ocurrió un error al intentar eliminar el producto.");
  }
});


      footer.appendChild(btnEditar);
      footer.appendChild(btnEliminar);
      card.appendChild(footer);
    }

    col.appendChild(card);
    contenedor.appendChild(col);
  });
}
