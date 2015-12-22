---
layout: post
type: post
title: "From XAgents to Servlets"
description: "adopt the industry practice, don't forget what you've learned"
category: xpages-servlets
series: servlet-series
tags: [xpages, domino, java, servlet]
modified: 2015-05-05
comments: true
share: true
---

{% include series.html %}

### For Starters
¡Feliz Cinco de Mayo!

:sunny: :tropical_drink: :confetti_ball: :beers: :tada:

It's been a little longer to get to this installment of my [Saga of Servlets series](//localhost:4000/servlet-series), but I guess that happens when things like the day job pick up with trouble shooting server issues and family life all seem to get in the way.

### Intro
This isn't the most "developer sexy" topic, but I hope is worthwhile (and something I promised would be in this series).

The intention of this post to tackle the concept of what an _XAgent_ is (I'll be brief) and why our use of them can be substituted (in most cases) with an _HttpServlet_. There's a caveat to this, covered below, and for all intents and purposes, I'll be using _HttpServlet_ interchangably with _DesignerFacesServlet_; the implementation of which I use being [Jesse Gallagher's _AbstractXSPServlet_](//github.com/jesse-gallagher/XPages-Scaffolding/blob/master/frostillicus.framework/frostillicus.framework.plugin/src/frostillicus/xsp/servlet/AbstractXSPServlet.java).

##### Note
My intentions throughout this series have included to avoid any specific frameworks for building out an _HttpServlet_ and/or RESTful API, hence the pure Java implementation, NSF-level implementation (making it easily accessible before getting into OSGi *HttpServlet*s), and not being so keen on _GSON_ as to put off people who can accomplish the same thing in the IBM commons library. That being said, the intention of _this post_ is to bring us back to some common ground with other Java EE developers in how we perform some tasks; so if you're interested in such things (as I am!), please read [Jesse Gallagher's post on using JAX-RS](//frostillic.us/blog/posts/87267DB72A55133F85257E380073495F) or Toby Samples' blog, as he's kicking off a series on [using JAX-RS with Domino in an OSGi plugin](//tobysamples.wordpress.com/2015/04/28/jax-rs-or-the-way-to-do-rest-in-domino-part-1/).

### XAgents
Ultimately, the purpose is to provide a data response after performing some computation, over HTTP (effectively the same steps in an _HttpServlet_); whether that's a binary file like <span data-toggle="tooltip" title="live generated">a PDF</span> or <span data-toggle="tooltip" title="like application/json">web-consuable data response</span>. [*XAgent*](//www.wissel.net/blog/d6plinks/shwl-7mgfbn)s provide an _XPages_ developer an easy way of creating an endpoint, the _XPage_ name, with which we can easily hook into the data response by setting it non-rendered and [overriding the _HttpServletResponse_](//www-10.lotus.com/ldd/ddwiki.nsf/dx/xpages-jsf-context-objects.htm) (and unless it's a response we don't need to persist state with, [setting the _xp:view_ attribute _viewState_ to "nostate"](//tobysamples.wordpress.com/2014/12/11/no-state-no-problem/)). 

_XAgents_ are relatively easy to create, especially for a less experienced _XPages_ developer. My experiences in life have taught me that "easier" doesn't always translate to "better", but an _XAgent_ is handy, conveninent, and easy to get started with.

### How Much Overhead is in an XAgent?
I wish I had the time to invest in some benchmark comparisons. This may be something I revisit, as it will probably bug me until I have some actual data. In any case, the main idea here is that the full JSF lifecycle is invoked, causing a more-than-needed increase in server processing. An _HttpServlet_ will take a request, process as needed for a valid response (stateless, if you go the RESTful route), and kick out a data response. An XAgent can do the same, but al the moving parts of JSF are still invoked.

In lieu of some recorded tests to back this up, I'm going to link you to [a blog post by Karsten Lehmann talking about XAgent bottlenecks](//www.mindoo.com/web/blog.nsf/dx/17.07.2011101855KLEBRW.htm?opendocument&comments#anc1) and an excerpt here that should sum things up nicely.

> The consequence is that you should think twice about your XPages application architecture, if you have many concurrent HTTP requests or if some of them take a lot of time to be processed. An XAgent may be the easiest solution to deploy, but may not produce the best user experience in all cases. 

<span data-toggle="tooltip" title="no seriously, I'll come back to it!">[Insert Data to Back Up Reasoning Here]</span>

### When to Keep Using an XAgent
The caveat to using an _HttpServlet_ is the need for reliable _sessionAsSigner_ access. While I believe this is feasible at a conceptual level (especially inside an NSF), it would be lacking in the context of an OSGi plugin, as there would be no actual design element. I've tried to read up on and ask around on this subject, but the most I've found is [an old question on OpenNTF](//www.openntf.org/main.nsf/project.xsp?r=project/XPages%20Extension%20Library/discussions/138D40A90CF008BD862579A50040ABFA) and some confusing talk from Jesse Gallagher about ClassLoaders and the underlying Domino C API. Talking with Jesse about these things make it sound like a really good idea for me to take his word on it :wink:.

When you do have to use an _XAgent_, I recommend having a single line of invocation in your before/after ...RenderResponse. This should invoke the fully qualified package.class.Method with a parameter being passed as a handle to _sessionAsSigner_. This keeps things clean and simple, and your class will be easily maintained in a consistent fashion to any _HttpServlet_ you create. For example:

{% highlight xml %}
<xp:this.afterRenderResponse>
	<![CDATA[#{javascript:com.eric.test.DataProvider.GetAllDataAsJson(sessionAsSigner);}]]>
</xp:this.afterRenderResponse>
{% endhighlight %}

### Why Should I Care?
While we may be using a uniquely abstracted variant of an _HttpServlet_, by building our logic as an _HttpServlet_ as opposed to an equivalent _XAgent_ (especially in Domino/XPage's SSJS), we create our data service in an industry normal fashion. If this on top of the performance increase doesn't sell it for you, I'm not sure what will.

### Summary
If we want to be more of a Java EE developer, which is the industry equivalent norm for an XPages developer (by my interpretation), then we should ebmrace the more industry norm practices. In this case, it also means we drop some of the unnecessary JSF "baggage" from the process of merely handling a data response.

The final part of this series will cover some of the client-side application in using the the _HttpServlet_ we set up in the [Round House <s>Kick</s> Tour of data handling]({{ site.url }}/xpages-servlets/servlets-handling-data-round-house-kick/). It may come soon, if I can keep my spawning of non-series post ideas in check.