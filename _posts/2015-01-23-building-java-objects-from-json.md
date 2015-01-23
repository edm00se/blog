---
layout: post
type: post
title: "Building Java Objects From JSON"
description: "a better way"
category: java
tags: [xpages, domino, java, json, gson]
modified: 2015-01-23
comments: true
share: true
---

### Intro
<span data-toggle="tooltip" title="JavaScript Object Notation">JSON</span>, <a href="{{ site.url }}/json-with-java-in-xpages">as previously mentioned</a>, is a data format which has been exploding in web development since it was [first introduced in the early 2000s](//en.wikipedia.org/wiki/JSON#History). And whether or not you as a developer prefer XML (it's okay, they're just formats), there are some [good reasons](//blog.mongolab.com/2011/03/why-is-json-so-popular-developers-want-out-of-the-syntax-business/) to use JSON data. Ultimately, I don't really care about the "XML vs JSON" _debate_, because some services use XML and some use JSON, neither are going away anytime soon, and XML is [more flexible than most people give it credit for](//stackoverflow.com/questions/2673367/how-does-json-compare-to-xml-in-terms-of-file-size-and-serialisation-deserialisa/2677498#2677498).

_Note: I **am** more of a JSON fan, but that should be immaterial to relevance. The biggest argument I see in favor of JSON as opposed to XML is [file size](//bit.ly/1CtEpDS)._

### JSON
To date, when I've shown examples on this blog of how to build JSON, I've generally used Google's GSON library. I've also only shown it in a fashion (for simplicity's sake) that I refer to as the "old" way (below), because it maps easily to converting to using the IBM Commons JSON library (more below). I try to add Gson to the server when possible, but often will end up importing the JAR to an NSF, should I not have <span data-toggle="tooltip" title="or be able to get ahold of them">administrator blessing</span>. Gson is supported from Java 1.5 through 1.8, according to their [pom file](//search.maven.org/#artifactdetails%7Ccom.google.code.gson%7Cgson%7C2.3.1%7Cjar).

This is in contrast to the provided [_com.ibm.commons.util.io.json_ package](//public.dhe.ibm.com/software/dw/lotus/Domino-Designer/JavaDocs/DesignerAPIs/com/ibm/commons/util/io/json/package-summary.html), which is included and makes it a convenient option for many/most.

**Be forewarned!** To use _com.google.gson_,  you will need to grant permission for it in your <span data-toggle="tooltip" title="[notes program]/jvm/lib/security/java.policy">java.policy</span> file; [you can run into trouble if you don't](//stackoverflow.com/questions/15949887/lotus-domino-java-security-issue-using-google-gson). This is probably the second best argument against using com.google.Gson, but I'm still a fan.

### "Old" Way

Part of the reason _com.ibm.commons.util.io.json_ is popular (aside that it comes with the server, a big plus) is that it maps well to how we think. Streaming in elements into an object tends to make sense to us, but there's another way. Here's what I'll refer to as the "old" way (it works, it's valid, but not ideal as I'll show).


{% gist 828fd9635b18efcbb0d9 OldWayCreateJsonWithCommonsLib.java %} <br />


This will generate a resulting JSON string with an object, represented as such:


{% gist 828fd9635b18efcbb0d9 outputToJson.json %} <br />


It may not be very exciting, but it sure gets the job done. Here's what I'm excited about.

### "New" Way
I first saw a technique in which a person used a Gson instance to generate, on the fly, _application/json_ by merely calling the  the [_Gson.toJson_ method](//google-gson.googlecode.com/svn/trunk/gson/docs/javadocs/com/google/gson/Gson.html#toJson(java.lang.Object)). I thought this was cool, but it made good sense. The Java <span data-toggle="tooltip" title="Object object">object</span> already existed and inherited from a proper class, which can loosely map to the JavaScript prototypal elements (string, boolean, array, object, integer, etc.). Gson is not unique in this, as the IBM Commons JSON library can achieve the same thing, using a <span data-toggle="tooltip" title="JsonGenerator.toJson( JsonFactory factory, java.lang.Object value )">[_JsonGenerator_](//public.dhe.ibm.com/software/dw/lotus/Domino-Designer/JavaDocs/DesignerAPIs/com/ibm/commons/util/io/json/JsonGenerator.html#toJson(com.ibm.commons.util.io.json.JsonFactory, java.lang.Object))</span>. That's the easy side of things, the tricky part is going backwards, consuming JSON into a Java Object (or just creating it from existing Java objects without being so linear in re-iterating properties just to change the format they're stored in). 


#### IBM Commons JSON
Using [_JsonParser_](//public.dhe.ibm.com/software/dw/lotus/Domino-Designer/JavaDocs/DesignerAPIs/com/ibm/commons/util/io/json/JsonParser.html), you can use [_fromJson_](http://public.dhe.ibm.com/software/dw/lotus/Domino-Designer/JavaDocs/DesignerAPIs/com/ibm/commons/util/io/json/JsonParser.html#fromJson(com.ibm.commons.util.io.json.JsonFactory, java.lang.String)), which returns a java.lang.Object. In other words, you need to do your tests and transforms to get a handle on its structure. This works, but takes more effort (I would be glad for someone to show me how to map the IBM Commons library to the approach I'll show next).


#### Google Gson
The Gson approach is to take in a class definition (or type) as the second parameter in their [_fromJson_](//google-gson.googlecode.com/svn/trunk/gson/docs/javadocs/com/google/gson/Gson.html#fromJson(com.google.gson.JsonElement, java.lang.Class)) method, immediately mapping your object to a well structured object that you can invoke for its properties. Here's a quick demonstration.


{% gist 828fd9635b18efcbb0d9 newWayCreateJsonWithJson.java %} <br />


### Why The "New" Way?
It's obviously more verbose up front, but done the "old" way, I didn't show all the type checks and conversions I would have to do to keep things working as expected. The "new" way defines the data format and ensures consistently well-formed objects; they are POJO instances after all (beans, except for the implementing java.util.Serializable bit, as we are using getter/setter methods).

You've defined the format and instantiated data object, meaning that now all you need to do is use the standard EL get/set<PropertyName> to interact with the data. That's it, you're done!