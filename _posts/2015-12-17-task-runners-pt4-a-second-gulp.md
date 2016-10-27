---
layout: post
type: post
title: "Task Runners pt.4: Another Gulp"
description: "more refreshing"
category: web
series: task-runners-with-domino
tags: [grunt, gulp, git, scm, static, generator]
modified: 2015-12-17
comments: true
share: true
---

{% include series.html %}
{% include toc.html %}
### Intro
Last time, we covered how to install, configure, and use gulp to automate some useful tasks and how gulp is differentiated from Grunt. Some of those differences were specific to "piping" task actions through each other, is a bit more succinct, embraces streams which let the async capabilities take off, and the available plugins make the `json-server` back-end mock (or reverse proxy to Domino Designer local web preview or development server) easy to invoke for continuous use while in ongoing development, or for one-off build commands (`gulp` vs `gulp build`, or other individual tasks).

### Taking It Further
Last time I attempted to answer the question of "where is this all going?" with a focus on answering some of the greater automation concerns that have been on my mind. In fact, I've recently been making greater strides towards automating XPages application builds in no small part thanks to the [Swiper](https://github.com/camac/Swiper) and [BuildXPages](https://github.com/camac/BuildXPages) efforts by [Cameron Gregor](http://www.gregorbyte.com/). Cameron has been helpful in answering the occasional question as well, adding him to the list of people I would enjoy purchasing a beverage for in-person, should the opportunity arise.

### TL;DR
Here's [the link to my current `Gulpfile.js`](https://gist.github.com/edm00se/d97ebd52fcc516c78bdf#file-gulpfile-js) as of this writing.

### Tasks Galore
Moving ahead, it would be remiss if I didn't cover some more of my `Gulpfile.js`, so in the effort of completing the immediate picture, here's a collection of more of my tasks, broken apart for description.

#### Requirements
The only thing special here is the configuration in the "server" handle to load the specifics to the `json-server` setup, covered previously.

{% gist d97ebd52fcc516c78bdf 01-requirements.js %}
<br />

#### JSHint
As previously covered.

{% gist d97ebd52fcc516c78bdf 02-jshint.js %}
<br />

#### Build JS
This is what builds the source files into a single app `scripts.js` (it's a Single Page Application output, in a multi-page app we would follow a per-page requirements pattern), which is concatenated and uglified. The special note here is that `ngAnnotate` package is used to account for the AngularJS dependency injection; this was surprisingly easy to set up the first time. I've left in a comment showing how one could not uglify while in development based on an environment variable.

{% gist d97ebd52fcc516c78bdf 03-buildJs.js %}
<br />

#### CSSMin and Optimize HTML
Concatenation and minification of CSS and separately optimizing of HTML assets (white space removal, unnecessary comments, etc.).

{% gist d97ebd52fcc516c78bdf 04-cssmin-html.js %}
<br />

#### Dynamic Injecting Assets Into Index
This is one of the more interesting tasks, as it injects into the final built `index.html`, making re-defining paths to development versus production built assets automated (after the first-time config).

{% gist d97ebd52fcc516c78bdf 05-injectIndex.js %}
<br />

#### Clean
Before each generation, we need to clean the final build path of previous versions, using clean.

{% gist d97ebd52fcc516c78bdf 06-clean.js %}
<br />

#### Watch
Watch is the task that "watches" for file changes in the specified (source) files and triggers additional behavior as-needed.

{% gist d97ebd52fcc516c78bdf 07-watch.js %}
<br />

#### Json-Server
I've defined the start and reload actions as separate tasks, making it easy to trigger a re-load on any other task.

{% gist d97ebd52fcc516c78bdf 08-jsonServer.js %}
<br />

#### Browser-Sync
Browser-sync is initialized with a proxy to my localhost on port 3000, `json-server`, with a port configuration for the remote debugging to a different port; the default of 8080 was interfering with a Jenkins instance on a machine I was working from. Additionally, I have another reload task for easier hooking from other tasks.

{% gist d97ebd52fcc516c78bdf 09-browserSync.js %}
<br />

#### Build and Default
My build task generates the assets and performs all the tasks I would want done if I were to do so without having a local mocked preview; aka- just build the assets and no funny business. This also makes it easier long-term to perform such tasks in a build pipeline. The difference in this task is that, since some of the tasks depend on others finishing before they run, I'm using [run-sequence](https://github.com/OverZealous/run-sequence) to achieve that. For the default, where I expect the local preview and browser-sync to run, is added to the 'build' task.

{% gist d97ebd52fcc516c78bdf 10-build-default.js %}
<br />

### Summary
As you can see, things have gotten more complex, but that's only because I wanted to do more things with gulp. I've found that the more I use Grunt and gulp, the more I want to keep a "grab bag" of likely tasks that require little additional fiddling, which speaks to the benefits of keeping to a convention of project structure between projects.

I will be working the themes of testing and hooking into build automation further down the road. These topics also play directly into [my IBM Connect 2016 session](https://www-950.ibm.com/events/global/connect/sessions/preview.html?sessionid=AD-1380), which I hope to see everyone at. I'll have a proper session announcement post later on as well. Until then, :beers:!

#### GitHub
I've also taken my working copy of the front-end assets I've been testing with along with my `Gruntfile.js`, `gulpfile.js`, and `package.json` and put them into [a GitHub repository](https://github.com/edm00se/Task-Runners-With-Domino).
