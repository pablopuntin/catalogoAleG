// scr/admin.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-producto");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const producto = {
      nombre: formData.get("nombre"),
      descripcion: formData.get("descripcion"),
      precio: parseFloat(formData.get("precio")),
      imagen: formData.get("imagen"),
      seccion: formData.get("seccion"),
      disponible: formData.get("disponible") === "on",
    };

    // Enviar al backend
    try {
      const res = await fetch("http://localhost:3000/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Producto guardado exitosamente");
        form.reset();
      } else {
        alert("Error al guardar: " + data.mensaje);
      }
    } catch (error) {
      console.error("Error en el fetch:", error);
      alert("Error de conexión");
    }
  });
});
