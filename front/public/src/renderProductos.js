// // VERSION ADAPTADA PARA LA VISTA ADMIN - CORREGIDA POR CHATGPT
// const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

// const contenedor = document.getElementById("productos");

// function renderProd(data) {
//   if (!Array.isArray(data)) return;
//   contenedor.innerHTML = "";

//   const esAdmin = localStorage.getItem("adminAutenticado") === "true";

//   data.forEach(producto => {
//     // Construir URL de imagen
//   const urlImagen = producto.poster
//   ? producto.poster
//   : './img/default.jpg';

//     // Botones solo para admin
//     const botonesAdmin = esAdmin ? `
//       <div class="d-flex justify-content-between mt-2">
//         <a href="formulario.html?id=${producto._id}" class="btn btn-warning btn-sm">Editar</a>
//         <button class="btn btn-danger btn-sm btn-eliminar" data-id="${producto._id}">Eliminar</button>
//       </div>
//     ` : "";

//     // Card de producto
//     const card = `
//       <div class="col-xl-4 col-md-6 col-sm-10 mb-4">
//         <div class="card h-100">
//           <h5 class="card-title text-center">${producto.nombre}</h5>
//           <img src="${urlImagen}" alt="${producto.nombre}" class="card-img-top poster-img">
//           <div class="card-body">
//             <p class="card-text">
//               <strong>Descripción:</strong> ${producto.descripcion}<br>
//               <strong>Precio:</strong> $${producto.precio}<br>
//               <strong>Disponible:</strong> ${producto.disponible.join(", ")}
//             </p>
//             ${botonesAdmin}
//           </div>
//         </div>
//       </div>
//     `;

//     contenedor.innerHTML += card;
//   });

//   // botón arriba que lo lleve de vuelta al formulario
//   if (esAdmin) {
//   const volverFormBtn = document.createElement("a");
//   volverFormBtn.href = "formulario.html";
//   volverFormBtn.textContent = "Cargar otro producto";
//   volverFormBtn.className = "btn btn-info mb-4";
//   contenedor.before(volverFormBtn);
// }

//   // Delegamos eventos de eliminar si es admin
//   if (esAdmin) {
//     document.querySelectorAll(".btn-eliminar").forEach(btn => {
//       btn.addEventListener("click", async () => {
//         const id = btn.dataset.id;
//         const confirmar = confirm("¿Estás seguro que deseas eliminar este producto?");
//         if (!confirmar) return;

//         try {
//           const res = await fetch(`${apiBase}/productos/${id}`, {
//             method: "DELETE",
//           });
//           const data = await res.json();
//           if (res.ok) {
//             alert("Producto eliminado correctamente");
//             location.reload();
//           } else {
//             alert("Error al eliminar: " + data.mensaje);
//           }
//         } catch (err) {
//           console.error("Error al eliminar:", err);
//           alert("Error de conexión al eliminar");
//         }
//       });
//     });
//   }
// }

// export default renderProd;



//ahora renderiza por seccion y solo ante el click del user o admin
// renderProductos.js
export async function renderProductos(seccion) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = ""; // limpiamos el contenedor

  try {
    const res = await fetch(`${window.env.API_URL}/productos?seccion=${seccion}`);
    if (!res.ok) throw new Error("Error al cargar productos");

    const productos = await res.json();

    if (productos.length === 0) {
      contenedor.innerHTML = "<p>No hay productos en esta sección.</p>";
      return;
    }

    productos.forEach((producto) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${producto.poster}" class="card-img-top" alt="${producto.titulo}">
        <div class="card-body">
          <h5 class="card-title">${producto.titulo}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p><strong>Precio:</strong> $${producto.precio}</p>
        </div>
      `;
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al renderizar productos:", error);
    contenedor.innerHTML = "<p>Error al cargar los productos.</p>";
  }
}
