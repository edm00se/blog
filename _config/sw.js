// advanced config for injectManifest approach
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

 workbox.setConfig({
  debug: false
});

 // Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  new RegExp('https://fonts.googleapis.com/css?family=Lora|Open+Sans'),
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://www.gravatar.com/avatar/397da8c5ae99b2f89a207d9beda6984d?s=260'),
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://cdn.ampproject.org/v0.js'),
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://cdn.ampproject.org/v0/amp-analytics-0.1.js'),
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js'),
  new workbox.strategies.NetworkFirst()
);
