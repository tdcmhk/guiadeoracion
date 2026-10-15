/**
 * ============================================================================
 * SERVICE WORKER — MMM TURQUÍA RADIO ESPERANZA PWA
 * ============================================================================
 * Proporciona:
 *   - Modo offline básico con caché de App Shell (HTML, CSS, JS, Iconos).
 *   - Carga ultrarrápida en dispositivos móviles con redes lentas (3G/4G).
 *   - Exclusión segura de streams de audio en vivo (passthrough directo sin caché).
 */

const CACHE_NAME = 'radio-esperanza-v1.1';
const PRECACHE_ASSETS = [
  './index.html',
  './manifest.webmanifest',
  './assets/css/radio-home.css',
  './assets/js/lang.js',
  './assets/js/radio-schedule.js',
  './assets/js/radio-player.js',
  './assets/icons/app-icon.svg',
];

// Instalación: Cachear recursos esenciales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📡 [ServiceWorker] Cacheando App Shell para PWA móvil...');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('⚠️ [ServiceWorker] Error precacheando algunos assets:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activación: Limpieza de versiones obsoletas de caché
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('🧹 [ServiceWorker] Eliminando caché antigua:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepción de peticiones de red (Fetch)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. IMPORTANTE: NO interceptar streams de audio en vivo ni peticiones de audio streaming
  if (
    url.hostname.includes('zeno.fm') ||
    url.hostname.includes('soundhelix.com') ||
    event.request.destination === 'audio' ||
    url.pathname.endsWith('.mp3') ||
    url.pathname.includes('/stream')
  ) {
    // Pasar directo a red
    return;
  }

  // 2. Para navegación y App Shell: Estrategia Stale-While-Revalidate
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Solo cachear respuestas válidas y seguras
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === 'basic'
            ) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Si la red falla y no hay en caché, devolver fallback si es HTML
            if (event.request.mode === 'navigate' && cachedResponse) {
              return cachedResponse;
            }
            return null;
          });

        return cachedResponse || fetchPromise;
      })
    );
  }
});
