/**
 * SyncSense AI - Service Worker
 * Cache Name: syncsense-cache-v5
 * 
 * Network-First strategy with offline Cache Fallback.
 * Ensures the user always sees the latest updates when connected,
 * while maintaining 100% offline functionality when in the field.
 */

const CACHE_NAME = 'syncsense-cache-v5';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/js/rule-engine.js',
  '/js/storage.js',
  '/js/sync-manager.js',
  '/js/reconciliation.js',
  '/js/i18n.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline assets...');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[ServiceWorker] Purging old cache version:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Network only for dynamic API calls (/health, /sync, /review, /cases)
  if (url.pathname.startsWith('/health') || 
      url.pathname.startsWith('/sync') || 
      url.pathname.startsWith('/review') || 
      url.pathname.startsWith('/cases')) {
    return;
  }

  // Network-First with Cache Fallback for all assets
  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
      }
      return networkResponse;
    }).catch(() => {
      // Offline fallback: serve from cache
      return caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html') || caches.match('/');
        }
      });
    })
  );
});
