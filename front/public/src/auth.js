// src/auth.js
const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

export async function loginAdmin(user, password) {
  try {
    const res = await fetch(`${apiBase}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });

    if (!res.ok) {
      const textoPlano = await res.text(); // evitás parsear como JSON si no lo es
      console.error("Respuesta no OK en login:", textoPlano);
      return false;
    }

    const data = await res.json();
    console.log("Respuesta del backend en login:", data);

    if (data.acceso) {
      localStorage.setItem("adminAutenticado", "true");
      return true;
    } else {
      return false;
    }

  } catch (err) {
    console.error("Error en loginAdmin:", err);
    return false;
  }
}



export function isAdminLogged() {
  return localStorage.getItem("adminAutenticado") === "true";
}

export function logoutAdmin() {
  localStorage.removeItem("adminAutenticado");
}
