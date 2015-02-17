---
layout: post
type: post
title: "Servlet Basics"
description: "an introduction"
category: xpages-servlets
tags: [xpages, domino, java, servlet]
modified: 2015-02-04
comments: true
share: true
---

### A Servlet?
A Java Class that "...extends the capabilities of the server" by any other name... would still be [a servlet](//en.wikipedia.org/wiki/Java_servlet). Generally regarded as a portmanteau of "server" and "applet", a servlet adheres to the rules of an accepted protocol (such as HTTP protocol) with rules governing the [request and response](//en.wikipedia.org/wiki/Request%E2%80%93response) for each, respectively. Generally, in web development, we use servlets to create end points, via a servlet factory, to handle requests and provide responses (some of which trigger server actions).

### HTTP Request-Response
How a browser communicates to a server tells us a lot. There are a lot of parts though, many of which can be taken as fairly 'normal'. For example, if we perform the following request (aka- by accessing the URL specified),

```
GET http://www.google.com/?q=hello+world
```

we'll get a response from the server of a certain type, including things like request header information, for Access-Origin-Control and Accept, or response header information such as Content-Type, Content-Encoding, and more. With a successful, well formed request, I also get the full response content back. A request always returns a response code, which can be interpreted to mean everything from "OK" (have some stuff) to 405 (method not allowed). There's a very large amount of information on all these moving pieces, but generally aren't required unless specified. Just know that you can open up your DevTools (or Firebug, etc) and view the requests and responses for every network request you make in your browser; pretty nifty.

### A RESTful Servlet
REST, REpresentational State Transfer (which uses the routed parameters and query parameters to define the _state_ of the request) are