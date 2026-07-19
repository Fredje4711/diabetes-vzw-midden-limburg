const CACHE_NAME = 'koolhydraten-calculator-v2';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icon-192x192.png',
    './icon-512x512.png'
];

// Install-event: Cache bestanden bij het installeren van de service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Bestanden worden gecachet');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Fetch-event: Bedien bestanden vanuit de cache of haal ze op van het netwerk
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Geef bestanden uit de cache terug of haal ze van het netwerk
                return response || fetch(event.request);
            })
    );
});

// Activate-event: Oude caches verwijderen bij updates
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
