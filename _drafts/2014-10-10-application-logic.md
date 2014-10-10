---
layout: post
type: post
title: "Application Logic"
description: "where to keep it and why it matters"
category: xpages
tags: [xpages, javascript, mvc, angular]
modified: 2014-10-10
comments: true
share: true
---

### Application Logic
All applications require a certain logic. Even the most simple application, which is ultimately access to a data store, must have some definition of how it performs when certain events happen. So, ultimately, the relevant question is to the effect of "where does my application reside?" Developing Domino/XPages applications, it manifests  

### The Spaghetti Code<sup>&#8482;</sup> Dilemma
If you're suffering the 

So, your application logic is already residing, in part, in the client-side; assuming that you do any client-side executions. If your application is truly a collection of web forms with the only events being navigation, open, and save events, then you probably don't need this approach. If you do anything more while the browser has a page loaded, then you'll want to adopt a more unified approach, at least for larger applications.

### Controller Classes Have It On The Server
asdfasdf

Major actions, such as sending notification emails, applying advanced permissions (Readers/Authors), and other, more intensive, operations should all occur on the server.  

### Client-Side Logic
For a given page at a given state of work flow,  you likely only need a smaller set of logic. The goal is to provide consistent and well formatted data back to the server.