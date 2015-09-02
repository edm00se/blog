---
layout: post
type: post
title: "Notes in 9: Alternative Front-End Development"
description: "segregated application development at its best"
category: self-promotion
tags: [front-end, structure, rest, xpages]
modified: 2015-09-02
comments: true
share: true
---

#### Notes in 9 180: Alternative Front-End Development for XPages
I'm on Notes in 9 again! This is my second video and one where I tried out my new microphone (which I was told was necessary). It's kind of a variety show, but highlights the beauty of a segregated application design. It also shows off a nifty side thing, which is that XPages is now a recognized language/platform/something on GitHub; my efforts in the [pull request to the github/linguist repo](//github.com/github/linguist/pull/2438) was born from my envy of my company's newest web developer's primary background in <span data-toggle="tooltip" title="another JEE stack, this one from Adobe">Coldfusion</span> being fully set up before us; we should make the list.

This episode also highlights my ability to mis-speak. I've been working on Notes/Domino, primarily XPages, since November of 2011; I erroneously said fall of 2012 in the video. But hey, you want to see my awesome ways of code-fu, so my ability to speak English should be mildly irrelevant :stuck_out_tongue_winking_eye:.

### The Video
Found [on Notes in 9](//www.notesin9.com/2015/09/01/notesin9-180-alternative-frontend-development-for-xpages/) or [on YouTube](//www.youtube.com/watch?v=_lHGZiD-aE0) (including here).

<div class="embed-responsive embed-responsive-16by9 center-block">
	<iframe width="560" height="315" src="https://www.youtube.com/embed/_lHGZiD-aE0" frameborder="0" allowfullscreen></iframe>
</div>

### The Premise
The style of front-end development I'm demonstrating falls into the category of things we have, given by Domino, that can easily be overlooked. We can run _entire web sites_ out of the _WebContent_ folder. This means we don't have an XPage as our root design element, but that's not to say we are unable to do so. Since the _HttpServlets_ I'm using (_DesignerFacesServlets_) run from the XPages runtime, they still pick up a logged in user's session as it's still them. If you want to look at the set up for this style, just look back at my [Saga of Servlets]({{ site.url }}/servlet-series/) or my [GitHub repository](//github.com/edm00se/AnAppOfIceAndFire) for my App of Ice and Fire.

This doesn't take away from "traditional" XPages development, but certainly adds to it. From the perspective of a customer, a front-end heavy on industry-norm libraries/frameworks (regardless of whether you use Ember, Angular, Backbone, or others) is a more economical way than only having to hire XPages developers. One could in theory set up a git repository containing a modified version of production-like data, with a fully interactable RESTful endpoint against which a contractor can develop anything and everything in the UI portion of the app, and commit it back, with full version history and easy auditing, for re-integration into the main code base. It may take some time to set up and would rely on the fact that no server-side tasks would occur, but you could still validate the changed db.json state (or have them take snapshots, accordingly). Ultimately, it opens more doors than it closes, leaving you free for all the other concerns like governing business logic on the server-side.

#### A Plug
This also means that you can run faster applications, with the control that a reverse proxy like Nginx gives you. [If only I knew someone who did something recently on that topic... oh wait, me!]({{ site.url }}/self-promotion/mwlug-ad113-success/) If you were one of the four (five counting Marky's cameo at the end) of us, we covered some good ground, but for those looking for the replace, check out [my slide deck from my MWLUG session](//www.slideshare.net/edm00se/ad113-speed-up-your-applications-w-nginx-and-pagespeed); there are slides and configs, including [a GitHub repo](//github.com/edm00se/AD113-Speed-Up-Your-Apps-with-Nginx-and-PageSpeed) of all of those things.

### Announcement
The next time you see my app, it will be running on Bluemix (and likely will involve another video). Recently (Monday) we saw [the 14th release of the Extension Library for Domino 9.0.1](//developer.ibm.com/bluemix/2015/09/01/xpages-runtime-update/), which includes ([amongst other things](//twitter.com/Gidgerby/status/638509939141537792)) the ability to control the Java permissions from a master switch or java.policy fragments. This is great news for my demo app, as it depends on the permissions being enabled for my _HttpServlets_ to run correctly.

All in all, it's shaping up to be a good continuation of what I've already been working on. I hope you continue to find it useful, as I do. Until then, keep on Pratt keeping.

<a href="{{ site.url }}/images/post_images/XPagesOnBluemix_PrattKeeping.png" data-toggle="tooltip" title="wait, I can't cross over Jurassic World and A Song of Ice and Fire geekdoms... can I?"><img src="{{ site.url }}/images/post_images/XPagesOnBluemix_PrattKeeping.png" class="img-responsive center-block" /></a>