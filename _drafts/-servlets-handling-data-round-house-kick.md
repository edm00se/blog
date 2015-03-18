---
layout: post
type: post
title: "Handling Data in a Servlet"
description: “going Chuck Norris on some data“
category: xpages-servlets
tags: [xpages, domino, java, servlet]
modified: 2015-03-20
comments: true
share: true
---

### A Fast-Paced, Round-House <s>Kick</s> Tour of Data Interactions
[As promised at the end of the last post (in this series)]({{ site.url }}/xpages-servlets/servlet-handling-requests/), this post will walk through the entire life cycle of data reception and response handling. This is where my [ConnectED demo app-that-never-was]({{ site.url }}/self-promotion/a-chalk-talk-talk/) comes in, we're going to build part of it. We're going to create an endpoint which governs the provision of a collection of the houses of note in our fictitious land of Os (it's out west). I'll be providing the _com.westeros.servlets.HouseServlet_ class, which is an _AbstractXSPServlet_ ([previously demonstrated]({{ site.url }}/xpages-servlets/servlet-intro-and-flavors/#flavors-of-servlets)), to my _ServletFactory_.

Note: I'll be sticking to the same, vanilla Java approach I've used previously in [this series]({{ site.url }}/servlet-series). I'll outright say it though, it'd be great to see how some of the processes involved in the setup can be automated and made easier, be it by _@_ annotation or via other frameworks. I fully invite those more experienced in these methods to show <span data-toggle="tooltip" title="me!">us</span> the way.

<!-- auto-magic TOC! -->
<section>
  <header data-toggle="tooltip" title="it's dangerous to go alone, take this">
    <h2>Contents</h2>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section>

### The Endpoint
The endpoint will accept (and return) only _application/json_. Here's the structure it'll take.


{:.table .table-bordered}
| Route                     | Methods Allowed	|
|---------------------------|-------------------|
| ...NSF/xsp/houses       	| GET				|
|							| POST        		|
|---------------------------|-------------------|
| ...NSF/xsp/houses/{:unid}	| GET				|
|							| PUT				|
|							| DELETE			|

It's straight forward and follows with the approach I've previously laid out. Do note that to create a new entry, it will be taking a POST against the collection, whereas the individual entry will be accessed via GET to send the existing document, PUT to update partial information, and DELETE to do the obvious.

#### Request Handling
In order to better process my request data and process for my response, I've segregated my Collection and Record operations into separate classes; _HouseCollection_ and _HouseRecord_, respectively. Here's the down and dirty of my main servlet class:

{% gist bb0b10e70c875958cb28 HouseServlet.java %}<br />

#### Collection
The collection will iterate records and return the JSON array of objects representing each house. I'm going to wrap the array as a data element, to give some mild metadata I usually provide, including a simple version of any request parameters and, lastly, an error flag (with an error message, if the boolean _error_ property is true); this is consistent with [what I've done before]({{ site.url }}/xpages/custom-JSON-with-Java-sized-XAgent).

Below, when I handle the reflection of JSON to a Java Object (in conjunction with the ), I will show how to use both. Here's the providing of a collection, pulling entry information from a _ViewNavigator_ into the Java object that will become the JSON string. I'm going to use a _HashMap_ as my base object, with an _ArrayList_ which will hold the individual data entries. <!-- As I like to do, I'm going to wrap some basic request info up front and, provided it successfully gets to the end of the request, provide an _error_ property as a boolean. -->


While it's certainly a lot of lines, I believe it to be fairly straight forward. In the _HouseCollection_ class, there are defined three methods; _doGet_, _doPost_, and _handleUnexpectedVerb_. These are invoked by the main _HouseServlet_ class, which calls the appropriate Collection or Record method, based on the full request path info and request method. I've included both the _com.google.Gson_ and _com.ibm.commons.util.io.json_ method, the latter is just commented out. 

{% gist bb0b10e70c875958cb28 HouseCollection.java %}<br />

You can find how I'm able to _POST_ a new document in the _doPost_ method here, but I'll cover that process in more detail further down.

#### Document
Handling the individual records, the _NotesDocument_s, gets more fun. I'm not just stepping through a _NotesViewNavigator_ and for me personally, this is why we should be embracing our Java roots on Domino/XPages. Say I have myself set up for using a managed bean to represent my documents. Aside from the Notes/Domino API specifics, we're dealing with an otherwise plain Java object, in memory, to represent our data record, with which we interact. Using that same bean, I'm able to interact with it the same in my servlet as I might through the XPages UI. The biggest difference is that it's as a POJO (plain ol' Java object), as it's not managed, not defined in my _Faces-config_ and has no "scope"; it'll be created/loaded, modified, and saved as fast as the servlet responds.

#### Uniqueness of Using an Abstracted Document
This concept relies on having an object model class. The modeling of my house object does what a bean does, has properties which hold values, and interacts via getter and setter methods. For my app, I'm using an (older) implementation of the OpenNTF Domino API; specifically the _AbstractSmartDocumentModel_, as found in [Tim Tripcony](//avatar.red-pill.mobi/tim/blog.nsf/)'s [How Ya Bean application](//bitbucket.org/timtripcony/howyabean) and [affiliated Notesin9 videos](//www.notesin9.com/2013/12/17/notesin9-132-using-java-in-xpages-part-1/). This is to automate the getter/setter methods (it specifically ditches get_PropertyName_/set_PropertyName_ in favor of get_Value_/set_Value_). It also means that my app is a bit more portable (full project coming to a GitHub repository near you, soon!).

#### ToJson
I also create the JSON with the Gson library, as I've covered both the Gson and [com.ibm.commons.util.io.json](//gist.github.com/edm00se/e5626f63ef7573fd2f3e) approaches before, when it comes to creating a JSON string, so I won't repeat myself here. The only thing of major difference is to build out your response into a Java object, then use [a _com.ibm.commons.util.io.json.JsonGenerator_'s _toJson_ method](//public.dhe.ibm.com/software/dw/lotus/Domino-Designer/JavaDocs/DesignerAPIs/com/ibm/commons/util/io/json/JsonGenerator.html#toJson(com.ibm.commons.util.io.json.JsonFactory, java.lang.Object)).

### An Object Model for (Almost) Everyone
An object model, for my purposes, is a bean. It provides the definitions for what data to store and in what format. It is my preference to keep any additional business logic, such as notifications (emails, etc) or validation, in a separate class, though this isn't necessary.

If you're ever looking for help in generating a POJO from JSON, I recommend checking out [jsonschema2pojo.org](//jsonschema2pojo.org). As I'm an avid user of Gson and Apache Commons, the options I select are JSON (not JSONSchema), Gson, Use double numbers, Use Commons-Lang3, and Include _toString_; like this:

<a href="{{ site.url }}/images/post_images/JsonSchema2Pojo_settingsExample.png" data-toggle="tooltip" title="JsonSchema2Pojo.org example settings"><img src="{{ site.url }}/images/post_images/JsonSchema2Pojo_settingsExample.png" class="img-responsive center-block" /></a>

As I mentioned in my caveat above, as my _HouseModel_ extends _AbstractSmartDocumentModel_, I don't have the usual get_Property_/set_Property_ methods, but rather getValue/setValue; since this is the case, reflecting my received _application/json_ content from the _HttpRequest_ directly into my _HouseModel_ for a new instance, meaning that I have to do some processing of that data to fill a new instance of a _HouseModel_. Since I know the data format I'll be expecting, I'm going to read everything into a _HashMap&lt;String, Object&gt;_, then populate my _HouseModel_ from that. I could probably write my own _GsonBuilder_ to account for this difference, but I'm not going that far into things.

#### The HouseModel
asdf


### Receiving Data from POST or PUT (or PATCH)

#### BufferedReader vs InputStream?
asdf

#### FromJson
[getReader](http://docs.oracle.com/javaee/6/api/javax/servlet/ServletRequest.html#getReader())

#### Using the InputStream Directly
https://commons.apache.org/proper/commons-io/apidocs/org/apache/commons/io/IOUtils.html

```java
BufferedReader reader = req.getReader();
Gson gson = new Gson();

MyBean myBean = gson.fromJson(reader, MyBean.class);
```

#### Controller Logic
asdf

* Validate
* Perform Actions
* Perform CRUD Operations

#### Provide Response
asdf

#### Response Codes and Error Handling

### Note: On PUT and DELETE Methods
asdf

* enable in Internet Site
* enable in Notes.ini
* work around using X-Http-Method-Override