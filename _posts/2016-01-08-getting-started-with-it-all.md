---
layout: post
type: post
title: "Starting Small to Go Big"
description: "preparing your workspace for glorious development"
category: xpages
tags: [dde, scm, git, cli, node, npm, structure]
modified: 2016-01-08
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
I was recently contacted to help clarify a couple of parts involved with getting set up similarly to what I've been moving towards and blogging about, both as far as project folder structure and as far as IDE setup. The developer was looking to get started with an app using a different client-side framework from what I usually work with, but that's far from a problem, since they're both part of the client-side puzzle and fit in as client-side assets. In any case, after keeping some notes from our conversation (and helping another developer find their way to [the XPages Slack chat](https://xpages-slack.herokuapp.com)), I'm using the excuse to further document the "getting set up" process for anyone else looking to do so.

This should even potentially assist any attendees for the ability to follow along in-person at my session at Connect, by installing and setting up an environment in advance; the session info:

**[AD-1380
A Beard, An App, A Blender: One Developer's Take on _Expanding How We Can_ Build<s>ing</s> Apps with Domino/XPages](https://www-950.ibm.com/events/global/connect/sessions/preview.html?sessionid=AD-1380)** on Monday, 01-Feb, 04:45 PM-05:45 PM at the Hilton Orlando, in room Florida 6-7

If you've been wanting to dive in but have felt that there's a whole bag of snakes that need to be straightened out first, this post is for you.

<a href="{{ site.url }}/images/post_images/rango.png" data-toggle="tooltip" data-placement="bottom" title="stay with me now!"><img src="{{ site.url }}/images/post_images/rango.png" class="img-responsive center-block" /></a>

### Overview of Topics
Many of the topics have been previously covered by myself and others, but this should serve as a good starting point for those looking for references and material. There are several elements involved, specifically:

* setting up your application with source control
* layout out the application's project structure for the source control repository
* segregating source files from the "build" path

### Source Control with Domino Designer
The use of [git](http://git-scm.com/) (or Mercurial, or other source control management system) is something that has thankfully been covered before. I recommend anyone looking to get started to check out Notes in 9 episodes [131: Use SourceTree for better XPages Source Control](http://www.notesin9.com/2013/11/12/notesin9-131-use-sourcetree-for-better-xpages-source-control/) and [140: SourceTree Deep Dive](http://www.notesin9.com/2014/03/24/sourcetreedeepdive/). I'm a big fan of using [SourceTree](https://www.sourcetreeapp.com/).

Once you have a handle on how to interact with an applicaiton's On Disk Project, we can talk about project folder structure. Of additional note, I strongly recommend that you disable 'binary DXL export' (so that you don't have non-readable parts of your code base) and persist that setting across any/all Designer instances that will interact with a copy of the On Disk Project.

I also strongly recommend installing and using [Cameron Gregor's Swiper plugin](https://openntf.org/main.nsf/project.xsp?r=project/Swiper) for Designer, which reduces a lot of the overhead of some the metadata files, etc. (which related to each design element in the NSF). The Swiper plugin is something I can't rave about enough as it eliminated some consistent pains I was experiencing with setting up a headless Designer build task for creating an NSF from git+ODP of the largest application I maintain; it had been running into design element conflicts (e.g.- two copies of the same design element, with the same name, but in Package Explorer showed an appended UNID or UNID-like string to differentiate, much like a save/replication conflict), which would prevent the application from building correctly. The Swiper plugin is best used with Build Automatically enabled, and Cameron even has some excellent videos on [installation](https://www.youtube.com/watch?v=jNuTeUADRDY) and a [demonstration of what it accomplishes](https://www.youtube.com/watch?v=35jCNJe5buY).

### Segregating an App's Client-Side Assets
The layout of an On Disk Project follows what is in an actual NSF file, as there's a related design element with any config or metadata information stored alongside of it. Here's a file tree of what an On Disk Project should look like.

	ODP
	├── AppProperties
	├── Code
	├── CustomControls
	├── Forms
	├── Resources
	├── Views
	├── WebContent
	├── XPages
	└── plugin.xml

I've taken the approach that my client-side heavy applications (e.g.- exclusively AngularJS or whatever JS framework I'm using) all operate out of my `...NSF/WebContent/` folder, which makes them easily served directly as normal web assets. There are minor complications to this when making your `WebContent` assets default have public access, the solution being to run an agent against those design elements and set the public permissions; a [topic covered well by John Dalsgaard](https://www.dalsgaard-data.eu/blog/public-access-to-e-g-an-angular-app-in-your-notes-database/).

Since we're keeping the On Disk Project inside another folder, this parent folder which is tracked in source control, that means we can have top-level assets that don't get sync'd into our NSF during build, but can ride along with the application; such as documentation and build assets.

### Optimizing Builds (Source vs Build)
Before I get into the last bit about optimizing builds ('dist' versions, which are minified, uglified, concatenated, etc.), please note that our project folder, which contains our ODP, is laid out as follows.

	parent-project-folder
	├── .git
	└── ODP
	    ├── AppProperties
	    ├── Code
	    │   ├── Agents
	    │   ├── Java
	    │   └── actions
	    ├── CustomControls
	    ├── Forms
	    ├── Resources
	    │   ├── Images
	    │   ├── StyleSheets
	    │   └── Themes
	    ├── Views
	    ├── WebContent
	    │   ├── WEB-INF
	    │   ├── css
	    │   ├── js
	    │   └── partials
	    └── XPages

Since we're tracking the ODP _inside_ of the git repository, that means we can set up a space for the unmodified original sources in the parent directory and we can track them entirely separate from the ODP. What this means is, once we adopt a task runner into the equation (Grunt or gulp); my [blog series on task runners with Domino](https://edm00se.io/task-runners-with-domino-apps) goes a bit more in-depth. So, if you're going to be build optimizing your web assets (concatenating your `.js` files, uglifying and minifying, for instance), you should keep your un-modified source in a source folder, such as `src`. Your project's repository should now look something like this:

	parent-project-folder
	├── Gruntfile.js
	├── ODP
	│   ├── WebContent
	│   └── AppProperties
	│	    ├── Code
	│	    │   ├── Agents
	│	    │   ├── Java
	│	    │   └── actions
	│	    ├── CustomControls
	│	    ├── Forms
	│	    ├── Resources
	│	    │   ├── Images
	│	    │   ├── StyleSheets
	│	    │   └── Themes
	│	    ├── Views
	│	    ├── WebContent
	│	    │   ├── WEB-INF
	│	    │   ├── css
	│	    │   ├── js
	│	    │   └── partials
	│	    └── XPages
	├── bower.json
	├── gulpfile.js
	└── src
	    ├── css
	    ├── index.html
	    ├── js
	    ├── libs
	    └── partials

When my build task runs to generate my optimized client-side elements, it outputs to the ODP's `WebContent/` in the appropriate paths (`css/`, `js/`, etc.). This means that when I work from a non-DDE environment on my client-side assets in my preferred IDE/editor, I don't need to interact directly with anything in my NSF or even the ODP, just the `src/` contents; as my task runner picks up on my changes after a save event, it fires off the fresh build and shoves it into the ODP, which then should sync with DDE.

Note: some, myself included, have run into the fact that even with Domino Designer set to "Enable automatic import of the design elements (from disk to NSF) on modification", there can still be a bit of a delay in updating the NSF. I've developed a habit of manually right-clicking on my ODP in my DDE's Package Explorer and selecting "Sync with NSF" to ensure it occurs; if I find a better way of automating this, I'll let you know.

### Stay Your Fear
If you've made it this far, then you can make it past anything else that comes up. If you're uncertain as to how you can get into using a task runner without understanding how to develop for Node, put that thought aside as Node development isn't required to be able to configure and execute [Grunt](http://gruntjs.com/) or [gulp](http://gulpjs.com/). Grunt and gulp are both Node-based tools, but you don't have to fully understand all of Node to be able to make use of them.

If you're looking to get started with [Node](https://nodejs.org/) (afor example- you want to install Grunt but need Node installed), go over to nodejs.org and install the latest stable release, though I recommend the LTS version, personally. Installing the version from nodejs.org will ensure that you also have the `npm` package manager (it has _not_ stood for Node Package Manager for some time, mostly to ensure io.js compatibility, which is re-merging with Node anyway). Having `npm` means that you have acces to loads of JS tools and packages, all easily accessible from a command line `npm install <package-name>`. For example, you can install Grunt with `npm install grunt-cli` or gulp with `npm install gulp`; consult my [blog series on task runners with Domino](https://edm00se.io/task-runners-with-domino-apps) for more specifics on packages and tools.

Speaking of my blog series, you'll notice that I took an approach to using a back-end mock of my RESTful servlets. For most people, that may be an unnecessary layer of segregation (but I'll stand by the fact that it's incredibly handy for segregating amongst front-end and back-end developers on the same team). That being said, you could implement an alternative [to the `browser-sync` task](https://edm00se.io/web/task-runners-pt4-a-second-gulp/#browser-sync) I outlined and instead of pointing it to the back-end mock (which you wouldn't have to do), you could instead proxy the local Designer web preview, which should do very nicely for most people.

### Fancy Editors
I love the Java editor from Eclipse; it has great JavaDoc integration and syntax awareness that aids me in my day-to-day work in Java. Sadly, the JavaScript editor in DDE is pretty vanilla by comparison. Thankfully, the explosion in front-end development has benefitted everyone in that department. There are basically three that I feel are worth mentioning at the moment, which are:

* [Atom](https://atom.io/), free, as in Open Source, and made by GitHub, described as "hackable" (aka- you can customize its component parts)
* [SublimeText](http://www.sublimetext.com/) 3, described as a "smart text editor" geared for code and markup. You may as well skip version 2 and go straight to 3, which is still (somehow) in beta and free for use until it hits full production when it will be $70 for a single-user license (associated to either a company or you, the developer, for cross-platform use of the same license); the only annoyance for free users is the occasional pop up reminder after a file save, but hey, it's free!
* [WebStorm](https://www.jetbrains.com/webstorm/), described as "the smartest JavaScript IDE", with a slew of pretty excellent features. The biggest detractor IMO is after the free 30-day trial, it has a recurring annual cost ([break down here](https://www.jetbrains.com/webstorm/buy/#section=personal)), but the personal/developer annual cost isn't unreasonable and the work they keep doing keeps adding excellent features.

### Summary
All in all, this should help get any of you who feel they could use a little help "getting started" a good kick in the right direction. Per usual, if you have any questions or recommendations to add to this list, please let me know here, on Twitter, or in the XPages Slack chat. Until next time, :beers:!