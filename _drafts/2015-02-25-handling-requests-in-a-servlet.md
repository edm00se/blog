---
layout: post
type: post
title: "Handling Requests in a Servlet"
description: "dare we get RESTful?"
category: xpages-servlets
tags: [xpages, domino, java, servlet]
modified: 2015-02-25
comments: true
share: true
---

### Previously, on [#ASagaOfServlets](//twitter.com/search?q=%23ASagaOfServlets)
So far in [this series]({{ site.url }}/servlet-series/) I've covered some [basics]({{ site.url }}/xpages-servlets/servlet-intro-and-flavors) on servlets, implementing our methods along with a showing of the ["flavors"]({{ site.url }}/xpages-servlets/servlet-intro-and-flavors/#flavors-of-servlets) of servlets, and how to implement these servlets [via a ServletFactory]({{ site.url }}/xpages-servlets/servlet-implementation/). This has been the ground work for everything that comes next.

<!--
I should warn you that, up until now, I've stuck to an approach which has been, by exception, very <span data-toggle="tooltip" title="does vanilla get a bad rap?">vanilla</span>. From here forward, you'll see some opinionated approaches, so just keep that in mind. There's nothing wrong with establishing and using an opinionated approach to development, we should just be conscious of those decisions and aware of any affiliated limitations or constraints set thereof.
-->

### What to Do With My Servlet?
A servlet can be just about anything. It can receive a payload of data (or just handle a simple network GET request) and process and return almost anything. Ultimately, I want to provide RESTful API interaction to the front-end side of my application, by:

* abstracting the CRUD operations, in order to
* validate received data changes (not committing changes in case of failure, throwing an error, with messages, to the user)
* and provide a layer of business logic for those interactions, enforcing a set of rules by which all my data objects can play by (I have previously described this as "loose schema", which is a misnomer, as the entire purpose of a schema is to provide [_strict_ provisioning](//en.wikipedia.org/wiki/Database_schema) at the db level; aka- integrity constraints)


#### RESTful API Servlets and DDS
REST is a format I've talked about before, and while I won't dive too much into the specifics of why here, but I can say that my opinion on use of Domino Data Servies (DDS) has shifted. In my previous post, [REST is Best]({{ site.url }}/xpages/rest-is-best/)), I recommended that, if possible, to use DDS. My current take is that DDS is a great _short-hand_ way of implementing your NSF DB to your front-end. It gives you access and will perform the DB CRUD operations against a Document or View/Folder endpoint. Why I believe it's _short-hand_ in that it does not allow you to provision in business logic or validation during those operations. So, you can absolutely use it, but you should absolutely know that you're exposing direct CRUD operations to any connected (and authenticated, assuming no Anonymous access) web browser. In the end, this should be between you, the developer, and your administrators.

Beware, the next section gets theory heavy.

#### A Scenario
Consider the following: you want to provide a collection view of a listing of documents but only to reference, not to handle the CRUD operations; those you want to only interact with that particular document's endpoint (in the style of /collection/{:id}). This seems to be more preferable to me, as mass deletes and edits are less likely (from my expectations), with only limited (GET) operations at the collection (View) level.

The operations map to what DDS provides, except where it is my impression that it's essentially a "get it all" approach; I don't believe there's an easy way to enact the desired behavior in the scenario. The easiest seems to me, to be a hybrid approach, with DDS providing the View/collection responses, and a custom servlet to handle the document interaction. The problem would be locking down what DDS allows, as even with "Views only" marked in the Application Properties (as opposed to Views and Documents), it will still allow for the full CRUD operations agains the View/Folder endpoints (/api/data/collections/...).

It's worth mentioning that creating JSON from a View or Document is relatively easy, so a custom collection endpoint from a servlet isn't that much more difficult, as we're already provisioning an endpoint for the individual document (/collection/{:id} style); more below. The next paragraph outlines a way of making DDS behave in a way we _could_ want (which I **do not recommend** unless you _need to_ do it that way), but after that paragraph, I'm going the strictly custom servlet way for the remainder of this series (it's for-reference, which illustrates my current general frustrations with DDS).

To lock that down may require some admin-y work. In Brad Balassaitis's recent series on [Gridx in XPages](//xcellerant.net/gridx-in-xpages/) (one of a number of great blog series, and posts in general, from Brad), Brad [showed how to enable the PATCH method](//xcellerant.net/2015/02/10/gridx-in-xpages-31-saving-inline-edits/) for use with DDS. So, in this same method of interacting with the Web Site document to allow PATCH operations, we could also lock down the server's provision of anything other than GET operations (or just GET and PATCH, to allow for updating records from a View endpoint, without overriding the full set of the document's values).

Obviously this topic can get to be rather opinionated, not just in theory, but also in practice. So while my stance on the subject has changed over the last (+/-)year, I feel it's for the best, though I won't begrudge anyone for disagreeing with me. This just outlines the basics of my reasoning.

### Receiving Requests
As I've mentioned above, I've referenced a pattern of /collection/{:id} for an endpoint. The basic premise is that you provide the base endpoint of .../collection (usually shown as the plural version, so for a collection of users, it would be /user**s**) which at the base level gives the full collection, but when is followed by a route parameter of an ID (for example, a 32-character length hexadecimal value, like our Notes Document UNIDs), it will handle requests specific to that document. This effectively makes our servlet at one endpoint a two-part affair. Here's the approach I'll be using, with strictly _application/json_ content type.

#### Formatting and Documentation

{:.table .table-bordered}
| Route                   | Methods Allowed        |
|-------------------------|------------------------|
| .../collection          | GET                    |
| .../collection/{:id}    | GET, POST, PUT, DELETE |

One major benefit of using a REST API framework in Java is the ability to automate your documentation. Documentation is one of the most important aspects of REST APIs (especially in publicly accessible ones), as if those who will consume them don't know how to interact with them, they won't be worth anything. Usually documentation includes the endpoints, allowed methods, and request and response structure.


#### Route Matching
We'll be handling multiple routed paths off a single collection endpoint (the collection and the collection/{:id}). The approach I'll be implementing in the route matching will make use of regular expressions. This involves defining a pattern and testing that against the requested path for a match. This will make use of _java.util.regex.Pattern_ and _java.util.regex.Matcher_, respectively.

Since we will get a true math with [_Matcher.find()_](//docs.oracle.com/javase/6/docs/api/java/util/regex/Matcher.html#find()) from a partial subset, it's important to test in a descending order from the more complex endpoint down to the simplest; the raw collection. It probably ought to look something like this:

{% gist 0ce40310e6c2497145a6 PatternMatchingRoute.java %}<br />

#### Route Parameters
Now that we've handled the route, it's time to handle any route parameters. Route parameters can be a little confusing, seeing how they look just like another route, but they can also be useful. Strictly speaking, the /{:id} is a form of route parameter, but they can also be nested (sequential?) to provide more echelons in a hierarchy. I previously built a single-purpose NodeJS/Express app that provided an API to handles requests to our IBM i for DB2 access; the specifics of that project were to have a three-level deep hierarchy of required information. This is generally a bit deeper than most people will go with route parameters, but it serves to illustrate the concept. My requests look like this:

```
.../api/{:firstLevelParam}/{:secondLevelParam}/{:thirdLevelParam}
```

Route parameters are a way of handling required, hierarchically defining values in a request. They're not the only way and many people don't like them, but I'm a fan (for such hierarchical requirements). To parse them out, we need a handle on the _HttpServletRequest_'s _pathInfo_ property. We then split it off the _/_ character to have a collection, in this case a _List&lt;String&gt;_ of all the route path elements. Since the first three are related to the structure of the servlet, we need to start checking at the 4th (3rd position).

{% gist 0ce40310e6c2497145a6 ServletRouteParamsOnly.java %}<br />

#### Query Parameters
Query parameters should be familiar to every XPages developer. In fact, it's so normal that I'll just mentioned that you may wish to use a _VariableResolver_ to populate your _Map&lt;String, String[]&gt;_ as opposed to performing a _split_ on the [_queryString_](//docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#getQueryString()).

```
Map<String, String[]> param = (Map<String, String>) ExtLibUtil.resolveVariable(facesContext, "param");
```

### RESTful APIs?
How is this all REST? REST is an approach, it has to do with stateless data requests, uses the HTTP VERBs, and is generally descriptive in format. There's not a governing true specification, just some basic rules. If you want to read more on REST in general, I recommend [this scotch.io post](//scotch.io/bar-talk/designing-a-restful-web-api).

### Next Time
Up next will be a bit more code heavy, as I'll be walking the life cycle of data reception and response handling. Hope you're still interested.
