---
title: 'Handling Requests in a Servlet'
description: 'dare we get RESTful?'
date: 2015-02-25
published: true
series: xpages-servlets
tags: ['xpages', 'domino', 'java', 'servlet']
canonical_url: false
category: xpages-servlets
permalink: /xpages-servlets/servlet-handling-requests/
---

<!-- {% include series.html %} -->

### Previously, on [#ASagaOfServlets](//twitter.com/search?q=%23ASagaOfServlets)

So far in [this series](/servlet-series/) I've covered some [basics](/xpages-servlets/servlet-intro-and-flavors) on servlets, implementing our methods along with a showing of the ["flavors"](/xpages-servlets/servlet-intro-and-flavors/#flavors-of-servlets) of servlets, and how to implement these servlets [via a ServletFactory](/xpages-servlets/servlet-implementation/). This has been the ground work for everything that comes next.

### What to Do With My Servlet?

A servlet can be just about anything. It can receive a payload of data (or just handle a simple network GET request) and process and return almost anything. Ultimately, I want to provide RESTful API interaction to the front-end side of my application, by:

* abstracting the CRUD operations, in order to
* validate received data changes (not committing changes in case of failure, throwing an error, with messages, to the user)
* and provide a layer of business logic for those interactions, enforcing a set of rules by which all data objects will adhere to (I have previously described this as "loose schema", which is a misnomer, as the entire purpose of a schema is to provide [_strict_ provisioning](https://en.wikipedia.org/wiki/Database_schema) at the db level; aka- integrity constraints)

### Receiving Requests

As I've mentioned above, I've referenced a pattern of /collection/{:id} for an endpoint. The basic premise is that you provide the base endpoint of .../collection (usually shown as the plural version, so for a collection of users, it would be /user**s**) which at the base level gives the full collection, but when is followed by a route parameter of an ID (for example, a 32-character length hexadecimal value,< like our Notes Document UNIDs), it will handle requests specific to that document. This effectively makes our servlet at one endpoint a two-part affair. Here's the approach I'll be using, with strictly _application/json_ content type.

#### Formatting and Documentation

| Route                   | Methods Allowed        |
|-------------------------|------------------------|
| .../collection          | GET                    |
| .../collection/{:id}    | GET, POST, PUT, DELETE |

One major benefit of using a REST API framework in Java is the ability to automate your documentation. Documentation is one of the most important aspects of REST APIs (especially in publicly accessible ones), as if those who will consume them don't know how to interact with them, they won't be worth anything. Usually documentation includes the endpoints, allowed methods, and request and response structure.


#### Route Matching

We'll be handling multiple routed paths off a single collection endpoint (the collection and the collection/{:id}). The approach I'll be implementing in the route matching will make use of regular expressions. This involves defining a pattern and testing that against the requested path for a match. This will make use of _java.util.regex.Pattern_ and _java.util.regex.Matcher_, respectively.

Since we will get a true match with [_Matcher.find()_](https://docs.oracle.com/javase/6/docs/api/java/util/regex/Matcher.html#find()) from a partial subset, it's important to test in a descending order from the more complex endpoint down to the simplest; the raw collection. It probably ought to look something like this:

https://gist.github.com/edm00se/7d1abeb5ee555631b638b3299cd66998#routeMatching.java

[EDIT]

It was brought to my attention that route matching is easier via @ annotations, as one might use via an approach [with Jersey](https://jersey.java.net/). I absolutely agree, but up until now, for this series, I've taken a framework-free approach to generating and implementing servlets. I'll just say that there's a very good reason that such frameworks are out there, and even implementing just the pieces for the @ annotations could be effort well spent. I fully welcome any response piece on this topic, as I'm not experienced with Jersey (my preference to RegEx matching comes from my NodeJS/Express API experience).

[/EDIT]

#### Route Parameters

Now that we've handled the route, it's time to handle any route parameters. Route parameters can be a little confusing, seeing how they look just like another route, but they can also be useful. Strictly speaking, the /{:id} is a form of route parameter, but they can also be nested (sequential?) to provide more echelons in a hierarchy. I previously built a single-purpose NodeJS/Express app that provided an API to handles requests to our IBM i for DB2 access; the specifics of that project were to have a three-level deep hierarchy of required information. This is generally a bit deeper than most people will go with route parameters, but it serves to illustrate the concept. My requests look like this:

```javascript
.../api/{:firstLevelParam}/{:secondLevelParam}/{:thirdLevelParam}
```

Route parameters are a way of handling required, hierarchically defining values in a request. They're not the only way and many people don't like them, but I'm a fan (for such hierarchical requirements). To parse them out, we need a handle on the _HttpServletRequest_'s _pathInfo_ property. We then split it off the _/_ character to have a collection, in this case a _List&lt;String&gt;_ of all the route path elements. Since the first three are related to the structure of the servlet, we need to start checking at the 4th (3rd position).

https://gist.github.com/edm00se/7d1abeb5ee555631b638b3299cd66998#routeParams.java

#### Query Parameters

Query parameters should be familiar to every XPages developer. <s>In fact, it's so normal that I'll just mentioned that you may wish to use a _VariableResolver_ to populate your _Map&lt;String, String&gt;_ as opposed to performing a _split_ on the [_queryString_](//docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#getQueryString()) of the _HttpServletRequest_.</s>

[Edit]

Thanks to [Jesse Gallagher](//twitter.com/Gidgerby) for catching something here. You can resolve _param_, but it would be better to use something else as it behaves as a _Map&lt;String,String&gt;_, **not** a _Map&lt;String,String[]&gt;_. If you're performing an _HttpServletRequest.getQueryString()_,  you will get a _java.lang.String_ back, with which contains your results. You can manually pull this apart, but you should really use the [**_getParameterMap_** method](//docs.oracle.com/javaee/6/api/javax/servlet/ServletRequest.html#getParameterMap()) on your _HttpServletRequest_ (the method is inherited from _ServletRequest_) as this _does return_ a _Map&lt;String,String[]&gt;_, ensuring you get keyed values for each of multiple values per key. I've used the method elsewhere, I'm not sure what my brain was thinking up above, but I suspect it was a lack of caffeine âï¸.

```java
Map<String, String[]> param = (Map<String, String[]>) req.getParameterMap();
```

[/Edit]

### RESTful APIs?

How is this all REST? How is it an API? APIs, for those living under a rock, are an Application Programming Interface; the Notes/Domino API is how we interact with, reference, and use Notes/Domino entities. Providing access to invoke calls and operations over a REST API means that we have logic build into our network calls to our endpoint. REST is an approach, it has to do with stateless data requests, uses the HTTP VERBs, and is generally descriptive in format. There's not a governing true specification, just some basic rules. If you want to read more on REST in general, I recommend [this scotch.io post](//scotch.io/bar-talk/designing-a-restful-web-api).

### Next Time

Up next will be a bit more code heavy, as I'll be walking the life cycle of data reception and response handling. It will cover an endpoint governing a certain data type, provide a collection at the collection level, establish a data model that both our responses will use and the ingested data types will instantiate, and provide CRUD operations against a given document (the data object instance). It will be a fast-paced post, but it should be worth the read.
