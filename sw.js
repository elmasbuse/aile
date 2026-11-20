// Buse Dalan Aile: ana ekrana ekleme için gerekli küçük servis. Uygulama dosyasını önbelleğe alır,
// aile bilgileri ve fotoğraflar her zaman sunucudan güncel gelir.
const C = "bda-v1";
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(["./", "icon-192.png"]))); self.skipWaiting(); });
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const k = r.clone(); caches.open(C).then(c => c.put(e.request, k)); return r; }).catch(() => caches.match(e.request)));
});
