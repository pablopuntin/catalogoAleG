// front/public/src/logout.js
import { logoutAdmin } from "./auth.js";

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    logoutAdmin();
   window.location.href = "index.html";
  });
}
