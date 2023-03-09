---
title: 'Prettify Your Error Code'
description: 'adding style to a custom error XPage'
date: 2015-07-02
published: true
tags: ['xpages', 'domino', 'javascript']
category: xpages
permalink: /xpages/custom-error-xpage/
---

### Intro

Here's an interesting thing. The best part is that I can't attribute myself with credit for the majority of the body of work involved. In fact, I had some help from an [eagle-eyed Marky Roden](https://stackoverflow.com/a/30925635/1720082) who spotted a contributing issue, and an astounding three answers from Sven Hasselbach on [a StackOverflow question on a key component subject](https://stackoverflow.com/questions/30925066/custom-error-xpage-ability-for-browser-to-load-and-execute-js-script-link-or-bl/).

<iframe class="tweetbu" src="https://tweets.edm00se.codes/611629455069425664/">failed to load</iframe>

### Custom Error XPage

With that help I was able to finish putting together a modified custom error XPage, based on [the XSnippet by Tony McGuckin](https://openntf.org/XSnippets.nsf/snippet.xsp?id=custom-error-page-cw-cause-and-stacktrace-information); this version includes some place holders for custom theming (e.g.- logo, styling) and most importantly, includes code syntax highlighting! I was able to add [Google Code Prettify](https://github.com/google/code-prettify) and get it to work when XPages throws a runtime error both from a full refresh event (that was the easy part), but also with a partial refresh.

That last bit is difficult as a partial refresh invokes a dojo xhr POST against the current XPage and, when getting a runtime error, returns a network response of 500 and returns a:

- default error 500 page
- XPage runtime error page
- custom error XPage

If it returns either of the second two options, it injects the contents via effectively an innerHTML injection, which [according to the W3C](https://www.w3.org/TR/2008/WD-html5-20080610/dom.html#innerhtml0) [should not execute included JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#Security_considerations). This is to protect the user, as it `should` eliminate some script based attacks via injects. In any case, we're getting around this by using `onload` as an attribute on our `img` tag. This fires the JS we jam in there, which will append the same linked JS file for Google Code Prettify to the `head` tag, which will then execute.

##### We Might As Well Make It Look Good

Why are we doing this? Well, if you're going to have an error page show off your code, you might as well have it look good.

### Code

Check this baby out, a couple notes on implementation below.

https://gist.github.com/edm00se/b9030c7d0cdb45a94aab866772cc3a15#Error.xsp.xml

As you can see, there's now an `xp:text` tag (one of the only two, the other being `xp:panel`) at the bottom, just after the normal `script` tag, that lets you set and overwrite the `tagName`, to become a an `img` tag, complete with the `onload` event to add the `script` tag to the `head`. This only renders if it's detected as being in a partial refresh, making a full refresh behave normally. An elegantly simple solution to a surprisingly complex situation.

### Next Time

I have more to share, but I can guarantee the pace over the next few weeks won't be anything like this month. In fact, I have some prep to do for a certain shindig in Atlanta in August (MWLUG 2015!). I hope to see you there!
