/* ========================================
   GALLERY ANIMATIONS
   Animações específicas para a página da galeria
   ======================================== */

// Garantir que as animações fade-in funcionem na galeria
document.addEventListener("DOMContentLoaded", function () {
  // Observer para animações fade-in
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

  // Aplicar observer a todos os elementos fade-in da galeria
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
});