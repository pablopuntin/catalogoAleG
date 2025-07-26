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
  contenedor.classList.remove("d-none");
  contenedor.style.display = "flex";
  return;
}

document.getElementById("home")?.classList.add("d-none");
document.getElementById("contenedor-subcategorias")?.classList.add("d-none");
document.getElementById("boton-volver")?.classList.remove("d-none");

contenedor.classList.remove("d-none");
contenedor.style.display = "flex";
contenedor.classList.add("justify-content-center");
  }

export default renderProductos;
