// // 

// const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

// export async function loginAdmin(user, password) {
//   try {
//     const response = await fetch(`${apiBase}/admin/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user, password })
//     });

//     if (!response.ok) return false;

//     const { token } = await response.json();
//     if (!token) return false;

//     localStorage.setItem("adminToken", token);
//     return true;
//   } catch (err) {
//     console.error("Error en loginAdmin:", err);
//     return false;
//   }
// }

// export function isAdminLogged() {
//   return !!localStorage.getItem("adminToken");
// }

// export function logoutAdmin() {
//   localStorage.removeItem("adminToken");
// }


const apiBase = (window.env && window.env.API_URL) || "http://localhost:3000";

export async function loginAdmin(user, password) {
  try {
    const res = await fetch(`${apiBase}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("adminToken", data.token);
      return true;
    }

    return false;
  } catch (err) {
    console.error("Error en loginAdmin:", err);
    return false;
  }
}

export function isAdminLogged() {
  return !!localStorage.getItem("adminToken");
}

export function logoutAdmin() {
  localStorage.removeItem("adminToken");
}
