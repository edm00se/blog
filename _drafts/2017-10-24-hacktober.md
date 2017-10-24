---
layout: post
type: post
title: "Hacktoberfest and More"
description: "the code still runs on servers"
category: open-source
tags: [serverless, virtualization, containers, intro, concepts]
modified: 2017-10-24
comments: true
share: true
permalink: /open-source/hacktober2017/
---

### Hacktoberfest 2017

October brings many good things with it. It's the beginning of autumnal colors here, along with some yard raking in my case. It also brings with it not just Oktoberfest, but Hacktoberfest!

<figure>
  <amp-img src="{{ site.url }}/assets/images/post_images/Hacktoberfest2017.png"
  alt="hacktoberfest 2017"
  layout="fixed"
  width="404" height="452"></amp-img>
 <figcaption>Hacktoberfest 2017</figcaption>
</figure>

[Hacktoberfest][hacktoberfest-url] is a month long open source support initiative, sponsored by [Digital Ocean][dig-ocean], partnering with [GitHub][gh-url]. It's meant to promote open source involvement and contribution. As added incentive, if you meet the criteria, you can get a free t-shirt (and stickers). Who doesn't like free?

#### Criteria for Completion

It's pretty simple:

- sign up at [hacktoberfest.digitalocean.com][hacktoberfest-url]
- complete four (4) [Pull Requests][gh-pr] on [GitHub.com][gh-url] to any combination of public repositories

That's it, no step three. If you complete those by the end of October, you should get an email from Digital Ocean announcing your awesomeness, along with a link to put in your mailing address.

#### What Makes Sense?

Any public repository works for Hacktoberfest, but you should ideally seek out some of the projects that you've found useful, helpful, or meaningful. A couple of the more notable projects I was happy to contribute to this month includes:

- [nuxt.js][nuxt-url], "...a framework for universal [Vue.js][vue-url] applications" (things including [SSR][ssr])
- [nuxtent][nuxtent-url], a library for use with nuxt "for content heavy sites as easy as using Jekyll, Hugo, or any other static site generator"

In case you haven't picked up on a theme, my love of vue has only grown over the last year. It's recently broken v2.5.0, had a full [road map published][vue-roadmap], and even done [an AMA on hashnode][vue-ama].

#### Know of Any Good Open Source Projects?

As it happens, if you're a reader here from the Domino/XPages community, you may be aware of a tool I launched at the beginning of the year; an [XPages][xpages] ODP compatible [Yeoman generator][yeo], [generator-xsp][gen-xsp]. It's been [blogged about][gen-xsp-blog] and [screen cast on Notes in 9][gen-xsp-ni9]; so if you're curious to use, please do. More importantly, I'm seeking a combination of additional contributors or maintainers, so if you have thoughts, please [raise an issue][gen-xsp-iss] to suggest features, spot bugs, or [submit a PR][gen-xsp-pr].

### IBM Champion Nomination

I've had the great honor of being named an IBM Champion for three years running. I tend to stick to the Domino/XPages spaces (Collaboration Solutions) and Cloud (Bluemix), but there are more than just two categories. Nominations have been opened up for 2018, so if you know of anyone deserving of being nominated, please [put in some good words][ibm-champion-nomination]! Submissions are open through November 13th.

### Summary

There's a lot going on these days, it seems, but it's nice to take some time to pay back to open source for all the use its given us. No, it doesn't have to be mine by any means, there are lots of great projects that could use a little help. So get out there, there's still some time left in the month!

[hacktoberfest-url]: https://hacktoberfest.digitalocean.com/
[gh-url]: https://github.com/
[dig-ocean]: https://www.digitalocean.com/
[gh-pr]: https://help.github.com/articles/about-pull-requests/
[nuxt-url]: https://nuxtjs.org/
[vue-url]: https://vuejs.org/
[ssr]: https://nuxtjs.org/guide#server-rendered-universal-ssr-
[nuxtent-url]: https://nuxtent.now.sh/
[vue-roadmap]: https://github.com/vuejs/roadmap
[vue-ama]: https://hashnode.com/ama/with-vuejs-team-cj7itlrki03ae62wuv2r2005s
[xpages]: http://xpages.info/
[yeo]: http://yeoman.io/learning/
[gen-xsp]: https://github.com/edm00se/generator-xsp
[gen-xsp-blog]: https://edm00se.io/self-promotion/ni9-node-tools-grab-bag/
[gen-xsp-ni9]: http://www.notesin9.com/2017/04/04/notesin9-205-leverage-domino-development-with-new-tools/
[gen-xsp-iss]: https://github.com/edm00se/generator-xsp/issues/new
[gen-xsp-pr]: https://github.com/edm00se/generator-xsp/pull/new/master
[ibm-champion-nomination]: https://www.ibm.com/developerworks/champion/nominate.html
