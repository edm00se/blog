---
title: 'A Parcel Plugin For Goodies'
description: 'making IE(11) support just a bit easier'
date: 2019-03-14
published: true
tags: ['web', 'parcel', 'plugin', 'javscript', 'ie']
canonical_url: false
category: web
permalink: /web/parcel-plugin-goodie-bag/
---

# Happy π Day!

### Intro

Parcel is a **great** bundling tool and one I've not been too quiet about espousing my preference for it. Recently, I hit a figurative "hoop" I needed to jump through to ensure I could support a contractually required browser, our good [old frenemy Internet Explorer (11)][frenemy-ie]. This is sadly something I couldn't influence, all the usual horrible excuses are at play, yet here I am having to do the dirty work.

TL;DR: IE11 didn't work out of the box, as using [the html loader][parcel-html-loader-example] feature of Parcel ensures multiple "bundles", which means the loader relies on both `Promise` and `fetch` APIs before any polyfill can be enacted; skip down to the [solution](#solution) for more.

### Background

For a while, I've had [a demo application][app-of-ice-and-fire] that was meant to be a non-trivial AngularJS applicaiton to illustrate how to hook it up to a back-end. When I first created it, it was a testament to the ability to create a modern and relatively web standards driven front-end portion of an application, deployed in an IBM Domino NSF application container, with its corresponding Java backing logic. I used it as an example for [a conference talk I gave][blue-chalky-soup]. It then evolved to be an example application to illustrate [use of an Nginx reverse proxy equipped with PageSpeed][nginx-pagespeed] to ensure an optimized delivery of web assets.

Time passed, the web generally moved on from AngularJS, and now, finally, it has been re-incarnated with a mocked back-end, as an example for use in [modernizing an aging AngularJS applicaiton with Parcel][modernize-ng1]. In fact, it has worked so well in this capacity, it has turned into a proving ground for what's required with that process for bringing a larger application from my day job forward to allow for modernized JS development on an existing application.

### Problem

Since the approach to modernizing an AngularJS app substitutes the `templateUrl` and `ng-include` inclusion of HTML partial files that haven't been copied to the dist (build) version of the app, since they haven't been required/imported, swapping them with a `require` or `import` statement was necessary. Parcel handles HTML imports rather well, but it carries a side effect of ensuring multiple "bundles" are generated. This means that both the `Promise` and `fetch` APIs are used directly by Parcel's loadng script in the destination browser, APIs that IE11 doesn't have. Also, while `@babel/polyfill` _can_ polyfill `Promise`, it doesn't fire the polyfills before Parcel uses the API, it can't/doesn't polyfill `fetch`.

The bottom line is that "out of the box", making use of the HTML import capabilities of Parcel means IE11 will not be supported. **In every other way** Parcel supports IE with a combination of Babel's polyfill and a defined browserslist config in `package.json`; quite well in fact. So, what's a motivated developer to do?

### Solution

Enter my (first) [Parcel plugin, "goodie bag"][pp-goodie-bag].

#### parcel-plugin-goodie-bag

A polyfill for `Promise` and `fetch` to keep Parcel working for those without it.

[Looking at you Internet Explorer](https://techcommunity.microsoft.com/t5/Windows-IT-Pro-Blog/The-perils-of-using-Internet-Explorer-as-your-default-browser/ba-p/331732).

#### Usage

To install and use this plugin, assuming you have Parcel set up already, you need merely install the plugin. That's it, just a quick `npm install` and your troubles are solved.

```sh
npm install --save-dev parcel-plugin-goodie-bag
```

#### How It Works

What's happening under the hood is:

- a bundled version of a polyfill for both `Promise` and `fetch` APIs is assembled
   - using the [es6 `Promise` polyfill][poly-es6]
   - also the [unfetch `fetch` polyfill][poly-unfetch]
- copies this combination polyfill to the destination directory
- it listens for a root `index.html` bundling event from Parcel
- it injects the generated polyfill file at the beginning of the `head` tag in that root `index.html` file (so as to load before Parcel's loader)

All in all, it makes for a pretty quick and seamless addition, allowing for a bit less painful support of IE11.

### Summary

This was painful for me. [Not even Microsoft wants to support IE anymore][ms-says-no-to-ie], yet so many cling to the notion that beyond all reason it _must_ be supported. In the end, we have a work around, but the application would run so much better without that bloated overhead. In the future, I may pursue a split bundle, one which has modern support and the other which is the "legacy" support, some demos of which in Parcel I've seen already. This holds great appeal, IMO, as it can let the more web standards compliant browsers actually hit their stride.

[frenemy-ie]: https://edm00se.io/web/evergreen-web/
[parcel-html-loader-example]: https://github.com/edm00se/modernize-ng1/blob/master/docs/Migrate.md#updating-the-router
[app-of-ice-and-fire]: https://github.com/edm00se/AnAppOfIceAndFire
[blue-chalky-soup]: https://github.com/edm00se/BlueChalkySoup
[nginx-pagespeed]: https://github.com/edm00se/AD113-Speed-Up-Your-Apps-with-Nginx-and-PageSpeed
[modernize-ng1]: https://github.com/edm00se/modernize-ng1
[pp-goodie-bag]: https://github.com/edm00se/parcel-plugin-goodie-bag
[poly-es6]: https://npm.im/es6-promise
[poly-unfetch]: https://npm.im/unfetch
[ms-says-no-to-ie]: https://techcommunity.microsoft.com/t5/Windows-IT-Pro-Blog/The-perils-of-using-Internet-Explorer-as-your-default-browser/ba-p/331732
