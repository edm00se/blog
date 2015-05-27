---
layout: post
type: post
title: "Building a Front-End"
description: "An App with AngularJS and our RESTful HTTPServlet"
category: xpages-servlets
tags: [xpages, domino, javascript, servlet, angularjs]
modified: 2015-05-26
comments: true
share: true
---

### Intro
I had some trepidation about this post; it revolves around the fact that I'm "completing" my blog series with multiple giant topics, on top of the one primary one I've focused on for the majority of this blog series. So, before we get started, I'm going to summarize a couple things.

##### Servlets
I've referred to this series as [#ASagaOfServlets](//twitter.com/search?q=%23ASagaOfServlets). While most Java servlets are intended for use over HTTP (at least from a JEE, web container standpoint), this is not exclusive; I've used HTTPServlet as analagous to Servlet (for better or for worse).

##### RESTful API
A REST API is an architectural style of API. There is no concrete definition of what required for an API to be RESTful, but it's best if it follows a couple conventions (previously covered).

##### "Stack" Development
Part of my crucade in the realm of segregating application development concerns into the front-end and back-end revolves around the concept of these "ends" to the application. Both play an important role, but work best together. By building your back-end to adhere to certain conventions, you can create your front-end with any front-end technology. This is why 

##### XPages is Full-Stack Development?
adsf

### Front-End Consumption
-any JS consumption
-framework what you want to do
-play to their strengths
-play to your strengths


### Why AngularJS?
https://www.google.com/trends/explore?hl=en-US#q=ember.js,+angularjs,+backbone.js&cmpt=q

https://www.airpair.com/js/javascript-framework-comparison

ToDoMVC

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