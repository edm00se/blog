---
layout: post
type: post
title: "House Keeping"
description: "a public service announcement"
category: admin
tags: [site, admin, nifty]
modified: 2016-02-23
comments: true
share: true
---

[Update]
This pertains primarily to an older version of my blog. The section permalinks and contribution sections still apply, but there is no longer a search component accessible from other than the [Search page]({{ site.url }}/search/).
[/Update]

### Intro
In speaking with someone recently, it was brought up that there were features to this blog that were unknown. While I'm _hoping_ this isn't the case for any regular readers, I figured it would be worth highlighting some of the potentially lesser-known features here.

### Menu
Right there, with the "hamburger" icon. You can find links to the series pages, categories I've posted in, and the tags I've tagged each of my posts with, for correlating related posts.

<a href="{{ site.url }}/assets/images/post_images/blog_psa/blogMenu.png" data-toggle="tooltip" title="mmm... hamburgers"><img src="{{ site.url }}/assets/images/post_images/blog_psa/blogMenu.png" class="img-responsive center-block" /></a>

### Search
Ever since it first came to be, this blog has had both a menu and a search fuction. The search took some re-work after a few months of being in limbo after a conversion, but I think it's fairly useful, as it uses a simple jQuery search against a [simple but effective search.json file]({{ site.url }}/search.json).

<a href="{{ site.url }}/assets/images/post_images/blog_psa/blogSearch.png" data-toggle="tooltip" title="a simple yet effective search mechanism in a convenient overlay"><img src="{{ site.url }}/assets/images/post_images/blog_psa/blogSearch.png" class="img-responsive center-block" /></a>

### New Additions
I've recently gone through a couple of additions that may be of use to some. I've also done some house keeping when it comes to tidying up some of the (lesser used) icons and features (such as removing the [no-longer necessary client-side JS hack for the estimated reading time](https://github.com/edm00se/DevBlog/issues/3)).

#### GitHub Style Section Links
If you're familiar with GitHub's section (header) links that appear on hover, you know that it can be a handy way to link someone to a particular section. Seeing how this is an [easy to implement jQuery script](https://github.com/edm00se/DevBlog/commit/b5037217e7e46c7e4a377c2e8009147e3c7eec91#diff-1), I thought it could be useful to someone or, if not, at least myself. Just hover over the section header (works for header tags `h1` through `h6`) and when you see the hyperlink icon, you know you can right-click and copy the fully qualified URL.

<a href="{{ site.url }}/assets/images/post_images/blog_psa/GitHubStyleSectionLinks.png" data-toggle="tooltip" title="styled after GitHub"><img src="{{ site.url }}/assets/images/post_images/blog_psa/GitHubStyleSectionLinks.png" class="img-responsive center-block" /></a>

#### Contribution
I've updated my contribution document and [added templates for any Issues or Pull Requests](https://github.com/edm00se/DevBlog/commit/3e370c64dc7856e852360522f457765e555e701c), now that [templates are offered for GitHub Issues and Pull Requests](https://github.com/blog/2111-issue-and-pull-request-templates). Basically, if you find a typo, you can submit a Pull Request (or just alert me as usual) :wink:.

<a href="{{ site.url }}/assets/images/post_images/blog_psa/findSomething.png" data-toggle="tooltip" title="now people don't have to comment on my typos, they can fix them for me!"><img src="{{ site.url }}/assets/images/post_images/blog_psa/findSomething.png" class="img-responsive center-block" /></a>

An honorable mention, the tags make for easy searching for related content.

#### Apple News
I'm still ironing out the "feature image" aspect of the expanded atom feed which provides the content to Apple News, but for now, the image tiles all are my blog's background. You can add my blog's content to Apple News by either tapping the "share" icon and selecting "add to Apple News" or searching for "Eric McCormick's Development Blog" via the Apple News search.

Adding from mobile Safari:
<a href="{{ site.url }}/assets/images/post_images/blog_psa/addToNews.png" data-toggle="tooltip" title="adding from the iOS mobile Safari sharing screen"><img src="{{ site.url }}/assets/images/post_images/blog_psa/addToNews.png" class="img-responsive center-block" /></a>

Searching in Apple News:
<a href="{{ site.url }}/assets/images/post_images/blog_psa/appleNewsSearch.png" data-toggle="tooltip" title="stay with me now!"><img src="{{ site.url }}/assets/images/post_images/blog_psa/appleNewsSearch.png" class="img-responsive center-block" /></a>

### Summary
All in all, if you get to my blog's content via a hyperlink, such as a feed reader, an aggregator like [PlanetLotus.org](http://planetlotus.org/), or are just curious, you should have access to my content, wherever you may roam.
