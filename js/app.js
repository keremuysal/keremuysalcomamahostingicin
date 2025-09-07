
document.addEventListener("DOMContentLoaded", function() {

  // Header fixed on scroll
  window.onscroll = function () {
    const header = document.querySelector("header");
    if (!header) return;
    const docScrollTop = document.documentElement.scrollTop;

    if (window.innerWidth > 991) {
      if (docScrollTop > 100) {
        header.classList.add("fixed");
      } else {
        header.classList.remove("fixed");
      }
    }
  };

  // Navbar link highlighting and mobile menu closing
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    const navLinks = navbar.querySelectorAll("a");
    navLinks.forEach(function (element) {
      element.addEventListener("click", function () {
        if(document.querySelector(".navbar.show")) {
           document.querySelector(".navbar").classList.remove("show");
        }
      });
    });
  }


  // Hamburger menu toggle
  const hamBurger = document.querySelector(".hamburger");
  if (hamBurger) {
    hamBurger.addEventListener("click", function () {
      const navbar = document.querySelector(".navbar");
      if(navbar) navbar.classList.toggle("show");
    });
  }

  // Footer Year 
  const yearEl = document.getElementById("year");
  if(yearEl) {
      yearEl.innerHTML = new Date().getFullYear();
  }

  // Theme switcher
  const themeToggle = document.getElementById("theme-toggle");
  const htmlEl = document.documentElement;

  if (themeToggle) {
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const themeCheck = () => {
      if (userTheme === "dark" || (!userTheme && systemTheme)) {
        htmlEl.setAttribute("data-theme", "dark");
      } else {
        htmlEl.setAttribute("data-theme", "light");
      }
    };

    const themeSwitch = () => {
      if (htmlEl.getAttribute("data-theme") === "dark") {
        htmlEl.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      } else {
        htmlEl.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    };

    themeToggle.addEventListener("click", themeSwitch);
    
    // Check theme on initial load
    themeCheck();
  }
});