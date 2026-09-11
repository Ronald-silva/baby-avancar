// ========================================
// OTIMIZAÇÃO DE PERFORMANCE SIMPLIFICADA
// ========================================

class PerformanceOptimizer {
  constructor() {
    this.metrics = {
      loadTime: null,
      resourceCount: 0,
    };
    this.init();
  }

  init() {
    this.optimizeImages();
    this.setupLazyLoading();
    this.optimizeAnimations();
    this.monitorBasicMetrics();
  }

  // ===== OTIMIZAÇÃO DE IMAGENS =====
  optimizeImages() {
    const images = document.querySelectorAll("img");
    
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            if (img.dataset.src) {
              this.loadImageOptimized(img);
            }
            
            this.optimizeImageElement(img);
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: "50px",
        threshold: 0.1,
      });

      images.forEach((img) => {
        if (!img.src && img.dataset.src) {
          imageObserver.observe(img);
        } else {
          this.optimizeImageElement(img);
        }
      });
    }
  }

  loadImageOptimized(img) {
    const src = img.dataset.src;
    
    const preloadImg = new Image();
    preloadImg.onload = () => {
      img.src = src;
      img.classList.add("loaded");
      img.removeAttribute("data-src");
    };
    preloadImg.onerror = () => {
      img.src = src;
      img.classList.add("loaded");
    };
    preloadImg.src = src;
  }

  optimizeImageElement(img) {
    if ("loading" in HTMLImageElement.prototype) {
      img.loading = "lazy";
    }

    if ("decoding" in img) {
      img.decoding = "async";
    }
  }

  // ===== LAZY LOADING =====
  setupLazyLoading() {
    const sections = document.querySelectorAll("section[data-lazy]");
    
    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            this.loadSectionContent(section);
            sectionObserver.unobserve(section);
          }
        });
      }, {
        rootMargin: "100px",
        threshold: 0.1,
      });

      sections.forEach((section) => sectionObserver.observe(section));
    }
  }

  loadSectionContent(section) {
    section.classList.add("loading");
    
    setTimeout(() => {
      section.classList.remove("loading");
      section.classList.add("loaded");
      section.removeAttribute("data-lazy");
    }, 100);
  }

  // ===== OTIMIZAÇÃO DE ANIMAÇÕES =====
  optimizeAnimations() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      this.disableAnimations();
    }

    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        this.disableAnimations();
      }
    });
  }

  disableAnimations() {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ===== MONITORAMENTO BÁSICO =====
  monitorBasicMetrics() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        if ("performance" in window) {
          const perfData = performance.getEntriesByType("navigation")[0];
          if (perfData) {
            this.metrics.loadTime = Math.round(
              perfData.loadEventEnd - perfData.loadEventStart
            );
          }
          
          const resources = performance.getEntriesByType("resource");
          this.metrics.resourceCount = resources.length;
          
          console.log("📊 Performance Básica:", this.metrics);
        }
      }, 1000);
    });
  }

  // ===== MÉTODOS PÚBLICOS =====
  getMetrics() {
    return { ...this.metrics };
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  window.performanceOptimizer = new PerformanceOptimizer();
});

// Exportar para uso global
window.PerformanceOptimizer = PerformanceOptimizer;