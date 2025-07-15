// src/auth.js
const apiUrl = (window.env && window.env.API_URL) || "http://localhost:3000/productos/";


export function loginAdmin(user, password) {
  return fetch(`${apiUrl.replace("/productos/", "")}/login`, 
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, password }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.acceso) {
        localStorage.setItem("adminAutenticado", "true");
        return true;
      } else {
        return false;
      }
    });
}

export function isAdminLogged() {
  return localStorage.getItem("adminAutenticado") === "true";
}

export function logoutAdmin() {
  localStorage.removeItem("adminAutenticado");
}
