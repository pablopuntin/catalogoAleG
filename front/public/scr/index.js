// Theme Toggle Functionality
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle")
    this.themeIcon = document.getElementById("themeIcon")
    this.currentTheme = localStorage.getItem("theme") || "light"

    this.init()
  }

  init() {
    // Set initial theme
    this.setTheme(this.currentTheme)

    // Add event listener
    this.themeToggle.addEventListener("click", () => {
      this.toggleTheme()
    })

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        this.setTheme(e.matches ? "dark" : "light")
      }
    })
  }

  setTheme(theme) {
    this.currentTheme = theme
    document.documentElement.setAttribute("data-theme", theme)

    // Update icon
    if (theme === "dark") {
      this.themeIcon.className = "bi bi-moon-fill"
    } else {
      this.themeIcon.className = "bi bi-sun-fill"
    }

    // Save to localStorage
    localStorage.setItem("theme", theme)
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }
}

// Smooth scrolling for navigation links
class SmoothScroll {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager()
  new SmoothScroll()

  // Add loading animation
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.3s ease"
    document.body.style.opacity = "1"
  }, 100)
})

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".custom-navbar")
  if (window.scrollY > 50) {
    navbar.style.backdropFilter = "blur(10px)"
    navbar.style.backgroundColor = "var(--navbar-bg)"
  } else {
    navbar.style.backdropFilter = "none"
  }
})




//Array con productos ficticios de prueba
// Si lo vas a dejar en index.js por ahora:
export const productos = [
  {
    id: 1,
    nombre: "Calza deportiva negra",
    descripcion: "Confeccionada en tela flexible y cómoda",
    precio: 8500,
    imagen: "https://acdn-us.mitiendanube.com/stores/004/278/967/products/227-cbe8a3d5b77c6f913417480307418100-1024-1024.png",
    seccion: "calzas",
    disponible: true,
  },
  {
    id: 2,
    nombre: "Buzo oversize beige",
    descripcion: "Ideal para otoño, de algodón suave",
    precio: 12500,
    imagen: "https://i.pinimg.com/236x/62/f2/3f/62f23fef8a128c1bca408b08277b5195.jpg",
    seccion: "buzos",
    disponible: true,
  },
  {
    id: 3,
    nombre: "Cartera cuero sintético",
    descripcion: "Amplia, con cierre y manijas reforzadas",
    precio: 9800,
    imagen: "https://mussleathers.com/wp-content/uploads/2021/06/foto1-1536x1024.jpg",
    seccion: "marroquineria",
    disponible: false,
  },
];




module.exports = "./index.js";