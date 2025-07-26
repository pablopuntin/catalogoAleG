async function renderProductos(seccion, subcategoria = "") {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  try {
    let url = `${window.env.API_URL}/productos?seccion=${seccion}`;
    if (subcategoria) url += `&subcategoria=${subcategoria}`;

    const res = await fetch(url);
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
        <img src="${producto.poster}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
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
