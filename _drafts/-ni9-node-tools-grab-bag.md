---
layout: post
type: post
title: "Notes in 9: Dev Tools Grab Bg"
description: "a pair of Node-based tools for use with Domino + XPages"
category: self-promotion
tags: [xpages, node, npm, ni9, dora, generator-xsp]
modified: 2017-03-04
comments: true
share: true
---

### Intro
I'm on Notes in 9 again, with a "grab bag" of a couple of tools I've put together recently that may be of a varying degree of useful for other Domino + XPages developers.

### The Video
Head over to [Notes in 9.com episode #xxx](http://www.notesin9.com/2016/02/24/notes-in-9-189-introduction-to-sonarqube-with-a-side-of-docker/) to check it out, or watch it embedded here or on YouTube.

<div class="center">
  <amp-youtube
    data-videoid="vHADaUuJ7eY"
    layout="responsive"
    width="560" height="315"></amp-youtube>
</div>

### Summary

I'm guessing that a number of people will regard these tools as a bit of a novelty, but I hope some will find them pretty awesome, or at least useful. They don't exactly do anything a developer couldn't do on their own, but they fit into development workflow for speedier development; at least, that's the idea. I'm open to contributions of nearly any kind, so please feel free to get involved.

For anyone looking to reference my notes from the screencast, you can find that below.

### Ni9: Some Tools for Your Toolbox

#### 1. Intro

- who am I?
- the [argument for automation](https://medium.com/@kentcdodds/an-argument-for-automation-fce8394c14e2)
- contact info

#### 2. generator-xsp

##### Required

- [node](https://nodejs.org/) (+ npm)
  - recommend [nvm](https://github.com/creationix/nvm/blob/master/README.markdown#installation), [n](https://github.com/tj/n#readme), or [nodist](https://github.com/marcelklehr/nodist#readme)
- [yo](http://yeoman.io/) + [generator-xsp](https://github.com/edm00se/generator-xsp)

##### Goal

1. set up app from scratch
2. config or existing app's ODP
3. create elements from sub-generators
  - XPage
  - Class
  - managed bean (configured in `faces-config.xml`)
  - "rest", which creates an `xe:restService` control, using an `xe:customRestService` with `CustomServiceBean` to back the logic

##### Result

An ODP you can import into DDE.

  - an arbitrary task, common to all modern developers, including XPages developers
  - if you need a quick refresher, or a crash course, watch [Notes in 9 ep #131](http://www.notesin9.com/2013/11/12/notesin9-131-use-sourcetree-for-better-xpages-source-control/), and the specifics of importing from source control (git/hg, etc.) start at: 34m 03s

##### Collaboration
- contributors welcome!
- big or small!

#### 2. node-dora
 - a node package wrapper for [dora](https://github.com/camac/dora)
 - install for use as an npm script via the [dora-cli](https://github.com/edm00se/node-dora-cli) package
   - includes the `node-dora` package from npm
   - wraps for cli invocation
   - _can_ be installed globally
   - ensures dora cleaning, w/ npm deps, great for CI environments
 - can set in your `package.json`'s "scripts" block, such as `"clean": "dora 'My Amazing ODP'"`

#### 3. Summary

Automation, like source control, can "save your life".

Questions: [AMA](https://github.com/edm00se/ama)
