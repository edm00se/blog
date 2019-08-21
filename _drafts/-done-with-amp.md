---
layout: post
type: post
title: "I'm Done With AMP"
description: "it's good for may news sites, but not my sites"
category: web
tags: [web, architecture, amp, mobile, content]
modified: 2018-08-15
comments: true
share: true
---

I enjoyed the process of converting my blog to an AMP based site. The blog is still Jekyll based, but the rendered site includes things like AMP tags and a service worker that registers via AMP's mechanism. All in all, I'm glad for the experience, but now I've hit that last straw that's going to break the proverbial camel's back, at least for me.

TL;DR: AMP is great for content heavy sites like news organizations, but not for what I have going on in my personal projects.

### AMP, Huh, Yeah, What Is It Good For?

I liked a lot about [AMP][amp-proj] when I first heard of it. The primary concept behind AMP, Accelerated Mobile Pages, is to create a nearly instant mobile experience for content. It does this via a few mechanisms, the largest of which is the lack of direct execution of JavaScript. There are a couple exceptions to this rule, such as the ability to load JS in embedded `iframe`s or via the service worker tag, but otherwise there should be virtually no JavaScript execution. This may be counterintuitive, but as a developer I thought this was a great revelation for a content-driven format.

#### Content Driven Sites

Content heavy sites are likely to gain a lot from this format, whether it's AMP's implementation or otherwise. I'm a surprisingly big fan of it still, even though I'm moving on. It ultimately achieves a pleasant mobile experience, with a caveat or two.

#### Restrictions Against Even The Best Intentions

- disqus / comments
- search (other than an `amp-form` pointing to the google search result page)
  - rather defeats the purpose of a dedicated search page
  - no type-ahead, awareness of content
- random things, such as named elements (can't do permalinking?!)

#### My Blog As A Trial

asdf

### Where To Go From Here?

asdf

[amp-proj]: https://ampproject.org
