import { isAdminLogged, logoutAdmin } from "./auth.js";

const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Verificación de admin
  if (!isAdminLogged()) {
    alert("No autorizado. Redirigiendo a la página principal.");
    window.location.href = "index.html";
    return;
  }

  // ✅ Botón logout
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      logoutAdmin();
      window.location.href = "index.html";
    });
  }

  const form = document.getElementById("form-producto");
  const tituloForm = document.getElementById("form-title");

  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get("id");

  // ✅ Si hay ID en URL, editar producto
  if (idProducto) {
    fetch(`${apiBase}/productos/${idProducto}`)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("nombre").value = data.nombre;
        document.getElementById("descripcion").value = data.descripcion;
        document.getElementById("precio").value = data.precio;
        document.getElementById("seccion").value = data.seccion;
        document.getElementById("stock").value = data.stock;
        document.getElementById("disponible").value = data.disponible.join(", ");
        document.getElementById("subcategoria").value = data.subcategoria;
        tituloForm.textContent = "Editar Producto";
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
        alert("Error al cargar el producto");
      });
  }

  // ✅ Submit para crear o actualizar producto
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // Armamos objeto para datos no archivo
    const data = {
      nombre: formData.get("nombre"),
      descripcion: formData.get("descripcion"),
      precio: parseFloat(formData.get("precio")),
      stock: parseInt(formData.get("stock")),
      disponible: formData.get("disponible")?.split(",").map((t) => t.trim()),
      subcategoria: formData.get("subcategoria"),
      seccion: formData.get("seccion")
    };

    
    // Agregamos objeto JSON como string (opcional según backend)
    formData.append("data", JSON.stringify(data));

    const url = idProducto
      ? `${apiBase}/productos/${idProducto}`
      : `${apiBase}/productos`;

    const metodo = idProducto ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: metodo,
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.mensaje || "Error desconocido");
      }

      alert(`Producto ${idProducto ? "actualizado" : "creado"} correctamente`);
      if (!idProducto) form.reset();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Error al guardar: " + error.message);
    }
  });
});
