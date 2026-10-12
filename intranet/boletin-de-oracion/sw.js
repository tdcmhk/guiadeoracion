// Cada vez que hagas cambios importantes en tu web, cambia este numerito:
// const CACHE_NAME = 'mmm-turquia-cache-v2'; <-- Antes decía v1

const CACHE_NAME = 'mmm-turquia-cache-v1';

// Archivos que queremos guardar en la memoria del celular desde la primera visita
const ARCHIVOS_A_GUARDAR = [
  './',
  './index.html',
  './css/1-base-nav-footer.css',
  './css/2-boletin-contenido.css',
  './css/3-widgets-interactivos.css',
  './js/funcionesmt.js',
  './images/Logowebmt1.png',
  './images/Logowebmt2.png',
  './videos/videohead3.webm' // El primer video del carrusel queda guardado en el teléfono
];

// 1. Al instalar, guarda los archivos principales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARCHIVOS_A_GUARDAR);
    })
  );
  self.skipWaiting();
});

// 2. Interceptar peticiones: Si es un video, imagen o fuente que ya se descargó antes,
// lo entrega desde la memoria del celular sin volver a descargarlo de internet
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Solo cachear imágenes, videos del carrusel, fuentes e iconos propios
  if (
    url.endsWith('.webm') || 
    url.endsWith('.webp') || 
    url.endsWith('.png') || 
    url.endsWith('.woff2') ||
    url.endsWith('.svg')
  ) {
    event.respondWith(
      caches.match(event.request).then((respuestaGuardada) => {
        if (respuestaGuardada) {
          // ¡Ya está en el celular! No gasta internet y carga al instante
          return respuestaGuardada;
        }
        // Si no estaba, lo descarga una vez y guarda una copia en el celular
        return fetch(event.request).then((respuestaRed) => {
          if (respuestaRed && respuestaRed.status === 200) {
            const copia = respuestaRed.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
          }
          return respuestaRed;
        });
      })
    );
  }
});

// Cuando hay una nueva versión, borra la caché vieja del celular automáticamente
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('🧹 Borrando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Toma el control inmediato de la app en el celular
  return self.clients.claim();
});