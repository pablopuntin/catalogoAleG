import renderProd from "./renderProductos.js";
import { loginAdmin } from "./auth.js";
import { isAdminLogged, logoutAdmin } from "./auth.js";


const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

const btnAdmin = document.getElementById("btn-admin");

document.addEventListener("DOMContentLoaded", () => {
  fetch(`${apiBase}/productos`)
    .then(res => {
      if (!res.ok) throw new Error("Respuesta no OK del servidor");
      return res.json();
    })
    .then(data => renderProd(data))
    .catch(err => console.error("Error al obtener productos:", err));
});

btnAdmin.addEventListener("click", async () => {
  const user = prompt("Ingrese usuario administrador:");
  if (!user) return;

  const password = prompt("Ingrese contraseña:");
  if (!password) return;

  const exito = await loginAdmin(user, password);
  if (exito) {
    console.log("Login exitoso, redirigiendo...");
    window.location.href = "formulario.html";
  } else {
    console.log("Login fallido.");
    alert("Usuario o contraseña incorrectos");
  }
});


document.addEventListener("DOMContentLoaded", () => {
  if (isAdminLogged()) {
    const btn = document.getElementById("btn-admin");
    btn.textContent = "Logout";
    btn.classList.remove("btn-outline-dark");
    btn.classList.add("btn-danger");
    btn.addEventListener("click", () => {
      logoutAdmin();
      location.reload(); // recarga la vista para volver al estado "no admin"
    });
  }
});

document.querySelectorAll(".btn-ver-catalogo").forEach((btn) => {
  btn.addEventListener("click", () => {
    const seccion = btn.dataset.seccion;
    renderProductos(seccion);
  });
  // Ocultar cards iniciales
  document.querySelector(".hero-section").style.display = "none";
  
  // Mostrar productos filtrados
  fetch(`${apiBase}/productos`)
  .then(res => res.json())
  .then(data => {
    const filtrados = data.filter(p => p.seccion.toLowerCase() === seccion.toLowerCase());
    renderProd(filtrados);
        });

    // Botón volver
    const volverBtn = document.createElement("button");
    volverBtn.textContent = "← Volver al inicio";
    volverBtn.classList.add("btn", "btn-secondary", "mt-3");
    volverBtn.addEventListener("click", () => {
      window.location.reload(); // simple: refresca para mostrar cards otra vez
    });

    document.getElementById("productos").before(volverBtn);
  });

