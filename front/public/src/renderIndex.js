// scripts/renderIndex.js
import { renderNavbar } from "./navbar.js";
import { loginAdmin, isAdminLogged, logoutAdmin } from "./auth.js";


console.log("RenderNavbar:", renderNavbar);  // Aquí ya deberías verlo como función

console.log("typeof renderNavbar", typeof renderNavbar);

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
 

  // Activar botón Admin después de renderizar el navbar
  const btnAdmin = document.getElementById("btn-admin");
  if (btnAdmin) {
    // Mostrar estado actual
    if (isAdminLogged()) {
      btnAdmin.textContent = "Logout";
      btnAdmin.classList.remove("btn-outline-dark");
      btnAdmin.classList.add("btn-danger");
    }

    btnAdmin.addEventListener("click", async () => {
      if (isAdminLogged()) {
        logoutAdmin();
        location.reload();
        return;
      }

      
    });
  }

  // Navegación desde las tarjetas estáticas del index.html
  const botones = document.querySelectorAll(".btn-ver-catalogo");
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const seccion = btn.dataset.seccion;
      window.location.href = `./productos.html?seccion=${encodeURIComponent(seccion)}`;
    });
  });

  // Si querés subsecciones dinámicas aparte, se puede agregar en otro contenedor.
});
