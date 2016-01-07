---
layout: post
type: post
title: "Nerdy Yet Awesome"
description: "using web development skills for unconventional purposes"
category: xpages
tags: [dde, cli, node, npm, structure]
modified: 2016-01-08
comments: true
share: true
---

### Intro
asdf

### asdf
asdf

### asdf
asdf

### asdf
asdf

### Summary
asdf


from twitter:

Hello Petter.

I'm glad you've been enjoying the blog posts. I'm usually up for answering questions, on Twitter, StackOverflow, or in the XPages Slack chat, so I should be easy enough to get ahold of.

As for getting set up, since any attendees to my session may be in the same boat as yourself, I'm going to take the opportunity to write up a post with a couple references on how to do the an initial app setup, for someone new to many of the parts, like you're describing.

To get you started, I recommend:
- watching the Notes in 9 video that got me started with Git with Domino/XPages, episodes 131 and 140, the content of both by David Leedy
- installing Git (and SourceTree)
- installing Node from nodejs.org (this ensures that npm is available, I tend to install the LTS version of Node)

Everything else I can suggest builds on those, with the exception of JS IDE. I'm personally a SublimeText person, but I know several people that absolutely love WebStorm as it has some advanced integration I'm a bit jealous of, though most of what I want can be done in task runners, so I've been happy enough. The couple of times I've tried out Atom have been mixed, but my work machine is about to be replaced, so it may perform better for you.

That should probably be enough to get you started before the actual application development. Once you're up to speed on using git (like David shows, which is what I do) with DDE, then you may wish to read the portion of my readme from the GitHub repository for my task runners series called "Basic Project Layout" (link below), the portion where I describe my folder structure and how it relates to the On Disk Project.

I have yet to try out React yet, so I'm not 100% how that fits into the picture for you. Provided you're able to use it as any other (client-side) JavaScript component, you should be fine.

Let me know if you have further questions. Also, what may be the trickiest part, the git + On Disk Project (ODP) relationship is something that most other XPages developers deal with, so don't hesitate to ask questions in the XPages Slack chat (which you should join, in case you haven't).

https://t.co/fXUWrDJyoR

I forgot to mention, you should also install the Swiper plugin for Domino Designer, as it simplifies what is output to the On Disk Project. Make sure to use the latest (1.0.2) version.

https://t.co/VzoxGTvtiH

<!-- follow up q&a on Slack -->

Petter Kjeilen [6:07 AM] 
Hi Eric ! Look I'm on Slack :simple_smile: Thank you so much for taking the time to answer my questions, and with so much good information ! Setting up sourcecontrol in domino designer and connecting to git I think I will manage. I've also played some with node.js, but I will most definitely watch som tutorials/videos on this. The part that I'm most uncertain about is how to work with the ODP (html,javascript,css) from the javascript IDE.. And after running tasks in Grunt, how to I get the generated files back into the Domino database ? Will a normal sync do ? Something special to think of here ? Do you keep the code for the frontend (html,javascript,css) within the Domino database ? Or do you separate frontend code and backend code completely ?

Eric McCormick [9:22 AM] 
I'm glad you were able to get set up here; it's a pretty good forum for quick questions that don't quite fit into the pristine format of something like StackOverflow, or just an easy way of getting ahold of people from the XPages community.

If you haven't watched those two Notes in 9 episodes yet, they're really helpful to understanding how to work with Source Control (such as git repositories) with an application from Domino Designer. This involves setting up the On Disk Project (right-click on an NSF, select "Set Up Source Control" from "Team Development"); it's best practice to establish that folder location for the ODP ​_inside_​ the folder that will contain your git repository, so that the shadow `.git` folder (for tracking git) and any other project files don't get sync'd with the NSF through Designer. The On Disk Project is a flat file copy from the NSF that Designer (once they associate) knows to sync with. Depending on your settings, Designer will (by default) automatically export changes from the NSF to the ODP and automatically import from the ODP to the NSF. This is part of why I recommend using the Swiper plugin, so that it can help minimize some of the extra `.metadata`, etc. overhead for each design element (and reduce the moving parts). The biggest pain about DDE's sync process with the ODP is that it doesn't always trigger immediately on change to a file in the ODP, so I have developed a habit of proactively triggering it from Package Explorer in DDE, right-clicking the ODP, and selecting "Sync with NSF" from the "Team Development" section.

I've taken an approach to keeping the application-ready (optimized version of) my web assets in the `WebContent` folder, which serves static assets like you would expect from a normal web server (from the root of the application's path, e.g.- `...nsf/js/app.js`), as opposed to forcibly loading my HTML content into an XPage design element or my (client-side) JS into a Script Library design element, etc. This means that for my interactions with those assets via my JS IDE (SublimeText, WebStorm, etc.), I'm working against the un-optimized source files in a top-level folder of the git repository/folder (outside the ODP). When I run my tasks (grunt or gulp) to build out the optimize the files, they get put into the ODP's `WebContent/` path at corresponding locations; some of that is a little config heavy, hence I spent a bit of time outlining each of my gulp tasks in the last post of my task runner series. The link I sent you in the twitter DM (to my task runner GH repo) includes file tree output showing the relative locations. Realistically, the ODP would have more than just `WebContent` in it, but I was trying to keep it brief. So think of the `ODP/WebContent/` path as your build or `dist` path (like many non-Domino developers would call it).

Using grunt and gulp are large enough topics, but to use them, you don't need to fully understand Node as a platform, only how to run the Node-based tools I've covered (such as Grunt, gulp, in some of my demos `json-server`, etc.). Also, since you're probably going to want to work against something like a local web preview from Domino Designer, after it's running, what I recommend is instead of using the `browser-sync` task to point at `json-server` (which is mocking my Domino app's RESTful servlets), you should instead point at your Designer's local web preview (port and path on localhost). This should give you a complete picture of your app during development and eliminates the minor issue I had getting my back-end mock to work with Grunt.

The biggest piece missing, and something I want to dig around Cameron Gregor's ant tasks from his BuildXPages repository on GitHub, is to see if I can automate the task of performing the ODP -> NSF sync by triggering it on a change to my source files from my watch task (and eliminate the manual step I mentioned above); time will tell on that one.
