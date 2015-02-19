---
layout: post
type: post
title: "Handling Data in a Servlet"
description: "dare we get RESTful?"
category: xpages-servlets
tags: [xpages, domino, java, servlet]
modified: 2015-02-25
comments: true
share: true
---

### Previously, on [#ASagaOfServlets](//twitter.com/search?q=%23ASagaOfServlets)
So far in [this series]({{ site.url }}/servlet-series/) I've covered some [basics]({{ site.url }}/xpages-servlets/servlet-intro-and-flavors) on servlets, implementing our methods along with a showing of the ["flavors"]({{ site.url }}/xpages-servlets/servlet-intro-and-flavors/#flavors-of-servlets) of servlets, and how to implement these servlets [via a ServletFactory]({{ site.url }}/xpages-servlets/servlet-implementation/). This has been the ground work for everything that comes next.

I should warn you that, up until now, I've stuck to an approach which has been, by exception, very <span data-toggle="tooltip" title="does vanilla get a bad rap?">vanilla</span>. From here forward, you'll see some opinionated approaches, so just keep that in mind.

### What to Do With My Servlet?
A servlet can be just about anything. It can receive a payload of data (or just handle a simple network GET request) and process and return almost anything. Ultimately, I want to accomplish the following:

* provide RESTful API interaction to my front-end application
	* abstract the CRUD operations, to
	* validate received data changes
	* and provide a layer of business logic for those interactions, enforcing a <span data-toggle="tooltip" title="See @NTF? I didn't use the world schema!">set of rules by which all my data objects can play by</span>


### RESTful API - My Focus
asdf

#### Route Parameters
asdf

#### Query Parameters
asdf

#### Request of Data
asdf

#### asdf
asdf

### Data Objects
asdf

#### Data Object Class (POJOs!)
asdf

### Reflection for Data Object Creation
asdf

#### GSON
asdf

#### IBM Commons
asdf

#### Jackson
To use Jackson, which I've avoided for the most part, I really recommend just [reading Frank van der Linden's blog post](//elstarit.nl/?p=242) on it. The short version is, Jackson can do this for you, via a JSON _ObjectMapper_.

### Handling Validation
asdf

### Providing a Response
asdf
