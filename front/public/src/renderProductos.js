async function renderProductos(seccion) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

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
      card.className = "card m-2";
      card.style.width = "18rem";
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

export default renderProductos;
