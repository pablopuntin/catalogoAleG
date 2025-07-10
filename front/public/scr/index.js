
//Array con productos ficticios de prueba

import renderProd from './renderProductos.js'; // si usás ESModules

const productos = [
  {
    nombre: "pantalon y top",
    poster: "pantalon.jpeg",
    descripcion: "Remera de algodón lisa",
    precio: "$2500",
    disponible: ["S", "M", "L"]
  },
  {
    nombre: "bolso 01",
    poster: "bolso01.jpeg",
    descripcion: "Pantalón clásico azul",
    precio: "$6500",
    disponible: ["no"]
  },
  {
    nombre: "bolso 02",
    poster: "bolso02.jpeg",
    descripcion: "Pantalón clásico azul",
    precio: "$6500",
    disponible: ["si"]
  }
];

renderProd(productos);
