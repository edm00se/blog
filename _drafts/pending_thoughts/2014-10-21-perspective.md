---
layout: post
type: post
title: "Perspective"
description: "a little of what we don't get every day"
category: xpages
tags: [xpages, javascript, potpourri]
modified: 2014-10-21
comments: true
share: true
---

### A Bit of Perspective
For those that read my rantings <a href="//twitter.com/edm00se">140 characters at a time</a>, my company has recently gone through the hiring of a second web developer. This has resulted in the addition of a developer who knows a fair amount of how to develop for the web, but is <a href="//twitter.com/edm00se/status/524265296199434240">experienced in a different niche server platform</a>.

<blockquote class="twitter-tweet" lang="en"><p>Explaining <a href="//twitter.com/hashtag/XPages?src=hash">#XPages</a> to a <a href="//twitter.com/hashtag/ColdFusion?src=hash">#ColdFusion</a> developer is sort of like explaining the inner workings of a microwave vs a toaster oven. Does the same?</p>&mdash; Eric McCormick (@edm00se) <a href="//twitter.com/edm00se/status/524265296199434240">October 20, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

My comment wasn't to hate on any platform, but to identify the drastic differences our new dev saw the first time I opened up DDE in source view; there was an honest, "what is that?" moment.

That being said, I find myself attempting to explain to a new hire what exactly "this XPages thing" is. So, what have I had to remind myself my work platform is includes things like:

* a full-stack application and NoSQL database platform
* access to event hooks for each of the JSF life cycle phases
* a large amount of stock form elements and layouts
* Dojo, by default (at a given version)
* security and access gruops/roles from Domino

Seeing how I'm in the process of <s>bribing my admins</s> upgrading our Domino servers to 9.0.1, I am training to a level above what I've become accustomed to, and brings us both some goodies. It also reduces the need to differentiate the idiosyncrasies of 8.5.3 with UP1 as opposed to v9 or the ExtLib. I'm also making sure that our Domino upgrade includes the OpenNTF Essentials package, giving even more goodies, to bring in many useful plugins which can only aid our efforts. 

#### Where It's All Going
As it happens, our new hire is experienced with jQuery. So, being the opportunistic developer that I am, I'm not only converting/corrupting him with Domino/XPages, but also with AngularJS and a client-side approach to development. The best part about this is that regardless of the back end of the platform, we're unifying our development practices and making at least part of our lives over the coming months/years/? easier to maintain; we're working in an area of multiple server platforms with Domino being one of them, and it's time to have things locked in place before confusing ourselves any further.