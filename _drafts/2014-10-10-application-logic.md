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
All applications require a certain logic. Even the most simple application, which is ultimately access to a data store, must have some definition of how it performs when certain events happen (what to do on a save event, what to validate and how). So, ultimately, the relevant question is to the effect of "where does my application reside?" Developing Domino/XPages applications, it manifests primarily in how you handle your server logic and the display layer of XPages and Custom Controls.

### The Spaghetti Code<sup>&#8482;</sup> Dilemma
If you're suffering the 

So, your application logic is already residing, in part, in the client-side; assuming that you do any client-side executions. If your application is truly a collection of web forms with the only events being navigation, open, and save events, then you probably don't need this approach. If you do anything more while the browser has a page loaded, then you'll want to adopt a more unified approach, at least for larger applications.

### Controller Classes Are On The Server
I know that's a rather obvious statement, but if you're sticking to a development pattern that at least includes Controller classes, then you've got your work flow actions and validation requirements are all available to you on the server. Say you want to provide your DB's CRUD operations with server-side actions and validation (to keep from cramming malformed data into your DB) via a RESTful servlet, you'll want these all in place.

This sort of implementation also lends itself to, not just validation, but 'scrubbing' of all input data. For example, say you want to use a "Rich Text Editor"-like component, such as <a href="https://github.com/fraywing/textAngular/">textAngular</a> (in contrast to implementing work arounds for the xp:inputRichText control; keeps markup but limits to text-only), you can ensure that all input text is properly escaped, immediately prior to your save operations. Major actions, such as sending notification emails, applying advanced permissions (Readers/Authors), and other, more intensive, operations should all occur on the server. This decreases the work load on your client/browser and keeps it nice and tidy.

### Client-Side Logic
For a given page at a given state of work flow,  you likely only need a smaller set of logic. The goal is to provide consistent and well formatted data back to the server. So long as your client-side controllers (a la <a href="//docs.angularjs.org/api/ng/directive/ngController">AngularJS controller modules</a>) know how to act at _that point in the work flow_, you've achieved your objective in enforcing well formatted data. It's this subset of information that makes for the "extra work" that some developers complain about 