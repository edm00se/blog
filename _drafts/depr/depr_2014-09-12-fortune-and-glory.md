---
layout: post
type: post
title: "Fortune and Glory"
description: "MVC with Java, Domino, and XPages"
category: xpages
tags: [xpages, domino, java, mvc, rest, api]
modified: 2014-09-09
comments: true
share: true
---

### An Evolution of Development
Short Round is best remembered saying, "fortune and glory, Dr. Jones!" My vision for a better future in the world of XPages development is to make great use of M-V-C to better segregate how my applications work. This is the first in a series on MVC in XPages I will be blogging about. There are a few key pieces I'll focus on, as opposed to application development theory (which I'm going to avoid, lest I get very wordy, very quickly). The aim I have here is to:

1. develop better structured applications
2. make my business logic more portable
3. make use of some excellent front-end development practices to make everything awesome

### TL;DR
For those accustomed to advanced XPages development, I'm aiming to cover the advantages on a more strict M-V-C archetectural pattern in XPages/Domino development as a vehicle for enabling better applications, with portable logic, and modern system interconnections. I may be plagiarizing many concepts from <a href="https://frostillic.us/blog/posts/B0DD2BC3CBC6884985257A06006175C2">Jesse Gallagher</a> and _numerous others in the community_, who have been at this game much longer than I. I hope these people take this as the flattery it is intended to be.

### Why Should I Change How I Develop?
Plain and simply put, performance and interoperability of application logic. Of the three main types of <a href="http://heidloff.net/home.nsf/dx/08172011032738AMNHEART.htm">XPages developers</a> that Niklas Heidloff describes, the 'usual' XPage developer falls short of some more advanced topics. While he describes the upper tier of developers as extending XPages functionality and Domino services using an Eclipse IDE, I believe that the upper tier would be _capable_ of such tasks, but would focus on a better from of XPages development, which plays well into those tasks _because_ of how they improve your application logic. Let's look at my aims real quickly:

### 1. Develop Better Structured Applications
Structure is everything in larger applications, as it's our "foundation". When it's weak, we spend time searching for "that one bit of code" and leads to sloppy, _spaghetti code_<sup>TM</sup>. This is harder to maintain long-term, more difficult to use in any front-end/display layer _other_ than what you've built it for and, it's just plain silly. What's required is properly modeled data objects, controller classes, and an adherence to strict coding guidelines (to keep ourselves honest).

### 2. Portable Business Logic
If you set yourself up for success, this makes your application logic (data model objects and controller classes) portable in the sense of, you could pick those class files up, move them to a Tomcat JSF server (<a href="http://tomee.apache.org/">or equivalent</a>) and with some "tweaks" to your front-end and data models, you can have your application running without the Notes/Domino data store or an XPages UI. I know, there are a lot of assumptions taken there, but no "migration" would be a small undertaking (not my intention here). The bottom line is: you can have your application and business logic maintained entirely separate from the unique platform you run it on. This makes it easier for a developer who's good at either the Java back-end or XPages front-end to focus on the work, not on both.

### 3. Front-End Awesomeness
My about page talks about my love of AngularJS as a client-side framework. It's smooth, adapts well to browsers of all shapes and sizes, works well with jQuery and Bootstrap, and is just awesome. In fact, it's self-described as a <a href="http://plus.google.com/+AngularJS/posts/aZNVhj355G2">super-heroic MVW</a> framework. I could go on and on, but the fact of the matter is, modern web development has gotten good at manipulating logic in the browser, from RESTful API (JSON formatted) calls, with tools that help automate the job for us. You can use any front-end you want, especially with more advanced XPages-ish<sup>TM</sup> development (using an XPage to load, enforcing ACL, the SPA <a href="http://www.slideshare.net/MarkRoden/angularjs-in-xpages">a la Mark Roden</a>), but I recommend taking a look at AngularJS (<a href="http://www.youtube.com/watch?v=tnXO-i7944M">in 20-ish minutes</a> or <a href="http://www.youtube.com/watch?v=i9MHigUZKEM">60-ish minutes</a>).

### Next Up
I'll be tackling things 