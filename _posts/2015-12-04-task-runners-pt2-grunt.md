---
layout: post
type: post
title: "Task Runners pt.2: Grunt"
description: "the noise we make running some tough tasks manually"
category: web
series: task-runners-with-domino
tags: [grunt, gulp, git, scm, static, generator]
modified: 2015-12-04
comments: true
share: true
---

{% include series.html %}
{% include toc.html %}
### Intro
Last time we covered what task runners are and why we should want to use them. Today I'm going to cover some of the foundational elements of using [Grunt](http://gruntjs.com/).

### Task Runners of Note: Grunt and Gulp
The two most common and well known task runners (though there are [others, of course](http://blog.cozycloud.cc/technic/2014/06/18/task-runners-comparison/)) are currently Grunt and gulp. There is a fair amount of overlap in what they seek to accomplish, but as with many open source projects, where they differ is in implementation and intent. Grunt has been around for a while and took the approach of including some common, core tasks with plugins added over time. Gulp addressed some of the concerns about including certain version of tasks as part of a core by taking the approach that every task is a plugin, eliminating versioning concerns, and all tasks are piped through each other (it reads like a whole lot of chain loading), and gulp makes use of streams (an entire subject in and of itself I won't get into). A decent walk through of the history of these task runners is a slide deck from a presentation called [Build Wars](http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt/) and is a decent read.

#### A Word of Warning
Many projects take the opinion that source (non optimized) files should be in a combination of `vendor/` (or `lib/` as I used) and `src/` (or `source/`) paths. This has a general benefit of making it easier to keep track of what resources are from where, and that any built (optimized) files would reside in a potential `dist/` path (or equivalent), for consistency. This isn't always the case, especially with the default location of CSS and JavaScript files in an NSF (`Resources/StyleSheets/` for CSS, `Code/ScriptLibraries` for JavaScript (client-side having .js extensions, vs SSJS having .jss), and images in `Resources/assets/images/`). It is my recommendation that if you keep your source files in these default locations, to have your `build/` or `dist/` path be in the `WebContent/` path for ease of separation.

The code base from my "follow along at home" git repository keeps all my source files in `WebContent/` in subdirectories of `css/` and `js/` with my 3rd party libraries in `vendor/`, so I'll compile my source files (only) into a `dist/` path at the root of `WebContent/`.

Enough talk, time for some configs.

### Grunt
<!--
The plugins we'll be using are:

{:.table .table-bordered}
Plugin |	Description
------ | -----------
[contrib-jshint](https://www.npmjs.org/package/grunt-contrib-jshint)		|	Validate files using jshint
[jshint-stylish](https://www.npmjs.com/package/jshint-stylish)  			| Stylish reporting for jshint
[contrib-uglify](https://www.npmjs.org/package/grunt-contrib-uglify)		|	Minify JS files using UglifyJS
[contrib-watch](https://www.npmjs.org/package/grunt-contrib-watch)			|	Run tasks whenever watched files are changed
[contrib-clean](https://www.npmjs.org/package/grunt-contrib-clean) 			|	Clean up files and folders
[contrib-copy](https://www.npmjs.org/package/grunt-contrib-copy) 			|	Copy files and folders
[contrib-concat](https://www.npmjs.org/package/grunt-contrib-concat)		|	Combine files into a single file
[contrib-cssmin](https://www.npmjs.org/package/grunt-contrib-cssmin)		|	Compress CSS files
[contrib-imagemin](https://www.npmjs.org/package/grunt-contrib-imagemin)	|	Minify PNG, JPG, and GIFs
[contrib-htmlmin](https://www.npmjs.org/package/grunt-contrib-htmlmin)		|	Minify HTML files
-->
[Grunt](http://gruntjs.com/) is a "JavaScript task runner", which runs on top of Node and is installable from npm via `npm install -g grunt-cli` for a global installation or `npm install grunt-cli --save-dev` for installation into your current project and saving as a development dependency in your `package.json`.

The Grunt officially maintained plugins use the `contrib-<name>` convention, which generally relate to `grunt-contrib-<name>` [on GitHub](https://github.com/gruntjs/).

#### Install Dependencies
To install the plugins that we'll be depending on, one should install via npm, such as `npm install grunt-contrib-uglify --save-dev`. The last flag specifies that it's a development dependency as opposed to a primary dependency, and saves that information into the `package.json` file. This should be repeated for the package "grunt" and every plugin listed above, but I've already done so for each of these and added it to the `package.json`, so earlier when you ran `npm install`, it included these already. Okay, if you downloaded that file in post 1 (intro), you'll be a little behind. If you left the git remote connection, you'll want to bring in the latest version, so change directory to the project and perform a `git pull origin master` or just [download the latest version here](https://raw.githubusercontent.com/edm00se/AnAppOfIceAndFire/master/package.json).

#### Example Grunt Config
We need to create a file called `Gruntfile.js`. Inside, we will build out the config to define the configuration, load the plugins, and establish the tasks we define, all of which will be wrapped in a function we export as a module. Using solely the jshint (jshint-stylish) plugin as an example, here's a basic structure:

Now that we have the structure, we need to populate our configurations and tell our tasks (one shown) what to run. The task 'default' corresponds to invoking `grunt` with no parameters; if a task by another name is specified (e.g.- 'dist'), it will invoke the operations for that task.

You can see that this can quite powerful rather quickly. Any tasks that we we want to take can be automated using some simple, well thought out configurations. Provided we stick to some standardized rules, we can have consistently automated tasks which require minimal input to invoke.

It's easier to keep your static web assets in `WebContent/` in corresponding paths for images, stylesheets, etc., but with some careful configuration, you can work with the "normal" Domino Designer resource paths in the ODP. Those corresponding paths are:

{:.table .table-bordered}
Resource    	|	Path
------ | -----------
Images			|	`NSF/Resources/assets/images/`
Style Sheets	|	`NSF/Resources/StyleSheets/`
JavaScript 		|	`NSF/Code/ScriptLibraries/`

Note: for the JavaScript files, be careful to only specify those JS scripts that end in `.js` and avoid any that end with `.jss` as the latter are SSJS libraries. You _can_ run operations against those files, but I'm not going to cover the details and nuances of doing so here (aka- you can have at it, but it's not something I'm focusing on, as they're server-side assets).

#### Executing Grunt
Finally, how do we use this thing?

To execute grunt at its most basic, we run from the command line `grunt`. This invokes the 'default' task, which is assumed to exist. We can also invoke a specific task like so, `grunt default`, which again would invoke the 'default' task, but you can see where that leads.

You can define additional tasks to cover different use cases; one you may see come up quite a lot is the difference between development and linting/hinting for development purposes versus staging for deployment, etc. One of the biggest complains about a `Gruntfile.js` as it becomes increasingly complex is that it can be highly verbose. I'll come back to this thought.

#### General Gruntfile.js Layout
A `Gruntfile.js` is a JavaScript file. It starts with the following:

```javascript
module.exports = function(grunt) {
	// all content in this module export block
	// which injects grunt as a passed object
}
```

Now, inside our module export function, we invoke `initConfig` on the grunt handle and pass it an object defining our tasks by name and their respective configuration object.

```javascript
//...
grunt.initConfig({
	// configure the object passed back with task definitions

	taskName: {
		// config object for the task
	}

});
//...
```

Now we need to register the npm module (the tasks we're using that are development dependencies in our `package.json`) so it can be available as a task. The names correlate, so if you're using a grunt plugin for the first time, make sure to check the readme, which should tell you to install the plugin (`npm install some-package --save-dev`, the last flag saves it to your `package.json`) and then do the appropriate `loadNpmTasks` with documentation on how to configure the task. Here's an example `loadNpmTasks` call:

```javascript
grunt.loadNpmTasks('grunt-contrib-jshint');
```

Lastly, we register the custom tasks so we can access them from the command line (or the 'default' for the generic `grunt` call). From the below example, `grunt` invokes 'default', but running `grunt jshint` will work, running the configured 'jshint' task only. Think of this block as a custom defined superset of tasks.

```javascript
grunt.registerTask('default', ['jshint','other tasks you want to include in the default']);
```

Here's how it looks all together for a basic structure (just count to 5):

{% include gist.html id="43fcb3fcac536267440d" file="basicGruntfile.js" %}

#### Setting Up Our Tasks
So, hopefully by now your mind is awash with thoughts like:

* what can I plug into this?
* what _can't_ I plug in?
* what should / shouldn't I use in this process?
* how many different tasks should I include?
* how does one grow such a fine and manly beard?

Obviously I can't help you with that last one, but my recommendation, as with any new tool, is to start small with what you know, broaden your knowledge of available plugins, and expand from there. As far as I can tell, the tasks we can run with these runners are in one of the following flavors:

* assistive tasks to warn (JSHint, for instance) of human error in coding
* automate build tasks (minification/uglification of JS, minification of CSS, HTML white space collapsing)
* automate testing
* automate documentation
* automate miscellaneous other tasks

The possibilities are endless.

##### JSHint
Using JSHint as an example, you can see from the above embedded basic `Gruntfile.js` that the 'jshint' block was really just looking to establish what source files to look at and, as we added in a fancier styled reporter (not required, this gives some prettification to what's reported out in the command line), what to point at.

The warnings can/will still "fail" the task (at least gets in the way of continuing running other tasks), but you can configure it to ignore certain warnings if you scream at your screen "screw this! that's opinionated stylistic preference!". The warnings are worth taking seriously though.

As you can see, the warnings I'm getting are in regards to comparing `null`, booleans, or `undefined` with `==` when I should be using `===`, or a missing semicolon (after function definitions). While great ideas, these are warnings and not errors, so we can configure certain warnings to be suppressed, here's a `jshint` configuration that suppresses those warnings (assuming you're willing to write off those differences as "stylistic" and not needed):

```javascript
jshint: {
	options: {
		reporter: require('jshint-stylish'),
		'-W033': true, // mising semicolon
		'-W041': true, // use 'x' to compare with 'y'
		'-W004': true, // x already in use
		'-W014': true // bad line breaking before '||'
	},
	all: ['Grunfile.js', 'NSF/WebContent/js/*.js']
},
```

You can find the numeric codes from [jshint's messages.js](https://github.com/jshint/jshint/blob/2.1.4/src/shared/messages.js).

JSHint is a great place to start as it accomplishes some of the trickier tasks, achieves a great deal of benefit to a developer, and is easy to follow the moving parts for when it comes to understanding other task configurations.

##### Watch
If you're wondering if we can monitor our source JS files for changes and invoke the JSHint task again on a save event of the source file, then you're in luck. The watch task (specifically [`grunt-contrib-watch`](https://github.com/gruntjs/grunt-contrib-watch)) is made for just this "watch for save events on files" sort of behavior. Again, our goal is to install (`npm install grunt-contrib-watch --save-dev`), load (into the `Gruntfile.js`) and configure (the task) to point at certain files and trigger other concerned tasks in the process. Like this:

```javascript
// configure watch to auto update
watch: {
  scripts: {
    files: 'NSF/WebContent/js/*.js',
    tasks: ['jshint']
  }
}
```

Here's what [the resulting expanded Gruntfile.js ](https://gist.githubusercontent.com/edm00se/43fcb3fcac536267440d/raw/7b294ea62c84e0e921d32857b857b633ab6ac26c/basicGruntfile_expandedWithJsHintAndWatch.js) does for us:

<figure class="center">
  <amp-anim src="/assets/images/post_images/task-runners/watchAndJsHint.gif"
  alt="jshint throwing warnings and watching file saves"
  height="743" width="574"
  layout="fixed"></amp-anim>
 <figcaption>jshint throwing warnings and watching file saves</figcaption>
</figure>

##### Run a Server Task and Watch for Changes
A lot of grunt documentation will assume that you'll be working against some purely client-side assets, making the "server task" for development a simpler thing. Their docs usually show how to use a generic server task, but my preference is to replace that with the `json-server` instance we set up previously.

##### Watching for Changes and Reloading the Browser
Let's face it, we want even more automation. We don't _just_ want our files to be checked on save, we want something that effectively presses the refresh button in our browser after we do that same save. Not only is [this lazy](http://threevirtues.com/), but it's incredibly handy for rapidly prototyping codefor a browser while working split-screen.

There are two plugins worthy of mention. First is the [`live-reload`](http://livereload.com/) which was my go-to up until recently when I discovered [browser-sync](http://www.browsersync.io/) in a demonstration of gulp (don't worry, that'll come next time). A lot of IDEs and "smart" text editors like [SublimeText](http://www.sublimetext.com/) (my preferred editor for front-end and non-Eclipse and non-DDE work) support live-reload, but browser-sync works just as well and includes some more advanced features, so my coming config will reflect that.

Both of these have grunt plugins, making things a little easier.

* [grunt-contrib-livereload](https://github.com/gruntjs/grunt-contrib-livereload)
* [grunt-browser-sync](https://github.com/BrowserSync/grunt-browser-sync)

I'm also rather impressed with the level of documentation for browser-sync's plugins [for Grunt](http://www.browsersync.io/docs/grunt/) and [gulp](http://www.browsersync.io/docs/gulp/). Good documentation should never be under-appreciated. Why use browser-sync?

* it's easy to install and use
* can be used with a task runner or stand-alone
* gives us not just a simple server with sync capabilities for development and testing, but also can proxy other hosts
* syncs browser events across devices (all connected devices), via web sockets
* has a well polished UI for managing the instance and connected devices
* even has remote JS console debugging capabilities (awesome!), and yes, that works on things like Apple iDevices

Side note: for a stand-alone demo, install it via `npm install -g browser-sync` and then start up your proxy to a live and accessible site. It can be internal to your firewall or local to your host OS, provided all devices attempting to connect have visibility), then use the specified port to connect a device and the second specified port to connect to the management UI (they auto assign ports in the event 3000 or 3001 are taken. Example stand-alone command: `browser-sync start --proxy stackoverflow.com` (something like google.com performs redirects to prevent reverse proxying their site directly). Trust me, you'll like this if you haven't seen it yet 😃.

The browser-sync Grunt plugin lets us either run with a generic static file server or proxy a different one. Since my end result is to load `json-server`, I'll be taking the door leading to my proxied server. Here's the task configuration I have for the above:

```javascript
browserSync: {
  dev: {
      bsFiles: {
          src : [ 'NSF/WebContent/js/*.js' ]
      },
      options: {
          watchTask: true,
          proxy: 'localhost:3000'
      }
  }
}
```

Side note: everywhere in my `Gruntfile.js` task configuration blocks, you'll see I have a number of arrays containing a single string. If I know I have the option of multiple paths I can pass (like above), I always put them into an array, so I don't question it later on when I inevitably expand on the config.

##### Using Json-Server in Place of Default Server Task
The use of `json-server` we set up before has a lot of advantages in mocking our back-end, so losing that now would be a silly waste of an otherwise good tool. As you may also find, navigating the plethora of available grunt (or gulp) plug-ins is sometimes a bit tricky. For instance, there _is_ a [`grunt-json-server`](https://github.com/tfiwm/grunt-json-server) plugin, but it doesn't support the custom route and ID parameters that were added in more recent history. There's a fork as pointed out in [this issue](https://github.com/tfiwm/grunt-json-server/issues/7) that handles the routes, but that's only part of what I've done to set things up and I really don't want to rename all the `unid` properties in my `db.json` file.

So, I'm left with the option of delegating a child process to invoke my `json-server` as I attempted to do for about a week before realizing that I should quit messing around and just start it in a separate terminal window and let the browser-sync task just blindly proxy it on a known port.

What I ran into was that either the `json-server` instance wouldn't start correctly (I tried several variations and plugins, including [`grunt-run`](https://www.npmjs.com/package/grunt-run), amongst others). I'm sure there's a way of doing it, but I'm not seeing it currently as my last attempts would launch `json-server` but not trigger any of the watch task's actions. I moved on to my next big thing, but if anyone figures out a seamless way of pulling it off, I'd be curious to see how you incorporated it.

I initially intended to walk through every bit of my configuration, but instead I'll leave you with a (very brief) animated gif and [a link to my full `Gruntfile.js`](https://gist.githubusercontent.com/edm00se/43fcb3fcac536267440d/raw/89dfc045561d8936b30beaf8b4137ebc54e5a466/Gruntfile.js). Here it is all starting to come together:

<figure class="center">
  <amp-anim src="/assets/images/post_images/task-runners/watchAndJsHintBrowserSync.gif"
  alt="jshint throwing warnings and watching file saves while reloading the browser on save events"
  width="1329" height="811"
  layout="responsive"></amp-anim>
 <figcaption>jshint throwing warnings and watching file saves</figcaption>
</figure>

### In Summary
Grunt is a great place to start. It's a mature and robust solution for a lot of task running needs. There's a standard for configuration files and the pluggable nature reflects in the comparative ease involved for adding in plugins as you progress through a project. In the end, I found myself moving in another direction, which I'll get into next time. Until then, 🍻!

### To Be Continued...
...in part 3, with gulp!
