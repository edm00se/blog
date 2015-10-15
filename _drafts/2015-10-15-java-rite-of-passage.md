---
layout: post
type: post
title: "A Java Rite of Passage"
description: "aka- I learn best by doing"
category: xpages
tags: [xpages, bluemix, xpages-servlets, java, github]
modified: 2015-10-06
comments: true
share: true
---

### Intro
The last couple of weeks has been a roller coaster of fun in regards to a work application and in regards to my extracurricular development activities. Suffice it to say, things are much improved and what follows is what I hope something that others can learn from, though [a simple Google search](https://www.google.com/?gws_rd=ssl#q=xpages+java+static+method) makes me realize that I'm not only not the first, but bound to not be the last, to make the same mistake in Java development. Rest assured, should you work through an issue like this, you'll probably never forget it, even if reading about it on someone else's blog didn't cause it to sink in fully.

### A Java Rite of Passage
It seems to me that the curation of ones Eclipse Java editor settings requires 

#### Promise of :beers:
In my last post, I made a promise of a beverage or three of choice to those who helped me figure out what was going on with my, at the time, seemingly absurd set of error messages I was receiving as a result of trying to connect to my data NSF in Bluemix context. Ultimately, [I was running into a combination of a few issues](https://developer.ibm.com/answers/questions/231062/xsp-on-bluemix-accessing-data-nsf-yields-notesexce/), as my above "rite of passage" partially outlines. As far as I can tell, I should give myself a :beer: on account of _finally_ realize what the error messages meant and how that impacted my _static_ versus instance methods. I owe one to the Internet for giving me enough reading material on the subject of _static_ vs instance methods in Java, and last but not least, one more for Brian Gleeson for his persistent aid in parsing apart some of the layers of the issues I ran into; which [includes some good advice should you be looking to use local preview an application to get the _BluemixContext_ classes to resolve correctly](https://developer.ibm.com/answers/questions/231062/xsp-on-bluemix-accessing-data-nsf-yields-notesexce.html#comment-232026).

### My Demo App Comes to Bluemix
Announcing [the _bluemix_ branch of my demo app's repository on GitHub](https://github.com/edm00se/AnAppOfIceAndFire/tree/bluemix). This has been a culmination of a number of things and paves the way for some pretty epic plans I have for the future. Please feel free to check it out and poke around a bit.

#### Link: [iceandfire.mybluemix.net](http://iceandfire.mybluemix.net/)