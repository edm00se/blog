---
layout: null
---
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

importScripts('/sw-toolbox.js');

const config = {
  offlinePage: '/offline.html'
};

const IGNORED_URLS = [];

const DO_CACHE = [
  '/',
  '/about/',
  '/categories/',
  '/tags/',
  '/assets/images/tb_sign1.png',
  '/assets/images/tbrun1.png',
  '/sw-toolbox.js',
  '/sw.html',
  '/manifest.json',
  config.offlinePage,
  '/assets/images/logo.svg',
  '/favicon.ico',
  '/favicon.png',
  'https://www.gravatar.com/avatar/397da8c5ae99b2f89a207d9beda6984d?s=260',
  '/assets/images/champion/ibm-champion-2018-ibm-cloud.png',
  '/assets/images/champion/ibm-champion-2018-social-business.png',
  '/assets/images/champion/ibm-champion-collaboration-solutions-3-year-milestone.png',
  '/assets/images/champion/ibm-champion-2017-ibm-cloud.png',
  '/assets/images/champion/ibm-champion-2017-social-business.png',
  '/assets/images/champion/ibm-champion-2016-social-business.png',
  '/assets/images/champion/ibm-champion-2015-social-business.png',
  '/assets/images/champion/banner.png'
];

// last n posts
{% for post in site.posts limit:6 %}DO_CACHE.push("{{ post.url }}");{% endfor %}

config.filesToCache = DO_CACHE;

/**
 * Generates a placeholder SVG image of the given size.
 */
function offlineImage(name, width, height) {
  return `<?xml version="1.0"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" fill-rule="evenodd"><path fill="#F8BBD0" d="M0 0h${width}v${height}H0z"/></g>
  <text text-anchor="middle" x="${Math.floor(width / 2)}" y="${Math.floor(height / 2)}">image offline (${name})</text>
<style><![CDATA[
text{
  font: 48px Roboto,Verdana, Helvetica, Arial, sans-serif;
}
]]></style>
</svg>`;
}
/**
 * Returns true if the Accept header contains the given content type string.
 */
function requestAccepts(request, contentType) {
  return request.headers.get('Accept').indexOf(contentType) != -1;
}

/**
 * ampbyexample.com fetch handler:
 *
 * - one-behind caching
 * - shows offline page
 * - generates placeholder image for unavailable images
 */
function ampByExampleHandler(request, values) {
  // for samples show offline page if offline and samples are not cached
  if (requestAccepts(request, 'text/html')) {
    // never use cached version for AMP CORS requests (e.g. amp-live-list) or pages that shouldn't be cached
    if (request.url.indexOf("__amp_source_origin") != -1 || shouldNotCache(request)) {
      return toolbox.networkOnly(request, values);
    }
    // cache or network - whatever is fastest
    return toolbox.fastest(request, values).catch(function() {
      return toolbox.cacheOnly(new Request(config.offlinePage), values)
        .then(function(response) {
          return response || new Response('You\'re offline. Sorry.', {
            status: 500,
            statusText: 'Offline Page Missing'
          });
        });
    });
  }
  // always try to load images from the cache first
  // fallback to placeholder SVG image if offline and image not available
  if (requestAccepts(request, 'image/')) {
    return toolbox.cacheFirst(request, values).catch(function() {
      const url = request.url;
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      // TODO use correct image dimensions
      return new Response(offlineImage(fileName, 1080, 610),
          { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    });
  } else {
    // cache all other requests
    return toolbox.fastest(request, values);
  }
}

function shouldNotCache(request) {
  return IGNORED_URLS.some(url => request.url.indexOf(url) != -1);
}

toolbox.options.debug = true;
toolbox.router.default = toolbox.networkOnly;
toolbox.router.get('/(.*)', ampByExampleHandler, {origin: self.location.origin});
// cache first amp runtime
toolbox.router.get('/(.*)', toolbox.cacheFirst, {origin: 'https://cdn.ampproject.org'});
// cache first google fonts
toolbox.router.get('/(.+)', toolbox.cacheFirst, {origin: /https?:\/\/fonts.+/});

toolbox.precache(config.filesToCache);

// Cache the page registering the service worker. Without this, the
// "first" page the user visits is only cached on the second visit,
// since the first load is uncontrolled.
toolbox.precache(
  clients.matchAll({includeUncontrolled: true}).then(l => {
    return l.map(c => c.url);
  })
);

// Claim clients so that the very first page load is controlled by a service
// worker. (Important for responding correctly in offline state.)
self.addEventListener('activate', () => self.clients.claim());

// Make sure the SW the page we register() is the service we use.
self.addEventListener('install', () => self.skipWaiting());
