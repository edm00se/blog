---
title: 'Rebirth: An App of Ice and Fire'
description: 'refactoring the build process to better the app'
date: 2016-12-14
published: true
series: true # servlet-series
tags: ['scm', 'git', 'npm', 'gulp']
canonical_url: false
category: xpages
---

### Intro

If you read my blog for any of the [Saga of Servlets](https://edm00se.io/servlet-series/) series, then I hope that you're excited I'm returning to the application I put together for it. This time, it's as a conversation piece in regards to some of the build process modernization I engaged in recently, in order to unify the code base in [its git repository](https://github.com/edm00se/AnAppOfIceAndFire). In any case, it's helping pave the way forward before I update some of the back-end elements, when it will again be a talking point for some additional rework and optimizations.

### Rebirth

When my App of Ice and Fire (viewable here: [iceandfire.mybluemix.net](http://iceandfire.mybluemix.net) on Bluemix) was last left off, it had an [Angular 1.x](https://angularjs.org/) application as the front-end, with a [gulp](http://gulpjs.com/) driven build process to optimize all the front-end assets, and was backed by some excellent servlets (extending `DesignerFacesServlet`) which were talking points for the previous entries in the series, which focused more on general premise of servlet construction and application structure with XPages and Domino. Sadly, the application was left to sit for several months, which was approaching the better part of a year now. During this time, several new frameworks came out; specifically the release and popularity of [React](https://facebook.github.io/react/), [Angular 2](https://angular.io/)'s release, and my current favorite, [vue.js](https://vuejs.org/), not only started gaining popularity, but hit its version 2.0 as well. Additionally, I got on the bandwagon of switching to using npm scripts as the primary build pipeline; an approach that makes the dependencies, builds, and build-related actions all rather self-contained and neat. In other words, it was time for something new.

[![Hyrkoon the Hero, with Lightbringer in hand](./images/Hykroon_Lightbringer.jpg)
*Hyrkoon the Hero, with Lightbringer in hand*](https://awoiaf.westeros.org/index.php/Lightbringer)

### [What's New](https://github.com/edm00se/AnAppOfIceAndFire/releases/tag/v1.0.0)

- npm scripts are incorporated for build pipeline, with gulp for build process (for now at least)
- re-incorporation of the multiple project repositories (the Bluemix implementation had previously been its own repo)
  - the Bluemix version is now in its own branch, `bluemix`
- the src/ directory for the front-end application is shared between branches
  - with an npm script to copy from `master` into the `bluemix` branch
  - this paves the way for sharing the Java codebase between the `master` and `bluemix` branches, to follow on
- the front-end (UI layer) app is its own branch, for use as a git subtree in the other versions (for single-source development)
- npm script included as part of install to fix font-awesome, specifically to remove the version number, no more failing CSS references in XPages
- no more symlinking! it was confusing to those who didn't know it and wasn't strictly necessary, so it was removed

### Build Pipeline

The largest changes, from the front-end perspective, are in the implementation of the front-end assets and the build pipeline that includes them for use. For a break down, here's a quick description of my npm scripts, which can be [viewed in full here](https://github.com/edm00se/AnAppOfIceAndFire/blob/v1.0.0/package.json#L6-L18).

https://gist.github.com/edm00se/b9a046d3f167228b24278e759700f1bd#abbreviated-package.json

You can see the `postinstall` script, which runs immediately after `install`; so when a user runs `npm install` and pulls in the dependencies, it will be kicked off immediately following it, without need for the user's intervention. One major thing of note is that while bower is still in use, this makes it more seamless, unobtrusive, and easy to switch to an alternative solution some day.

The `fix-fa` scripts perform the removal of both the `?v=4.7.0` (the currently specified version) and `?#iefix&v=4.7.0`, which have been known to cause issues with being loaded from XPages. They are split apart into `fix-fa:ver` and `fix-fa:ie`, run together by the "parent" task. Of note, I had to escape both the special characters and also the escape character, as that's how the [replace](https://npm.im/replace) tool I implemented needs it.

The `build` and `build:watch` tasks both do what you would expect, but now [my `gulpfile.js`](https://github.com/edm00se/AnAppOfIceAndFire/blob/v1.0.0/gulpfile.js) is considerably cleaner, with _only_ the build specifics defined as gulp tasks.

The most complex npm script is the `dev` script, which:

- runs [`json-server`](https://npm.im/json-server) as [previously outlined in my blog](https://localhost:4000/front-end/alternate-front-end-development/)
- starts [a `browser-sync`](https://npm.im/browser-sync) instance for live-reloading and watching of the built app
- performs a build and watches the source files in `src/` via the `build:watch` (which is the default `gulp` task)

Aside from being a bit of a populist move at the moment, it's good in that you can boil down your npm scripts to just a small handful of truly worthwhile scripts. A user can generally remember that `npm run dev` will run the watch and live-reload environment, with `npm run build` being the one-off build task, and `npm run clean` the clean command to remove the built assets. If nothing else, they're more easily documented in [a project's ReadMe file](https://github.com/edm00se/AnAppOfIceAndFire/blob/v1.0.0/ReadMe.md#use).

There is absolute benefit to being able to make use of both the npm ecosystem for the various packages to perform the required tasks involved. I didn't have to write my own cross-environment supported script to do any of what goes on in the npm scripts, let alone something as complex as [`concurrently`](https://npm.im/concurrently), which manages the task of performing simultaneous commands or npm scripts. Anything I can run from the host (and require as a dependency) from the CLI is available to be used. This is quite powerful and, once properly configured, should seem somewhat straightforward.

#### What's Missing?

In the future, I have plans to refactor the front-end portion of the app, along with addressing some of the concerns such as my copying _all_ the library assets into `ODP/WebContent/libs/`, which is inelegant. This should set up a blog post or two covering these topics. All in all, it's a rather usable scenario at the moment.

### How to Check it Out

[The repository itself](https://github.com/edm00se/AnAppOfIceAndFire) is the best place to have a look. You can also find [the `v1.0.0` release information](https://github.com/edm00se/AnAppOfIceAndFire/releases/tag/v1.0.0) a decent place to look.

### Summary

This may just be a node fan's nerd-ing out, but I think it shows how to improve the build pipeline for a given application over time, to make it more manageable and easily run by the user/developer. I'm sure I'll come back to this app in the future, so stay tuned, as there are good things ahead.
