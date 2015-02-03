---
layout: post
type: post
title: "Servlet Basics"
description: "an introduction"
category: xpages-servlets
tags: [xpages, domino, java, servlet]
modified: 2015-02-04
comments: true
share: true
---

### Intro
This is the introduction post in a [short series]() on Java servlets in XPages. I am by far not the first to walk this path, and I have benefitted greatly from those who have come before me. The primary reference I am using is [from Jesse Gallagher](//frostillic.us/f.nsf/posts/building-xpages-servlets-with-facescontext-access) (no big surprise there for any regular readers), but his methodology addresses a couple concerns with gaining access to _FacesContext_ in addition to not requiring the import of _com.ibm.designer.runtime.domino.adapter_ elements as an external JAR (which both DDE and Domino server include, but apparently make DDE complain, to the degree of an error, if it's not in the build path). Bottom line, instead of our ServletFactory implementing _com.ibm.designer.runtime.domino.adapter.IServletFactory_, it will extend _com.ibm.xsp.webapp.DesignerFacesServlet_.

##### For the Purposes of This Demo
I am implementing a servlet at the application level. A servlet (and web services) are often thought of as extensions of the server, however for most Domino/XPages development, we tend to think in the application. I have recently been educated drastically on OSGi plugin packaging and deployment, thanks both to <span data-toggle="tooltip" title="post part 3, links to the first two in the footer">[Paul Withers's blog series](//www.intec.co.uk/xpages-osgi-plugins-3-configuring-for-domino/)</span> and _BP106: From XPages Hero To OSGi Guru: Taking The Scary Out Of Building Extension Libraries_, the session at IBM ConnectED, presented by [Paul Withers](//twitter.com/PaulSWithers) and [Christian Guedemann](//twitter.com/guedeWebGate). If you're looking to get started with OSGi plugins, I suggest you check out what these guys are blogging and presenting about.


### What Is A Servlet?
In case you haven't run into the term before, a servlet is, semantically, a portmanteau of the words server and applet. This stems from the origins of Java dating to the early years of many of the conventions that we take for granted now, in terms of web technology. Functionally speaking, a servlet is a registered Class which connects via URI to provide or consume _something_; this can be data (XML, JSON, others), messages (e.g.- plain text), or more.

### A Basic Servlet
To create a servlet (at least in a Domino/XPages application), you will need to do three primary things:

1. create the main servlet class, which handles connections and provides responses (where the main focus is, code wise)
2. the servlet factory (a class, registered (see step 3) with the application, which matches up the routed path of access to the servlet class to use)
3. a file in meta-inf/services which tells the application what to look at for resolving connections (pointing at the servlet factory class)

For the purposes of this demonstration, we'll work things in reverse order. I will be referencing another class, _com.eric.test.SomethingAmazing_, which will be treated as handling _GET_, _PUT_, _POST_, and _DELETE_ HTTP requests, returning _application/json_ formatted data. The next post will show all the operations (for each method), for now, we'll start with just returning a simple JSON string as proof-of-life.

### 1. The File in META-INF/services/...
The file we'll created needs to be in the project bulid path. In Domino 9 (and late 8.5.3 versions, anything in which there came a _Code/Java_ and _Code/JARs_ design section in the Application perspective), we should focus on the Code/Java section. For older versions, the classic location tends to be _WebContent/src_. To create, it's best to switch views to Package Explorer.

You'll need to right-click on your _Code/Java_ folder and select New, followed by Other. Select folder and create one called _META-INF/services_ (it'll nest the second one).

<div class="row">
	<div class="col-sm-6">
		<a href="{{ site.url }}/images/post_images/servlet/createNewResource-PkgExplorer.png"><img src="{{ site.url }}/images/post_images/servlet/createNewResource-PkgExplorer.png" class="image-responsive" /></a>
	</div>
	<div class="col-sm-6">
		<a href="{{ site.url }}/images/post_images/servlet/createNewFolderFile-PkgExplorer.png"><img src="{{ site.url }}/images/post_images/servlet/createNewFolderFile-PkgExplorer.png" class="image-responsive" /></a>
	</div>
</div>

Then do the same, selecting file, and call it _com.ibm.xsp.adapter.servletFactory_. In this file, we put a single line for the class which will do the assigning of end points to servlet Classes.

```
com.eric.test.ServletFactory
```

### 2. Creating the Servlet Factory
asdf