---
title: 'Proxying Parcel'
description: 'super-powered front-end development'
date: 2019-01-14
published: true
tags: ['parcel', 'proxy', 'tomcat', 'domino', 'tooling', 'web', 'development']
canonical_url: false
category: web
permalink: /web/proxying-parcel
---

### Intro

Parcel describes itself as a "blazing fast, zero configuration web application bundler". I agree with that statement. It's been my targeted development server and front-end bundler for a while now. I've even gone so far as to [create a starter][vue-parcel-starter], just to contain what little config I need to get my preferred tool set to work just right on top of it.

### What Parcel Brings 📦 ⚡️

Parcel is a great bundler, which handles things like optimization from uglification to transpilation, code splitting, HMR (w/ ES6 style `import`s), intelligent logging, speedy builds (through parallel workers and caching of code structure), and more. It does this all with zero configuration required out of the box. In fact, when I first tried Parcel, it set such a high bar that even the great strides done in webpack 4, to lower the amount of required config, don't quite match up to my satisfaction level with Parcel. It's why my mug can be found on the [Parcel Open Collective][parcel-open-collective] page in the donor section; a few bucks a month can help an open source project a fair amount.

From the developer perspective, it's virtually flawless. Many framework CLI tools set up a well filled out webpack config, and that's great. The only problem is that if your application requires any different asset types or for manual fiddling into some of the specifics. My experience with parcel has involved absolutely no configuration of asset types (css, html, js, framework, ts; the last one requires a ts config, but always does), and I've been better off for it.

### Why Bring a Proxy to the Parcel Party 🥳

If you're working against a back-end, say for a monolithic application, especially one that isn't driven by [express][express], you'll probably want to direct your traffic accordingly while developing locally.

#### Why Not Express

Express is pretty nifty and I've used it a few times. The bottom line about why not to jump through this hoop for express is that the parcel development server and bundler [can be used directly as express middleware][parcel-server-as-express-middleware]. Yeah, it's that easy.

As for why I should load express as a development dependency, that wouldn't be terrible, but it seems a bit of a waste of disk space just for extending what's already happening. I really just needed a proxying handler based on route. I wound up settling on [`http-proxy`][npm-http-proxy] and direct used of the Node built-in `http` module.

[Bundlephobia.com][bundlephobia] reports the following sizes for these two dependencies:

| Package                                  | Size      |
|------------------------------------------|-----------|
| [express(4.16.4)][bundle-express]        | 386.2 kB  |
| [http-proxy(1.17.0)][bundle-http-proxy]  | 20.7 kB   |

As you can see, as a dev dependency, this should be under a tenth of the size. As for why to use `http-proxy`? It's what powers `http-proxy-middleware`, which is meant to plug into a wide variety of other server libraries. It also means that it has a fairly universal API.

### How to Set Up the Proxy

Conceptually, we'll be following a pretty standard format of switching off of a detected route in the request path, then forwarding to the appropriate development server based on port. The reason I'm detecting request path as the determining factor is that most intelligent application design includes putting a RESTful API, or similar, pattern of placing the endpoints under a `/api/` path. This makes it easily detected via a regex test of the request path.

### Enough Talk, Show Me The Code

It's lightly annotated and reads pretty easily.

https://gist.github.com/edm00se/5162791576ed6c36b58f71d65646d64b#dev-server.js

#### Of Note

From the parcel side, you can see I'm setting a couple options, to be passed into the `Bundler` call per [Parcel's Bundler API][parcel-bundler-api]. I'm explicitly setting `publicUrl: '.'`, so that no absolute path to the files will be used; this should be used if your app will be in a sub-directory, not at the root of the domain. Both `watch` and `sourceMaps` default to `true`, but they're there to remind me.

Additionally, you can see from the option I'm passing the parcel server's port, I'm setting `ws` to `true`, to make sure the web socket used from Parcel's dev server works.

As for the back-end server, I'm setting `prependPath` to `true` (default, still trying to be explicit) which will prepend the target's path to the proxy path.

### Wrapping It Up

To make this more developer friendly, just throw it into its own file, such as `dev-server.js` and you can add it as an [npm script][npm-run-scripts] for ultimate simplicity. Provided your back-end server is started, then starting parcel's dev server with the proxy in front of it is as simple as adding to your `package.json`'s `scripts` block, like so:

```json
"scripts": {
  "dev": "node dev-server.js",
```

### Summary

Ultimately, I'm glad I went down this route, as the implementation is simple, is a file I can own and control with my monolithic application, and makes good use of other (supported) code without adding too much to the project's bloat. With any luck, this can inspire you to think about how you load your own development environment(s) and possibly improve your own development expierience.

[parcel-bundler]: https://parceljs.org/
[vue-parcel-starter]: https://github.com/edm00se/vue-parcel-starter
[parcel-open-collective]: https://opencollective.com/parcel
[parcel-examples]: https://github.com/parcel-bundler/examples
[express]: https://expressjs.com/
[parcel-server-as-express-middleware]: https://github.com/parcel-bundler/parcel/issues/55#issuecomment-349755034
[npm-http-proxy]: https://www.npmjs.com/package/http-proxy
[bundlephobia]: https://bundlephobia.com/
[bundle-express]: https://bundlephobia.com/result?p=express@4.16.4
[bundle-http-proxy]: https://bundlephobia.com/result?p=http-proxy@1.17.0
[parcel-bundler-api]: https://parceljs.org/api.html
[npm-run-scripts]: https://docs.npmjs.com/cli/run-script
