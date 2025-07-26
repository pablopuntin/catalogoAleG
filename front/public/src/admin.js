// // src/admin.js
 import { isAdminLogged, logoutAdmin } from "./auth.js";
 const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";
// const categoriaPorSubcategoria = {
//   calzas: "calzas",
//   biker: "calzas",
//   capri: "calzas",
//   short: "calzas",

//   remeras: "remeras",
//   musculosas: "remeras",
//   top: "remeras",

//   buzos: "buzos",
//   marroquineria: "marroquineria",
//   conjuntos: "conjuntos"
// };



// document.addEventListener("DOMContentLoaded", () => {
//   if (!isAdminLogged()) {
//     alert("No autorizado. Redirigiendo a la página principal.");
//     window.location.href = "index.html";
//     return;
//   }

  
//   // ✅ Agrega logout funcional
//   const btnLogout = document.getElementById("btn-logout");
//   if (btnLogout) {
//     btnLogout.addEventListener("click", () => {
//       logoutAdmin();
//       window.location.href = "index.html";
//     });
//   }


//   // --- Aquí va tu código del formulario ---
//   const form = document.getElementById("form-producto");
//   const tituloForm = document.getElementById("form-title");

//   const params = new URLSearchParams(window.location.search);
//   const idProducto = params.get("id");

//   if (idProducto) {
//   fetch(`${apiBase}/productos/${idProducto}`)  
//     .then(res => res.json())
//     .then(data => {
//       document.getElementById("nombre").value = data.nombre;
//       document.getElementById("descripcion").value = data.descripcion;
//       document.getElementById("precio").value = data.precio;
//       document.getElementById("seccion").value = data.seccion;
//       document.getElementById("stock").value = data.stock;
//       document.getElementById("disponible").value = data.disponible.join(", ");
//       tituloForm.textContent = "Editar Producto";
//     })
//     .catch(error => {
//       console.error("Error al obtener el producto:", error);
//       alert("Error al cargar el producto");
//     });
// }


//   form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const formData = new FormData(form);
//   const url = idProducto
//     ? `${apiBase}/productos/${idProducto}`
//     : `${apiBase}/productos`;

//   const metodo = idProducto ? "PUT" : "POST";
//     if (!formData.get("poster").name) {
//   formData.delete("poster"); // no enviar si no se cambió
// }
//   try {
//     const subcategoria = formData.get("categoria"); // o como se llame el campo del formulario
// const seccion = categoriaPorSubcategoria[subcategoria?.toLowerCase()];

// if (!seccion) {
//   alert("No se pudo determinar la sección. Verificá la subcategoría seleccionada.");
//   return;
// }

// formData.append("seccion", seccion);

//     const res = await fetch(url, {
//       method: metodo,
//       body: formData,
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert(`Producto ${idProducto ? "actualizado" : "creado"} correctamente`);
//       if (!idProducto) form.reset();
//     } else {
//       alert("Error al guardar: " + (data.mensaje || "Error desconocido"));
//     }

//   } catch (error) {
//     console.error("Error en el fetch:", error);
//     alert("Error de conexión");
//   }
// });
// });


// admin.js
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {
    titulo: formData.get("titulo"),
    descripcion: formData.get("descripcion"),
    precio: parseFloat(formData.get("precio")),
    disponible: formData.get("disponible")
      ?.split(",")
      .map((t) => t.trim()),
    subcategoria: formData.get("subcategoria"), // 👈 clave
    // Otros campos opcionales:
    // stock: formData.get("stock")
  };

  const imagen = formData.get("imagen");
  if (imagen && imagen.size > 0) {
    formData.append("poster", imagen);
  }

  // Agregamos el objeto como campo individual si usás JSON:
  formData.append("data", JSON.stringify(data));

  try {
    const response = await fetch(`${apiBase}/productos`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    alert("Producto creado correctamente");
    form.reset();
  } catch (error) {
    console.error("Error al crear producto:", error);
    alert("Error al crear producto: " + error.message);
  }
});
