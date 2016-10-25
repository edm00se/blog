---
layout: post
type: post
title: "Enhanced Editors"
description: "doing more than notepad while being more lightweight than a full IDE"
category: web
tags: [node, javascript, electron, atom, sublimetext, vs code, webstorm ide]
modified: 2016-05-27
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
Recently, I had a couple of experiences stick out in my mind that made me think I should blog about some "fancy editors". I've referenced them in a couple of my sessions, used SublimeText heavily in the past, and I've always been one willing to try out new things. The fact of the matter is, especially when a thing costs nothing to use, you may as well try and broaden your tool set.

### Contenders
There are plenty of "fancy editors" to choose from. The fact of the matter is that we live in a post-Notepad++ world, as far as strong text editors (but short of full-blown IDEs) go. The advantage of not going "full IDE" is to, in theory, remain more flexible and fast. These fancy editors are becoming far more configurable as they progress, so I would also argue that the grey area in which these reside has only malleable barriers separating them from "IDEs" and text editors.

The main contenders I see, at the moment, in no particular order, are:

- [SublimeText](https://www.sublimetext.com/)* (my previous favorite)
- [Atom](https://atom.io/)
- [VS Code](https://code.visualstudio.com/)
- [WebStorm IDE](https://www.jetbrains.com/webstorm/)*

The last two are slightly more editors in the direction of IDEs, but they're definitely worthy of considering. Also of note*, SublimeText and WebStorm IDE are paid-for applications, though SublimeText 3 is free while it's in beta (which it has been for some time), with gentle periodic reminders suggesting a license purchase.

#### Why I Like SublimeText
A while back, I ponied up the cash for a personal developer license for SublimeText. At the time (when v3 came out), it was the right decision, as it was getting pretty good after version 2 matured, along with a pretty strong integration of a package manager, a strong layout for content and file tree, things like code maps, and fancy features like multiline editing and more. If you check out their homepage, there's an animated GIF demonstrating some of the more powerful features, and it still is impressive.

I still think SublimeText is a great editor, but having heard good things about multiple others start cropping up, I thought it was worth checkout some of the others out there. I moved on to Atom for a variety of reasons, but I've heard good things about both VS Code and WebStorm IDE.

#### Why I Like Atom
It's not that it's [made by GitHub](https://github.com/atom/atom), built on top of [Node](https://nodejs.org/) with [Electron](http://electron.atom.io/), though those are all interesting aspects. The largest appeal of Atom is that it has nearly everything I like about SublimeText either as built-in or available as an installable package. It's extensible to the core, exposed mostly via a personal config interface, so if you can write JS, you can extend your own editor. There are a fair amount of packages (plugins) and themes to keep people busy. A couple of the more notable packages I have installed are:

- sync-settings, to sync my Atom settings between installs
- git-timemachine, to view git history of a file
- terminal-plus, to use my terminal from within Atom (handy for full-screen working)
- timecop, to keep track of how long Atom is taking to load (so I can remove some of the packages/themes I was overly zealous about installing the first time around)

Atom is free and worth trying out, especially if you haven't ventured too far out there yet.

#### VS Code
VS Code is something I attribute to the "New" Microsoft, which plays to its strengths, doesn't bash Linux, and tries to be relevant through sheer effort; which seems to be working out pretty well. The [MS team has open source released](https://github.com/microsoft) an increasing number of projects, of late, not the least of which is TypeScript (I'm a big fan, though still adopting). VS Code seeks to reconcile the needs of modern development tooling with things like .NET dev, git, and things like Node, Sass and LESS, amongst others. If you want to know more about [Why VS Code](https://code.visualstudio.com/Docs/editor/whyvscode), their page of the same name gives their explanation. My little bit of playing with it is promising. Strangely enough, VS Code is _also_ built [on Electron](http://electron.atom.io/) (or not so strange, as the case may be).

#### WebStorm IDE
This is the only one of the bunch I haven't played with very much, beyond a 30-day trial over a year ago. It's worth mentioning, as many tasks seem to be configurable, along with terminal/shell/command sequences that can be plugged in as scripts to run on events (such as saving a file, etc.). For a while, it seemed like the entire world was switching to WebStorm IDE while I held out with SublimeText, but they describe themselves as "the smartest JavaScript IDE", which I hope is backed up pretty well; I'm guessing so, as they still have a strong user base and continue to add new features.

### A (Non-Standard) Use Case
A quick tip, regarding "fancy" text editors, since everything is configurable, _everything is configurable_. I recently had the ~~fun~~ _opportunity_ to read through a fair number of NSDs from a Domino server. I won't get into the specifics of the cause, but reading through NSDs can be a little rough, even if you know what your looking for and the layout of such a file. Enter a "fancy" editor to the rescue! Realizing some similarities in the data structure, enough anyway to be "close enough" to help me read through it all, I chose to change my language syntax highlighting to force my editor (shown below in SublimeText) to tread my NSD logs as YAML. [YAML](http://yaml.org/) is a "human readable data serialization language", think of it as a superset of JSON, built for ruby; for a crash course, check out [the page for YAML on learn x in y minutes](https://learnxinyminutes.com/docs/yaml/). The text blocks looked similar enough and forcing the syntax highlighting helped me keep things from swimming on my screen as I scrolled through several files.

Note: most of these "fancy editors" make an effort at guessing the correct language to use, often by file extension, and put a notifier or change action in the lower right corner (by my experience); Notepad++ has its "Language" menu as well.

#### Before Language Syntax Highlighting
I tried to blur the names to protect any innocent servers.

<a href="{{ site.url }}/assets/images/post_images/nsd_beforeHighlighting.png" data-toggle="tooltip" data-placement="bottom" title="oh look, a giant block of text"><img src="{{ site.url }}/assets/images/post_images/nsd_beforeHighlighting.png" class="img-responsive center-block" /></a>

#### After Language Syntax Highlighting
<a href="{{ site.url }}/assets/images/post_images/nsd_afterHighlighting1.png" data-toggle="tooltip" data-placement="bottom" title="oh look, a slightly more readable giant block of text"><img src="{{ site.url }}/assets/images/post_images/nsd_afterHighlighting1.png" class="img-responsive center-block" /></a><br />

<a href="{{ site.url }}/assets/images/post_images/nsd_afterHighlighting2.png" data-toggle="tooltip" data-placement="bottom" title="oh look, a slightly more readable giant block of text"><img src="{{ site.url }}/assets/images/post_images/nsd_afterHighlighting2.png" class="img-responsive center-block" /></a>

### Summary
All in all, I think I achieved my goal in that use case; to better be able to read my log files. I'll be continuing my trend of getting more used to Atom, although that become pretty familiar after just over a week of hard use. I think for any major MS related work, I'll probably switch over to VS Code for a while, just to give it a fair go as well. In the end, a tool is a tool, especially if you've suffered in the past. Eclipse is often too "heavy" for any front-end or Node work I do, so having something more flexible, immediate, and integrated to that side of things is great. :beers:
