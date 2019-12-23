---
layout: post
type: post
title: "Go Evergreen"
description: "not just for trees anymore"
category: web
tags: [web, browser, security, standards]
modified: 2017-10-17
comments: true
share: true
---

### Happy ð Day IE 11!

On the 17th of October in 2013, Internet Explorer 11 was released from Microsoft. That means that as of today, this popular\* browser is now four years old and, with all respect to it, it really ought to go.

<figure>
  <amp-anim src="/assets/images/post_images/Out_Gaston.gif"
      width="250"
      height="281"
      alt="Out Gaston"
      attribution="Gaston is a character from the Disney film Beauty and the Beast. All rights belong to Disney."></amp-anim>
  <figcaption>Good day sir. I said good day!</figcaption>
 </figure>

### Evergreen Browsers

What makes a browser, or any software for that matter, [evergreen][evergreen-about]? Well, the basic requirements for a browser, or any piece of software for that matter, are specifically the support of automatic updates, that bring in:

- security fixes
- bug fixes
- rolling/evolving feature udpates

Some of the more popular evergreen browser right now are Chrome, Firefox, and MS Edge. Internet Explorer, for example, is not an evergreen browser.

### Why Does It Matter?

To be perfectly honest, the advancements in JavaScript (EcmaScript) to make use of its annual specification update means that we need to stay on top of our games. In addition to keeping up with the standards being evolved with the spec, we have security concerns as well. Does everyone remember the stretch of SSL issues we saw with [POODLE][poodle-about] and friends that lasted a minor eternity? Does anyone think that will never happen again? We need to stay flexible in our updates and reaction to threats, that's not in question and should sell this "argument" in and of itself.

When a web browser is evergreen, it brings with it flexible adaptation to security threats, pursuit of the evolving web standards specifications, and lets us have access to the latest and greatest APIs so that we as developers aren't held back. Everyone wins from the user, through the developers, up to the vendors.

## A Case In Point

In case you're wondering how this sort of thing comes up in practice, I've got a somewhat handy example that I ran into in my day job. Consider the following object literal assignment in JavaScript. For this example, we're using ES5 syntax.

{% include gist.html id="ac9a624ec1943268f738bb624ab0cc51" file="basic_ob_assign.js" %}

Now consider we add another function (`yetAnotherFunc`) and while adding it to the object, we get a typo.

{% include gist.html id="ac9a624ec1943268f738bb624ab0cc51" file="oops_assign.js" %}

Obviously, we meant to use a `:` in place of a `,` but what happens when we have this? Even though we're writing to an ES5 level, evergreen browsers have been picking up significantly more of the ES2015(ES6) and above features and syntax support. Seeing how this is the evolving spec (with annual updates), there's no reason to hold back. So, if you haven't guessed it by now, this works perfectly fine in any browser that supports the [shorthand assignment in Object initializer][obj-init-shorthand], which is part of the ES6 spec. We've defined `yetAnotherFunc` twice since we used the same property name as the function name, but since both reference the same function, there's not much in the way of issues. This also means that because older browsers, such as IE11, aren't evergreen, they _do not_ and cause us to find a functional issue in potentially only one of our tested browsers. (\*any that doesn't support beyond ES5)

If you're saying, "but that's not IE11's fault", you'd be absolutely correct. IE11 doesn't support ES6, but then it _never will_ and is holding us back; the entire point I'm trying to make here.

#### See It In Action

<amp-iframe width="700"
    title="ES6 Object Initializer Effect via Typo"
    height="320"
    layout="responsive"
    sandbox="allow-scripts allow-same-origin allow-popups"
    allowfullscreen
    frameborder="0"
    src="https://codepen.io/edm00se/embed/JraNrJ/?height=378&theme-id=0&default-tab=js,result&embed-version=2">
  See the Pen <a href='https://codepen.io/edm00se/pen/JraNrJ/'>JraNrJ</a> by Eric McCormick (<a href='https://codepen.io/edm00se'>@edm00se</a>) on <a href='https://codepen.io'>CodePen</a>
</amp-iframe>

### Summary

The ultimate intent of this post is to stress the importance of what we need a web browser to do. Ultimately, just as [Continuous Integration (CI)][ci-about] has led to great advances in how we accomplish development along with its testing and release processes through sheer flexibility, consistency, and immediacy; we also should look for those qualities in our web browser(s). If a browser grows stale or sluggish in its release cycle (such as non-evergreen browsers), then we all suffer for its inability to respond to security threats, release with the known evolving specifications from [W3C][w3c-about] and [TC39][tc39-about]. It's not just about having the new and shiny, it's also about assurance of response to security threats and adapting to the direction of the web.

In the end, the question I've been asking myself is:

> How do we get from _needing to support IE(11)_ to the bright future where we don't have to care if a browser vendor allows itself to go out of date?

I'm fairly certain this will need to be [grassroots][grassroots-about] in nature. We need to "bubble up" our need to move on from inflexible browsers; previously, I would include something like the [browse happy][browse-happy] include (\*this is limited, as it is generally detecting IE specifically) and point those with outdated browsers to it, but it still lists IE 11; part of what I'm trying to avoid.

\*Note: I don't mean to hate on IE, rather Microsoft has moved on with Edge and while they have taken a very business stance of supporting IE for a longer time than I would prefer, but it's for their business customers who have locked-in requirements of older software requiring, say, IE 7 ð. This is rather meant to highlight the need for us as the development community to force the movement and let the "norm" be something favorable to everyone.

Until next time, ð»!

[evergreen-about]: https://www.hanselman.com/blog/TheEvergreenWeb.aspx
[obj-init-shorthand]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015
[poodle-about]: https://en.wikipedia.org/wiki/POODLE
[ie-version-history]: https://en.wikipedia.org/wiki/Internet_Explorer_version_history#Release_history_for_desktop_Windows_OS_version
[chrome-version-history]: https://en.wikipedia.org/wiki/Google_Chrome_version_history
[firefox-version-history]: https://en.wikipedia.org/wiki/Firefox_version_history#Rapid_releases
[edge-version-history]: https://en.wikipedia.org/wiki/Microsoft_Edge#Release_history
[ci-about]: https://en.wikipedia.org/wiki/Continuous_integration
[w3c-about]: https://www.w3.org/standards/
[tc39-about]: http://ecma-international.org/memento/TC39.htm
[browse-happy]: https://browsehappy.com/
[grassroots-about]: https://en.wikipedia.org/wiki/Grassroots
