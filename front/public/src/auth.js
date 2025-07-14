// src/auth.js

export function loginAdmin(user, password) {
  return fetch("/login", {
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
