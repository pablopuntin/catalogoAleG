// index.js
import renderProductos from "./renderProductos.js";
import { loginAdmin, isAdminLogged, logoutAdmin } from "./auth.js";

const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";
const btnAdmin = document.getElementById("btn-admin");

document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".btn-ver-catalogo");
  const contenedorProductos = document.getElementById("contenedor-productos");
  const filaCategorias = document.getElementById("fila-categorias");
  const contenedorSubcategorias = document.getElementById("contenedor-subcategorias");
  const botonVolver = document.getElementById("boton-volver");

  const subcategoriasPorSeccion = {
    calzas: ["Calzas", "Capri", "Biker", "Short"],
    remeras: ["Remeras", "Musculosas", "Top"]
  };

  // 🔒 Login admin
  if (isAdminLogged()) {
    btnAdmin.textContent = "Logout";
    btnAdmin.classList.remove("btn-outline-dark");
    btnAdmin.classList.add("btn-danger");
  } else {
    btnAdmin.textContent = "Admin";
    btnAdmin.classList.remove("btn-danger");
    btnAdmin.classList.add("btn-outline-dark");
  }

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

  // 📁 Manejador de categorías
  botones.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const seccion = btn.dataset.seccion;

      filaCategorias.style.display = "none";
      contenedorProductos.innerHTML = "";
      contenedorProductos.style.display = "none";
      contenedorSubcategorias.innerHTML = "";

      if (subcategoriasPorSeccion[seccion]) {
        // Mostrar subcategorías
        contenedorSubcategorias.classList.remove("d-none");
        subcategoriasPorSeccion[seccion].forEach((subcat) => {
          const boton = document.createElement("button");
          boton.className = "btn btn-outline-primary m-2";
          boton.textContent = subcat;
          boton.addEventListener("click", async () => {
            contenedorProductos.innerHTML = "";
            contenedorProductos.style.display = "flex";
            contenedorProductos.classList.add("justify-content-center");
            await renderProductos(seccion, subcat.toLowerCase());
          });
          contenedorSubcategorias.appendChild(boton);
        });
      } else {
        // Mostrar productos directo si no hay subcategorías
        contenedorSubcategorias.classList.add("d-none");
        await renderProductos(seccion);
        contenedorProductos.style.display = "flex";
        contenedorProductos.classList.add("justify-content-center");
      }

      // Mostrar botón volver
      if (botonVolver) {
        botonVolver.style.display = "block";
        const volverBtn = botonVolver.querySelector("button");
        if (volverBtn) {
          volverBtn.onclick = () => {
            filaCategorias.style.display = "flex";
            contenedorProductos.innerHTML = "";
            contenedorProductos.style.display = "none";
            contenedorSubcategorias.classList.add("d-none");
            contenedorSubcategorias.innerHTML = "";
            botonVolver.style.display = "none";
          };
        }
      }
    });
  });

  // 🔗 Navbar
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const seccion = link.dataset.seccion;

      const hero = document.querySelector(".hero-section");
      const estaticas = document.getElementById("secciones-estaticas");

      if (seccion === "inicio") {
        if (hero) hero.style.display = "block";
        if (estaticas) estaticas.style.display = "block";

        contenedorProductos.innerHTML = "";
        contenedorProductos.style.display = "none";
        contenedorSubcategorias.classList.add("d-none");
        contenedorSubcategorias.innerHTML = "";
        filaCategorias.style.display = "flex";
        if (botonVolver) botonVolver.style.display = "none";
        return;
      }

      if (hero) hero.style.display = "none";
      if (estaticas) estaticas.style.display = "none";

      contenedorProductos.innerHTML = "";
      contenedorSubcategorias.innerHTML = "";
      contenedorSubcategorias.classList.add("d-none");

      await renderProductos(seccion);

      contenedorProductos.style.display = "flex";
      contenedorProductos.classList.add("justify-content-center");

      if (botonVolver) {
        botonVolver.style.display = "block";
        const volverBtn = botonVolver.querySelector("button");
        if (volverBtn) {
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
      }
    });
  });
});
