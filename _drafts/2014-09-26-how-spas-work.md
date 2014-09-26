---
layout: post
type: post
title: "How SPAs Work"
description: "leveraging browser loading for a better experience"
category: web
tags: [xpages, spa, angularjs, rest]
modified: 2014-09-26
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

asdf

##### What They Are Not
* the only way to build modern web applications
* an argument against having multi-page web applications
* perfect for every application

### A Brief Anatomy
As you probably know by now, I'm a big fan of <a href="http://angularjs.org/">AngularJS</a>. It makes a lot of the client-side application development easier than you might think. The example file is the app/index.html file from the <a href="http://github.com/angular/angular-seed">angular-seed project on GitHub</a>.

<script src="http://gist-it.sudarmuthu.com/github/angular/angular-seed/blob/master/app/index.html"></script>

The general progression is:
* load the file with the usual fixes up front (old IE conditionals, IE=edge) and other meta tags (viewport)
* load the structural elements, such as framework CSS, app CSS, and Modernizr
* load the body (structural elements)
* you'll note this one has a div with the ng-view directive, that's how Angular does its partial html injenction (e.g.- **content goes here**)
* end it all by then loading the JS framework library, then
* your application script
* and your partial html files (though those can be injected, with the controllers, <a href="http://docs.angularjs.org/api/ngRoute/provider/$routeProvider">via $routeProvider</a>)
* any universal custom filters, directives, etc

This lets the page start all its loading all the needed elements before the client starts modifying its contents. Not everyone does it this way, but it can help quite a bit when your client-side app performs a lot of initialization work.

### The Big Take Away
How a page loads in the web browser is the ultimate destination and, by proxy, make or break end point for any web application. The server can perform amazingly and do great things, but if the application is consumed in a browser that is old or outdated (looking at you, old versions of IE), or the loading of that page is just ridiculously network call heavy (when it could be avoided), then it suffers for the user. IBM has thankfully thought of some of these concepts in the 

##### Resource Aggregation
asdf

##### Cache Control
asdf

##### ???

### The Way Forward
So how can we make better applications 

##### "The" XPages Way
There is no one, true gold standard "XPages way" of creating an application. It's one of the strengths and weaknesses of XPages, simultaneously. 

##### Managed Beans
My adopted version of how a "standard XPage application" ought to work is with managed beans. 

##### RESTful Services
asdf

### Want More AngularJS?
I recommend checking out <a href="http://www.youtube.com/watch?v=i9MHigUZKEM">Dan Wahlin's AngularJS Fundamentals in 60-ish Minutes</a>. It's a good overview and he can probably sell you on the concepts a bit better than myself.