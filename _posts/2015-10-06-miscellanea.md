---
layout: post
type: post
title: "Miscellanea"
description: "some things that have been cropping up"
category: xpages
tags: [xpages, bluemix, xpages-servlets, java, open source, github, scm]
modified: 2015-10-06
comments: true
share: true
---

#### Intro
A few things have been on my mind over the last couple weeks and I thought I'd share them. Stay tuned for my demo app on Bluemix, and if I re-record what I need to, there may be yet another Notes in 9 video submission coming soon; the highlights of [my MWLUG session](/self-promotion/mwlug-ad113-success/).

#### <amp-img class="img-no-btm-margin" src="/assets/images/champion/star.png" alt="IBM Champion Star" layout="fixed" width="32" height="30"></amp-img> IBM Champion Nominations
In case you somehow missed it, IBM Champion nominations are open. Unlike a few, I've not taken to tweeting about who I've submitted nominations for; that's neither a slight to those that have nor an insult to any. Those whose work has greatly impacted me over the last year for my work and interest in development for the IBM platform I work on are the ones I've submitted. Most people could probably guess who I've submitted for, but that's not the point. If someone has made a difference to you in your efforts and you feel <span data-toggle="tooltip" title="not necessarily to wield Mjölnir">they're worthy</span>, submit them for the Champion program to help return that credit by the aid you've received.

About the IBM Champion program:
[https://www.ibm.com/developerworks/champion/index.html](https://www.ibm.com/developerworks/champion/index.html)

IBM Champion nomination:
[https://ibm.biz/NominateChamps](https://ibm.biz/NominateChamps)

#### Open Source
The world of OS brought us a couple things of note over the past couple weeks. Here's what I thought worthy of mention.

##### Let's Encrypt
Something I talked about at my MWLUG session, [LetsEncrypt.org issued its first certificate](https://letsencrypt.org/2015/09/14/our-first-cert.html) and is driving forward with their Q4 2015 plans for <s>world domination</s> free, automated, and open process for HTTPS certificates for all. This is nothing to sneeze at, since many take the stance that the only good HTTP traffic is HTTPS traffic.

<!--
![Let's Encrypt](//letsencrypt.org/assets/images/letsencrypt-logo-horizontal.svg){: .img-no-btm-margin }
-->

##### Universal Two-Factor Authentication
GitHub now supports U2FA in the form of a nifty USB dongle that provides protection against everything up to man-in-the-middle attacks. I won't claim any security measure is 100% fool proof, but this is pretty awesome. For those who use GitHub a lot, it may be worth looking into.

{% include tweet.html id="649638137895870464" %}

##### Hacktoberfest
[Sponsored by Digital Ocean, Hacktoberfest](https://hacktoberfest.digitalocean.com/) is meant to support open source. It's an excuse to push for more (good) pull requests and bug fixes. You can even get a free t-shirt, with enough PRs on GitHub (4). It's neat, it's open source-y, you may wish to check it out.

What to create a Pull Requst for? Why, it could be almost anything, such as:

* [a helper method to a utility class in a highly acclaimed project](https://github.com/OpenNTF/XPagesExtensionLibrary/pull/35)
* [assisting in the proper commenting of a highly acclaimed framework](https://github.com/jesse-gallagher/XPages-Scaffolding/pull/10) (one you should totally check out, as it's well documented now!)
* [a helping hand for a project you might check out](https://github.com/progrium/dokku/pull/1521) and happen to notice that something was wrong
* [even beautification](https://github.com/adambard/learnxinyminutes-docs/pull/1296) for something which was likely 'just missed'

The bottom line is, lots of open source projects are limited in staff or dedicated hours, but the beauty of open source is that anyone can contribute. Just contribute wisely and check first to see if the project you're submitting changes to has contribution guidelines.


#### A Saga of Bluemix
My demo app is nearly ready for Bluemix, with one snag being that I can't seem to get the data NSF to respond correctly via my implementation in Java; sort of a critical point. I've got [a thread open on developerWorks answers](https://developer.ibm.com/answers/questions/231062/xsp-on-bluemix-accessing-data-nsf-yields-notesexce.html) and I'm sure it'll get resolved before too long. Until then, it's just frustrating as I'm getting some weird "database object is already open as "&lt;serverName/Bluemix!!userName\path\data.nsf&gt;. If anyone has some insight into this, I'd appreciate a comment or answer [on dW](https://developer.ibm.com/answers/questions/231062/xsp-on-bluemix-accessing-data-nsf-yields-notesexce.html). With a successful solution, you can bet I'm willing to provide a beverage of your choice at our next meeting.

Until next time, cheers. 🍻
