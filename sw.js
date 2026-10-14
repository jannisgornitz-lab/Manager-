// Service Worker: speichert die App beim ersten Besuch, danach läuft sie offline.
// Bei einer neuen Version der App die Nummer in VERSION erhöhen.
var VERSION="manager-v1";
var FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-512-maskable.png","icon-180.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSION}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(function(hit){return hit||fetch(e.request).then(function(r){var cp=r.clone();caches.open(VERSION).then(function(c){c.put(e.request,cp)});return r}).catch(function(){return caches.match("index.html")})}))});
