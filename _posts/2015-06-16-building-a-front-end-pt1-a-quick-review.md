---
layout: post
type: post
title: "Building a Front-End, pt.1"
description: "A Quick Review"
category: xpages-servlets
series: servlet-series
tags: [xpages, domino, javascript, servlet, angularjs]
modified: 2015-06-16
comments: true
share: true
---

{% include series.html %}

### A Quick Review
I had some trepidation about this post; it revolves around the fact that I'm "completing" my blog series with multiple giant topics, on top of the one primary one I've focused on for the majority of this blog series. So, before we get started, I'm going to summarize a couple things. But first, a ToC:

<!-- auto-magic TOC! -->
<section>
  <header data-toggle="tooltip" title="it's dangerous to go alone, take this">
    <h2>Contents</h2>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section>
<br />

##### Servlets
I've referred to this series as [#ASagaOfServlets](//twitter.com/search?q=%23ASagaOfServlets). While most Java servlets are intended for use over HTTP (at least from a JEE, web container standpoint), this is not exclusive; I've used HTTPServlet as analagous to Servlet (for better or for worse).

##### RESTful API
A REST API is an architectural style of API. There is no concrete definition of what required for an API to be RESTful, but it's best if it follows a couple conventions ([previously covered]({{ site.url }}/xpages/rest-is-best/)); this generally boils down to:

* a resource based interface, following <span data-toggle="tooltip" title="Hypermedia as the Engine of Application State">HATEOAS</span>
* be stateless (no server session required, the URI request gives all the server needs to know)
* be cachable or not (depending on what sort of data you're providing)
* work entirely independent of any particular client format (while adhering to certain things like authentication and formatted requests)


There are more that a RESTful API _can_ do or rules that can be applied, but that's the high level stuff. As you can see, this is part of the core of the segregation of data and primary business logic from the client-layer side of the application.

##### "Stack" Development
Part of my crusade in the realm of segregating application development concerns into the front-end and back-end revolves around the concept of these "ends" to the application. Both play an important role, but work best together. By building your back-end to adhere to certain conventions, you can create your front-end with any front-end technology. This is why I'm such a huge fan. At my company, we have a large number of in-house systems, many of which talk to each other. By segregating the primary business logic (governing how we store the data, events that trigger from the server, and steps in workflow) as being a part of how the server components work, then any client playing by the rules can be a valid interface; whether that's an automated agent which checks for non-interface updates, or the front-end which contains all the user interaction at the UI level. The business logic become much more maintainable and documentable in the process.

Where XPages fits in as a component in all of this can be a little tricky. Obviously, XPages design elements encompass the application layer, but deciding how that maps to a front-end as opposed to a back-end is a bit trickier (and [one I've <s>complained about</s> debated before](https://www.google.com/?gws_rd=ssl#q=site:edm00se.io+spaghetti+code)). I don't mean to beat up on XPages, as it offers us quite a lot of tools and components that help assemble a working app, rapidly; I can and will beat up on poorly implemented XPages application code.

##### XPages: Full-Stack Development?
Obviously, certain beginner XPages development approaches (those conducive to SSJS spaghetti code<sup>&#8482;</sup>) can be quite the antithesis of what the segregated stack approach gives us. This makes our XPages design elements, containing not just the markup and layout of elements (fields, labels, etc.), but also logic, `if(status.equals("certainStep")){ doSomethingUnique(); }`, and actions (since these X conditions are true, send an email to these 12 people). Combine this with the unique, [NoSQL database](https://en.wikipedia.org/wiki/NoSQL) handling via the _NotesDominoAPI_, it's my belief that XPages development is by default a full-stack application stack; for better or for worse.

###### Aside (talking crazy for a moment)
Some of these concepts are central to what I've seen previewed of the [XPages (XSP) application runtime](//heidloff.net/nh/home.nsf/article.xsp?id=26.01.2015175730NHEMVZ.htm) and [Domino Data Service](//ryanjbaxter.com/2014/09/22/using-your-domino-data-in-apps-deployed-to-bluemix/) on Bluemix. That the data container being forced to be separate from the application layer isn't just a good idea with Bluemix (which enforces the segregation of concerns as does almost any other application stack, considering that nearly all out there aren't configured like an NSF), but means that the XPages runtime can hook into any database; something it's already capable of, but often not done. In fact, segregating the data NSF from the application NSF isn't a new concept either, but hey, it's my paragraph :grinning:. I'm also fairly certain that the segregation of the XSP runtime from the other, traditional NSF components may be the gateway for us to get an updated JVM, but maybe I'm just greedy.

Ultimately, the point I'm trying to make, is that we have a lot of options and decisions we can make with Domino/XPages, but with any ambiguity, there are potential pitfalls. One way this is changing, IMO, is [the bringing of the XSP(XPages) runtime to Bluemix](//www.slideshare.net/MartinDonnelly1/connected2015-domino-apps-for-bluemix/9). In case you missed it, [I've posted a couple early thoughts on Bluemix]({{ site.url }}/bluemix/bluemix-chalky-soup/), and I'm both impressed and excited for what it can and will bring to the table for my company and I.

### Front-End Consumption
Having shaped our back-end [earlier in this series]({{ site.url }}/xpages-servlets/servlets-handling-data-round-house-kick/) to adhere to a primarily RESTful API format, we can now consume that API by _some front-end_. In the [Notes in 9 173: Getting Started With (HTTP)Servlets](https://www.youtube.com/watch?v=stJ3Yc1BOnU&t=32m47s) video, I demonstrated this principle via the [Postman REST client](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) (a Chrome extension). There are others out there and you could even [test from your command line via cURL](//www.codingpedia.org/ama/how-to-test-a-rest-api-from-command-line-with-curl/), if you're so inclined. What this demonstrates is that virtually _any_ front-end can consume the API, it just comes down to how you expose/provision that API and what you point to it.

It also shows the method of data transfer. In order for a front-end to work with my RESTful API, it will need to:

* provide/receive all data in application/json
* stick to the available resources (_houses_)
* create a new entry, one-at-a-time, against the collection endpoint (_/houses_)
* read, update, delete against the (UN)ID keyed URI (_/houses/[0-9a-zA-Z]{32}_)
* collection data is accessible via _/houses_


##### JavaScript Consumption
Front-end development in this day and age focuses on JavaScript usage. Most people use a framework of some flavor, to automate the things they'd rather not spend too much time on. Some of these things include standardizing how you interact with an HTTP RESTful API endpoint, or automate the updating of data between bound components. The fact of the matter is, there are plenty of frameworks out there, many which can help you in your quest.

##### JavaScript Frameworks
Choosing a JavaScript framework can be a little daunting, if you're doing so for the first time. There's a long history of many web applications making use of jQuery or Dojo, both of which are libraries(/frameworks) that automate quite a bit, they're not of the MVC/MV* flavor I'm looking for. The fact remains, one can make a fully-formed application out of either, I just won't focus on them.

[Aside]
There are [jQuery UI](//jqueryui.com/) ([and mobile](//jquerymobile.com/)) and [Dojox MVC](//dojotoolkit.org/reference-guide/1.10/dojox/mvc.html), but I'm moving on for simplicity's sake.
[/Aside]

##### MVC/MV* Architecture
There are a lot of acronyms in framework architecture that get thrown around. Here are a couple to get you started:

* MVC - Model-View-Controller
* MVVM - Model-View-ViewModel
* MVW / MV* - Model-View-Whatever

This list is far from all-inclusive, and is a bit of a side-topic to <span data-toggle="tooltip" title="there will be code soon, I swear!">what I want to focus on here</span>. Just [remember how a model, view, and controller]({{ site.url }}/xpages/unraveling-the-mvc-mysteries/) represent <span data-toggle="tooltip" title="mmm.. pie">different pieces of the application pie</span>, and all will be good.

If you want to read up more on the theory of why you would want an MVC/* framework, I recommend checking out [this answer on Quora](//www.quora.com/When-does-it-make-sense-to-use-an-MVC-framework-for-JavaScript) on the subject. It's a good read which espouses the need for the a framework but as they point out, no one solution (e.g.- Backbone in their example) is an end-all, be-all.

###### FWIW
AngularJS (as you can probably have guessed is the front-end framework I'm using) considers itself to be <s>an MV*/MVW framework</s>

>HTML enhanced for web apps!

and has ditched the MV-something classification almost entirely.

No matter your descision on frameworks, the bottom line is that you should use one that plays to your strengths, and you should play to the strengths of the framework you choose.


### Why AngularJS?
AngularJS set out to conquer some considerable hurdles when it began. The HTML5 spec was in its infancy and the front-end frameworks out there were achieving a few good things, but the Angular team wanted more.

Here are the reasons I gave for AngularJS (with some definite overlap with other frameworks) from my Chalk Talk Soup rebel slide deck:

* bi-directional data binding (all data models by default auto-update their other references on data change, within the scope)
* templates (via ng-include or ng-route; also ui-router, 3rd party)
* OoB directives, services, filters, and more
* dependency injection
* unit testing (AngularJS was developed with e2e testing in mind, and docs examples include protractor scripts)

Here are a couple examples I had prepared for that slide deck:

Bi-directional data binding:

<iframe width="100%" height="300" src="//jsfiddle.net/edm00se/0a0vga0k/embedded/result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Dynamic templates:

<iframe width="100%" height="300" src="//jsfiddle.net/edm00se/qf5trmkn/embedded/result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Filters (out of the box!):

<iframe width="100%" height="300" src="//jsfiddle.net/edm00se/L3tykzrt/embedded/result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


To add some fuel to the fire, here is a link to the [Google Trends for Angular, Backbone, and Ember](//www.google.com/trends/explore?hl=en-US#q=ember.js,+angularjs,+backbone.js&cmpt=q). As an side, check out [other combinations of search terms](//www.google.com/trends/explore?hl=en-US#q=xpages,+coldfusion&cmpt=q), it can be interesting to play with; it only yields results as scraped from Google search, so it's no absolute indicator, but interesting as it is.

For another [good comparison between Angular, Backbone, and Ember](//www.airpair.com/js/javascript-framework-comparison), this articles does a decent job of breaking down "the good parts" and the "pain points". The article is hosted on [airpair.com](//www.airpair.com/about), a micro-consulting site geared for developer-to-developer support, be it mentoring, code review, and more.

It's a sign of one of the other advantages of this form of segregated, "stack" design; outside help that's not such a closed ecosystem as the one we work in. This may not be a huge deal for those who aren't customers, but for those who seek to at least stay afloat, it's a decent leap towards being able to outsource without a huge amount of :dollar:.

##### Scary Change is Scary

Recently you may have seen [David Leedy blog a link](//www.notesin9.com/2015/05/27/thinking-of-angularjs-maybe-its-not-all-that-and-a-bag-of-chips-after-all/) and ask for perspective on [a particular post denouncing AngularJS and all its sins](//medium.com/@mnemon1ck/why-you-should-not-use-angularjs-1df5ddf6fc99). All I can say is, read the comments along with the post. I personally found the post to be inconsisent with my experiences but, more importantly, ignoring certain facts and updates (which the AngularJS team does provide on a constant basis) for the sake of their argument. Make up your own mind, but be informed.

##### A Note on Version 2
AngularJS version 2.0 takes advantage of ECMAScript 6 and follows a format considerably more like [web components](//webcomponents.org/). This means that it will fit in well with the final release of the HTML5 spec. It's also on the early side and as the [AngularJS 2.0 site points out](//angular.io/docs/js/latest/),

> Angular 2 is currently in Developer Preview. We recommend using Angular 1.X for production applications.

For now, I'm rocking the 1.x line, specifically staying in 1.3.x for my current app. A lot of people are trying to make a big deal out of Google's choice to break 2.x from 1.x, but the fact of the matter is that 1.x isn't going anywhere just yet and will have a stable branch for quite some time to come. I first started dabbling on AngularJS 0.9.8, and started grasping much more of it after 1.0 hit. If I was so inclined, there is a stable 1.0.8 release available right on angularjs.org including [documentation at that level](//code.angularjs.org/1.0.8/docs/misc/downloading), and 1.0.8 was released Aug 22nd, 2013.

So, all those naysayers, I say pick a framework. I'm going with AngularJS and it's been <span data-toggle="tooltip" title="do other people use this phrase? anyone?">pretty pimp</span> so far.

<figure>
  <amp-img src="https://www.bennadel.com/resources/uploads/2013/feelings_about_angularjs_over_time.png"
  alt="my feelings about AngularJS over time" height="563" width="545"></amp-img>
 <figcaption>my feelings about AngularJS over time</figcaption>
</figure>

### Tomorrow
[Come back tomorrow for the conclusion of this epic journey]({{ site.url }}/xpages-servlets/building-a-front-end-pt2-an-app-with-angular).

<div class="center">
	<amp-youtube
    data-videoid="1P3P2L0Q25Y"
    data-param-start="28"
    layout="responsive"
    width="560" height="315"></amp-youtube>
</div>
