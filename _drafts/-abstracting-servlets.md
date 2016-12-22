---
layout: post
type: post
title: "More on DesignerFacesServlets"
description: "another layer on the abstraction cake"
category: xpages
tags: [xpages, servlets, java]
modified: 2016-12-20
comments: true
share: true
---

{% include toc.html %}
### Intro
asdf

### A Return to Normalcy

This touches not on the campaign cornerstone of Warren G. Harding's presidential campaign of 1920, but rather my efforts to reconcile my Domino/XPages development styles with what I perceive to be "normal" Java and web development practices, outside of a Domino server.

As a customer, this sort of approach benefits me when my company should ever have the need to hire out/in some talent. This is also of great benefit to me personally in the forms of:

- making it easier to adopt and make use of external elements
- making it easier to bring an external/additional developer up to speed on the project
- making the required skill set of such a developer a less-specific one
- keeping my personal skills at a high degree of utility

This isn't a new trend for me, as it's been on my mind since I started learning Domino/XPages, but what I'm covering here today is something I've been working towards for a while.

### Regarding Character Encoding

Most web developers have heard something to the effect of "when in doubt, always use UTF-8" for character encoding. This is good advice, as it's a standard unicode charset and very commonly used and supported. Also, should someone be dealing with a language other than English (or whatever this amalgam I happen to speak is), things like the [dotless i](https://en.wikipedia.org/wiki/Dotted_and_dotless_I) and many other non-English characters are supported in UTF-8.

#### ServletOutputStream vs PrintWriter
As it came up in a chat recently, Mark Leusink pointed out that using the `ServletOutputStream` doesn't provide the ability for `utf-8` character encoding.

Having used Jesse's `AbstractXSPServlet` quite heavily for my NSF level `<s>Http</s>DesignerFacesServlets`, I managed to take the one that was present, between the options of `ServletOutputStream` vs `PrintWriter`.

Oracle's JavaDoc for [`ServletResponse.getOutputStream()`](http://docs.oracle.com/javaee/6/api/javax/servlet/ServletResponse.html#getOutputStream()) outright calls this to our attention (if we bother to read the JavaDoc 😉).

> Returns a ServletOutputStream suitable for writing binary data in the response. The servlet container does not encode the binary data.

This means that we _could_ encode our output text in `utf-8`, but it would have to be set manually.

As for the [`SerlvetResponse.getWriter()`](http://docs.oracle.com/javaee/6/api/javax/servlet/ServletResponse.html#getWriter()), it defaults to `ISO-8859-1` character encoding, but can easily be changed via `HttpServletResponse.setCharacterEncoding("UTF-8")`. You'll also probably want to add the `UTF-8` suffix to your `Content-Type` header as well, like so `res.setHeader("Content-Type", "application/json; charset=UTF-8")`.

### This Normalcy in `HttpServlet`s

Using a `DesignerFacesServlet` is the way to go (albeit by an abstracted class, [as covered previously]({{ site.url }}/xpages-servlets/servlet-intro-and-flavors/#designerfacesservlet)) when it comes to an `HttpServlet` in a Domino NSF that requires a user's `Session` (or anything derived off the `FacesContext` instance).
A `javax.servlet.http.HttpServlet` is incredibly simple to implement, as all is needed is to extend it, then provide our operations in a `doGet`, `doPost`, `doPut`, or `doDelete` method. How simple can it get? A downside of the `DesignerFacesServlet` (directly) requires we override the entire `service` method, or in Jesse's `AbstractXSPServlet`, the `doService` method. We then have to figure out what sort of network request was sent, etc.
I've been poking around through a few projects lately and, after a while of staring at Jesse's frostillicus framework, I started toying with framing out what may be a framework of my own, moving forward. I started thinking a lot about `abstract` classes and how they can simplify some otherwise tedious processes.

{% include gist.html id="86faf73d6d9c4ee4aabaacaf0ecc03c9" file="Snip_UsePrintWriter.java" %}

This is a highly sensible way of doing things, as one can "walk into" an already established context of performing a `GET` method (or `PUT`, `POST`, `DELETE`, etc.) and not need to manually perform a bunch of checks against the request's method, and all that jazz.

### Abstract Classes

Starting with [Jesse's original class](https://github.com/jesse-gallagher/XPages-Scaffolding/blob/master/frostillicus.framework/frostillicus.framework.plugin/src/main/java/frostillicus/xsp/servlet/AbstractXSPServlet.java), the `AbstractXSPServlet` establishes a servlet which receives a request, does things like computations, and provides a response. This handling is provided through an override it provides to the underlying `service` method of the `DesignerFacesServlet` class, by wrapping it inside a try/catch block for consistent response and release of the `FacesContext` instance, so as not to goof up a user's session. This is a good way of doing things and exactly why I've implemented it many times over. The class then exposes another method, `doService`, that allows our implementation (a class extending `AbstractXSPServlet`) to interact with all the underlying benefit. This is the beauty of an abstract class; consistency without specifics of implementation, allowing our actual primary logic to be contained in a class which has minimal overhead for repetitive tasks. This is why Jesse's `AbstractXSPServlet` is a great option at the NSF level; it's consistent and easy to use. Here's a sample:

{% include gist.html id="86faf73d6d9c4ee4aabaacaf0ecc03c9" file="Snip_ExtendingAbstract.java" %}

#### What Makes A Class (or Method) Abstract?

An `abstract` class in Java is a class which is declared abstract (`public abstract class SomeAbstractClass...`) and may optionally include abstract methods. An abstract method is declared as `abstract` and has no body content, aka- no curly braces; this is a method that _will_ be overridden. An abstract class may contain non-abstract methods as well. An abstract class can not be instantiated, but can be subclassed. For more on abstract methods and classes, I recommend reading the [Java SE tutorial on the subject](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html).

### `AbstractHttpServlet`

I'm creating an alternate to Jesse Gallagher's `AbstractXSPServlet`, which formats things more according to how I want them, along with replacing the `ServletOutputStream` with a `PrintWriter` (to focus on character encoding content as opposed to a byte stream).

// TODO: gist AbstractHttpServlet

#### Normalcy With `HTTPServlet`

asdf

### `AbstractJsonServlet`
asdf
