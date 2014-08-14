---
layout: post
type: post
title: "Fixing Dojo 1.6.1 in Domino 8.5.3"
description: "fixing dojo 1.6.1 in Domino 8.5.3"
category: xpages
tags: [xpages, domino, javascript, dojo, grid, datagrid]
modified: 2014-08-13
comments: true
share: true
---

### "Fixing" Dojo 1.6.1 in Domino 8.5.3
I ran into a situation recently that required a bit of determination to fix. The BLUF: my implementation of the [Dojo Enhanced DataGrid was breaking when applying the dojox.grid.enhanced.plugins.Filter](http://xcellerant.net/2013/05/01/dojo-data-grid-part-14-enhanced-filtering-with-no-coding/). Thankfully, that [doesn't keep a good developer down](http://xcellerant.net/2013/05/01/dojo-data-grid-part-14-enhanced-filtering-with-no-coding/comment-page-1/#comment-6210).

### Domino 9
IBM Domino 9 brings a great many changes to the Domino server and has been fairly well received. Some of the benefits of the upgrade from 8.5.3 are the controls and components from the ExtLib, such as

* mobile controls
* application layout
* Dojo grid controls (< the culprit!)
* data view
* RESTful API (Domino Access Services) interactions with Domino files
* REST controls (xe: name space'd XPage controls)
* Dojo 1.8.x

Most of the above component upgrades, except for the upgraded Dojo client library, are available via Upgrade Pack 1 for Domino 8.5.3. This is what I'm living with... for now. I've got more of what I want, with minimal hassling of my admins.

There are some pretty good incentives for this upgrade. We do live in the real world though and many of us suffer/endure/work in places where a major version upgrade to a server is, to my admins, like nails on a chalk board. That being said, I still had the controls I wanted to play with, so I still tried the "play at home" version of [Brad Balassaitis](https://twitter.com/Balassaitis)'s excellent series on [Dojo Grids in XPages](http://xcellerant.net/dojo-grids-in-xpages/). When I hit [Part 14: Enhanced Filtering with No Coding](http://xcellerant.net/dojo-data-grid-part-14-enhanced-filtering-with-no-coding), I found that the Filtering plugin would cause my control to break in a rather unexpected fashion.

### Dojo 1.6.1
Domino 8.5.3 has Dojo 1.6.1. The culprit in question, as I found out from attempting to use Chrome with the Enhanced Grid, the issue was with the child selector call.
<a href="{{ site.url }}/images/post_images/ScreenShot760.png" data-toggle="tooltip" title="the beast in its lair"><img src="{{ site.url }}/images/post_images/ScreenShot760.png"></a>

After finding what the issue was, followed by some intense Google searching, I had found [the fix for this in Dojo 1.6.2](https://github.com/dojo/dojo/commit/fc262d0d589c490cdd671791f1546a4665ed69c6#commitcomment-3954783). The fix was small enough, I thought, "why can't I implement this?"

### Doing Something About It
Starting about Domino 8.5.3, 