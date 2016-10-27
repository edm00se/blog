---
layout: post
type: post
title: "Speed Up Your Applications With Nginx and PageSpeed"
description: "my session at MWLUG 2015"
category: self-promotion
tags: [mwlug, structure, mvc, rest, xpages]
modified: 2015-08-04
comments: true
share: true
---

#### [My Post-Conference Post with goodies!]({{site.url}}/self-promotion/mwlug-ad113-success)

### MWLUG is Nearly Here

<figure class="center">
  <amp-img src="http://i.giphy.com/mPOGx4hJtOWSA.gif"
  alt="call me excited"
  height="269" width="500"
  layout="responsive"></amp-img>
 <figcaption>call me excited</figcaption>
</figure>

MWLUG is nearly here and I'm pretty happy about that. Last year's was a good experience and part of why I'm so excited to be going back. If you haven't been and are debating going, you may wish to check out [my thoughts on last year's MWLUG]({{ site.url }}/xpages/community-code-and-evolution/); the short version is technical sessions, community, and :beer:. If that doesn't sell you on going, then I'm not sure what will. Seriously, it was a good time and I'm looking forward to it.

### My Session
After a <s>session</s> chalk talk in January, I guess I've got the speaking bug. I feel like I have a lot to share, some of which is better done in-person. This time around, I'll be presenting on why the segregated front-/back-end application development pattern is a performance enhancing boon. I [may have talked about some of this before](//edm00se.io/xpages/application-logic/), but these blog posts, [HTTPServlet series]({{ site.url }}/servlet-series/), and <span data-toggle="tooltip" title="one more is on its way!">Notes in 9 videos</span> have all been building on top of each other.

The title of my session is "Speed Up Your Applications With Nginx and PageSpeed". The focus is on using an [Nginx reverse proxy](//nginx.org/) in conjunction with [Google's PageSpeed tools](//developers.google.com/speed/pagespeed/?hl=en) for a better (we're talking faster!) application experience for your users. I hope that's as exciting to you as it is for me.

I've been <span data-toggle="tooltip" title="looking at you, David"><s>accused</s> called out for [having an "admin-y" sounding session](//www.youtube.com/watch?v=dAN1iGaOv2s&t=8m27s)</span>, but I guarantee a couple things:

* I'm a developer
* I only pretend to know admin-y things (to serve my development purposes)
* I'll try not to bore you with installs and CLI commands that you can read from standard documentation
* we can still respect each other as developers after my session is done :stuck_out_tongue_winking_eye: (it's about better applications)

### When
My session, AD113: Speed Up Your Applications With Nginx and PageSpeed, will be from 3-4pm on Friday, 21-August-2015 in the Congress room. With any luck, that's [congress, as in a '... formal meeting...'](//en.wikipedia.org/wiki/Congress) of highly intelligent developers, not to be confused with [congress](//www.urbandictionary.com/define.php?term=Congress&defid=4452659).

### Abstract
One of the more popular web server technologies in recent history is Nginx, an open source reverse proxy and web server. Built to be lightning fast, Nginx when combined with Google's PageSpeed module can allow for even faster configuration and every user knows that faster applications are better. Covering the key topics of:

* basic build, install, and configuration of Nginx and PageSpeed module
* demonstration of use with caching of static assets
* configuration of the PageSpeed components
* show how to hand off SSL/TLS credentials

### Summary
All in all, I'm excited for a lot of other sessions that will be there and I hope we can keep driving forward on reconciling our Domino/XPages development practices with the greater, web development community. We _can_ achieve a balance. I hope to see you there!

<figure class="center">
  <amp-img src="{{ site.url }}/assets/images/post_images/deadpool.jpg"
  alt="Weeeeee!"
  height="373" width="575"
  layout="responsive"></amp-img>
 <figcaption>Weeeeee!</figcaption>
</figure>
