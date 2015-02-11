---
layout: post
type: post
title: "Servlet Basics"
description: "an introduction"
category: xpages-servlets
tags: [xpages, domino, java, servlet]
modified: 2015-02-16
comments: true
share: true
---

### A Series on Servlets
This is the first post in [a short series on servlets](/servlet-series) I'll be posting over the next month or two. It's going to take some time to go through, but I hope you'll stick with me through to the end. I was originally going to speed through the whole process and give a lengthy one-shot, one-kill post on the topic; but servlets, while simple in nature, can be complex depending on your implementation. I've learned a couple things since I started assembling and hopefully this will be useful to some out there.

### What Is A Servlet?
In case you haven't run into the term before, [a servlet is](//docs.oracle.com/javaee/5/tutorial/doc/bnafe.html), semantically, a portmanteau of the words server and applet. This stems from the origins of Java dating to the early years of many of the conventions that we take for granted now, in terms of web technology. Functionally speaking, a servlet is a registered Class which connects via URI to provide or consume _something_; this can be data (XML, JSON, others), messages (e.g.- plain text), or more.

#### What Does That Mean for Me?
Many XPage developers have found great power in the use of [XAgents](//www.wissel.net/blog/d6plinks/shwl-7mgfbn). They can be powerful and flexible to meet our needs. The primary reason for this is the ability to hijack the response output writer, and return our own data, in whatever (content-type) format we specify. This makes things seamless to the user; e.g.- buildMyContacts.xsp can yield a myContacts.csv file, downloaded as an attachment, with the current/live data. Servlets let us do essentially the same thing; they provide an end point (instead of buildMyContacts.xsp we may have /api/mycontacts), which lets us return data in the format we want (setting the response content-type, accepting certain types, etc.), in a generally seamless fashion (current data).

#### But I Heard XAgents Are Bad?
One of the minor themes at ConnectED for those of us in the developer crowd was that XAgents bring along some unnecessary baggage for a simple data response; specifically [the JSF life cycle](//docs.oracle.com/javaee/5/tutorial/doc/bnaqq.html). This isn't exactly "bad" so much as just a set of unnecessary executions performed when the response could just be built and sent after requested. The JSF life cycle is there for us to assist in building out the tags for an HTML page, provide the data bindings, and set and handle the state of the page and its bound data elements. With a servlet, you choose the response format, making it focus only on hooking in to your code (via _javax.servlet.http.HttpServlet_[//docs.oracle.com/javaee/5/api/javax/servlet/http/HttpServlet.html]).

### Flavors of Servlets
So far as I can tell, there are essentially three ways of creating a servlet on a Domino server. I should mention that I'm focusing on application servlets, with no server-level deployment. The flavors are boiled down to (vanilla) _HttpServlet_, _DesignerFacesServlet_, and an abstracted servlet, which uses a wrapper to handle some of the frequent tedium (why we abstract any code). I'll try to identify why you might use each, with a brief description.

Note: I'm not covering implementation in this post, that will be covered in the next post. Each of the "flavors" outlined below share two steps in the implementation, so I'm attempting to differentiate each now, before cramming them all into an application together. 

#### HttpServlet
Probably the easiest to implement, to write the servlet, one must write a class which extends <span data-toggle="tooltip" title="javax.servlet.http.HttpServlet">_HttpServlet_</span>. This class can contain override methods for init and destroy and exposes the methods (VERBs such as GET, POST, PUT, and DELETE) available via _do*_ methods (_doGet_, _doPost_, _doPut_, and _doDelete_). A servlet needs to provide its response in either a response writer or output stream. Have a look, this is a fully functioning, albeit simple, servlet.

{% gist fd47302a1918c93a262f com.hello.servlets.ExampleHttpServlet.java %}

Hopefully this seems familiar. 