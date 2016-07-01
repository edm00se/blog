---
layout: post
type: post
title: "Angular 2's Learning Curve"
description: "don't ignore it, as its gains are pretty amazing"
category: web
tags: [angular, typescript, es6, es5, npm]
modified: 2016-07-01
comments: true
share: true
---

<!-- auto-magic TOC! -->
<section>
  <header data-toggle="tooltip" title="it's dangerous to go alone, take this">
    <h2>Contents</h2>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section>

### Intro

Those that know me, or have followed my blog for a little while, have likely caught onto the fact that I'm a pretty big [AngularJS](https://angularjs.org/) fan. [Angular 2](https://angular.io/)

### Background

Angular (1.x) was incredibly easy to get started with. I don't know if we were spoiled or not, but either way, it was gosh darned nice.

Take a simple "hello world" example, all we need, aside from including the `script` tag for `angular.js` in our HTML file, all we needed to do was to write out [something like this](https://jsfiddle.net/edm00se/0a0vga0k/):

<script async src="https://jsfiddle.net/edm00se/0a0vga0k/embed/html,result/"></script><br />

This achieved the following:
- instantiated (bootstrapped) the application, by binding it to a given element
- bound a(n interactive, input element with a) data property within the application's `scope` to a key of "name"
- bound the output of the key to instances of its key name (denoted via `{{ }}`)
- two-way data binding established, so that any update of the value for the "name" property would propagate to any other such instance in the DOM

Out of the box, this comes with two-way data binding (one-way is available via the notation `{{::name}}`); immediately, the utility of Angular is obvious and powerful.

We also had immediate access to many things like some really powerful filters and directives, many of the common ones were [already available for us](https://jsfiddle.net/edm00se/L3tykzrt/):

<script async src="https://jsfiddle.net/edm00se/L3tykzrt/embed/html,result/"></script><br />

We even had the ability to [make use of templates](https://jsfiddle.net/edm00se/qf5trmkn/), either by HTML partials (actual `.html` files) or declaratively, as scripted components (often rather directive looking).

<script async src="https://jsfiddle.net/edm00se/qf5trmkn/embed/html,result/"></script><br />

The code samples above are all still fully capable in Angular 2 and I would argue that Angular 2 can do much more than Angular 1.x, but there's a touch more to it. I still think it's fully worth learning Angular 2 and, if you _don't_ know Angular 1.x, my recommendation is to skip it and jump to 2.

### Angular 2's Progression

Learning Angular 2 can seem a bit daunting. In fact, it's still something I'm wrapping my head around. The fact of the matter is, that Angular 1 brought so many great features and capabilities in under a single framework that was easily picked up, albeit a bit thick on the CS theory.

Throughout the course of Angular 1, with each minor/feature release, it would seem that on top of some added functionality, there was some significant effort put in to _removing_ certain elements from the core of the framework. While this is great for customization, over time it made for a large amount of questions regarding "do I need this module" (e.g.- `ng-aria`, `ng-messages`, `ng-router`, etc.).

Angular 2 seems to compound this behavior, although I give them significant credit for identifying and splitting things up in advance of the 2.0 full release. They do, however, recommend use of a couple of other libraries/frameworks/plugins/thingamabobs for a "stock" Angular 2 app. They also _happen to have_ an Angular 2 for JavaScript quick start, but Angular 2 is/should best be used with things like TypeScript. This is forward thinking, makes good sense, and it only goes to crazy town from there.

I love TypeScript. It solves the "problem" of a non-type'd language like JavaScript, in the world of strongly type'd data and competing languages. It's a natural fit to be used with any modern project, but Angular 2's Quickstart (which is a good one) still makes use of not just TypeScript, but _plenty_ of other dependencies as well.

In fact, it's enough to get ones head spinning, with:
- the many _&#64;angular_ components (eight, aside from _&#64;angular-core_)
- [systemjs](https://npm.im/systemjs)
- [core-js](https://npm.im/core-js)
- [reflect-metadata](https://npm.im/reflect-metadata)
- [rxjs](https://npm.im/rxjs)
- [zone.js](https://npm.im/zone.js)
- [TypeScript](https://npm.im/typescript)
- [typings](https://www.npm.im/typings)

The last two are development dependencies, which really means that they're used developmentally, but aren't needed for production (e.g.- use the pre-built JavaScript files and there's no need to invoke the TS components).

In case it isn't pretty obvious, this is the biggest thorn in my side when it comes to Angular 2; the practically required, rather large "rogues gallery", just to get started with a simple "Hello World" example. This is a barrier to entry for learning, but I'm not here to gripe.

### A Learning Roadmap

In point of fact, learning "all these packages" means that we can more easily translate ourselves as developers into other development spaces, such as [native development with NativeScript](https://www.nativescript.org/nativescript-is-how-you-build-native-mobile-apps-with-angular), for one. While the wide quantity of tooling involved just to "get started" seems huge, once done, it will greatly add to a developer's tool set.

So far as I can tell, a developer who is setting out to learn about "all these things" for Angular 2, should follow a general progression of topics. It should also follow a certain order of precedence, which seems to revolve around cross-platform utility followed by sequence of (code) events (compilation/transpiling "order of operations", as it were).

Here's the road map, more or less, as I see it today.

{:.table .table-bordered .table-striped}
| Order | Lib/Package                                                   | What                                | Est. Time |
 | -----| ------------------------------------------------------------- | ----------------------------------- | ------------- |
| 1     | TypeScript                                                    | [Quick Start][1]                    | 10 min |
| 2     | ES6\*\*\*                                                     | [lukehoban/es6features][5]          | 20 min |
| 2     | TS tooling (like typings, tsd)                                | Read, try it out, repeat            | 5 min\* |
| 3     | Package/module bundling (systemjs, webpack, browserify, jspm) | Pick one, hope for the best         | 5 min\* |
| 4     | Angular 2 (concepts/101)                                      | [The 5-min TS Quick Start][2]       | 5 min\* |
| 5     | Angular 2 (more in-depth)                                     | [The "Tour of Heroes" tutorial][3]  | 60 min\*\* |
| 6     | Angular CLI tool (to help scaffold projects)                  | [Angular CLI][4]                    | 10 min |

\* Note: my time estimates are for the linked quick starts, tutorials, or reading and basic comprehension. I've no expectation of becoming a master in any of these subjects of tooling any time too quickly.

\*\* The Angular 2 "Tour of Heroes" tutorial is currently only available for TypeScript, which is fine by me, but seeing how I'm using 2.0.0-rc2 (at the time of this writing), it struck me as odd that I'd be making use of the router from `@angular/router-deprecated`; apparently the documentation needs to be updated for the new router introduced in 2.0.0-rc2. Also, I'm having a tough time gauging how long the "Tour of Heroes" tutorial took, as I took about 10-15 minutes at a time to plunk away at it, over several different sessions.

\*\*\* ES6(/ECMAScript2015) isn't _strictly speaking_ necessary, but it is the future of JavaScript, which things like TypeScript will (eventually) compile into. I'd recommend that even if you don't want to "dive into" ES6 now, that's okay, but you may wish to familiarize yourself with [what's new in ES6](https://github.com/lukehoban/es6features). Generally speaking, when starting a new project, we're faced with an option of using **either** ES6(+), via [babel](https://babeljs.io/), _or_ [TypeScript](https://www.typescriptlang.org/).

I skipped over the [rxjs](https://npm.im/rxjs) package, mostly on account of the fact that the Angular 2 "5 min Quick Start" didn't seem to cover it directly, other than for configuration (in the `systemjs.config.js` file, which is to tell `systemjs` how to handle the `rxjs` package. Something of note: rx.js seems pretty fantastic, as it creates "observables", which are really async-ifying your normal process; think of it as a library akin to lodash, for the ES6 age. For a great introductory on what rx.js is or can do, check out the (free) video from egghead.io [What is RxJS?](https://egghead.io/lessons/rxjs-what-is-rxjs).

[1]: https://www.typescriptlang.org/docs/tutorial.html
[2]: https://angular.io/docs/ts/latest/quickstart.html
[3]: https://angular.io/docs/ts/latest/tutorial/
[4]: https://cli.angular.io/
[5]: https://github.com/lukehoban/es6features

### Personal Observations

I've been playing with Angular 2 a little bit now, not as much as some in the community, but it has been my observation, that while I'm generally a ready-to-adopt, or at least a willing-to-try-out, sort of developer, my struggles with "getting" Angular 2 revolve specifically around:
- understanding all the different imports and dependencies needed up-front (for normal app-dev workflow)
- understanding component style development (it's new-ish to me, I'm glad I tried out [vue.js](https://vuejs.org/) first, as it wasn't "foreign")
- understanding ES6- or TS- specific syntax
- project setup is a 'bear'\* (see the first bullet)

\* So much so, that even [the Angular team created a CLI tool](https://cli.angular.io/) to help automate the tasks involved.

### Angular CLI Tool

The Angular team created a CLI tool that can help scaffold out, perform local serving with live reload, and distributable and deployment tasks. They do a good job of [outlining the steps to get setup with their documentation](https://github.com/angular/angular-cli#table-of-contents), but honestly I might recommend the [scotch.io tutorial](https://scotch.io/tutorials/use-the-angular-cli-for-faster-angular-2-projects) as it's a bit more approachable for those feeling the [JavaScript fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4#.owoxcwpe9). As a loose analogy, this amounts to a well structured [Yeoman generator](http://yeoman.io/generators/) with a well structured gulpfile. If you want to see what that looks like, check out [the video](http://localhost:3000/self-promotion/ni9-connect-highlights-and-mwlug-announcement/#the-video) from my [latest Notes in 9, #191](http://www.notesin9.com/2016/06/28/notesin9-191-a-beard-an-app-and-a-blender/).

### Summary

Angular 2 is now available as [RC4 (release candidate 3)](https://angularjs.blogspot.com/2016/06/rc4-now-available.html), meaning that it is soon to hit full version 2.0. I had personally held off on Angular 2 for a while, as I believe many have, just to allow myself to catch up on all the other things I'm trying to shove into my own head (knowledge, nothing crazy now). Now is the time, at least if you wish to learn on the early side of things. It's my belief that the doors Angular 2 is opening, due in no small part to its embracing of TypeScript and the NativeScript implications, that Angular 2 will only grow in relevance.
