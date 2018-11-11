// advanced config for injectManifest approach
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  new RegExp('https://fonts.googleapis.com/css?family=Lora|Open+Sans'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://www.gravatar.com/avatar/397da8c5ae99b2f89a207d9beda6984d?s=260'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://cdn.ampproject.org/v0.js'),
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://cdn.ampproject.org/v0/amp-analytics-0.1.js'),
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js'),
  workbox.strategies.networkFirst()
);
