// index.js
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

  // Mapeo subcategoría => categoría principal
  const categoriaPorSubcategoria = {
    calzas: "calzas",
    biker: "calzas",
    capri: "calzas",
    short: "calzas",

    remeras: "remeras",
    musculosas: "remeras",
    top: "remeras",

    buzos: "buzos",
    marroquineria: "marroquineria",
    conjuntos: "conjuntos",
  };

  // --- Funciones auxiliares ---

  // Actualiza el botón admin según login/logout
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

  // Maneja el click del botón "Volver"
  function configurarBotonVolver() {
    if (!botonVolver) return;

    botonVolver.style.display = "block";
    const volverBtn = botonVolver.querySelector("button");
    if (!volverBtn) return;

    volverBtn.onclick = () => {
      filaCategorias.style.display = "flex";
      contenedorProductos.innerHTML = "";
      contenedorProductos.style.display = "none";
      contenedorSubcategorias.classList.add("d-none");
      contenedorSubcategorias.innerHTML = "";
      botonVolver.style.display = "none";

      if (hero) hero.style.display = "block";
      if (estaticas) estaticas.style.display = "block";
    };
  }

  // Limpia la vista de productos y subcategorías
  function limpiarVista() {
    contenedorProductos.innerHTML = "";
    contenedorProductos.style.display = "none";
    contenedorSubcategorias.innerHTML = "";
    contenedorSubcategorias.classList.add("d-none");
  }

  // Muestra las subcategorías para una sección dada
  function mostrarSubcategorias(seccion) {
    contenedorSubcategorias.innerHTML = "";
    contenedorSubcategorias.classList.remove("d-none");

    subcategoriasPorSeccion[seccion].forEach((subcat) => {
      const boton = document.createElement("button");
      boton.className = "btn btn-outline-primary m-2 text-capitalize";
      boton.textContent = subcat;
      boton.addEventListener("click", async () => {
        limpiarVista();
        contenedorProductos.style.display = "flex";
        contenedorProductos.classList.add("justify-content-center");
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

  // Manejador de click en categorías
  botonesCategorias.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const seccion = btn.dataset.seccion;

      filaCategorias.style.display = "none";
      limpiarVista();

      if (subcategoriasPorSeccion[seccion]) {
        mostrarSubcategorias(seccion);
      } else {
        contenedorProductos.style.display = "flex";
        contenedorProductos.classList.add("justify-content-center");
        await renderProductos(seccion);
        configurarBotonVolver();
      }
    });
  });

  // Manejador de navegación navbar
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
      contenedorProductos.style.display = "flex";
      contenedorProductos.classList.add("justify-content-center");
      await renderProductos(seccion);
      configurarBotonVolver();
    });
  });
});
