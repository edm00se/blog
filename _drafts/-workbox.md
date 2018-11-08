---
layout: post
type: post
title: "Workbox"
description: "a cli tool, configuration, and plenty of options for service worker generation"
category: web
tags: [web, architecture, mobile, pwa, service-worker]
modified: 2018-11-08
comments: true
share: true
---

Pardon the interruption in the Alexa Skill and serverless series, but a couple of things happened. First, I started using the next version of the Alexa SDK for node.js. Second, I saw an excellent Alexa Skill Developer promotion that I had to write a new skill for, so that took up my free time in October, other than working on my kid's Halloween costume; I'll be updating my next post in the series to reflect the new API. Lastly, I've started diving into improved configurations of [service workers][sw-url], which has led me to be a firm proponent of [workbox][workbox-url].

{% include tweet.html id="1058452133492781056" %}

### Service Workers

A service worker is a segregated bit of JavaScript, executed in a separate context from the main window (in the "background"), and registers against a given origin and path. It's a sort of event driven worker, but if you're looking for more information on what they are and documentation, I recommend:

- [the "is service worker ready" page][is-sw-ready]
- [MDN's page on the Service Worker API][sw-url]
- [the "Can I Use" page for serice workers][can-i-use-sw]; spoiler alert, yes you can

#### Why Use One

The service worker API relies on a few things, such as the `fetch` API and `Promise` API. That being said, what it means at a functional level is that the service worker, once registered, can listen in on and, potentially, intercept failing network requests. As I'm sure you can imagine, this can be immensely powerful, once they're configured, registered, and working correctly.

#### Other Requirements

Service workers require being loaded/registered over HTTPS. For local testing, you can either implement a development server that supports HTTPS and, as is preferable, a certificate configured for your localhost environment.

Since it executes outside the context of the main page, it _must_ be within a separate file.

#### Support

Ever since iOS 11.3, service workers are supported with some rather minor caveats. Android Chrome has been fully ready for a while. On the desktop, Firefox and Chrome have been playing ball for a while and MS Edge has supported for a little while. This means that [unless you're locked into an abusive relationship with yet another version of IE (11)]({{ site.url }}/web/evergreen-web/), we can play with the cool toys.

#### Registering

Feature detection, and environment detection, can be pretty easily done, especially when you're building your source application files. I have a preference of late to [parcel][parcel-url], which allows for making use of the pretty common node.js convention of checking whether the `NODE_ENV` environment variable is set to `production`, this means that, once it is set up, I can avoid loading it in my local environment, for simplicity. All that's left is to create the service worker itself, here referenced as `sw.js`.

{% include gist.html id="c4defbf1b29ec3f6e10cdb7fc1afcbec" file="sw-registration.js" %}

\*note: since I'm using parcel, it's intelligent enough to try and find all my referenced js files, such as `sw.js`. As I'm not creating the "real" version of this file until the production build is created, and parcel isn't checking the if condition of `'serviceWorker' in navigator`, that means I've created a stubbed, but otherwise emtpy, file called `sw.js` in the source.

### Enter Workbox

Workbox describes itself as "...a library that bakes in a set of best practices and removes the boilerplate every developer writes when working with service workers." Workbox describes itself as being the successor to both sw-precache and sw-toolbox.

My experience has been pretty close to eliminating the need for manual creation of a service worker, and it has been easier than my experience with either above mentioned library. This is likely why I've enjoyed it so much, I don't need to do the manual work while keeping any specifics to a simple configuration.

#### Flavors

There are a few flavors of workbox which you can use. These generally amount to a node module, a webpack plugin, and a cli tool. Each is relatively easy to get started with, but I'm going to focus on using the CLI tool.

#### Install and Configuration

I've found the [workbox-cli][workbox-cli-npm] tool works rather well in an agnostic fashion when used with parcel. There do appear to be a couple parcel plugins which aim to achieve the same, but one is for sw-precache, and the one I found on GitHub targeting workbox [isn't even published to npm][parcel-plugin-workbox-issue]. So here I am, thankfully it's an easy path to follow.

1. `npm install --save-dev workbox-cli`, so simple, just about any dev should be able to do it
2. run the wizard, which will prompt you with questions to assist in creating your configuration file
3. add the build of the service worker to your build pipeline, such as npm scripts

#### Creating the Configuration File

The wizard will ask you things like "where is your build app deployed from?" I'm building an application to the `dist/` directory in my project repo. This is the directory I have defined. Then, having scanned the contents of my `dist/` directory, it prompts me on what to cache, by file type (extension). This is an interactive list, so you can de-select as the case may be, but that's probably unlikely. Lastly it will ask you what you want your file to be named. For consistency with [the script I have to register it](#registering), it will be `sw.js`. Here's my config file:

{% include gist.html id="c4defbf1b29ec3f6e10cdb7fc1afcbec" file="workbox-config.js" %}

#### Updating The Build Process

I have been using an npm script `build` to perform my build of a production version of the app with `npm run build`. This is preserved and only added to, as I then created a `build:sw` script in my `package.json`'s `scripts` block. Now, in my deploy config, it calls the unit tests, build, and build of the service worker as such:

```yml
- npm test
- npm run build
- npm run build:sw
```

### An Example

If you're looking for an example, I recently put together a simple app in [vue.js][vue-url] which uses each of the above configs and build/deploy tasks, with one change, the workbox config also bundles up some small audio files. The application is a [pointing sound board][pointing-sound-board-gh], in that it is a sound board geared for a humorous addition to pointing poker. It works well in the browser, is installable to a mobile device's home screen (Android and iOS), and works entirely offline. The app is simple, but the tooling around it is pretty impressive, and it's not that hard to set up.

#### Shout Out

The pointing sound board app is created off of a boiler plate I put together to be the foundation for such applications. It's called [vue-parcel-starter][vue-parcel-starter-gh], and it simplifies a couple of the minor things I had to do to get the tooling I wanted working harmoneously. I also published an npm initializer, so you can create an instance of the latest of that starter file with either:

```sh
npm init vue-parcel <app-name>
```

or 

```sh
npx create-vue-parcel <app-name>
```

### Summary

I hope this has been informative, or at least a bit insightful, as to how to go about setting things up. I didn't cover some of the other PWA basics, such as a manifest JSON file, meta headers in your `index.html`, or icon files. Otherwise, it's all there and you can find that other information in my example repository.

Until next time, let's build better apps!

[sw-url]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[is-sw-ready]: https://jakearchibald.github.io/isserviceworkerready/
[can-i-use-sw]: https://caniuse.com/#feat=serviceworkers
[workbox-url]: https://developers.google.com/web/tools/workbox/
[parcel-url]: https://parceljs.org/
[workbox-cli-npm]: https://www.npmjs.com/package/workbox-cli
[parcel-plugin-workbox-issue]: https://github.com/dahnielson/parcel-plugin-workbox/issues/9
[vue-url]: https://vuejs.org/
[pointing-sound-board-gh]: https://github.com/edm00se/pointing-sound-board
[vue-parcel-starter-gh]: https://github.com/edm00se/vue-parcel-starter
