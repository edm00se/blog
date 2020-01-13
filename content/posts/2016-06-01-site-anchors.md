---
title: 'Site Anchors'
description: 'a simple thing can be overcomplicated'
date: 2016-06-01
published: true
tags: ['web', 'css', 'javascript', 'plugin', 'jquery', 'xpages']
canonical_url: false
category: web
permalink: /web/site-anchors
---

<!-- {% include toc.html %} -->

### Intro

Site anchors, also known as anchor links, are a way to "deep link" your site with consistently navigable content. Such an approach often makes use of the ability for a browser to load/jump/scroll-to a named element (such as a heading or `div`) by its _id_ attribute. In fact, since this is normal browser behavior, if you were to use your browser's dev tools to find an _id_ of a given `div` or other tag, you could pass along a link to another person, highlighting the section of interest. This is something I tend to do a surprising amount of time, especially as I tend to send links to co-workers, in an effort to highlight specific sections of content; big surprise there.

### Utility

As you can probably guess, the usefulness of such a link requires that the element with the _id_ will be (consistently) available. If your pages are generated with dynamically constructed *id*s, you may have no way to consistently provide such a thing. This brings me to the next aspect of what makes site anchors a good idea and useful.

### Visibility

In order for people, specifically non-developers and developers that aren't so lazy as to avoid inspecting an element's _id_ to build out a site anchor manually, to _actually use such a feature_, we need to present it in a non-obstrusive fashion and consistently. What seems to be the best approach is to present an icon, adjacent to the named element, which the user can click on (or right-click, as is more likely) to copy the fully-formed linked address. Maybe its from over-exposure to GitHub's implementation, but I do prefer for these site anchor link indicators to be hidden until I hover over the named element; something about it is much "cleaner" and for the casual reader, it's not obstrusive. The fact that a simple hide/show can be achieved on `:hover` of an element via CSS means that, as an effect, it's both easily achievable and not "costly" in terms of performance.

### My Trials and Tribulations

I had previously implemented the [AnchorJS](https://bryanbraun.github.io/anchorjs/) script into my blog, which was both easy to implement and looked and worked great... on my local preview. In fact, my biggest issue with it was that, no matter what I tried, I couldn't get it to perform correctly on the live version of my blog. At first, I thought this was due to my use of [CloudFlare](https://www.cloudflare.com/)'s minification of my JS and/or its implementation of the "rail gun" feature (which concatenates and uglifies detected static assets); as it turns out, this is not the case, as I went so far as to disable the features, purge the cache, wait a while, and found that it was still broken.

#### Side Note

If CloudFlare's features sound pretty awesome, they should. In fact, by merely passing through the DNS handling for a domain, they can add a great amount of the features [I presented about in my 2015 session at MWLUG, on Speeding Up Your Apps, With Nginx and PageSpeed](https://github.com/edm00se/AD113-Speed-Up-Your-Apps-with-Nginx-and-PageSpeed). The fact that I use a free account with the vast majority of these features enabled is pretty amazing and useful; here's a link to their [plan comparison page](https://www.cloudflare.com/plans/).

### My Blog's (New) Implementation

AnchorJS has a number of good features and is easily implemented, but I had to abandon it in favor of something else. I went for something simpler, which is modeled after [the header anchor links, described in a post, making use of jQuery and Font Awesome for a Jekyll site](https://ben.balter.com/2014/03/13/pages-anchor-links/) (all of which I have, though the use of Jekyll is immaterial here, aside from the fact that my markdown posts automatically have *id*s created for my header elements).

#### TL;DR

If you would prefer to skip ahead, [just view my blog's pertaining diff](https://github.com/edm00se/DevBlog/compare/f379b42...2c16d67?w=1). You will notice I had even gone so far as to inline the uglified version of the script to try and force it to load immediately prior to the invocation.

#### The Concept

* create hyperlinks
* for the header elements
* with some "link" indication
* show on hover

#### The Implementation

I've always found that the simpler an implementation is, the better it holds up. I've included some inline comments to describe the function of each component.

##### CSS

https://gist.github.com/edm00se/5b7b74eaae43598656e614c6d1a53389#anchors.css

##### JS

https://gist.github.com/edm00se/5b7b74eaae43598656e614c6d1a53389#anchors.js

### Recommendations for Web Applications
As mentioned before, if there are _consistently availabe_ *id*s, they can be passed between users pretty successfully. If those _id_ attributes are computed dynamically as with XPages controls and elements, this is problematic (but expected, as you could potentially implement a Custom Control multiple times in an XPage, so unique namespaces are required).

#### What to Avoid
Repeating an _id_ attribute is pretty terrible practice, so below when I describe passing through an _id_, please keep this in mind: **repeating an _id_ on a page will only work for the first element with that _id_**.

This embedded example has multiple sets of five `h3` tags, each with corresponding `a` (anchor) tags pointing at their _id_ via the hash (`href="#<id>"`) method. If you scroll down to the second or third block and click a link, you'll note that the window (in the `iframe`) takes you to the first element with that _id_.

https://jsfiddle.net/edm00se/q5gffnmt?tabs=result,html/

If you anticipate certain known points, you can do a couple of things, most of which amounts to either:

* passing through an HTML tag to define its _id_ in a static fashion
* controlling the computation of the _id_, say via `xp:attr`

Chris Toohey did a great job recently of covering the options for this, and [his blog post on the subject](https://www.dominoguru.com/page.xsp?id=control_rendered_html_id_ibm_domino_xpages.html) goes into pretty good detail on doing just this with XPages.

### Summary
All in all, I had something neat, it didn't work "in production", and instead of fiddling to far with it, I remembered that I'm a developer and this is easy stuff. It's also a pretty useful feature I use pretty regularly, so I'm just looking to share the lesson learned. Until next time, 🍻!
