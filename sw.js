const CACHE_NAME = 'lwh-card-label-v1';
const CORE_ASSETS = [
  './', './index.html', './manifest.json', './logo.png', './favicon.ico',
  './icon-192.png', './icon-512.png', './icon-192-maskable.png', './icon-512-maskable.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network-first for CDN scripts (QR/barcode libs) so they stay current,
  // cache-first for the app shell so it still opens offline on the floor.
  if (event.request.url.includes('cdn.jsdelivr.net')) return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
