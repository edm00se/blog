---
layout: post
type: post
title: "Building a Front-End"
description: "An App with AngularJS and our RESTful HTTPServlet"
category: xpages-servlets
tags: [xpages, domino, javascript, servlet, angularjs]
modified: 2015-06-09
comments: true
share: true
---

### Intro
I had some trepidation about this post; it revolves around the fact that I'm "completing" my blog series with multiple giant topics, on top of the one primary one I've focused on for the majority of this blog series. So, before we get started, I'm going to summarize a couple things.

##### Servlets
I've referred to this series as [#ASagaOfServlets](//twitter.com/search?q=%23ASagaOfServlets). While most Java servlets are intended for use over HTTP (at least from a JEE, web container standpoint), this is not exclusive; I've used HTTPServlet as analagous to Servlet (for better or for worse).

##### RESTful API
A REST API is an architectural style of API. There is no concrete definition of what required for an API to be RESTful, but it's best if it follows a couple conventions ([previously covered]({{ site.url }}/xpages/rest-is-best/)); this generally boils down to generally following HATEOAS principles (descriptive paths, route parameters where required for depth of information, query parameters for optional data, and consistency of formatting).

##### "Stack" Development
Part of my crucade in the realm of segregating application development concerns into the front-end and back-end revolves around the concept of these "ends" to the application. Both play an important role, but work best together. By building your back-end to adhere to certain conventions, you can create your front-end with any front-end technology. This is why I'm such a huge fan. At my company, we have a large number of in-house systems, many of which talk to each other. By segregating the primary business logic (governing how we store the data, events that trigger from the server, and steps in workflow) as being a part of how the server components work, then any client playing by the rules can be a valid interface; whether that's an automated agent which checks for non-interface updates, or the front-end which contains all the user interaction at the UI level. The business logic become much more maintainable and documentable in the process.

Where XPages fits in as a component in all of this can be a little tricky. Obviously, XPages design elements encompass the application layer, but deciding how that maps to a front-end as opposed to a back-end is a bit trickier. ...

##### XPages: Full-Stack Development?
Obviously, certain beginner XPages development approaches (those conducive to SSJS spaghetti code<sup>&#8482;</sup>) can be quite the antithesis of what the segregated stack approach gives us. This makes our XPages design elements, containing not just the markup and layout of elements (fields, labels, etc.), but also logic, `if(status.equals("certainStep")){ doSomethingUnique(); }`, and actions (since these X conditions are true, send an email to these 12 people). Combine this with the unique, [NoSQL database](https://en.wikipedia.org/wiki/NoSQL) handling via the _NotesDominoAPI_, it's my belief that XPages development is by default a full-stack application stack; for better or for worse.

###### Aside (talking crazy for a moment)
Some of these concepts are central to what I've seen previewed of the [XPages (XSP) application runtime](http://heidloff.net/nh/home.nsf/article.xsp?id=26.01.2015175730NHEMVZ.htm) and [Domino Data Service](http://ryanjbaxter.com/2014/09/22/using-your-domino-data-in-apps-deployed-to-bluemix/) on Bluemix. That the data container being forced to be separate from the application layer isn't just a good idea with Bluemix (which enforces the segregation of concerns as does almost any other application stack, considering that nearly all out there aren't configured like an NSF), but means that the XPages runtime can hook into any database; something it's already capable of, but often not done. In fact, segregating the data NSF from the application NSF isn't a new concept either, but hey, it's my paragraph :grinning:. I'm also fairly certain that the segregation of the XSP runtime from the other, traditional NSF components may be the gateway for us to get an updated JVM, but maybe I'm just greedy.

Ultimately, the point I'm trying to make, is that we have a lot of options and decisions we can make with Domino/XPages, but with any ambiguity, there are potential pitfalls. One way this is changing, IMO, is [the bringing of the XSP(XPages) runtime to Bluemix](http://www.slideshare.net/MartinDonnelly1/connected2015-domino-apps-for-bluemix/9). In case you missed it, [I've posted a couple early thoughts on Bluemix]({{ site.url }}/bluemix/bluemix-chalky-soup/), and I'm both impressed and excited for what it can and will bring to the table for my company and I.

### Front-End Consumption
Having shaped our back-end [earlier in this series]({{ site.url }}/xpages-servlets/servlets-handling-data-round-house-kick/) to adhere to a primarily RESTful API format, we can now consume that API by _some front-end_. In the [Notes in 9 173: Getting Started With (HTTP)Servlets](https://www.youtube.com/watch?v=stJ3Yc1BOnU&t=32m47s) video, I demonstrated this principle via the [Postman REST client](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) (a Chrome extension). There are others out there and you could even [test from your command line via cURL](http://www.codingpedia.org/ama/how-to-test-a-rest-api-from-command-line-with-curl/), if you're so inclined. What this demonstrates is that virtually _any_ front-end can consume the API, it just comes down to how you expose/provision that API and what you point to it.

##### JavaScript Consumption
Front-end development in this day and age focuses on JavaScript usage. Most people use a framework of some flavor, to automate the things they'd rather not spend too much time on. Some of these things include standardizing how you interact with an HTTP RESTful API endpoint, or automate the updating of data between bound components. The fact of the matter is, there are plenty of frameworks out there, many which can help you in your quest.



* any JS consumption
* framework what you want to do
* play to their strengths
* play to your strengths


### Why AngularJS?
https://www.google.com/trends/explore?hl=en-US#q=ember.js,+angularjs,+backbone.js&cmpt=q

https://www.airpair.com/js/javascript-framework-comparison

ToDoMVC

### My Example
AppOfIceAndFire.nsf

#### Resources ad Nauseum
asdf

### Segregation of Concerns
-services as layers
-biz process and primary workflow vs client-side flow
-how services interact
-scope of back-end
-scope of front-end

### Let's Do It!
-app as SPA (why an SPA?)
-handling routing to relate to your data (HATEOAS) with $resource
-controllers for controlled logic
-binding, directives, filters
-what to do with that data
-CRUD (vs my client use in Ni9: http://www.notesin9.com/2015/04/09/notesin9-173-getting-started-with-servlets/)