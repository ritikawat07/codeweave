document.addEventListener("DOMContentLoaded", () => {
    // Initialize all components
    initThemeSwitcher()
    initMobileNavigation()
    createParticles()
    initPasswordToggles()
    initFormValidation()
  })
  
  /**
   * Theme Switcher Functionality
   * Handles theme selection and persistence
   */
  function initThemeSwitcher() {
    // Set default theme
    const defaultTheme = "dark"
    const savedTheme = localStorage.getItem("theme") || defaultTheme
    document.documentElement.setAttribute("data-theme", savedTheme)
  
    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle")
  
    // Check if theme toggle exists before proceeding
    if (!themeToggle) {
      console.error("Theme toggle element not found")
      return
    }
  
    const themeOptions = document.querySelectorAll(".theme-option")
  
    // Update active state based on saved theme
    themeOptions.forEach((option) => {
      if (option.getAttribute("data-theme") === savedTheme) {
        option.classList.add("active")
      } else {
        option.classList.remove("active")
      }
    })
  
    // Update icon based on saved theme
    updateThemeIcon(savedTheme)
  
    // Toggle theme menu
    themeToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      themeToggle.classList.toggle("active")
    })
  
    // Close theme menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!themeToggle.contains(event.target)) {
        themeToggle.classList.remove("active")
      }
    })
  
    // Theme selection
    themeOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const theme = this.getAttribute("data-theme")
        document.documentElement.setAttribute("data-theme", theme)
  
        // Update active state
        themeOptions.forEach((opt) => opt.classList.remove("active"))
        this.classList.add("active")
  
        // Update icon
        updateThemeIcon(theme)
  
        // Close menu
        themeToggle.classList.remove("active")
  
        // Save theme preference
        localStorage.setItem("theme", theme)
      })
    })
  }
  
  /**
   * Updates the theme icon based on the selected theme
   * @param {string} theme - The current theme name
   */
  function updateThemeIcon(theme) {
    const themeIcon = document.querySelector("#theme-toggle i")
  
    // Check if theme icon exists
    if (!themeIcon) {
      console.error("Theme icon element not found")
      return
    }
  
    themeIcon.className = ""
  
    switch (theme) {
      case "light":
        themeIcon.className = "fas fa-sun"
        break
      case "dark":
        themeIcon.className = "fas fa-moon"
        break
      case "ocean":
        themeIcon.className = "fas fa-water"
        break
      case "nature":
        themeIcon.className = "fas fa-leaf"
        break
      case "cosmic":
        themeIcon.className = "fas fa-star"
        break
      default:
        themeIcon.className = "fas fa-moon"
    }
  }
  
  /**
   * Mobile Navigation
   * Handles hamburger menu toggle for mobile devices
   */
  function initMobileNavigation() {
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (!hamburger || !navLinks) return
  
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }
  
  /**
   * Particle Background
   * Creates animated background particles
   */
  function createParticles() {
    const particles = document.getElementById("particles")
    if (!particles) return
  
    const particleCount = 15
  
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")
  
      // Random size
      const size = Math.random() * 200 + 50
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
  
      // Random position
      particle.style.top = `${Math.random() * 100}%`
      particle.style.left = `${Math.random() * 100}%`
  
      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 10}s`
  
      particles.appendChild(particle)
    }
  }
  
  /**
   * Password Toggle Functionality
   * Toggles password visibility
   */
  function initPasswordToggles() {
    const passwordToggles = document.querySelectorAll(".password-toggle")
  
    passwordToggles.forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const passwordInput = this.parentElement.querySelector("input")
        const icon = this.querySelector("i")
  
        if (passwordInput.type === "password") {
          passwordInput.type = "text"
          icon.classList.remove("fa-eye-slash")
          icon.classList.add("fa-eye")
        } else {
          passwordInput.type = "password"
          icon.classList.remove("fa-eye")
          icon.classList.add("fa-eye-slash")
        }
      })
    })
  }
  
  /**
   * Form Validation
   * Handles form submission and validation
   */
  function initFormValidation() {
    // Login Form
    const loginForm = document.getElementById("login-form")
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        const email = this.querySelector("#email").value
        const password = this.querySelector("#password").value
        const remember = this.querySelector("#remember").checked
  
        console.log("Login attempt:", { email, password, remember })
  
        // Simulate successful login
        setTimeout(() => {
          window.location.href = "index.html" // Redirect to dashboard in a real app
        }, 1000)
      })
    }
  
    // Register Form
    const registerForm = document.getElementById("register-form")
    if (registerForm) {
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        const name = this.querySelector("#name").value
        const email = this.querySelector("#email").value
        const password = this.querySelector("#password").value
        const terms = this.querySelector("#terms").checked
  
        // Validate password length
        if (password.length < 8) {
          alert("Password must be at least 8 characters long")
          return
        }
  
        console.log("Registration attempt:", { name, email, password, terms })
  
        // Simulate successful registration
        setTimeout(() => {
          window.location.href = "index.html" // Redirect to dashboard in a real app
        }, 1000)
      })
    }
  
    // Reset Password Form
    const resetForm = document.getElementById("reset-form")
    if (resetForm) {
      resetForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        const email = this.querySelector("#email").value
        console.log("Password reset requested for:", email)
  
        // Show success message
        document.getElementById("reset-email").textContent = email
        document.getElementById("reset-form-container").style.display = "none"
        document.getElementById("reset-success").style.display = "block"
      })
    }
  }
  