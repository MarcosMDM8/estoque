const CACHE_NAME = "estoque-v1";
const FILES_TO_CACHE = [
  "index.html",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

// Instala e armazena arquivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Ativa o Service Worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

// Busca no cache se offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
