---
layout: post
type: post
title: "What's an SPA?"
description: "leveraging browser loading for a smoother user experience"
category: SPA
tags: [xpages, spa, angularjs, rest]
modified: 2014-09-29
comments: true
share: true
---

### Single Page Applications
In my previous posts, you'll have noticed that I've referenced Single Page Applications (SPAs) and how they relate to assisting in building better web applications. Here I'm going to try and break down what an SPA is and isn't and show what we can learn to apply to any web application for better development practices. Ultimately, each application is unique and requires its own implementation, my intention is to help show off some of what makes an SPA great to give others ideas in their web applications, regardless of implementation. This post is meant to be more of a reference, with other topics talked about "coming to a blog near you" soon.

##### What They Are
Excerpts from the <a href="http://en.wikipedia.org/wiki/Single-page_application">Wikipedia page on Single-page application</a>s.

* "...a web application or site which fits in a single web page with the goal of providing a more fluid user experience..."
* "...either all necessary code - HTML, JavaScript, and CSS - is retrieved with a single page load, or the appropriate resources are dynamically loaded and added to the page as necessary, usually in response to user actions"
* "...often involves dynamic communication with the web server behind the scenes"

So, what I believe a single-page structured application does well is containing the initial application logic, and its methods for other partial elements (html templates, json data, etc) without requiring additional full-page loads (from the browser's perspective). This eliminates some of the overhead for always loading certain images and stylesheets while keeping the focus of what network traffic exists, after the initial page load, being only what's necessary (the data or html partials).

##### What They Are Not
* the only way to build modern web applications
* an argument against having multi-page web applications (let's face it, you can't cram it all in every time)
* perfect for every application
* <a href="{{ site.url }}/xpages/rest-is-best/#comment-1609384268">necessarily new</a> (some of the mechanics are, but straight up web pages with JS manipulations have existed ever since JavaScript was implemented); making SPAs more of a design strategy
* an application strategy that requires "less work" (it just shifts where your attention goes)

### A Brief Anatomy
As you probably know by now, I'm a big fan of <a href="http://angularjs.org/">AngularJS</a>. It makes a lot of the client-side application development easier than you might think. The example file is the app/index.html file from the <a href="http://github.com/angular/angular-seed">angular-seed project on GitHub</a>.

<script src="http://gist-it.sudarmuthu.com/github/angular/angular-seed/blob/master/app/index.html"></script>

The general progression is:

* load the file with the usual fixes up front (old IE conditionals, IE=edge) and other meta tags (viewport)
* load the structural elements, such as framework CSS, app CSS, and Modernizr
* load the body (structural elements)
* you'll note this one has a div with the ng-view directive (in the example file, as an attribute of the content div), that's how Angular does its partial html injenction (e.g.- **content goes here**)
* end it all by then loading the JS framework library, then
* your application script
* and your partial html files (though those can be injected, with the controllers, <a href="http://docs.angularjs.org/api/ngRoute/provider/$routeProvider">via $routeProvider</a>)
* any universal custom filters, directives, etc

This lets the page start all its loading all the needed elements before the client starts modifying its contents. Not everyone does it this way, but it can help quite a bit when your client-side app performs a lot of initialization work.

When a client-side framework like Angular detects changes (like in the partial html content being triggered), it then grabs the necessary controlling code and logic and begins to modify the DOM to suit its needs. That's what that <a href="//docs.angularjs.org/api/ngRoute/directive/ngView">ng-view directive</a> does.

### The Biggest Pieces
How a page loads in the web browser is the ultimate destination and, by proxy, make or break end point for any web application. The user's experience is truest and only _real_ common denominator for how a user interacts with the server. The server can perform amazingly and do great things, but if the application is consumed in a browser that is old or outdated (looking at you, old versions of IE and the users that run them), or the loading of that page is just ridiculously network call heavy (when it could be avoided), then the user suffers, which means the application suffers.

A lot of front-end developers spend quite a bit of time on the below topics. Basically, if you open up and make use of the <a href="//chrome.google.com/webstore/detail/pagespeed-insights-by-goo/gplegfbjlmmehdoakndmohflojccocli?hl=en">Page Speed Insights extension for Chrome</a> or <a href="//addons.mozilla.org/en-US/firefox/addon/apptelemetry/">app.telemetry for Firefox</a>, you can find a number of good statistics and recommendations for how to speed up your web app and "milk it for what it's worth". When I first saw this done, it felt like someone was attempting to divine the aether of the Internet, but there's a lot to be said for end user performance.

IBM has thankfully thought of some of these concepts and the XSP properties let us set a few things to help with UX, including runtime optimized JS and CSS, compressing resources files (CSS and Dojo), and <a href="//per.lausten.dk/blog/2012/02/xpages-2-very-easy-performance-optimization-tricks.html">other tasty tidbits</a> that I'm sure other people know more about than I. In fact, one of the easiest ways to improve a partial refresh in XPages is to better manage <a href="//hasselba.ch/blog/?p=1389">how much you refresh</a> to make for a better _partialRefresh_ experience.

##### Resource Aggregation
This is definitely one where IBM has tried to give us something that the front-end world has been big on, of late.  combination of (as much/many) static resources as possible, along with gzipping for even lighter footprint while in transmission, gives the browser a bit of a faster load. With gzip'd content, it still takes a decompression on the browser's part once that's done, but hey, I've been focusing on network requests/responses. In XSP Properties, just set _xsp.resources.aggregate_ to true in Domino 8.5.3 and up.

##### Cache Control
Something I haven't figured out how to do yet in Domino is to regulate the content cache for certain resources. I'm interested in particular in things like CSS and images. As I try to make life easier on myself, I tend to host most of the elements I'm interested in caching (ideally for about 30 days) reside in my ..\Domino\data\domino\html\ path, for what I don't use from a <a href="//en.wikipedia.org/wiki/Content_delivery_network">CDN</a> (and CDN fall-back copies). I also don't know how this interacts with the resource aggregation property (_xsp.resources.aggregate_ see above). I'm also uncertain about how the use of the _xsp.expires.global_ property compares against server hosted resources (..\Domino\data\domino\html\).

##### Lazy Loading
I've <a href="{{ site.url }}/xpages/rest-is-best/#rest-is-lean">previously talked</a> about how I have a dislike for (at least 1.6's and/or older versions of) Dojo's lazy loading of button styles. Aside: I also think that not using _dijit.form.Button_ would take care of that, but that's not my call, sadly. I also mentioned how some of this <a href="{{ site.url }}/xpages/rest-is-best/#comment-1605659445">has improved with Dojo's AMD</a> over time and multiple releases. The fact of the matter is: I want to control what and how much is transported over the network connection at any given request; and <a href="{{ site.url }}/xpages/rest-is-best/#comment-1599645245">I'm not alone</a>.

This is such a big topic to me, because I spend a lot of my time and development effort building, extending, and maintaining a (very) large application for my company. This application, which has turned into more of a platform, spans every individual location of ours across the country. This application calls home to our corporate servers making line quality a bit of a topic as well. Server locations, 

### The Way Forward
So how can we make better applications? My theory is that we need every single tool in the tool box. _Traditional XPages development_ doesn't go away, not in the least. In fact, I look at Angular and other client-side frameworks as a tool to expand on what we already do.

##### The XPages Way
There is no one, true gold standard "XPages way" of creating an application. It's one of the strengths and weaknesses of XPages, simultaneously. First, the weaknesses. XPages lets us dump code virtually everywhere, which is great, except for the potential of <a href="{{ site.url }}/xpages/unraveling-the-mvc-mysteries/#stop-using-your-xpage-for-application-logic">spaghetti code</a><sup>&#8482;</sup>. But as a developer advances in both ability and development practices, the path eventually seems to lead to a combination of managed beans and plugins. These make for some great, business grade applications that have strength in utility and capability.

Leading us to XPages' strengths, the ability to adapt and adopt newer (yes, it's debatable) ways of development with our platform. 


### Want More AngularJS?
I recommend checking out <a href="http://www.youtube.com/watch?v=i9MHigUZKEM">Dan Wahlin's AngularJS Fundamentals in 60-ish Minutes</a>. It's a good overview and he can probably sell you on the concepts a bit better than myself.

I hope you (are starting to?) see how a more robust front-end application logic can compliment your applications. No one development style or individual tool can "do it all", but why not have another tool that can help you do your job? It never hurts to expand the skill set. Even if it's not the best tool for you right now, it's worth getting a little familiar with some client-side frameworks, even if it just gives you new or different, hopefully better, ideas in your application development.