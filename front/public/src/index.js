import renderProductos from "./renderProductos.js";
import { loginAdmin, isAdminLogged, logoutAdmin } from "./auth.js";

const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  // --- Selectores ---
  const btnAdmin = document.getElementById("btn-admin");
  const botonesCategorias = document.querySelectorAll(".btn-ver-catalogo");
  const contenedorProductos = document.getElementById("contenedor-productos");
  const filaCategorias = document.getElementById("fila-categorias");
  const contenedorSubcategorias = document.getElementById("contenedor-subcategorias");
  const botonVolver = document.getElementById("boton-volver");
  const navLinks = document.querySelectorAll(".nav-link");
  const hero = document.querySelector(".hero-section");
  const estaticas = document.getElementById("secciones-estaticas");

  // --- Datos de categorías y subcategorías ---
  const subcategoriasPorSeccion = {
    calzas: ["Calzas", "Capri", "Biker", "Short"],
    remeras: ["Remeras", "Musculosas", "Top"],
    buzos: ["Buzos"],
    marroquineria: ["Marroquinería"],
    conjuntos: ["Conjuntos"],
  };

  // --- Funciones auxiliares ---

  function actualizarBotonAdmin() {
    if (isAdminLogged()) {
      btnAdmin.textContent = "Logout";
      btnAdmin.classList.remove("btn-outline-dark");
      btnAdmin.classList.add("btn-danger");
    } else {
      btnAdmin.textContent = "Admin";
      btnAdmin.classList.remove("btn-danger");
      btnAdmin.classList.add("btn-outline-dark");
    }
  }

  function configurarBotonVolver() {
    if (!botonVolver) return;

    botonVolver.style.display = "block";
    const volverBtn = botonVolver.querySelector("button");
    if (!volverBtn) return;

    volverBtn.onclick = () => {
      filaCategorias.style.display = "flex";
      contenedorProductos.innerHTML = "";
      contenedorProductos.classList.add("d-none");
      contenedorProductos.classList.remove("justify-content-center");

      contenedorSubcategorias.innerHTML = "";
      contenedorSubcategorias.classList.add("d-none");

      botonVolver.style.display = "none";

      if (hero) hero.style.display = "block";
      if (estaticas) estaticas.style.display = "block";
    };
  }

  function limpiarVista() {
    contenedorProductos.innerHTML = "";
    contenedorProductos.classList.add("d-none");
    contenedorProductos.classList.remove("justify-content-center");

    contenedorSubcategorias.innerHTML = "";
    contenedorSubcategorias.classList.add("d-none");
  }

  function mostrarSubcategorias(seccion) {
    contenedorSubcategorias.innerHTML = "";
    contenedorSubcategorias.classList.remove("d-none");

    subcategoriasPorSeccion[seccion].forEach((subcat) => {
      const boton = document.createElement("button");
      boton.className = "btn btn-outline-primary m-2 text-capitalize";
      boton.textContent = subcat;
      boton.addEventListener("click", async () => {
        limpiarVista();
        await renderProductos(seccion, subcat.toLowerCase());
        configurarBotonVolver();
      });
      contenedorSubcategorias.appendChild(boton);
    });
  }

  // --- Inicialización ---

  actualizarBotonAdmin();

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

  botonesCategorias.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const seccion = btn.dataset.seccion;
      filaCategorias.style.display = "none";
      limpiarVista();

      if (subcategoriasPorSeccion[seccion]) {
        mostrarSubcategorias(seccion);
      } else {
        await renderProductos(seccion);
        configurarBotonVolver();
      }
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const seccion = link.dataset.seccion;

      if (seccion === "inicio") {
        if (hero) hero.style.display = "block";
        if (estaticas) estaticas.style.display = "block";

        limpiarVista();
        filaCategorias.style.display = "flex";
        if (botonVolver) botonVolver.style.display = "none";
        return;
      }

      if (hero) hero.style.display = "none";
      if (estaticas) estaticas.style.display = "none";

      limpiarVista();
      await renderProductos(seccion);
      configurarBotonVolver();
    });
  });
});
