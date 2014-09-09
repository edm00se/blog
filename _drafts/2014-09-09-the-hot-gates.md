---
layout: post
type: post
title: "The Hot Gates"
description: "why REST makes a good server even better"
category: xpages
tags: [xpages, domino, java, rest]
modified: 2014-09-09
comments: true
share: true
---

### The Hot Gates, a Terrible Analogy
When the Spartans battled to defend their homeland against a Persian army invasion at the Battle of Thermopylae, they chose the ground they fought upon to work to their advantage. I'm going to use this in a reverse analogy. Imagine that you're a seasoned commander in the Persian Empire of Xerxes; this is the second Persian invasion of Greece (as Xerxes' father, Darius the Great had done so with the Aegean Islands and northern Greece / Thrace-Macedonia). You represent a large business application, the Persian Empire. Everything you want to load into your web browser, Greece, must pass in somehow. But the Spartans are only doing battle in a narrowly defined portion of land (The Hot Gates), which constrains your ability to do battle (deliver your awesome application to the Greek heathens) to a smaller scale.

This is a terrible analogy (yes, it really is) but in real life, we find our applications are trying to jam a lot of data, logic, and resources into a user's web browser at any given time. We're constrained, ultimately, by the abilities of a user's browser and that browser's connection back to the server our application is running on.

### XHRs in XPages
&lt;voice of David Attenborough&gt;
Back when "Web 2.0" was still just a catch phrase (<a href="http://en.wikipedia.org/wiki/Web_2.0">prior to around 1999</a>) and the web cried out in anguish. Then, a champion appeared, <a href="http://en.wikipedia.org/wiki/Ajax_(programming)">AJAX</a> (Asynchronous JavaScript + XML). AJAX introduced us to the XMLHttpRequest (XHR) and brought in the ability for a programmatic, asynchronous loading of content, based on the user's interaction. The web rejoiced and new development patterns were introduced.
&lt;/voice of David Attenborough&gt;

XPages makes use of XHRs with every partialRefresh event, usually in the form of a POST. Here's an example, taken from the always excellent OpenNTF.org site. Inside a project page, there are the tabs for the content pane. Selecting a tab fires a <a href="http://dojotoolkit.org/reference-guide/1.6/dojo/xhrPost.html">dojo XHR POST</a> to the server, which then loads the content for the element to be changed, and the client-side XSP object loads it into the DOM. XPages does this with HTML generated from the server session Domino has established for the user's interaction. You can view these interactions from most web browsers, just open up the developer tools for your browser (shown is Chrome's DevTools) and look for network events.

<a href="{{ site.url }}/images/post_images/XPagesPartialRefreshPost.png" data-toggle="tooltip" title="sample XPages partialRefresh call"><img src="{{ site.url }}/images/post_images/XPagesPartialRefreshPost.png" class="img-responsive" alt="sample XPages partialRefresh call" /></a>
<br />
<a href="{{ site.url }}/images/post_images/XPagesPartialRefreshPost_results.png" data-toggle="tooltip" title="sample XPages partialRefresh call response"><img src="{{ site.url }}/images/post_images/XPagesPartialRefreshPost_results.png" class="img-responsive" alt="sample XPages partialRefresh call response" /></a>

handling errors
better xhrGet vs "partialRefresh" for performance

asdf