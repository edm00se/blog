---
layout: post
type: post
title: "Handling Data in a Servlet"
description: “going Chuck Norris on some data“
category: xpages-servlets
tags: [xpages, domino, java, servlet]
modified: 2015-03-02
comments: true
share: true
---

### A Fast-Paced, Round-House <s>Kick</s> Tour of Data Interactions
[As promised at the end of the last post]({{ site.url }}/xpages-servlets/servlet-handling-requests/), this post will walk through the entire life cycle of data reception and response handling. This is where my [ConnectED demo app-that-never-was]({{ site.url }}/self-promotion/a-chalk-talk-talk/) comes in, we're going to build part of it. We're going to create an endpoint which governs the provision of a collection of the houses of note in our fictitious land of Os (it's out west). I'll be providing the _com.westeros.servlets.HouseServlet_ class, which is an _AbstractXSPServlet_ ([previously demonstrated]({{ site.url }}/xpages-servlets/servlet-intro-and-flavors/#flavors-of-servlets)), to my _ServletFactory_.

Note: I'll be sticking to the same, vanilla Java approach I've used previously in [this series]({{ site.url }}/servlet-series). I'll outright say it though, it'd be great to see how some of the processes involved in the setup can be automated and eased, be it by _@_ annotation or otherwise. I fully invite those more experienced in these methods to show us the way.

### The Endpoint
The endpoint will accept (and return) only _application/json_. Here's the structure it'll take.

{:.table .table-bordered}
| Route                   | Methods Allowed        |
|-------------------------|------------------------|
| .../xsp/houses          | GET                    |
| .../xsp/houses/{:unid}  | GET, POST, PUT, DELETE |

It's straight forward and follows with the approach I've previously laid out.

#### Collection
The collection will iterate records and return the JSON array of objects representing each house. I'm going to wrap the array as a data element, to give some mild metadata I usually provide, including a simple version of any request parameters and, lastly, an error flag (with an error message, if the boolean _error_ property is true); this is consistent with [what I've done before]({{ site.url }}/xpages/custom-JSON-with-Java-sized-XAgent).

Below, when I handle the reflection of JSON to a Java Object (in conjunction with the ), I will show how to use both.

{% gist x %}<br />


#### Document
asdf
... implements data model, provides JSON

#### ToJson
I'm also going to create the JSON with the GSON library, as I've covered both the GSON and [com.ibm.commons.util.io.json](//gist.github.com/edm00se/e5626f63ef7573fd2f3e) approaches before, when it comes to streaming/creating a JSON string, so I won't repeat myself here. The only thing of major difference is to build out your response into a Java object, then use [a _com.ibm.commons.util.io.json.JsonGenerator_'s _toJson_ method](//public.dhe.ibm.com/software/dw/lotus/Domino-Designer/JavaDocs/DesignerAPIs/com/ibm/commons/util/io/json/JsonGenerator.html#toJson(com.ibm.commons.util.io.json.JsonFactory, java.lang.Object)). 

* GSON
* ibm.commons
* others?

### An Object Model for Everyone
asdf

#### Generating the Model: POJO
asdf

#### Helper: jsonschema2pojo.org ?
asdf

### Receiving Data from POST or PUT (or PATCH)

#### BufferedReader vs InputStream?

#### FromJson
[getReader](http://docs.oracle.com/javaee/6/api/javax/servlet/ServletRequest.html#getReader())

```java
BufferedReader reader = req.getReader();
Gson gson = new Gson();

MyBean myBean = gson.fromJson(reader, MyBean.class);
```

### Controller Logic
asdf

#### Validate

#### Perform Actions

#### Perform CRUD Operations

### Provide Response

#### Success

#### HTTP Codes for RESTful APIsß