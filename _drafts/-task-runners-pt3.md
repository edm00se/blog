---
layout: post
type: post
title: "Task Runners pt.3"
description: "a refreshing gulp"
category: web
tags: [grunt, gulp, git, scm, static, generator]
modified: 2015-11-05
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

{% include task-runners-series.md %}

### Intro
Last time...

### Gulp
asdf

#### Install Dependencies
asdf

#### Example Gulp Config
asdf

#### Executing Gulp
asdf

### Summary
You may have noticed, if you've familiarized yourself with my MWLUG slide deck (or had the benefit of attending my session) that many of the same themes about delivering optimized content were core to what I was demonstrating with my Nginx + PageSpeed reverse proxy. While a reverse proxy can add this functionality after-the-fact (which is a very powerful baseline), it doesn't solve the fact that the reason for these optimizations is to reduce runtime execution. Pre-building your content is the best way to ensure that your users will load their optimized content.

#### Recommended Reading
If you're looking to read up more on these tasks, I recommend checking out the scotch.io tutorial ["A Simple Guide to Getting Started With Grunt"](https://scotch.io/tutorials/a-simple-guide-to-getting-started-with-grunt) and their equivalent ["Automate Your Tasks Easily with Gulp.js"](https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js) tutorial. [Egghead.io](https://egghead.io/) has some videos, including a couple free ones, on [using Grunt](https://egghead.io/technologies/grunt). HTML5rocks.com also has a tutorial on ["Supercharging your Gruntfile"](http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/) _or_ if you're having trouble with the concepts outlined here, check out ["Grunt for People Who Think Things Like Grunt are Weird and Hard"](https://24ways.org/2013/grunt-is-not-weird-and-hard/).

#### Related Topics
Some people go a level beyond for various reasons. There are those that like to write their stylesheets in a language that compiles down into CSS (like [LESS](http://lesscss.org/) or [Sass](http://sass-lang.com/)). While I generally find the idea to be a bit odd, the ability to set certain values as re-usable variables (like Bootstrap does) or use mix-ins is somewhat compelling. The same principle is applied to JavaScript, as [CoffeeScript](http://coffeescript.org/) and [TypeScript](http://www.typescriptlang.org/) compile into JavaScript, and [Dart](https://www.dartlang.org/) _can_ be compiled to JavaScript. Each of these tasks can be added in as a task to Grunt or Gulp, so for those that want to use them, it's advantageous.