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
