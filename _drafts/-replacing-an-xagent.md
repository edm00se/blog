---
layout: post
type: post
title: "From XAgents to Servlets"
description: "adopt the new practice, don't forget what you've already learned"
category: xpages-servlets
tags: [xpages, domino, java, servlet]
modified: 2015-05-05
comments: true
share: true
---

### For Starters
¡Feliz Cinco de Mayo!

:sunny: :tropical_drink: :confetti_ball: :beers: :tada:

It's been a little longer to get to this installment of my [Saga of Servlets series](//localhost:4000/servlet-series), but I guess that happens when things like the day job pick up with trouble shooting server issues and family life all seem to get in the way.

### Intro
This isn't the most "developer sexy" topic, but I hope is worthwhile (and something I promised would be in this series).

The intention of this post to tackle the concept of what an _XAgent_ is (I'll be brief) and why our use of them can be substituted (in most cases) with an _HttpServlet_. There's a caveat to this, covered below, and for all intents and purposes, I'll be using _HttpServlet_ interchangably with _DesignerFacesServlet_; the implementation of which I use being Jesse Gallagher's _AbstractXSPServlet_.

##### Note
My intentions throughout this series have included to avoid any specific frameworks for building out an _HttpServlet_ and/or RESTful API, hence the pure Java implementation, NSF-level implementation (making it easily accessible before getting into OSGi _HttpServlet_s), and not being so keen on _GSON_ as to put off people who can accomplish the same thing in the IBM commons library. That being said, the intention of _this post_ is to bring us back to some common ground with other Java EE developers in how we perform some tasks; so if you're interested in such things (as I am!), please read Toby Samples' blog as he's kicking off a series on [using JAX-RS with Domino in an OSGi plugin](//tobysamples.wordpress.com/2015/04/28/jax-rs-or-the-way-to-do-rest-in-domino-part-1/); Toby's a brilliant guy whose blog is of great interest, especially as this topic is near and dear to me. Way to kick it up a notch, Toby.

### XAgents
Ultimately, the purpose is to provide a data response; whether that's a binary file like a PDF or web-consuable data response. [*XAgent*](//www.wissel.net/blog/d6plinks/shwl-7mgfbn)s provide an _XPages_ developer an easy way of creating an endpoint, the _XPage_ name, with which we can easily hook into the data response by setting it non-rendered and [overriding the _HttpServletResponse_](//www-10.lotus.com/ldd/ddwiki.nsf/dx/xpages-jsf-context-objects.htm?OpenDocument&sa=true) (and unless it's a response we don't mind being cached, [setting the _xp:view_ attribute _viewState_ to "nostate"](//tobysamples.wordpress.com/2014/12/11/no-state-no-problem/)). 

_XAgents_ are relatively easy to create, especially for a less experienced _XPages_ developer. My experiences in life have taught me that "easier" doesn't translate to "better".

### When to Keep Using an XAgent
The caveat to using an _HttpServlet_ is the need for reliable _sessionAsSigner_ access.

When you do have to use an XAgent, I recommend having a single line of invocation in your before/after ...RenderResponse. This should invoke the fully qualified package.class.Method with a parameter being passed as a handle to _sessionAsSigner_. This keeps things clean and simple, and your class will be easily maintained in a consistent fashion to any _HttpServlet_ you create. For example:

{% highlight xml %}
<xp:this.afterRenderResponse>
	<![CDATA[#{javascript:com.eric.test.DataProvider.GetAllDataAsJson(sessionAsSigner);}]]>
</xp:this.afterRenderResponse>
{% endhighlight %}

### How Much Overhead is in an XAgent?
TODO: benchmark comparisons

### Why Should I Care?
While we may be using a uniquely abstracted variant of an _HttpServlet_, by building our logic as an _HttpServlet_ as opposed to an equivalent _XAgent_ (especially in Domino/XPage's SSJS), we create our data service in an industry normal fashion. If this on top of the performance increase doesn't sell it for you, I'm not sure what will.

### Summary
If we want to be more of a Java EE developer, which is the industry equivalent norm for an XPages developer (by my interpretation), then we should ebmrace the more industry norm practices. In this case, it also means we drop some of the unnecessary JSF "baggage" from the process of merely handling a data response.

The final part of this series will cover some of the client-side application in using the the _HttpServlet_ we set up in the [Round House <s>Kick</s> Tour of data handling]({{ site.url }}/servlet-series/servlets-handling-data-round-house-kick/).