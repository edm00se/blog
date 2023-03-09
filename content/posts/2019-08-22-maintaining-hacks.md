---
title: 'Maintaining Hacks'
description: 'an exercise in keeping sanity through archaic needs'
date: 2019-08-22
published: true
tags: ['web', 'architecture', 'structure', 'amp', 'mobile', 'content']
canonical_url: false
category: web
permalink: /web/maintaining-hacks
---

Writing a hacky bit of software to "make something work" is rarely anything a developer wishes to do. They're ~~crimes~~ acts of necessity, born of the moment. True innovation exists within the **need** to achieve a task, but sometimes we merely do what we need to do to get the job done. This post exemplifies one such effort on my part, along with my further efforts to keep the madness at bay.

### In Case You've Been Living Under A Rock

[AMP][amp-url] (Accelerated Mobile Pages), for those of you who have blissfully avoided it, sometimes gets a bad reputation. Some of the primary criticisms against AMP include:

- it ignores and bypasses most web conventions
  - requiring a large-ish amount of JavaScript files from Google
  - the scripts to load are hosted purely by Google
  - the scripts can change at any time and are un-versioned, are maintained by Google
- effectively creates vendor lock-in for the format
- has that bar over the top of the screen, when viewed on mobile, which cannot be removed
  - there was a bit of an uproar a little while back as something went wrong and the link wasn't clickable and it couldn't be removed or fixed by anyone else

Just to be clear, it isn't all doom and gloom. There's a reason I tried AMP out on this very blog in the first place. What it achieves is somewhat impressive, even if it bumps most web convention norms. For a content-focused site, it succeeds in keeping the focus on the content. This includes in limiting what ads can do and how they're displayed. Gone are the multiple pop ups asking to put you on a mailing list or auto playing videos, for the most part. It also limits how much JavaScript can be loaded, to be a valid AMP site; just that which loads the site, none of which is allowed for AMP compliant pages. [This blog's search page does not validate][search-pg-validation] per the AMP spec. While this is annoying for web app developers, it's great for content as a consumer, because there's less for developers to fiddle around with.

### The Hacks In Question

The involved hacks are ultimately mechanisms for displaying content that requires JavaScript to load. In both cases, from a third party source. Specifically this is relating to both GitHub gist embeds and Disqus comments. The part that made these become hacks is that AMP's requirements for JS are that it can be loaded, but not from the host site. This leads us to the route of embedding content via an `iframe`; specifically AMP's [`amp-iframe`][amp-iframe-docs] implementation, as they use unique namespaces for components.

In my case, I wrote a pair of HTML pages that contained some JavaScript with some logic to take passed URL query parameters to determine what to load in the generated `iframe` for the destination

note: The gist workaround is no longer needed, as AMP eventually added this as a native component some time after I did my work around. Also of note, the disqus solution I came to loads their JS, which loads another nested `iframe`; if you parse their query parameter logic you could possibly do without a middleman, although this was not clear when I began as it was a new technique with little documentation at the time.

### Keeping The Madness

At first, I just picked a domain name I already owned and controlled and knew I could park a pair of HTML files into without impacting the site. In the case of Disqus, I had to allow the new domain as authorized to interact with my connected account. While this did the job, it lacked in the sense of holding to its purpose and was moving with an unrelated codebase. Preparing to move off that domain meant I would need to deal with things properly. My solution involved:

- moving the hack pages to a new home
  - in my case I wound up using a GitHub repository with the pages deployed via GitHub Pages
  - this is free, worked with my existing custom domain name for my root GitHub Pages (user site), and meant it was merely `<my domain>/amp-hacks`
- updating existing references
  - updating my AMP site (blog) to point to the new destination (a simple replace of domain/path from the old one to the new one)
  - updating Disqus as to the authorized domain access
- testing it out
  - this went strangely without a hiccup, hooray! 🎉

Where is it now? If you're interested, you can check out my repository, [`github.com/edm00se/amp-hacks`][gh-amp-hacks-repo]. Feel free to check it out, see what it does, or fork it and make it your own; or stare in horror at the workaround needed. For reference the repository is new, but the pages date back to about 3 years ago in a different repo I've since archived; I finally stuffed my hacks into their own box.

That's it, the big reveal. Have hacks that are needed to make things work? Throw them in their own box and keep them, documented and available, but isolated. One day they can be removed and the world will be a little bit brighter for it.

<!--
[![GitHub stars](https://img.shields.io/github/stars/edm00se/amp-hacks?style=social){.skinny}](https://github.com/edm00se/amp-hacks) [![GitHub forks](https://img.shields.io/github/forks/edm00se/amp-hacks?label=Fork&style=social){.skinny}](https://github.com/edm00se/amp-hacks)
-->

### A Leading Question

When your "normal" development practice _requires_ use of hacks, as the `amp-iframe` has been required/used by many to solve issues since AMP's creation, what does that mean for desirability of development for that platform? If a normal requirement, such as a site specific search page which isn't just a form to submit a Google site search, is just unattainable, then it's not a viable development platform. This is where I've arrived, which is to regard AMP as a great way of content consumption, but not as a platform to develop for. I could continue to live with my blog in its current format, it works, and does so pretty well. I'm just moving on.

### What's To Come

I've dabbled over the last year, give or take, in:

- [vuepress][vuepress], because I love vue.js and its documentation is pretty hot
- [gatsby][gatsby], because the web dev scene has gone gatsby crazy
- [gridsome][gridsome], because I love vue.js and it's the most gatsby-like analogue with vue
- [eleventy][eleventy], because while the world doesn't need yet another static site generator, it's aim is close to jekyll, all while being an unobtrusive build system
- [svelte][svelte], because I love JS, but also love extreme simplicity; this isn't an SSG, but rather an application framework with a focus on low code, reactivity, and no virtual DOM

I'm not sure where I'm going with this blog, but considering my obsession over development tooling and the frequency with which I overhaul my blog as an excuse to try out something new, I can't help but imagine it's only a matter of some time before it happens. It's already been about [three years in this format][post-reincarnated], so it's probably time to reincarnate it again.

<!-- <iframe class="tweetbu" src="https://tweets.edm00se.codes/1164279630326636549/">failed to load</iframe> -->

### Summary

All in all, AMP has its place, but it's not for me. I don't think it's evil, it just prevents my usual playing with things, so as a developer and not a content manager, it's time for me to move on. Also, this post isn't about the specifics of my solutions; merely about what insanity it was and the improved way I eventually settled on handling the hackery. Initially, it was just an extra couple of pages parked in a deployed domain I owned and controlled, but finally I was able to park them in a dedicate space and will serve its purpose until it's no longer needed.

[amp-url]: https://amp.dev/
[search-pg-validation]: https://validator.ampproject.org/#url=https%3A%2F%2Fedm00se.io%2Fsearch%2F
[amp-iframe-docs]: https://amp.dev/documentation/components/amp-iframe/
[gh-amp-hacks-repo]: https://github.com/edm00se/amp-hacks
[vuepress]: https://vuepress.vuejs.org/
[svelte]: https://svelte.dev/
[gatsby]: https://www.gatsbyjs.org/
[gridsome]: https://gridsome.org/
[eleventy]: https://www.11ty.io/
[post-reincarnated]: https://edm00se.io/admin/reincarnation/
