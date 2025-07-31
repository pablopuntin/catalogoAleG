import { isAdminLogged, logoutAdmin } from "./auth.js";

const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  if (!isAdminLogged()) {
    alert("No autorizado. Redirigiendo a la página principal.");
    window.location.href = "index.html";
    return;
  }

  const btnLogout = document.getElementById("btn-logout");
  btnLogout?.addEventListener("click", () => {
    logoutAdmin();
    window.location.href = "index.html";
  });

  const form = document.getElementById("form-producto");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // Determinar sección a partir de subcategoría
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

    const subcategoria = formData.get("subcategoria")?.toLowerCase();
    const seccion = categoriaPorSubcategoria[subcategoria];

    if (!seccion) {
      alert("No se pudo determinar la sección a partir de la subcategoría.");
      return;
    }

    formData.set("seccion", seccion);

    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`${apiBase}/productos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Error desconocido");
      }

      alert("Producto creado correctamente");
      form.reset();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Error al guardar: " + error.message);
    }
  });
});
