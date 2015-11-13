---
layout: post
type: post
title: "More on DesignerFacesServlets"
description: "another layer on the abstraction cake"
category: xpages
tags: [xpages, servlets, java]
modified: 2015-12-07
comments: true
share: true
---

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

### Intro
A few things have been on my mind lately, specifically in regards to how I've been framing out a platform which will serve as a base for a couple of things to come. I've been diving through the OpenNTF Domino API and Jesse's (frostillicus) framework to see how they accomplish a couple things. I'm also planning on using ODA and a custom variation on Jesse's framework (I'll probably just extend it) to achieve what I want. In fact, I've been starting to see use cases for abstract classes everywhere, which isn't a bad thing. In fact, I'm starting down the path of using Jesse Gallagher as my Bob Ross for my purposes of creating a couple of OSGi plugins as he does [his series on OSGi](https://frostillic.us/blog/posts/99CE7CC2CBC3C9DA85257EF200408B6E), so that I can achieve some greater harmony at the server level.

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr"><a href="https://twitter.com/edm00se">@edm00se</a> The next post will be setting up a happy little Eclipse environment and then creating an almighty plugin.</p>&mdash; Jesse Gallagher (@Gidgerby) <a href="https://twitter.com/Gidgerby/status/661540529948205057">November 3, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So, as has been my plan for some time, I'm working my way into another blog series, which will build on many of the concepts that I covered in my [series on servlets]({{ site.url }}/servlet-series/). So, for now, allow me to introduce:

### Extending _AbstractXSPServlet_
A two-part mini-series on making more of what we already have. Jesse Gallagher's _AbstractXSPServlet_ is a great way of hooking into servlets at the NSF level.

### Return to Normalcy
This touches not on the campaign cornerstone of Warren G. Harding's presidential campaign of 1920, but rather my efforts to reconcile my Domino/XPages development styles with what I perceive to be "normal" Java and web development practices, outside of Domino server.
As a customer, this sort of approach benefits me when my company should ever have the need to hire out/in some talent. This isn't a new trend for me, as it's been on my mind since I started learning Domino/XPages, but what I'm covering here today is something I've been working towards for a while.

### A Quick Note on Character Encoding
Most web developers have heard something to the effect of "when in doubt, always use UTF-8" for character encoding. This is good advice, as it's a standard unicode charset and very commonly used and supported. Also, should someone be dealing with a language other than English (or whatever this amalgam I happen to speak is), things like the [dotless i](https://en.wikipedia.org/wiki/Dotted_and_dotless_I) and many other less-English characters are supported in UTF-8.

#### ServletOutputStream vs PrintWriter
As it came up in a chat recently, Mark Leusink pointed out that using the ServletOutputStream doesn't provide the ability for utf-8 character encoding.

Having used Jesse's _AbstractXSPServlet_ quite heavily for my NSF level _<s>Http</s>DesignerFacesServlets_, I managed to take the one that was present, between the options of _ServletOutputStream_ vs _PrintWriter_.

Oracle's JavaDoc for [_ServletResponse.getOutputStream()_](http://docs.oracle.com/javaee/6/api/javax/servlet/ServletResponse.html#getOutputStream()) outright calls this to our attention (if we bother to read the JavaDoc :wink:).
> Returns a ServletOutputStream suitable for writing binary data in the response. The servlet container does not encode the binary data.

As for the [_SerlvetResponse.getWriter()_](http://docs.oracle.com/javaee/6/api/javax/servlet/ServletResponse.html#getWriter()), it defaults to `ISO-8859-1` character encoding, but can easily be changed via `HttpServletResponse.setCharacterEncoding("UTF-8")`. You'll also probably want to add the `UTF-8` suffix to your _Content-Type_ header as well, like so `res.setHeader("Content-Type", "application/json; charset=UTF-8")`.

### This Normalcy in HttpServlets
Using a _DesignerFacesServlet_ is the way to go (albeit by an abstracted class, as covered previously) when it comes to an _HttpServlet_ in a Domino NSF that requires a user's `Session` (or anything derived off the _FacesContext_ instance).
A `javax.servlet.http.HttpServlet` is incredibly simple to implement, as all is needed is to extend it, then provide our operations in a _doGet_, _doPost_, _doPut_, or _doDelete_ method. How simple can it get? A downside of the _DesignerFacesServlet_ (directly) requires we override the entire _service_ method, or in Jesse's _AbstractXSPServlet_, the _doService_ method. We then have to figure out what sort of network request was sent, etc.
I've been poking around through a few projects lately and, after a while of staring at Jesse's frostillicus framework, I started toying with framing out what may be a framework of my own, moving forward. I started thinking a lot about `Abstract` classes and how they can simplify some otherwise tedious processes.

### Next Time
I'll be introducing a new abstract servlet class which achieves most of what I expect from an _HttpServlet_.

<hr />

### Intro
So, without futher ado, here's something new...

or some theory first

### Abstract Classes
* What
* Where
* When
* Why
* How

### AbstractHttpServlet
I'm creating an alternate to Jesse Gallagher's _AbstractXSPServlet_, which formats things more according to how I want them, along with replacing the _ServletOutputStream_ with a _PrintWriter_ (to focus on character encoding content as opposed to a byte stream).

### AbstractJsonServlet
asdf