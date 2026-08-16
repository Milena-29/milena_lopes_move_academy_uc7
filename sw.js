const CACHE_NAME = 'move-academy-v1';

const ASSETS_TO_CACHE = [
  './',
  './Tela_login.html',
  './Tela_cadastro.htm',
  './aulas.html',
  './css/style.css',
  './img/+.png',
  './img/Academia_img.png',
  './js/script.js',
  './index.html',
  './manifest.json',
];

// Evento de Instalação: Salva todos os arquivos estáticos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Evento de Ativação: Limpa caches antigos caso a versão do CACHE_NAME mude
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Evento Fetch: Intercepta as requisições para responder via Cache primeiro e Rede como fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
