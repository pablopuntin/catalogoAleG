

//VERSION ADAPTADA PARA LA VISTA ADMIN, AYUDA CHATGPT
const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";


const contenedor = document.getElementById("productos");

function renderProd(data) {
  if (!Array.isArray(data)) return;
  contenedor.innerHTML = "";

  const esAdmin = localStorage.getItem("adminAutenticado") === "true";

  data.forEach(producto => {
    const botonesAdmin = esAdmin ? `
      <div class="d-flex justify-content-between mt-2">
        <a href="formulario.html?id=${producto._id}" class="btn btn-warning btn-sm">Editar</a>
        <button class="btn btn-danger btn-sm btn-eliminar" data-id="${producto._id}">Eliminar</button>
      </div>
    ` : "";

    const card = `
      <div class="col-xl-4 col-md-6 col-sm-10 mb-4">
        <div class="card h-100">
          <h5 class="card-title text-center">${producto.nombre}</h5>
          <img src="./asset/img/${producto.poster}" alt="${producto.nombre}" class="card-img-top poster-img">
          <div class="card-body">
            <p class="card-text">
              <strong>Descripción:</strong> ${producto.descripcion}<br>
              <strong>Precio:</strong> $${producto.precio}<br>
              <strong>Disponible:</strong> ${producto.disponible.join(", ")}
            </p>
            ${botonesAdmin}
          </div>
        </div>
      </div>
    `;

    contenedor.innerHTML += card;
  });

  // Delegamos los eventos de eliminar si es admin
  if (esAdmin) {
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const confirmar = confirm("¿Estás seguro que deseas eliminar este producto?");
        if (!confirmar) return;

        try {
          const res = await fetch(`${apiBase}/productos/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (res.ok) {
            alert("Producto eliminado correctamente");
            // volver a cargar los productos (tu lógica)
            location.reload();
          } else {
            alert("Error al eliminar: " + data.mensaje);
          }
        } catch (err) {
          console.error("Error al eliminar:", err);
          alert("Error de conexión al eliminar");
        }
      });
    });
  }
}

export default renderProd;
