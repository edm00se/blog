---
layout: post
type: post
title: "Source Control Thoughts"
description: "and a survey"
category: scm
tags: [scm, dvcs, vcs, git, hg, svn, cvs, ciao]
modified: 2016-04-04
comments: true
share: true
---

### Intro
Amongst several things lately, such as basement remodeling, configuring my new home NAS, and yard work, I've had a few interesting thoughts on my mind lately. In fact, I've started up a couple of interesting side projects. Before I'm ready to share those, I have to shout about something from the roof tops. Ready?

### Source Control Can Save Your Life!*
Maybe not your *corporeal life, but certainly our digital life. Having nearly given myself a heart attack an hour before my [MWLUG 2015 presentation on web app performance enhancing with Nginx and PageSpeed](https://github.com/edm00se/AD113-Speed-Up-Your-Apps-with-Nginx-and-PageSpeed/tree/master/configs) by deleting a critical config file (I had a backup, it turned out okay), I created a git repo in my vm and never again questioned the integrity of my config directory. This isn't to say I haven't [screwed anything up with a git repo]({{ site.url }}//self-promotion/connect-success-and-a-demo/), but that was due to my want to use a single app/NSF+ODP for _three separate versions_ of my app; that's on me for trying to get fancy with branch switching and not guaranteeing enough time for dependency installations. But I digress.

Source control, or the more basic task of change tracking and revision control (regardless of individual source control management system (scm)) is what is of benefit. If your preference is to svn because you're a die-hard, old school type; more power to you. Let it be known that I'm a huge fan of DVCS though, as the concurrent full-project access for editing by multiple developers is a pretty slick thing, as opposed to a check-out, check-in mechanism.

### A Quick Survey
Now that I've jumped off my soap box, I'm curious as to what everyon I know uses. So please let me know what your preferred is and the chart below in the [Results](#results) section should automatically update based on the form responses.

Note: scroll down in the embedded form for the "submit" button.
<div class="embed-responsive embed-responsive-4by3">
<iframe class="embed-responsive-item" src="https://docs.google.com/forms/d/1Msa4qLi0GwIREW09s4BDPG8lTSYiT2CSRyJECps_E6g/viewform?embedded=true" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
</div>

#### Results
<div class="text-center">
<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1AW-db53FKmx_ppiXGpByjNxNVf99SjP3dlx7vnKqh_E/pubchart?oid=1932817384&amp;format=interactive"></iframe>
<br />
<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1AW-db53FKmx_ppiXGpByjNxNVf99SjP3dlx7vnKqh_E/pubchart?oid=1628401777&amp;format=interactive"></iframe>
</div>

### Summary
SCM has been such a topic over the last decade that attempting to sell people on a concept which has become quite ubiquitous seems a bit silly. One thing I'm curious of is, if you don't use an scm solution of _some_ flavor, why on Earth not? The few people I've met have just not had much experience with it, causing a bit of trepidation. I have a co-worker whose git-fu is now pretty strong, but he needed a bit of up-training on the topic when we started working together. I still get the occasional question about the mechanics of git and git-flow (big fan), but they get less frequent and more specific, which is great. All in all, it seems to me that developers of any ilk really can't get by without being strong in at least _some form_ of (d)vcs. Hopefully I can gain some insight; thanks for reading, and as always, 🍻!
