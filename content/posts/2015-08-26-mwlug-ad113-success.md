---
title: 'MWLUG2015: AD113'
description: 'Speed Up Your Applications With Nginx and PageSpeed'
date: 2015-08-26
published: true
tags: ['mwlug', 'nginx', 'xpages']
canonical_url: false
category: nginx
permalink: /self-promotion/mwlug-ad113-success/
---

![against two other app dev sessions and free beer?!](./images/angry-deadpool.jpg)

### MWLUG 2015

MWLUG has been going great, as expected. The worst thing I've been fighting is the overlap of some really good sessions. In fact, mine went up against two other app dev sessions and one entitled "free beer". It would seem I need to do a better job of bribing and/or coercing [@RichardMoy](https://twitter.com/richardmoy) (it's because I poked fun at dojo, isn't it?).

#### The Plan

A couple things came up that didn't go perfectly, but all in all the session was a success. One thing of note is that my preference towards using CDNs for common JS libraries also meant that my site, on very slow and spotty hotel wifi, performed slower (making my demo of the [PageSpeed Chrome extension](https://chrome.google.com/webstore/detail/page-speed-insights-with/lanlbpjbalfkflkhegagflkgcfklnbnh?hl=en) slightly less useful).

#### References

You can find [my slide deck on Slideshare](https://www.slideshare.net/edm00se/ad113-speed-up-your-applications-w-nginx-and-pagespeed) or check out [my GitHub repository](https://github.com/edm00se/AD113-Speed-Up-Your-Apps-with-Nginx-and-PageSpeed), with copies of the slide deck and (more importantly), my screen shots of my demos and sample config files.

### My Session

My session fits into the bigger picture, as I see it. With a front- and back-end segregated application development approach, lots of things become possible. I've talked about lots of reasons, my session focused on the ability to provide some excellent performance enhancements, all with freely available software, and give your users a better experience. The magic? It's all in a couple specific things, here are the highlights.

* [Nginx](https://nginx.org/)
  * reverse proxy and web server
  * free
* [PageSpeed](https://developers.google.com/speed/pagespeed/module/)
  * ngx_pagespeed, the module for Nginx
  * there's also an Apache module
* PageSpeed Insights
  * [easily shows areas for improvement](https://developers.google.com/speed/pagespeed/insights/?url=edm00se.io) (link shows my blog's ranking, pretty decent)
* HTTPS/SSL hand off to Nginx
* alternate options (paid)
  * [CloudFlare](https://www.cloudflare.com/)

### Summary

All in all, I'm excited for a lot of other sessions that will be there and I hope we can keep driving forward on reconciling our Domino/XPages development practices with the greater, web development community. We _can_ achieve a balance. I hope to see you there!
