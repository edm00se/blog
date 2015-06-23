---
layout: post
type: post
title: "Prettify Your Error Code"
description: "adding style to a custom error XPage"
category: self-promotion
tags: [xpages, domino, javascript, servlet, angularjs]
modified: 2015-06-22
comments: true
share: true
---

### Intro
Here's an interesting thing. The best part is that I can't attribute myself with credit for the majority of the body of work involved. In fact, I had some help from an [eagle-eyed Marky Roden](//stackoverflow.com/a/30925635/1720082) who spotted a contributing issue, and an astounding three answers from Sven Hasselbach on [a StackOverflow question on a key component subject](//stackoverflow.com/questions/30925066/custom-error-xpage-ability-for-browser-to-load-and-execute-js-script-link-or-bl/).

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">SO question on executing CSJS in a custom error XPage.&#10;&#10;<a href="https://twitter.com/hashtag/XPages?src=hash">#XPages</a>&#10;&#10;<a href="http://t.co/kRvedc5BGq">http://t.co/kRvedc5BGq</a></p>&mdash; Eric McCormick (@edm00se) <a href="https://twitter.com/edm00se/status/611629455069425664">June 18, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### Custom Error XPage
With that help I was able to finish putting together a modified custom error XPage, based on [the XSnippet by Tony McGuckin](//openntf.org/XSnippets.nsf/snippet.xsp?id=custom-error-page-cw-cause-and-stacktrace-information); this version includes some place holders for custom theming (e.g.- logo, styling) and most importantly, includes code syntax highlighting! I was able to add [Google Code Prettify](//github.com/google/code-prettify) and get it to work when XPages throws a runtime error both from a full refresh event (that was the easy part), but also with a partial refresh.

That last bit is difficult as a partial refresh invokes a dojo xhr POST against the current XPage and, when getting a runtime error, returns a network response of 500 and returns a:

* default error 500 page
* XPage runtime error page
* custom error XPage

If it returns either of the second two options, it injects the contents via effectively an innerHTML injection, which [according to the W3C](//www.w3.org/TR/2008/WD-html5-20080610/dom.html#innerhtml0) [should not execute included JavaScript](//developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#Security_considerations). This is to protect the user, as it _should_ eliminate some script based attacks via injects. In any case, we're getting around this by using _onload_ as an attribute on our _&lt;img&gt;_ tag. This fires the JS we jam in there, which will append the same linked JS file for Google Code Prettify to the _&lt;head&gt;_ tag, which will then execute.

##### We Might As Well Make It Look Good
Why are we doing this? Well, if you're going to have an error page show off your code, you might as well have it look good.

### Code
Check this baby out, a couple notes on implementation below.

{% gist 684539960bc23e7b447b Error.xsp.xml %}<br />

As you can see, there's now an _xp:text_ tag (one of the only two, the other being _xp:panel_) at the bottom, just after the normal _&lt;script&gt;_ tag, that lets you set and overwrite the _tagName_, to become a an _&lt;img&gt;_ tag, complete with the _onload_ event to add the _&lt;script&gt;_ tag to the _&lt;head&gt;_. This only renders if it's detected as being in a partial refresh, making a full refresh behave normally. An elegantly simple solution to a surprisingly complex situation.

### Next Time
I have more to share, but I can guarantee the pace over the next few weeks won't be anything like this month. In fact, I have some prep to do for <span data-toggle="tooltip" title="MWLUG 2015!">a certain shindig in Atlanta in August</span>. I hope to see you there!