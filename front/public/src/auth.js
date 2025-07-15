// src/auth.js
const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

export function loginAdmin(user, password) {
  return fetch(`${apiBase}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, password }),
  })
    .then(res => res.json())
    .then(data => {
      console.log("Respuesta del backend en login:", data);
      if (data.acceso) {
        localStorage.setItem("adminAutenticado", "true");
        return true;
      } else {
        return false;
      }
    })
    .catch(err => {
      console.error("Error en loginAdmin:", err);
      return false;
    });
}


export function isAdminLogged() {
  return localStorage.getItem("adminAutenticado") === "true";
}

export function logoutAdmin() {
  localStorage.removeItem("adminAutenticado");
}
