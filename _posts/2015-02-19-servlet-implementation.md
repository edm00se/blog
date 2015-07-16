---
layout: post
type: post
title: "Servlet Implementation"
description: "time for a ServletFactory"
category: xpages-servlets
tags: [xpages, domino, java, servlet]
modified: 2015-02-19
comments: true
share: true
---

### Intro
The [first post]({{ site.url }}/xpages-servlets/servlet-intro-and-flavors) covered the first two parts of [this series]({{ site.url }}/servlet-series/), the basics of what a servlet is and three "flavors" of servlet classes. This post begins with how to implement a servlet so that they're actually accessable via an end point.

### ServletFactory
[A factory is](//en.wikipedia.org/wiki/Factory_(object-oriented_programming)), [in OOP](//en.wikipedia.org/wiki/Object-oriented_programming), an object for creating other objects. In order for these servlets to be "registered" with the application to be end point accessible, they need to be provided by a ServletFactory; specifically, one that implements _com.ibm.designer.runtime.domino.adapter.IServletFactory_. This will register an end point via a pair of <span data-toggle="tooltip" title="java.util.Map">Map</span>s which match, via a key, the package.class name to the end point name. This makes the servlet accessible via &lt;your NSF&gt;/xsp/&lt;end-point-name&gt;.

#### A Note on IServletFactory
In one of the more counterintuitive things I've run into since starting Domino/XPages development, the _IServletFactory_ package is fully there on the server and usable, but the _lwpd.domino.adapter.jar_ needs to be added as an external JAR to the build path in Designer. [Sven Hasselbach](//hasselba.ch/blog/?page_id=70) has done an excellent job of showing how to do this in [his blog post on the subject](//hasselba.ch/blog/?p=746). Sven's blog is a great read with some very applicable posts on REST security, including CORS topics and more; I highly recommend reading his blog, if you don't already.

### Marrying the ServletFactory to the Application

#### Marriage, The Short, Short Version
<div class="embed-responsive embed-responsive-16by9 center-block">
<iframe width="560" height="315" src="https://www.youtube.com/embed/5X4HYA-lB-U" frameborder="0" allowfullscreen></iframe>
</div><br />

Your _ServletFactory_ needs one last step to be registered as usable by your application. Here's the short, short version.

After adding your "external JAR" to your build path, you need to create a file called _com.ibm.xsp.adapter.servletFactory_. Create that file in &lt;NSF&gt;/Code/Java/META-INF/services/; it's easiest if you switch to Package Explorer first. In this file, place the fully qualified package.Class name of your _ServletFactory_. Once your application builds, you're good to go with your keyed servlet names from your _ServletFactory_.


#### The Less-Short Version
The file we'll created needs to be in the project bulid path. In Domino 9 (and late 8.5.3 versions, anything in which there came a _Code/Java_ and _Code/JARs_ design section in the Application perspective), we should focus on the Code/Java section. For older versions, the classic location tends to be _WebContent/src_; the bottom line is: **it must be a part of your build path**. To create the file, it's best to switch views to Package Explorer.

You'll need to right-click on your _Code/Java_ folder and select New, followed by Other. Select folder and create one called _META-INF/services/_ (it'll nest the second one).

<div class="row">
	<div class="col-sm-6">
		<a href="{{ site.url }}/images/post_images/servlet/createNewResource-PkgExplorer.png" data-toggle="tooltip" title="creating a folder/file resource in Package Explorer"><img src="{{ site.url }}/images/post_images/servlet/createNewResource-PkgExplorer.png" class="image-responsive" /></a>
	</div>
	<div class="col-sm-6">
		<a href="{{ site.url }}/images/post_images/servlet/createNewFolderFile-PkgExplorer.png"><img src="{{ site.url }}/images/post_images/servlet/createNewFolderFile-PkgExplorer.png" class="image-responsive" /></a>
	</div>
</div>

Then do the same, selecting file, and call it _com.ibm.xsp.adapter.servletFactory_. In this file, we put a single line for the class which will do the assigning of end points to servlet Classes.

```
com.eric.test.ServletFactory
```


### Registering Your Servlet Classes
Now that we finally have our _adapter.servletFactory_ file pointing at our ServletFactory Class, we can start adding them into the ServletFactory. Here's one I prepared earlier.

{% gist dcefcc6474defcb9b380 %}<br />

Aside from a bit of voodoo, this should show how we can map our end point names to the class names and proper names, respectively. As you can see, I mapped each of my example servlets (_HttpServlet_, _DesignerFacesServlet_, and _AbstractXSPServlet_) from the last post into respective endpoint names/keys. The table below shows the resulting mapping of the endpoint (after the server/path/NSF/).

{:.table .table-bordered}
| Servlet Endpoint                       | Servlet Class                                 | Name                 |
| -------------------------------------- | --------------------------------------------- | -------------------- |
| /xsp/exhttpservlet                     | com.hello.servlets.ExampleHttpServlet         | Example HttpServlet             |
| /xsp/exdesignerfacesservlet            | com.hello.servlets.ExampleDesignerFacesServlet| Example DesignerFacesServlet |
| /xsp/exabstractservlet                 | com.hello.servlets.ExampleAbstractedServlet   | Example AbstractXSPServlet |

### Summary
Now we have a servlet and it's fully registered with the application and accessible via an HTTP endpoint. The next post will get into what we do with these servlets.
