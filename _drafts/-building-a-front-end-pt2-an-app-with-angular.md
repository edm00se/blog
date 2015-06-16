---
layout: post
type: post
title: "Building a Front-End, pt.2"
description: "An App with AngularJS and our RESTful HTTPServlet"
category: xpages-servlets
tags: [xpages, domino, javascript, servlet, angularjs]
modified: 2015-06-17
comments: true
share: true
---

### Ever Onward
asdf

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
<br />

### Let's Do It!
-app as SPA (why an SPA?)
-handling routing to relate to your data (HATEOAS) with $resource
-controllers for controlled logic
-binding, directives, filters
-what to do with that data
-CRUD (vs my client use in Ni9: http://www.notesin9.com/2015/04/09/notesin9-173-getting-started-with-servlets/)

### HTML Templating
The initial page for the Houses of AnAppOfIceAndFire (_index.html_) is laid out like almost anyone would expect an _index.html_ file that implements Bootstrap. I've snipped out everything but the &lt;body&gt; tag contents for space.

{% gist 369294c9a2fe54e8c1ec index.abbrbeviated.html %}<br />

The "magic happens" part is where my application code structures in the HTML partials, which I route in, based on my config. We'll get there in a minute, for now, have a look at the two partial HTML files I'm using, one for the collection list and one for the individual house.

{% gist 369294c9a2fe54e8c1ec partials.houseList.html %}<br />

{% gist 369294c9a2fe54e8c1ec partials.house.html %}<br />

### JavaScript App
asdf

##### 0 - Structure
asdf

##### 1 - Config
asdf

{% gist 369294c9a2fe54e8c1ec app.abbreviated.config.js %}<br />

##### 2 - Services/Factories
asdf

{% gist 369294c9a2fe54e8c1ec app.abbreviated.factories.js %}<br />

##### 3 - Controllers
asdf

{% gist 369294c9a2fe54e8c1ec app.abbreviated.controllers.js %}<br />

##### 4 - Filters
asdf

{% gist 369294c9a2fe54e8c1ec app.abbreviated.filters.js %}<br />

##### 5 - Directives
asdf

{% gist 369294c9a2fe54e8c1ec app.abbreviated.directives.js %}<br />

### Bring It Home
* asdf
* GH repo