// Sistema de Analytics e Monitoramento
class Analytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.events = [];
    this.userAgent = navigator.userAgent;
    this.screenResolution = `${screen.width}x${screen.height}`;
    this.viewport = `${window.innerWidth}x${window.innerHeight}`;

    this.init();
  }

  init() {
    this.trackPageView();
    this.setupEventListeners();
    this.trackPerformance();
    this.trackUserBehavior();
  }

  generateSessionId() {
    return (
      "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  }

  // Rastreamento de visualização de página
  trackPageView() {
    const pageData = {
      event: "page_view",
      page: window.location.pathname,
      title: document.title,
      referrer: document.referrer,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userAgent: this.userAgent,
      screenResolution: this.screenResolution,
      viewport: this.viewport,
    };

    this.sendEvent(pageData);
  }

  // Rastreamento de cliques
  trackClick(element, category = "click") {
    const clickData = {
      event: "click",
      category: category,
      element: element.tagName,
      text: element.textContent?.substring(0, 100) || "",
      href: element.href || "",
      id: element.id || "",
      className: element.className || "",
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.sendEvent(clickData);
  }

  // Rastreamento de formulários
  trackFormSubmission(formId, formData) {
    const submissionData = {
      event: "form_submission",
      formId: formId,
      fields: Object.keys(formData),
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.sendEvent(submissionData);
  }

  // Rastreamento de scroll
  trackScroll() {
    const scrollData = {
      event: "scroll",
      scrollY: window.scrollY,
      scrollPercent: Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      ),
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.sendEvent(scrollData);
  }

  // Rastreamento de tempo na página
  trackTimeOnPage() {
    const timeData = {
      event: "time_on_page",
      duration: Date.now() - this.startTime,
      page: window.location.pathname,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.sendEvent(timeData);
  }

  // Rastreamento de performance
  trackPerformance() {
    if ("performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType("navigation")[0];
          const performanceData = {
            event: "performance",
            loadTime: perfData.loadEventEnd - perfData.loadEventStart,
            domContentLoaded:
              perfData.domContentLoadedEventEnd -
              perfData.domContentLoadedEventStart,
            firstPaint: this.getFirstPaint(),
            timestamp: Date.now(),
            sessionId: this.sessionId,
          };

          this.sendEvent(performanceData);
        }, 1000);
      });
    }
  }

  getFirstPaint() {
    const paintEntries = performance.getEntriesByType("paint");
    const firstPaint = paintEntries.find(
      (entry) => entry.name === "first-paint"
    );
    return firstPaint ? firstPaint.startTime : null;
  }

  // Rastreamento de comportamento do usuário
  trackUserBehavior() {
    let scrollTimeout;
    let lastScrollY = 0;

    // Scroll tracking com throttle
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (Math.abs(window.scrollY - lastScrollY) > 100) {
          this.trackScroll();
          lastScrollY = window.scrollY;
        }
      }, 250);
    });

    // Rastreamento de saída da página
    window.addEventListener("beforeunload", () => {
      this.trackTimeOnPage();
    });

    // Rastreamento de visibilidade da página
    document.addEventListener("visibilitychange", () => {
      const visibilityData = {
        event: "visibility_change",
        hidden: document.hidden,
        timestamp: Date.now(),
        sessionId: this.sessionId,
      };

      this.sendEvent(visibilityData);
    });
  }

  // Configurar event listeners
  setupEventListeners() {
    // Rastreamento de cliques em links
    document.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        this.trackClick(e.target, "link");
      } else if (e.target.tagName === "BUTTON") {
        this.trackClick(e.target, "button");
      } else if (e.target.closest(".cta-button, .contact-btn, .nav-link")) {
        this.trackClick(e.target, "cta");
      }
    });

    // Rastreamento de submissão de formulários
    document.addEventListener("submit", (e) => {
      if (e.target.tagName === "FORM") {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        this.trackFormSubmission(e.target.id || "unknown", data);
      }
    });
  }

  // Enviar evento para servidor (simulado)
  sendEvent(eventData) {
    this.events.push(eventData);

    // Log para desenvolvimento
    console.log("Analytics Event:", eventData);

    // Em produção, enviar para servidor de analytics
    // fetch('/api/analytics', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(eventData)
    // });

    // Armazenar localmente como backup
    this.storeLocally(eventData);
  }

  // Armazenar eventos localmente
  storeLocally(eventData) {
    try {
      const stored = localStorage.getItem("analytics_events") || "[]";
      const events = JSON.parse(stored);
      events.push(eventData);

      // Manter apenas os últimos 100 eventos
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }

      localStorage.setItem("analytics_events", JSON.stringify(events));
    } catch (error) {
      console.warn("Erro ao armazenar evento de analytics:", error);
    }
  }

  // Obter relatório de eventos
  getReport() {
    return {
      sessionId: this.sessionId,
      events: this.events,
      sessionDuration: Date.now() - this.startTime,
      totalEvents: this.events.length,
    };
  }
}

// Inicializar analytics quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.analytics = new Analytics();
});

// Exportar para uso global
window.Analytics = Analytics;
