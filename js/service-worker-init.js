// ========================================
// SERVICE WORKER INITIALIZATION
// Registro do Service Worker para PWA
// ========================================

// Registrar Service Worker se disponível
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/js/service-worker.js")
      .then((registration) => {
        console.log("✅ Service Worker registrado:", registration);
      })
      .catch((registrationError) => {
        console.log("❌ Falha no registro do Service Worker:", registrationError);
      });
  });
}