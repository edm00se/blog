---
title: 'Task Runners pt.3: Gulp'
description: 'quite refreshing'
date: 2015-12-08
published: true
series: task-runners-with-domino
tags: ['grunt', 'gulp', 'git', 'scm', 'static', 'generator']
canonical_url: false
category: web
---

<!-- {% include series.html %} -->
<!-- {% include toc.html %} -->

### Intro

Last time, we covered how to install, configure, and use Grunt to automate some common web optimization tasks to aid our development workflow. There was a lot to cover and I'm about to segue to a different tool (which performs the same function), which has a couple specific gains beyond some other niceties; I'll get to those in a bit. For now, hang on and enjoy the ride.

### Why Use Gulp

So, you may be wondering, why use gulp as opposed to Grunt? Honestly, if you're familiar with one already, go with what you know; they're both rather awesome and gulp, while newer, is gaining popularity enough to rival Grunt in its presence. As for the specifics, gulp set out to "right some of the wrongs" of Grunt. This isn't to say Grunt has anything wrong with it, but Grunt generally uses a certain verbosity in plugin loading and configuration defintions. While Grunt's task configurations are callback function/object heavy, gulp adds functionality in pipelines.

Gulp makes use of Node streams. If you want to dig into why this is important for how gulp handles tasks, [be my guest](https://jaysoo.ca/2014/01/27/gruntjs-vs-gulpjs/#streams-all-the-way-down). I can also tell you that Grunt has many more plugins they've built and maintained in their core (the `grunt-contrib-...` packages) and gulp has taken a different approach. So, what's the big draw?

Gulp made it easier for me to load my `json-server` instance and continue interacting and building via my other tasks with browser-sync integration. This certainly has much to do with the specific [json-server plugin](https://www.npmjs.com/package/gulp-json-srv) I'm using, but as my efforts with those in Grunt were (for the time being) futile, I'm good with moving on.

For me, it's come down to three primary reasons:

1. I can make my `json-server` instance behave nicely, for a single Terminal/CLI instance
2. I like the syntax of the gulpfile.js better
3. [it's flipping fast](https://tech.tmw.co.uk/2014/01/speedtesting-gulp-and-grunt/)

### Gulp

[Gulp](https://gulpjs.com/) advertises that they want to help you "automate and enhance your workflow", which I believe both Grunt and gulp do, but gulp certainly has caught my attention.

#### Installing

Like Grunt, gulp is Node-based and installable via npm. You can install it (globally) with `npm install -g gulp`; to install it into a project (as a development dependency, which you should do), we drop the global flag and add the save-dev flag, as such `npm install gulp --save-dev`. The latter will save it into the `package.json` which ensures that any cloning of the repository will easily ensure its availability, with any dependencies, via `npm install`.

#### Gulpfile Basic Structure and Example

As before, I'll focus mostly on the jshint plugin for demonstrative purposes, then I'll combine things at the end to compare my `Gruntfile.js` and my `gulpfile.js`.

Here's a barebones followed by a basic implementation.

``` javascript
var gulp = require('gulp');

gulp.task('default', ['someTask', 'anotherTask']);
```

That level of simplicity after the `Gruntfile.js` business was something I found quite refreshing (sorry, I had to work it in somehow). To get started with gulp and jshint, we need to install jshint to be available as a plugin, again via npm with `npm install gulp-jshint --save-dev`. My basic example includes [gulp-util](https://github.com/gulpjs/gulp-util), which is an excellent package to help with interacting with plugins and the console's output; you'll need to either install that with `npm install gulp-util --save-dev` or ignore it (and remove its corresponding require line).

https://gist.github.com/edm00se/08bedba23919af3e1c138f0c048583ac#basic-gulpfile.js

Here, as you can see, even with defining my 'default', 'jshint', and 'watch' tasks, things are kept fairly simple. The file only truly loads any dependencies and registers tasks; that's it. I hope you're catching on to why I prefer gulpfile syntax.

#### Executing Gulp

As shown with Grunt, we can invoke a specific task or run the default without arguments. For example `gulp` will runn all specified tasks for 'default' versus `gulp jshint` will only run the 'jshint' task.

#### Expanded Example

Here's the expanded example, with the same 'jshint', 'watch', and 'browser-reload' tasks. It _also_ has my `json-server` implementation, since my Grunt implementation had me running it as a background task. We again need to install the additional dependent packages of 'gulp-json-srv' and 'browser-sync' (if that isn't already installed from the last post). Again, these packages are listed in the `package.json` I provided in the first post, so if you have run `npm install`, you'll pick up on them.

https://gist.github.com/edm00se/08bedba23919af3e1c138f0c048583ac#expanded-gulpfile.js

#### Comparing Gulp and Grunt

Here's an example of my 'jshint' task running in both Grunt and gulp. As you can see, there's not a lot of difference at this granular level. I believe this is a credit to both implementations.

Note: I took the default formatting for jshint in both Grunt and gulp, which is why they look so different. I can template the output differently, but didn't for brevity.

![jshint in both Grunt and gulp](./images/task-runners/jsHintGruntVsGulp.gif)

### Direction

Where this is all headed is something I'll get into soon. To round out the picture, I want to:

* check my client-side code (jshint)
* uglify/minify and join (concatenate) my front-end JS assets (vendor libraries then custom app content)
* minify and join (concatenate) my CSS files
* minify / collapse white space on HTML files
* document my code
* provide the the above as the "build" of my app to the published application
  * keeping the "source" separate from the production app
  * after having tested the app to make sure it didn't break on its way to production

Where there are gaps, there will be more coming soon.

### Summary

You may have noticed, if you've familiarized yourself with my MWLUG slide deck (or had the benefit of attending my session) that many of the same themes about delivering optimized content were core to what I was demonstrating with my Nginx + PageSpeed reverse proxy. While a reverse proxy can add this functionality after-the-fact (which is a very powerful baseline), it doesn't solve the fact that the reason for these optimizations is to reduce runtime execution. Pre-building your content is the best way to ensure that your users will load their optimized content.

#### Recommended Reading

If you're looking to read up more on these tasks, I recommend checking out the scotch.io tutorial ["A Simple Guide to Getting Started With Grunt"](https://scotch.io/tutorials/a-simple-guide-to-getting-started-with-grunt) and their equivalent ["Automate Your Tasks Easily with Gulp.js"](https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js) tutorial. [Egghead.io](https://egghead.io/) has some videos, including a couple free ones, on [using Grunt](https://egghead.io/technologies/grunt). HTML5rocks.com also has a tutorial on ["Supercharging your Gruntfile"](https://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/) _or_ if you're having trouble with the concepts outlined here, check out ["Grunt for People Who Think Things Like Grunt are Weird and Hard"](https://24ways.org/2013/grunt-is-not-weird-and-hard/).

#### Related Topics

Some people go a level beyond for various reasons. There are those that like to write their stylesheets in a language that compiles down into CSS (like [LESS](https://lesscss.org/) or [Sass](https://sass-lang.com/)). While I generally find the idea to be a bit odd, the ability to set certain values as re-usable variables (like Bootstrap does) or use mix-ins is somewhat compelling. The same principle is applied to JavaScript, as [CoffeeScript](https://coffeescript.org/) and [TypeScript](https://www.typescriptlang.org/) compile into JavaScript, and [Dart](https://www.dartlang.org/) _can_ be compiled to JavaScript. Each of these tasks can be added in as a task to Grunt or Gulp, so for those that want to use them, it's advantageous.

### To Be Continued...

...in part 4.
