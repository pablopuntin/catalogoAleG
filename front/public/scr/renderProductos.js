//funcion que renderiza los productos en el index.html

const contenedor = document.getElementById("productos");

function renderProd(data) {

  if(!Array.isArray(data)) return;
  contenedor.innerHTML = ""; // Limpia antes de renderizar (opcional)

  data.forEach(producto => {
    const card = `
      <div class="col-xl-4 col-md-6 col-sm-10 mb-4">
        <div class="card h-100">
        <h5 class="card-title text-center">${producto.nombre}</h5>
          <img src="./asset/img/${producto.poster}" alt="${producto.nombre}" class="card-img-top poster-img">
          <div class="card-body">
            <p class="card-text">
             <strong>Descripcion:</strong> ${producto.descripcion}<br>
             <strong>Precio:</strong> ${producto.precio}<br>
              <strong>Disponible:</strong> ${producto.disponible.join(", ")}<br>
              </p>
          </div>
        </div>
      </div>
    `;

    contenedor.innerHTML += card;
  });
}

export default renderProd;

