/**
 * Kerem Uysal | Personal Website (v3.0)
 * Main JavaScript Controller
 */
document.addEventListener("DOMContentLoaded", function () {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Sticky Header Controller
  const header = document.querySelector("header");
  const handleScroll = () => {
    if (!header) return;
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    if (scrollPos > 60) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // 3. Accessible Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");

  if (hamburger && navbar) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = navbar.classList.toggle("show");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close when clicking nav link
    const navLinks = navbar.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbar.classList.contains("show")) {
          navbar.classList.remove("show");
          hamburger.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {
      if (navbar.classList.contains("show") && !navbar.contains(e.target) && !hamburger.contains(e.target)) {
        navbar.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 4. ScrollSpy for Homepage Sections
  if (document.body.classList.contains("is-home")) {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".navbar ul li a[href*='#']");

    if (sections.length > 0 && navLinks.length > 0) {
      const updateScrollSpy = () => {
        const scrollPosition = window.scrollY + 150;
        let currentSectionId = "";

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute("id");
          }
        });

        if (currentSectionId) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href.endsWith("#" + currentSectionId)) {
              link.classList.add("active");
            }
          });
        }
      };

      window.addEventListener("scroll", updateScrollSpy, { passive: true });
      updateScrollSpy();
    }
  }

  // 5. Theme Switcher Controller
  const themeToggle = document.getElementById("theme-toggle");
  const htmlEl = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = htmlEl.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      themeToggle.setAttribute("aria-label", newTheme === "dark" ? "Açık temaya geç" : "Karanlık temaya geç");
    });

    // React to system color scheme changes if user hasn't explicitly set a preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        htmlEl.setAttribute("data-theme", e.matches ? "dark" : "light");
      }
    });
  }

  // 6. Seamless Modal / Popup Controller (Fixes href="#" jumping bug)
  const modalOpenButtons = document.querySelectorAll(".muzik-card a.button");
  const overlays = document.querySelectorAll(".overlay");

  modalOpenButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId.startsWith("#popup")) {
        e.preventDefault();
        const targetModal = document.querySelector(targetId);
        if (targetModal) {
          targetModal.classList.add("is-active");
          document.body.style.overflow = "hidden";
        }
      }
    });
  });

  overlays.forEach((overlay) => {
    // Close button
    const closeBtn = overlay.querySelector(".close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        overlay.classList.remove("is-active");
        document.body.style.overflow = "";
      });
    }

    // Click outside popup content
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        overlay.classList.remove("is-active");
        document.body.style.overflow = "";
      }
    });
  });

  // Close modals on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".overlay.is-active");
      if (activeModal) {
        activeModal.classList.remove("is-active");
        document.body.style.overflow = "";
      }
    }
  });
});