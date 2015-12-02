---
layout: post
type: post
title: "Task Runners pt.2: Grunt"
description: "grunt through some tough tasks"
category: web
tags: [grunt, gulp, git, scm, static, generator]
modified: 2015-12-04
comments: true
share: true
---

{% include task-runners-series.md %}

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
Last time we covered what task runners are and why we should want to use them.

### Task Runners of Note: Grunt and Gulp
The two most common and well known task runners (though there are [others, of course](http://blog.cozycloud.cc/technic/2014/06/18/task-runners-comparison/)) are currently Grunt and gulp. There is a fair amount of overlap in what they seek to accomplish, but as with many open source projects, where they differ is in implementation and intent. Grunt has been around for a while and took the approach of including some common, core tasks with plugins added over time. Gulp addressed some of the concerns about including certain version of tasks as part of a core by taking the approach that every task is a plugin, eliminating versioning concerns, and all tasks are piped through each other (it reads like a whole lot of chain loading), and gulp makes use of streams (an entire subject in and of itself I won't get into). A decent walk through of the history of these task runners is a slide deck from a presentation called [Build Wars](http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt/) and is a decent read.

#### A Word of Warning
Many projects take the opinion that source (non optimized) files should be in a combination of `vendor/` (or `lib/` as I used) and `src/` (or `source/`) paths. This has a general benefit of making it easier to keep track of what resources are from where, and that any built (optimized) files would reside in a potential `dist/` path (or equivalent), for consistency. This isn't always the case, especially with the default location of CSS and JavaScript files in an NSF (`Resources/StyleSheets/` for CSS, `Code/ScriptLibraries` for JavaScript (client-side having .js extensions, vs SSJS having .jss), and images in `Resources/Images/`). It is my recommendation that if you keep your source files in these default locations, to have your `build/` or `dist/` path be in the `WebContent/` path for ease of separation.

The code base from my "follow along at home" git repository keeps all my source files in `WebContent/` in subdirectories of `css/` and `js/` with my 3rd party libraries in `vendor/`, so I'll compile my source files (only) into a `dist/` path at the root of `WebContent/`.

Enough talk, time for some configs.

### Grunt
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
[run](https://www.npmjs.com/package/grunt-run)								|	Run commands in the CLI, how we can invoke `json-server`

The Grunt officially maintained plugins use the `contrib-<name>` convention, which generally relate to `grunt-contrib-<name>` [on GitHub](https://github.com/gruntjs/).

#### Install Dependencies
To install the plugins that we'll be depending on, one should install via npm, such as `npm install grunt-contrib-uglify --save-dev`. The last flag specifies that it's a development dependency as opposed to a primary dependency, and saves that information into the `package.json` file. This should be repeated for the package "grunt" and every plugin listed above, but I've already done so for each of these and added it to the `package.json`, so earlier when you ran `npm install`, it included these already.

#### Example Grunt Config
We need to create a file called `Gruntfile.js`. Inside, we will build out the config to define the configuration, load the plugins, and establish the tasks we define, all of which will be wrapped in a function we export as a module. Using solely the jshint (jshint-stylish) plugin as an example, here's a basic structure:

{% gist 43fcb3fcac536267440d baseGruntfile.js %}

Now that we have the structure, we need to populate our configurations and tell our tasks (one shown) what to run. The task 'default' corresponds to invoking `grunt` with no parameters; if a task by another name is specified (e.g.- 'dist'), it will invoke the operations for that task.

You can see that this can quite powerful rather quickly. Any tasks that we we want to take can be automated using some simple, well thought out configurations. Provided we stick to some standardized rules, we can have consistently automated tasks which require minimal input to invoke.

It's easier to keep your static web assets in `WebContent/` in corresponding paths for images, stylesheets, etc., but with some careful configuration, you can work with the "normal" Domino Designer resource paths in the ODP. Those corresponding paths are:

{:.table .table-bordered}
Resource    	|	Path
------ | -----------
Images			|	`NSF/Resources/Images/`
Style Sheets	|	`NSF/Resources/StyleSheets/`
JavaScript 		|	`NSF/Code/ScriptLibraries/`

Note: for the JavaScript files, be careful to only specify those JS scripts that end in `.js` and avoid any that end with `.jss` as the latter are SSJS libraries. You _can_ run operations against those files, but I'm not going to cover the details and nuances of doing so here (aka- you can have at it, but it's not something I'm focusing on, as they're server-side assets).

#### Executing Grunt
Finally, how do we use this thing?

#### General Gruntfile.js Layout
asdf

#### Setting Up Our Tasks
asdf

##### Build
asdf

##### Run a Server Task and Watch for Changes
A lot of grunt documentation will assume that you'll be working against some purely client-side assets, making the "server task" for development a simpler thing. This shows how to use a generic server task, but the next section outlines how to replace that with the `json-server` instance we set up previously.

STUFF!

##### Using Json-Server in Place of Default Server Task
The use of `json-server` we set up before has a lot of advantages in mocking our back-end, so losing that now would be a silly waste of an otherwise good tool. As you may also find, navigating the plethora of available grunt (or gulp) plug-ins is sometimes a bit tricky. 

* implements json-server in place of default grunt server task (my `npm start` script, but with reload and automatic grunt builds)

### To Be Continued...
...in part 3, with gulp!