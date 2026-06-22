const CACHE = 'screen-v2';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first for Supabase API calls, passthrough for everything else.
  const url = new URL(e.request.url);
  if (url.hostname.endsWith('supabase.co')) {
    e.respondWith(fetch(e.request));
  }
  // Let everything else fall through to the network normally.
});
