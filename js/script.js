// Mobile menu toggle - VERSÃO CORRIGIDA
const navToggle = document.getElementById("navToggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  // Toggle menu ao clicar no hamburger
  navToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isActive = navMenu.classList.contains("active");

    if (isActive) {
      // Fechar menu
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    } else {
      // Abrir menu
      navMenu.classList.add("active");
      navToggle.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("active") &&
      !navToggle.contains(e.target) &&
      !navMenu.contains(e.target)
    ) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Fechar menu ao redimensionar para desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu && navToggle) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Active link highlighting
function setActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    if (navMenu && navToggle) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }
});



// WhatsApp integration
function openWhatsApp() {
  window.open("https://wa.me/5585999701822", "_blank");
}

// Add click event to WhatsApp contact (only if exists)
const whatsappContact = document.querySelector(
  ".contact-item .fab.fa-whatsapp"
);
if (whatsappContact && whatsappContact.parentElement) {
  whatsappContact.parentElement.addEventListener("click", openWhatsApp);
}
