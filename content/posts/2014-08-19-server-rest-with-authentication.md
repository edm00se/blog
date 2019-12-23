---
title: 'Server REST Consumption with Authentication'
description: 'consuming data on another server'
date: 2014-08-19
published: true
tags: ['xpages', 'domino', 'java', 'rest', 'authentication']
category: xpages
---

### For Starters

This post [relies on the previous one](/xpages/rest-consumption-server-side/), which covers the use of a Java class to consume RESTful data. By implementing this, we were able to pull data and assign it, in the example via a viewScope variable, into an xp:dataTable element. This post is basic, but shows how powerful this can be. Some implied aspects are:

1. URL building to contain
   - the appropriate endpoint
   - URL query parameters
2. authentication via
   - same domain
   - trusted domain (or public)
   - or authentication via [basic auth](http://en.wikipedia.org/wiki/Basic_access_authentication) or otherwise
3. that you can properly handle the retrieved data

### Handling the Data

Consistent formatting is key, which is why this _may_ be an argument in favor of SOAP; the WSDL provides action and format definition before you even execute the GET(/etc). It also highlights the importance of having your RESTful API properly documented. A case in point is the Notes View from Domino Data/Access Services. If you want to repeat the response of a categorized set of data from a View, did you remember to account for the _@category: true_ entry? Remember, DAS will basically just expose the _NotesViewEntry_ contents, and category entries are valid and expected.

Also, especially in XPages, it helps to format/reformat your data. Since an xp:repeat control doesn't inherently know how to iterate a com.google.gson.JsonObject, we need to account for that. My post on the basics had to have its gist updated in the sample XPage to reformat the JsonObject into a format that the Domino flavor of SSJS could understand. I used [the fromJson method](http://dontpanic82.blogspot.com/2010/09/xpages-ssjs-code-snippet-that-lets-you.html), which is handy and a part of XPages out of the box, but [as as noted by Tommy Valand](http://dontpanic82.blogspot.com/2010/10/xpages-bug-in-fromjson-with-fix.html) and others, needs a quick fix before you use it. For some time, I've been using using [Douglas Crockford's JSON2 library](http://github.com/douglascrockford/JSON-js/blob/master/json2.js) as an SSJS library, which achieves the same thing. So pick your poison and stick with it for consistency's sake.

### Authentication

My example below uses basic HTTP authentication. This was the easiest to roll and really just comes into play if you're interacting with another server, outside of a trusted domain (or when your admins don't want to do much with existing network topology). You'll notice that I'm once again using an Apache Commons library for the Base64 encoding; isn't open source great? To get it, you'll need the [Apache Commons Codec jar](http://commons.apache.org/proper/commons-codec/); I'm using version 1.9.

### URL Computation

As you've probably caught on by now, a similar private method could/should be used for computing the URL which your REST consumer will interact with.

### My Sample Java Consumer with Basic HTTP Authentication

https://gist.github.com/edm00se/e1f0d31663b42a612fc5#CustAuthRestConsumer.java
