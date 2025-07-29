function renderSubcategorias(seccion) {
const imagenes = {
  calza: "img/subcalza.jpeg",
  short: "img/subshort.jpg",
  biker: "img/subbiker.jpg",
  capri: "img/subcapri.jpg"
};

  
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  const subcategorias = seccionesConSubcategorias[seccion];

  subcategorias.forEach(sub => {
    const col = document.createElement("div");
   col.className = "col-xs-11  col-lg-4 col-xl-3";

    const card = document.createElement("div");
    card.className = "card shadow-sm h-100";
    card.innerHTML = `
    
    <img src="${imagenes[sub] || 'default.jpg'}" class="card-img-top" alt="${sub}" style="height: 200px; object-fit: cover;">
    <div class="card-body text-center">
        <h5 class="card-title text-capitalize">${sub}</h5>
        <button class="btn btn-primary">Ver productos</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", () => {
      window.location.href = `./productos.html?seccion=${encodeURIComponent(seccion)}&subcategoria=${encodeURIComponent(sub)}`;
    });

    col.appendChild(card);
    contenedor.appendChild(col);
  });
}
