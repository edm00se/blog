---
title: 'Change is in the Air'
description: 'Summer, ThatConf, Open Source, and Work'
date: 2017-09-01
published: true
tags: ['open-source', 'conference', 'summer', 'day-job']
canonical_url: false
category: self-promotion
---

### I'm Back

 ![What can I say except "you're welcome"?](./images/MauiYoureWelcome.gif){attribution="Maui is a character from the Disney film Moana. All rights belong to Disney."}

##### In Case You Missed It

If you find yourself asking "where was Eric?", this should summarize it all:

https://twitter.com/edm00se/status/863881998561136641

Instead of trying to do everything all summer, I tend to take a break from blogging and a lot of open source endeavors over the summer. It means I can focus on family time along with yard and house projects.

![Ah... Summer](./images/Olaf_summer.gif){attribution="Olaf is a character from the Disney film Frozen. All rights belong to Disney."}

That's all paid off and, with fall fast approaching, I've found myself wanting to start those things back up; ramping up into winter when I don't do as much outdoors. I've had a couple of things going on, so I figured a post to recap would be in good order.

### That Conference

This year, instead of joining friends at [MWLUG][mwlug-url] 😢 (now renamed to CollabSphere, next in August 2018 in Ann Arbor, MI), I had the opportunity to attend [That Conference][that-conf-url] for the first time. It's been on my radar for a few years, but this was my first time and I was quite pleased with it. It had a lot of great sessions, some great keynotes, there were some breakout sessions as well, which included some great topics and I wish I'd gone to more. The one I _did_ go to was on [PWAs][pwa-url]; there was some good conversation which was made even better by the fact that there is some amazing potential for PWAs w/ the inclusion of [service workers][service-workers-url]. I'm hoping to go back next year as it was a great conference, only made better in that it was held at the [Kalahari Resort & Convention Center in Wisconsin Dells][kalahari-url].

All in all, That Conference was great and I'm looking forward to it next year. If I'm ambitious enough, I'll submit an abstract as well.

#### Aside: Kalahari

The Kalahari was a great venue for the conference. It's also a great Wisconsin Dells resort, complete with indoor and outdoor water parks, and an indoor theme park. We drove down an extra day in advance and hit up the water parks, since my kid went through her first swim class this summer. During the conference, my wife and kid were able to play in the on premise parks and get over to a petting zoo and water show in the area. All in all, it wasn't just a great venue, it's a great location for family riding along. When my kid's older, she may wish to partake in the family track of That Conference, which looks to be pretty awesome.

#### Aside: Service Workers

The key ingredient in PWAs for me is the [service worker][service-worker-api]. A couple of days prior to That Conference kicking off, I had seen a screen shot of the in-development status of [service workers for WebKit][webkit-sw-status], meaning that the last major player is on its way to implementation; specifically Apple (MS was already in progress). The best part about PWAs is that they're "progressively" enhanced, hence the name. This means that once iOS fully adopts the support, PWAs, such as this very blog, will have the full sw capability readily available, with no changes necessary. Want to see it in action? You can load this blog in Firefox or Chrome (including on Android) and switch off your network connection (airplane mode or check offline in Chrome's DevTools) and you'll find some pages still load from cache and that a network error doesn't crash the whole site (web app). Web apps 1, offline dinosaur 0.

Want to keep track of service workers? Try [the 'is service worker ready?' site][is-sw-ready].

### Work: aka the Day job

One other big change from this summer is that, for the last two months, I've started working for a new company. It's definitely a bit of a change in a couple of regards. I'm part of a decently sized team now, instead of being the solo developer on a tiny team of two. I'm working on a different platform that makes use of some of my front-end and Java backend skills, with some slated Node work that will play to my sense of direction. If that wasn't enough, I've started working from home as well. It's an interesting change with great benefits like not commuting 20+ minutes twice a day and nearly unlimited high quality coffee, but comes with the downside of a decreasing amount of interaction with other human beings. For now though, the dog will do 🐶.

### Open Source Contributions

I have a few ideas. That's all I'm saying right now, since I've got my sights set on a few things which are going to take a bit of setup. Watch this space.

Until next time, cheers! 🍻

[that-conf-url]: https://www.thatconference.com/
[pwa-url]: https://developers.google.com/web/progressive-web-apps/
[service-workers-url]: https://webkit.org/status/#specification-service-workers
[kalahari-url]: https://book.kalahariresorts.com/wisconsin/
[webkit-sw-status]: https://webkit.org/status/#specification-service-workers
[fetch-api-url]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[service-worker-api]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[is-sw-ready]: https://jakearchibald.github.io/isserviceworkerready/
[mwlug-url]: http://www.mwlug.com/
