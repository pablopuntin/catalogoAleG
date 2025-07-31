// // front/public/src/login.js
// import { loginAdmin } from "./auth.js";

// const loginForm = document.getElementById("loginForm");
// const loginError = document.getElementById("loginError");

// loginForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const username = document.getElementById("username").value.trim();
//   const password = document.getElementById("password").value.trim();

//   const ok = await loginAdmin(username, password);

//   if (ok) {
//     window.location.href = "formulario.html"; // redirige al panel
//   } else {
//     loginError.textContent = "Usuario o contraseña incorrectos";
//   }
// });
