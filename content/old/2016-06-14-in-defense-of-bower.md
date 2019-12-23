---
layout: post
type: post
title: "In Defense of Bower"
description: "and exploring npm in replacement of its front-end dependency management"
category: web
tags: [node, npm, bower]
modified: 2016-06-14
comments: true
share: true
---

{% include toc.html %}
### Where It Began

Recently, I saw yet another in a progression of people publicly denouncing the virtues of [Bower](http://bower.io/). This time, it came in the form of a tweet from [Kent C. Dodds](https://medium.com/@kentcdodds), who is fairly prominent JS developer, who I follow on [Twitter](https://twitter.com/kentcdodds) and [GitHub](https://github.com/kentcdodds), after stumbling across him on some [egghead.io](https://egghead.io/) videos. He's usually at the front line of the web development side of things, so he's got a few [interesting project](https://github.com/kentcdodds/dt-script-loader)s and usually is pretty insightful into the direction of where things are going. Some lightweight stalking (viewing his SO profile) says that he's a "full stack JavaScript engineer", which I believe provides some context to Mr. Dodds's perspective.

#### The Tweet
{% include tweet.html id="739938603187343360" %}

I took the tweet with a grain of salt and even refrained from tweeting some snark back (see that Internet? self-restraint _is_ a thing); although that didn't keep me from musing on comparing tools in my own tweet later on. That's not to say that he doesn't have a point, but Twitter's 140 character limit is a pretty lightweight medium for what is, IMO, a pretty complex comparison.

{% include tweet.html id="739979758411386880" %}

Mr. Dodds is a rather talented developer whose projects and ongoing efforts are noteworthy, I just felt he _may have skipped over a something in the name of progress_. What I felt was missing was all the _good_ things about bower. This post explores the relevance of bower, the complexities involve in comparing bower and npm for front-end dependencies, and will not further mention Mr. Dodds after this paragraph; although I will plug his (updated) [slide deck on ES6 modules](http://slides.com/kentcdodds/es6-modules), which came up recently.

### Bower, I Know That, Right?

In case you've been living under a rock, [bower](https://bower.io) is a package manager meant for web libraries/frameworks. It runs on top of [Node](https://nodejs.org/) and installs via [npm](https://npm.im/bower). To make a long story short, with bower, you can:

- install (front-end) dependencies
- at either the latest, or specified, version
- save the dependencies to a config file (`bower.json`)
- specify the destination (where the dependencies install to, via the `.bowerrc` file)\*

If this is new to you, you can probably see some pretty obvious advantages, such as the ability to keep libraries outside of your application's project repository (e.g.- exclude from commiting into your git repo), easily install dependencies "from scratch" (by the single config file) on-demand and with consistency. This all plays into the higher order processes involved with build automation and continuous deployment concerns.

Note\*: That last bullet above, the setting of the destination path for libraries, is where I think there is a delineation in approach that some chatter of late, around the implementation of dependency management, hinges upon.

If you _have_ been living under that proverbial rock and would like to to see what bower can do, check out this quick (and free) episode from [egghead.io](https://egghead.io), [an introduction and setup of bower](https://egghead.io/lessons/bower-introduction-and-setup).

### What Other Dependency Management Options Are There?

As many have espoused of late, [npm](https://npmjs.com) is a package manager, which many use to install bower in the first place. In fact, the [npm blog has covered the recent explosion of front-end dependency management and talked specifically](http://blog.npmjs.org/post/101775448305/npm-and-front-end-packaging) about how `npm` is pretty agnostic when it comes to JavaScript packages, be they front-end or server packages. This should be acknowledged, as I've been under an impression that I believe many have (had) about what `npm` installs, as far as packages.

If I [we look at the notes for the phantomjs-prebuilt package on npm](https://npm.im/phantomjs-prebuilt#a-note-on-phantomjs), we can see something to support this perception; specifically a note regarding the fact that the `phantomjs-prebuilt` packages is "npm wrapper", for installation purposes, and not in any way a "node wrapper", as it doesn't expose [a Common JS package loader](http://wiki.commonjs.org/wiki/Packages/1.1). Again, this is something that npm, strictly speaking, "doesn't care about", as it can and will successfully install the package; it just won't be directly usable via commonly accepted (a la Common JS) `require('package-name')` statement.

Making use of `npm` has some advantages, as there have been some significant efforts put into making `npm` v3's dependency resolution more robust. They've [blogged about this topic](https://docs.npmjs.com/how-npm-works/npm3) and it's worth the read, as they lay out the differences from v2 and how peer dependencies play into things. The dependency resolution abilities are honestly something that's pretty impressive, especially compared to a "flat" dependency tree.

I'll also highlight that not everyone that uses bower uses node as their back-end. In fact, it's my belief that the majority of the holdouts not jumping ship off the bower boat are those that _aren't_ using Node for their back-end, at least in production. This is certainly how it works for me most of the time at the day job, as the only real usefulness the added tooling gives me is a configuration and automation over the manual effort of downloading a given lib's assets and installing them into a given project directory. If you're using Node as your back-end, using npm and something like [browserify](http://browserify.org/) (or [webpack](https://webpack.github.io/), [jspm](http://jspm.io/) + [system.js](https://github.com/systemjs/systemjs), etc.) makes really good sense to me, especially as you're already investing into the dependencies contained within `node_modules` beyond development tooling.

So, does "using `npm`" give you as much and more than bower? I'm actually inclined to agree, but there's the caveat of if you need/want/will-use those features; if not, _bower does a perfectly decent job with little fuss and shouldn't be vilified_.

### Using NPM To Load Front-End Assets

I'm accustomed to using `gulp` for some of my tooling, which makes use of [wiredep](https://github.com/taptapship/wiredep) to find the specific html comments in my `index.html` to dump in my known CSS or JS files (from `bower.json`). This also makes it easy to have a placeholder for the distributable version of the libraries, when it comes time to ship to production (after a concatenation of the minified libraries into combined vendor libs). This is convenient and relatively easy to adopt and follow.

Choosing to use npm for all your project dependencies has the merit of eliminating _yet another_ package manifest. If you're using Node based tooling, you (should) already have and be storing your `package.json` with your repository.

To proof out a bit of the "npm path" as far as managing front-end dependencies, I threw together a simple and straight-forward comparison project, which you can [find on GitHub](https://github.com/edm00se/bower-vs-npm-dep-compare). It doesn't use gulp or grunt, but rather relies on the `npm run` scripts, defined in the `package.json`. This should help to reduce some of the potential complexity for people just looking to try it out.

Using `npm` for front-end dependency management is about as simple as installing the dependency as you would for any `npm` package, and saving it to your `package.json`. Since these are direct dependencies to be used  by your application, they should be saved to the "dependencies" block, not the "devDependencies" block. This is done via either `npm install --save <package-name>` or `npm i -S <pkg-name>` for those who like abbreviated commands. Once done, the dependencies won't exist in a separate `bower_components` directory, but rather the `node_modules` directory, as anyone with any experience installing packages via `npm` would expect. As far as the file tree goes, this is an equivalent level of things, so to directly use the libs, they must be referenced to (in development) a "level up" above an assumed `app/` or `src/` path inside the main project directory (at an equivalent level); aka- `<script src="../node_modules/bootstrap/dist/js/bootstrap.js"></script>`.

Here's the thing, _if you're like many developers out there_, thats' exactly how the folder tree would match up with your `bower_components` relative path. For those of us that work on rather specific/proprietary application stacks, we may have gotten sloppy at some point in the past and, instead of doing it this way, relying on _something_ (a task runner or build/dev pipeline of _some_ sort) to copy or build the dependencies into the production (aka- `dist/`) path for non-development use, there may be some people out there configuring their installation path to something else. In fact, it might look a lot like [an edit to the `.bowerrc` file](https://github.com/edm00se/AnAppOfIceAndFire/blob/master/.bowerrc), in which a person can specify a different destination/install directory from the `bower_components` default. This is also why many people out there may not see the obvious disconnect between bower and npm for front-end dependency management, as this alternate install path can make things pretty analogous to an automated method by which to install packages. The example I linked to can/does run on a server (Domino server with the XPages runtime) that allows for full concatenation and minification of client-side assets, so doing it this way doesn't make much of a difference. Doing it this way means that you can just pull in any asset by the usual `lib/some.js` approach and continue with your development without any hassle.

In any case, I'm going to assume we're _not_ using the above outlined, non-standard destination path for the bower install, so this should keep things pretty analogous. It also means that you've been a good developer and optimizing (all) your client-side assets. If that's the case, they which folder you keep them in is pretty irrelevant, the only question becomes how to load them into your front-end. We definitely do _not_ want to expose our `node_modules` path to the whole web and any traffic that comes through, as even if you're _only_ using `node_modules` to store client-side assets, it's such a horrific concept that I'm not going to take it as a viable option. It also means we need a way to load up these assets, or "copy them" to our distributable app path.

#### Module Loading... in the Browser

If you're not accustomed to them, now only has there recently been an explosion of front-end and JavaScript frameworks/libraries/utilities/etc. We've seen the rise of [TypeScript](https://www.typescriptlang.org/) and [ECMAScript6](https://github.com/lukehoban/es6features) usage, the latter often enabled via a transpiler like [babel](https://babeljs.io/). With the exception of ES6 which does have 90%+ support from the latest builds of Chrome and FireFox, a transpiler is required for full compatibility amongst the usual browser crowd; as well as necessary for TypeScript in the first place. Since many more advanced front-end frameworks now require some combination of these things, that means that we can reap the benefit of their efforts.

There are tools out there, like [browserify](http://browserify.org/), [webpack](https://webpack.github.io/), and others, which seek to aid us in our dependency loading tasks. I'm presently most familiar with browserify (which does a good job of giving us access to our dependencies via a simple `require` statement, just like we would on a Node back-end), but we're concerned with the front-end, the browser. The example and tutorial for Angular 2 makes use of [system.js](https://github.com/systemjs/systemjs#browser), which aims to have some pretty compatible loading capabilities for use in the browser. It's loaded like any normal JS file, it's configured with a base url (path to the dependencies), and receives the dependencies via an import command. It lets you specify a transpiler, such as babel (and the Angular 2 tutorial with TypeScript makes use of it), to hook in at the right points and make things easier for us. All in all, we have plenty of options, and I'd love to see the dust settle on this battle of the tools, but I also would _prefer to advance my skill set sooner, so I'm picking one (okay two) and going for it_.

### Making Sense of When to Use What

As I mentioned, if all you're looking to accomplish is dumping some front-end libraries into a given project (or application) path, then bower can achieve that pretty easily, configured through its `bower.json` to define dependencies and `.bowerrc` for the path (if you're putting it out directly to your app path). The comparison of the two looks, to me, to hinge upon the tenant that _we shouldn't be dumping our front-end libraries directly into our application path_. Using minified CSS and JS is good, but there's a threshold at which the quantity of network requests incurred is too high of a tax on browser/DOM load times and performance, leading to the inevitable conclusion that a build pipeline or task runner is necessary, to optimize those assets to their fullest. If we take that as granted, then _the source of our dependencies is irrelevant, so we should embrace the best tool for the job_.

What the comparison of bower with npm should highlight is a couple of specific things:

- listing our dependencies in a file (`bower.json` or `package.json`) is relatively irrelevant
- so much of the future of JavaScript is within the use of ES6/+ and/or TypeScript and component driven frameworks (like Angular 2) in which the CommonJS / module format being the standard
- tools like browserify and webpack (and more) make the task fairly easy, regardless of how much you do or don't use a task runner or otherwise

### Summary

It's my belief that if you're resistant to learning something like how npm can play into front-end dependency management, that "a little learning can go a long way". It's not "better" for every use case, but it certainly opens the doors for most use cases going forward. Bower does a good job of accomplishing what it set out to do, it's just not the only tool in town.

Until next time, write better apps! 🍻
