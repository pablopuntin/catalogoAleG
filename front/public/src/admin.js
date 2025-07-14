// src/admin.js
import { isAdminLogged, logoutAdmin } from "./auth.js";


document.addEventListener("DOMContentLoaded", () => {
  if (!isAdminLogged()) {
    alert("No autorizado. Redirigiendo a la página principal.");
    window.location.href = "index.html";
    return;
  }

  
  // ✅ Agrega logout funcional
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      logoutAdmin();
      window.location.href = "index.html";
    });
  }


  // --- Aquí va tu código del formulario ---
  const form = document.getElementById("form-producto");
  const tituloForm = document.getElementById("form-title");

  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get("id");

  if (idProducto) {
    fetch(`/producto/${idProducto}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById("nombre").value = data.nombre;
        document.getElementById("descripcion").value = data.descripcion;
        document.getElementById("precio").value = data.precio;
        document.getElementById("seccion").value = data.seccion;
        document.getElementById("stock").value = data.stock;
        document.getElementById("disponible").value = data.disponible.join(", ");
        tituloForm.textContent = "Editar Producto";
      })
      .catch(error => {
        console.error("Error al obtener el producto:", error);
        alert("Error al cargar el producto");
      });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const url = idProducto
      ? `/producto/${idProducto}`
      : "/producto";

    const metodo = idProducto ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: metodo,
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Producto ${idProducto ? "actualizado" : "creado"} correctamente`);
        if (!idProducto) form.reset();
      } else {
        alert("Error al guardar: " + (data.mensaje || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error en el fetch:", error);
      alert("Error de conexión");
    }
  })
});
