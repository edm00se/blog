---
layout: post
type: post
title: "Handling Data in a Servlet"
description: “going Chuck Norris on some data“
category: xpages-servlets
series: servlet-series
tags: [xpages, domino, java, servlet]
modified: 2015-03-19
comments: true
share: true
---

{% include series.html %}

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

Here's my HouseRecord class, explanation afterwards.
{% gist bb0b10e70c875958cb28 HouseRecord.java %}<br />

Obviously a delete operation is just a delete and we've covered _GET_, but the _PUT_ is where I had fun with things. The _POST_ above assumes an entirely new object, but with the _PUT_ as I've implemented it, allowing for full or partial replacement, I need to instantiate the existing record into an object and then pull and compare/update any values. Just as I'm iterating the _HashMap_'s values in the Collection _POST_, instead of just filling the values, I'm comparing the values and replacing as needed, inside a while loop, iterating the _Map.Entry&lt;String, Object&gt;_ (pair) values, like so:

```java
String curProp = pair.getKey();
String curVal = (String) pair.getValue();
if( exHouse.getValue(curProp) != curVal ) {
	exHouse.setValue(curProp, curVal);
}
```

##### Uniqueness of Using an Abstracted Document
This concept relies on having an object model class. The modeling of my house object does what a bean does, has properties which hold values, and interacts via getter and setter methods. For my app, I'm using an (older) implementation of the OpenNTF Domino API; specifically the _AbstractSmartDocumentModel_, as found in [Tim Tripcony](//avatar.red-pill.mobi/tim/blog.nsf/)'s [How Ya Bean application](//bitbucket.org/timtripcony/howyabean) and [affiliated Notesin9 videos](//www.notesin9.com/2013/12/17/notesin9-132-using-java-in-xpages-part-1/). This is to automate the getter/setter methods (it specifically ditches get/set _PropertyName_ in favor of get/set _Value_). It also means that my app is a bit more portable (full project coming to a GitHub repository near you, soon!).

##### ToJson
I also create the JSON with the Gson library, as I've covered both the Gson and [com.ibm.commons.util.io.json](//gist.github.com/edm00se/e5626f63ef7573fd2f3e) approaches before, when it comes to creating a JSON string, so I won't repeat myself here. The only thing of major difference is to build out your response into a Java object, then use [a _com.ibm.commons.util.io.json.JsonGenerator_'s _toJson_ method](//public.dhe.ibm.com/software/dw/lotus/Domino-Designer/JavaDocs/DesignerAPIs/com/ibm/commons/util/io/json/JsonGenerator.html#toJson(com.ibm.commons.util.io.json.JsonFactory, java.lang.Object)).

### An Object Model for (Almost) Everyone
An object model, for my purposes, is a bean. It provides the definitions for what data to store and in what format. It is my preference to keep any additional business logic, such as notifications (emails, etc) or validation, in a separate class, though this isn't necessary.

If you're ever looking for help in generating a POJO from JSON, I recommend checking out [jsonschema2pojo.org](//jsonschema2pojo.org). As I'm an avid user of Gson and Apache Commons, the options I select are JSON (not JSONSchema), Gson, Use double numbers, Use Commons-Lang3, and Include _toString_; like this:

<a href="{{ site.url }}/assets/images/post_images/JsonSchema2Pojo_settingsExample.png" data-toggle="tooltip" title="JsonSchema2Pojo.org example settings"><img src="{{ site.url }}/assets/images/post_images/JsonSchema2Pojo_settingsExample.png" class="img-responsive center-block" /></a>

As I mentioned in my caveat above, as my _HouseModel_ extends _AbstractSmartDocumentModel_, I don't have the usual get/set _Property_ methods, but rather getValue/setValue; since this is the case, reflecting my received _application/json_ content from the _HttpRequest_ directly into my _HouseModel_ for a new instance, meaning that I have to do some processing of that data to fill a new instance of a _HouseModel_. Since I know the data format I'll be expecting, I'm going to read everything into a _HashMap&lt;String, Object&gt;_, then populate my _HouseModel_ from that. I could probably write my own _GsonBuilder_ to account for this difference, but I'm not going that far into things.

#### The HouseModel
To demonstrate why I'm using an abstracted model which doesn't conform exactly to bean conventions (the getter/setter methods being replace by a universal getValue/setValue, for instance), have a look at the simplicity of my _HouseModel_ class.

{% gist bb0b10e70c875958cb28 HouseModel.java %}<br />

That's it, nothng else. This should be the hallmark of why you should [go check out the OpenNTF Domino API](//openntf.org/main.nsf/project.xsp?r=project/OpenNTF%20Domino%20API/releases) right now. As I said already, this keeps me from directly reflecting via _Gson_ or IBM commons JSON, but I can live with that for this level of simplicity.


### Receiving Data from POST or PUT

#### ServletInputStream
To read in the data contained within the _HttpServletRequest_'s body, we need to get a handle on the _ServletInputStream_. More of that below, in the example.

#### FromJson
Performing the _fromJson_ (reading the JSON string into an Object) can be done by either _com.google.Gson_ or _com.ibm.commons.util.io.json_. Both work well, and I have my preference to Gson, but something I found out in doing it both ways was that I rather like the _com.ibm.commons.util.io.json_ approach for a particular reason. In my class, visible in the above Collection _POST_ handling method, I'm creating my consumed request data first as a _HashMap&lt;String, String&gt;_ so that I can iterate the values and build out my appropriate object; this works, but one nicety of the IBM JSON package is that it is easily created first as a _JsonJavaObject_, which is similar but provides some conveniene methods for property access.

#### Using the InputStream Directly
Instead of iterating the bytes of the content from the _InputStream_, we can use another [Apache Commons utility, _IOUtils_](//commons.apache.org/proper/commons-io/apidocs/org/apache/commons/io/IOUtils.html), to automate this for us. Here's a reflection of a traditional bean (with the usual getter and setter methods) from the InputStream.

```java
// req is the passed in HttpServletRequest
ServletInputStream is = req.getInputStream();
Gson gson = new Gson();

MyBean myBean = (MyBean) gson.fromJson(IOUtils.toString(is), MyBean.class);
```

#### My Class's Interpretation
As mentioned above, here's how I'm reading my values into a _HashMap_ and then filling my object with the _setValue_ methods.

```java
String reqStr = IOUtils.toString(is);
Gson g = new Gson();
// create the tmp HashMap
Map<String,Object> tmpNwHouse = new HashMap<String,Object>();
// fill the values via Gson, self-referencing the HashMap class
tmpNwHouse = g.fromJson(reqStr, tmpNwHouse.getClass());
// iterate the values and put them into the proper HouseModel object
HouseModel nwHouse = new HouseModel();
Iterator<Map.Entry<String,Object>> it = tmpNwHouse.entrySet().iterator();
nwHouse.setEditMode(true);
while (it.hasNext()) {
	Map.Entry<String,Object> pair = it.next();
	String curProp = pair.getKey();
	String curVal = (String) pair.getValue();
	nwHouse.setValue(curProp, curVal);
	it.remove();
}

// any additional validations, balances, notifications, etc.
nwHouse.save();
// 201 = "Created", should include "Location" header
res.setStatus(201);
res.addHeader("Location", "/xsp/houses/"+nwHouse.getUnid());
```

#### Provide Response
You'll see I'm relying on the response code to communicate the success. This is what jQuery and AngularJS key off of to determine the success/fail of the network event for their respective callbacks. In my error handling, I respond with a status code of 500, and _application/json_ content in the body, to the effect of:

```javascript
{
	error: true,
	errorMessage: "whatever my Exception.toString() is"
}
```

This once again highlights the need to document your API. It's okay to use the status codes for primary information, but definitely _at least_ put some error messages in for a failing operation.

### Note: On PUT and DELETE Methods
I ran into something with this, which I wasn't expecting. I had to enable PUT and DELETE methods in my Domino Designer while testing locally. It seems that my PUT and DELETE calls were being hijacked and consistently throwing 405: method not allowed calls. This threw me for a loop, as my devleopment and production servers didn't have this issue. My suspicion is that they were already enabled, via enabling of the Domino Data Services, previously.

To enable PUT and DELETE (or PATCH, though I've avoided it for simplicity's sake), you should do so by any of:

* enable in Internet Site (if your server uses them)
* enable in Notes.ini (specifics below)
* work around using X-Http-Method-Override

Using the X-Http-Method-Override seems silly, but is pretty easy to use. Here's a jQuery.ajax example of a _PUT_ request being sent as a _POST_, taken from [a StackOverflow answer on the subject](//stackoverflow.com/questions/1813156/x-http-method-override-in-jquery/1813173#1813173):

```javascript
$.ajax({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', 'PUT');
    },
    type: 'POST',
    url: '/someurl',
    success: function(data){
        // do something...
    }
});
```

As for the path I took for my personal development environment, I added the following line to notes.ini:

```
HTTPEnableMethods=PUT,DELETE
```

I initiallly didn't see it work, as I added it to the end of my file. Once I placed that directly under where I define my local web preview port (further up the file), it started to work without issue. Must be the ghosts in the machine.

<div class="embed-responsive embed-responsive-16by9 center-block">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Hw0xVKoWW7o" frameborder="0" allowfullscreen></iframe>
</div><br />

### Summary
I've covered a whole heck of a lot in this post. We split our servlet to handle collection operations (getting the collection and creating a new entry) and the record operations (getting the full content of a single record, updating a record in part or in whole, and deleting records) and worked with a consistent interface via a near-POJO data object, which acts the same as the managed bean use in my code base (see the GH repo, link below).

I also know there are people out there thinking, "but there's this better way to do this part!" Great! Please show us and/or me how. I also welcome all constructive comments below.

To see my application code to this point, by all means check out [my GitHub repository](//github.com/edm00se/AnAppOfIceAndFire) for it. Follow the ReadMe.md instructions to get started. This repository will update once I've completed the next two posts. I still want to cover how to convert XAgent logic to a servlet and creating a basic front-end interface to this servlet with <span data-toggle="tooltip" title="my MV* framework of choice">AngularJS</span>. So please stay tuned to this series, as there's more to come!