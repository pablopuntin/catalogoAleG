//VERSION MEJORADA

// front/public/src/auth.js

const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

// 🔐 Login: devuelve true si éxito, y guarda token + username
export async function loginAdmin(username, password) {
  try {
    const res = await fetch(`${apiBase}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const textoPlano = await res.text();
      console.error("Respuesta no OK en login:", textoPlano);
      return false;
    }

    const data = await res.json();
    console.log("Respuesta del backend en login:", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("adminUser", data.username);
      return true;
    } else {
      return false;
    }

  } catch (err) {
    console.error("Error en loginAdmin:", err);
    return false;
  }
}

// ✅ Verificación de sesión admin
export function isAdminLogged() {
  return !!localStorage.getItem("token");
}

// 🔓 Logout
export function logoutAdmin() {
  localStorage.removeItem("token");
  localStorage.removeItem("adminUser");
}
