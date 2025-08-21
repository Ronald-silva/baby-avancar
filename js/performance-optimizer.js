// Sistema Avançado de Otimização de Performance
class PerformanceOptimizer {
  constructor() {
    this.metrics = {
      lcp: null,
      fid: null,
      cls: 0,
      loadTime: null,
      resourceCount: 0,
      cacheHits: 0,
    };
    this.observers = [];
    this.resourceCache = new Map();
    this.init();
  }

  init() {
    this.setupPerformanceMonitoring();
    this.optimizeImages();
    this.setupLazyLoading();
    this.optimizeResources();
    this.monitorWebVitals();
    this.optimizeAnimations();
  }

  // ===== MONITORAMENTO DE PERFORMANCE =====
  setupPerformanceMonitoring() {
    if (!("PerformanceObserver" in window)) {
      console.warn("PerformanceObserver não suportado");
      return;
    }

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = Math.round(lastEntry.startTime);

        if (this.metrics.lcp > 2500) {
          console.warn(`LCP alto detectado: ${this.metrics.lcp}ms`);
          this.optimizeLCP();
        }
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.push(lcpObserver);
    } catch (e) {
      console.warn("Erro ao configurar LCP observer:", e);
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = Math.round(
            entry.processingStart - entry.startTime
          );

          if (this.metrics.fid > 100) {
            console.warn(`FID alto detectado: ${this.metrics.fid}ms`);
            this.optimizeFID();
          }
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
      this.observers.push(fidObserver);
    } catch (e) {
      console.warn("Erro ao configurar FID observer:", e);
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cls = Math.round(clsValue * 1000) / 1000;

        if (this.metrics.cls > 0.1) {
          console.warn(`CLS alto detectado: ${this.metrics.cls}`);
          this.optimizeCLS();
        }
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
      this.observers.push(clsObserver);
    } catch (e) {
      console.warn("Erro ao configurar CLS observer:", e);
    }
  }

  // ===== OTIMIZAÇÃO DE IMAGENS =====
  optimizeImages() {
    const images = document.querySelectorAll("img");
    const imageObserver = new IntersectionObserver(
      (entries) => {
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
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    images.forEach((img) => {
      if (!img.src && img.dataset.src) {
        imageObserver.observe(img);
      } else {
        this.optimizeImageElement(img);
      }
    });
  }

  loadImageOptimized(img) {
    const originalSrc = img.dataset.src;
    const optimizedSrc = this.getOptimizedImageSrc(originalSrc);

    const preloadImg = new Image();
    preloadImg.onload = () => {
      img.src = optimizedSrc;
      img.classList.add("loaded");
      img.removeAttribute("data-src");
    };
    preloadImg.onerror = () => {
      img.src = originalSrc;
      img.classList.add("loaded");
    };
    preloadImg.src = optimizedSrc;
  }

  getOptimizedImageSrc(src) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const viewportWidth = window.innerWidth;

    let targetWidth;
    if (viewportWidth <= 480) {
      targetWidth = 480 * devicePixelRatio;
    } else if (viewportWidth <= 768) {
      targetWidth = 768 * devicePixelRatio;
    } else if (viewportWidth <= 1200) {
      targetWidth = 1200 * devicePixelRatio;
    } else {
      targetWidth = 1920 * devicePixelRatio;
    }

    return src;
  }

  optimizeImageElement(img) {
    if ("loading" in HTMLImageElement.prototype) {
      img.loading = "lazy";
    }

    if ("decoding" in img) {
      img.decoding = "async";
    }

    if (!img.width && !img.height) {
      img.style.aspectRatio = "auto";
    }
  }

  // ===== LAZY LOADING =====
  setupLazyLoading() {
    const sections = document.querySelectorAll("section[data-lazy]");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            this.loadSectionContent(section);
            sectionObserver.unobserve(section);
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
    this.setupScriptLazyLoading();
  }

  loadSectionContent(section) {
    section.classList.add("loading");

    setTimeout(() => {
      section.classList.remove("loading");
      section.classList.add("loaded");
      section.removeAttribute("data-lazy");
    }, 100);
  }

  setupScriptLazyLoading() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.loadNonCriticalScripts();
      }, 1000);
    });
  }

  loadNonCriticalScripts() {
    const scripts = document.querySelectorAll("script[data-lazy-src]");
    scripts.forEach((script) => {
      const newScript = document.createElement("script");
      newScript.src = script.dataset.lazySrc;
      newScript.async = true;
      document.head.appendChild(newScript);
      script.removeAttribute("data-lazy-src");
    });
  }

  // ===== OTIMIZAÇÃO DE RECURSOS =====
  optimizeResources() {
    this.preloadCriticalResources();
    this.optimizeCSS();
    this.optimizeJavaScript();
    this.monitorResourceLoading();
  }

  preloadCriticalResources() {
    const criticalResources = [
      { href: "css/components/main.css", as: "style" },
      {
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
        as: "style",
      },
      {
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "anonymous"
      },
      {
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-brands-400.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "anonymous"
      }
    ];

    criticalResources.forEach((resource) => {
      if (!document.querySelector(`link[href="${resource.href}"]`)) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = resource.href;
        link.as = resource.as;
        if (resource.as === "style") {
          link.onload = () => {
            link.rel = "stylesheet";
          };
        }
        document.head.appendChild(link);
      }
    });
  }

  optimizeCSS() {
    this.minifyInlineCSS();
  }

  minifyInlineCSS() {
    const styleElements = document.querySelectorAll("style");
    styleElements.forEach((style) => {
      if (style.textContent) {
        style.textContent = style.textContent
          .replace(/\s+/g, " ")
          .replace(/;\s*}/g, "}")
          .replace(/\s*{\s*/g, "{")
          .replace(/;\s*/g, ";")
          .trim();
      }
    });
  }

  optimizeJavaScript() {
    const scripts = document.querySelectorAll(
      "script[src]:not([async]):not([defer])"
    );
    scripts.forEach((script) => {
      if (!this.isCriticalScript(script.src)) {
        script.defer = true;
      }
    });
  }

  isCriticalScript(src) {
    const criticalScripts = ["script.js", "analytics.js", "testimonials.js"];
    return criticalScripts.some((critical) => src.includes(critical));
  }

  monitorResourceLoading() {
    window.addEventListener("load", () => {
      const resources = performance.getEntriesByType("resource");
      this.metrics.resourceCount = resources.length;

      resources.forEach((resource) => {
        if (resource.duration > 1000) {
          console.warn(
            `Recurso lento detectado: ${resource.name} (${Math.round(
              resource.duration
            )}ms)`
          );
        }
      });
    });
  }

  // ===== OTIMIZAÇÃO DE ANIMAÇÕES =====
  optimizeAnimations() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (prefersReducedMotion.matches) {
      this.disableAnimations();
    }

    this.optimizeAnimationPerformance();
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

  optimizeAnimationPerformance() {
    const animatedElements = document.querySelectorAll(
      '[class*="animate"], [class*="fade"]'
    );
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
        } else {
          entry.target.style.animationPlayState = "paused";
        }
      });
    });

    animatedElements.forEach((el) => animationObserver.observe(el));
  }

  // ===== OTIMIZAÇÕES ESPECÍFICAS =====
  optimizeLCP() {
    console.log("Aplicando otimizações para LCP...");

    const lcpImage = document.querySelector("img, .hero");
    if (lcpImage) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href =
        lcpImage.src ||
        lcpImage.style.backgroundImage?.match(
          /url\(['"]?([^'")]+)['"]?\)/
        )?.[1];
      if (link.href) {
        document.head.appendChild(link);
      }
    }
  }

  optimizeFID() {
    console.log("Aplicando otimizações para FID...");
    this.breakUpLongTasks();
    this.deferNonCriticalTasks();
  }

  optimizeCLS() {
    console.log("Aplicando otimizações para CLS...");

    const images = document.querySelectorAll("img:not([width]):not([height])");
    images.forEach((img) => {
      img.style.aspectRatio = "16/9";
    });

    this.reserveSpaceForDynamicContent();
  }

  breakUpLongTasks() {
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = (callback, delay = 0) => {
      return originalSetTimeout(() => {
        if ("scheduler" in window && "postTask" in window.scheduler) {
          window.scheduler.postTask(callback);
        } else {
          callback();
        }
      }, delay);
    };
  }

  deferNonCriticalTasks() {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        this.runNonCriticalTasks();
      });
    } else {
      setTimeout(() => {
        this.runNonCriticalTasks();
      }, 1000);
    }
  }

  runNonCriticalTasks() {
    this.cleanupUnusedEventListeners();
    this.optimizeMemoryUsage();
    this.updateMetricsDisplay();
  }

  reserveSpaceForDynamicContent() {
    const dynamicContainers = document.querySelectorAll("[data-dynamic]");
    dynamicContainers.forEach((container) => {
      if (!container.style.minHeight) {
        container.style.minHeight = "200px";
      }
    });
  }

  // ===== MONITORAMENTO =====
  monitorWebVitals() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.calculateLoadMetrics();
        this.reportMetrics();
      }, 1000);
    });
  }

  calculateLoadMetrics() {
    const perfData = performance.getEntriesByType("navigation")[0];
    if (perfData) {
      this.metrics.loadTime = Math.round(
        perfData.loadEventEnd - perfData.loadEventStart
      );
    }
  }

  reportMetrics() {
    const report = {
      ...this.metrics,
      timestamp: Date.now(),
      url: window.location.href,
    };

    console.log("📊 Performance Report:", report);

    if (window.analytics) {
      window.analytics.trackEvent("performance_metrics", report);
    }
  }

  cleanupUnusedEventListeners() {
    const elements = document.querySelectorAll("[data-cleanup]");
    elements.forEach((el) => {
      const events = el.dataset.cleanup.split(",");
      events.forEach((event) => {
        el.removeEventListener(event.trim(), () => {});
      });
      el.removeAttribute("data-cleanup");
    });
  }

  optimizeMemoryUsage() {
    if (this.resourceCache.size > 50) {
      const entries = Array.from(this.resourceCache.entries());
      const toDelete = entries.slice(0, 25);
      toDelete.forEach(([key]) => {
        this.resourceCache.delete(key);
      });
    }
  }

  updateMetricsDisplay() {
    const metricsDisplay = document.getElementById("performance-metrics");
    if (metricsDisplay) {
      metricsDisplay.innerHTML = `
                <div>LCP: ${this.metrics.lcp || "N/A"}ms</div>
                <div>FID: ${this.metrics.fid || "N/A"}ms</div>
                <div>CLS: ${this.metrics.cls || "N/A"}</div>
                <div>Load: ${this.metrics.loadTime || "N/A"}ms</div>
            `;
    }
  }

  // ===== MÉTODOS PÚBLICOS =====
  getMetrics() {
    return { ...this.metrics };
  }

  getPerformanceReport() {
    return {
      metrics: this.getMetrics(),
      recommendations: this.getRecommendations(),
      timestamp: Date.now(),
    };
  }

  getRecommendations() {
    const recommendations = [];

    if (this.metrics.lcp > 2500) {
      recommendations.push(
        "Otimizar Largest Contentful Paint - considere preload de imagens críticas"
      );
    }

    if (this.metrics.fid > 100) {
      recommendations.push(
        "Otimizar First Input Delay - quebrar tarefas JavaScript longas"
      );
    }

    if (this.metrics.cls > 0.1) {
      recommendations.push(
        "Otimizar Cumulative Layout Shift - definir dimensões para elementos"
      );
    }

    if (this.metrics.loadTime > 3000) {
      recommendations.push(
        "Otimizar tempo de carregamento - considere lazy loading e compressão"
      );
    }

    return recommendations;
  }

  cleanup() {
    this.observers.forEach((observer) => {
      try {
        observer.disconnect();
      } catch (e) {
        console.warn("Erro ao desconectar observer:", e);
      }
    });
    this.observers = [];

    if (this.resourceCache) {
      this.resourceCache.clear();
    }
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  window.performanceOptimizer = new PerformanceOptimizer();

  // Display de métricas em desenvolvimento
  if (window.location.hostname === "localhost") {
    const metricsDisplay = document.createElement("div");
    metricsDisplay.id = "performance-metrics";
    metricsDisplay.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 9999;
            font-family: monospace;
        `;
    document.body.appendChild(metricsDisplay);
  }
});

window.addEventListener("beforeunload", () => {
  if (window.performanceOptimizer) {
    window.performanceOptimizer.cleanup();
  }
});

window.PerformanceOptimizer = PerformanceOptimizer;
