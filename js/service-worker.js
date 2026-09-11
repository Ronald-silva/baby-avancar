// Service Worker avançado para cache e performance
const CACHE_NAME = 'colegio-baby-avancar-v1.2';
const STATIC_CACHE = 'static-v1.2';
const DYNAMIC_CACHE = 'dynamic-v1.2';

// Arquivos para cache estático
const STATIC_FILES = [
  '/',
  '/index.html',
  '/galeria.html',
  '/cursos-extras.html',
  '/css/components/main.css',
  '/css/components/testimonials.css',
  '/js/script.js',
  '/js/gallery.js',
  '/js/accessibility.js',
  '/js/analytics.js',
  '/js/performance-optimizer.js',
  '/js/testimonials.js',
  '/manifest.json',
  '/img/logo.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-brands-400.woff2'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Cache estático criado');
        return cache.addAll(STATIC_FILES);
      })
      .catch(err => console.log('Erro ao criar cache:', err))
  );
  self.skipWaiting();
});

// Ativar Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Ativando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE) {
            console.log('Service Worker: Removendo cache antigo', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar requisições com estratégias otimizadas
self.addEventListener('fetch', event => {
  // Ignorar requisições não-HTTP
  if (!event.request.url.startsWith('http')) return;
  
  // Estratégia Cache First para recursos estáticos
  if (STATIC_FILES.includes(event.request.url) || 
      event.request.url.includes('cdnjs.cloudflare.com') ||
      event.request.url.includes('fonts.googleapis.com')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request)
            .then(fetchResponse => {
              if (fetchResponse.status === 200) {
                return caches.open(STATIC_CACHE)
                  .then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                  });
              }
              return fetchResponse;
            });
        })
        .catch(() => {
          // Fallback para páginas offline
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        })
    );
  }
  // Estratégia Network First para conteúdo dinâmico
  else {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});

// Sincronização em background
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Sincronização em background');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Implementar sincronização de dados offline
  return Promise.resolve();
}

// Push notifications (para futuras implementações)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/img/logo.png',
      badge: '/img/logo.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Clique em notificação
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});