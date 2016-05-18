---
layout: post
type: post
title: "Application Logic"
description: "where to keep it and why that matters"
category: xpages
tags: [xpages, javascript, mvc, rest, angularjs]
modified: 2014-10-24
comments: true
share: true
---

### Application Logic
All applications require a certain logic. Even the most simple application, which is ultimately access to a data store, must have some definition of how it performs when certain events happen (what to do on a save event, what to validate and how). So, ultimately, the relevant question is to the effect of "where does my application reside?" Developing Domino/XPages applications, it manifests primarily in how you handle your server logic, interface logic, and the display layer of XPages and Custom Controls. I know it's an intuitive concept, but they don't all have to be mixed into one blended mess.

### The Spaghetti Code<sup>&#8482;</sup> Situation
If you're suffering the effects of having to support applications which implement less-than-awesome "code patterns", then you'll be well aware of the fact that the applications logic, if handled poorly, gets strewn about through all the various and potential bindings for your controls. Should it be defined in-line with every control what specific (non-default) formatting of date you want across 

So, your application logic is already residing, in part, in the client-side; assuming that you do any client-side executions. If your application is truly a collection of web forms with the only events being navigation, open, and save events, then you probably don't need this approach. If you do anything more while the browser has a page loaded, then you'll want to adopt a more unified approach, at least for larger applications.

### Controller Classes Are On The Server... Already!
I know that's a rather obvious statement, but if you're sticking to a development pattern that at least includes Controller classes, then you've got your work flow actions and validation requirements are all available to you on the server. Say you want to provide your DB's CRUD operations with server-side actions and validation (to keep from cramming malformed data into your DB) via a RESTful servlet, you'll want these all in place.

This sort of implementation also lends itself to, not just validation, but 'scrubbing' of all input data. For example, say you want to use a "Rich Text Editor"-like component, such as [textAngular](//github.com/fraywing/textAngular/) (in contrast to implementing workarounds for the _xp:inputRichText_ control; keeps markup but limits to text-only), you can ensure that all input text is properly escaped, immediately prior to your save operations. Major actions, such as sending notification emails, applying advanced permissions (Readers/Authors), and other, more intensive, operations should all occur on the server. This decreases the work load on your client/browser and keeps it nice and tidy.

### Client-Side Logic
For a given page at a given state of work flow,  you likely only need a smaller set of logic. The goal is to provide consistent and well formatted data back to the server. So long as your client-side controllers (a la [AngularJS controller modules](//docs.angularjs.org/api/ng/directive/ngController)) know how to act at _that point in the larger work flow_, you've achieved your objective in enforcing well formatted data. It's this subset of information that makes for the "extra work" that some developers complain about, but I will always hold to the fact that it may require a _different_ set of work, and that your focus as a developer _only changes_ for the implementation. It's my belief that done properly, it's the same amount of "work".

### Full Stack Approach
So if the work's the same, what should we do differently? As a reader of my existing posts, you're likely aware that I'm a big fan of [M-V-C development patterns]({{ site.url }}/xpages/unraveling-the-mvc-mysteries). I'm not only a big fan of M-V-C when it comes to the multiple aspects of an application, but also across the layers a web application operates on. The JavaScript that's used with the interface layer, that runs in the user's browser, should really just be concerned with how that user interfaces with the page they're given and be independent of the server-side logic which governs things like notifications. This forced segregation helps with the [_partialRefresh hell_](//xomino.com/2014/03/04/why-using-xpages-partial-refresh-is-sometimes-easy-for-developers-and-bad-for-users/") which is too easy for a fresh XPages developer to (overly) rely on.

### Structure is Sanity
Cross-system integration is increasingly a component of my work at my day job and keeps bringing me back to the fact that more organized code, segregated to the layers of application architecture, according to an M-V-C approach, is the way to go. My goal is to have our applications semi-independent of our database storage and db operations. This is primarily because I'm no longer the lone web developer in my day job, but one who's working with a developer who has a drastically different experience and existing skill set. I'm currently bringing him up to speed on what Domino and XPages are, but as a beginner to the XPages platform (a la myself three years ago), it's easy to blur the lines between database and application layer. This is not a major sin, but in an environment of interconnected systems, it's at least worth [persuing](//www.google.com/search?q=site%3Aedm00se.io%2F%20spaghetti%20code&rct=j).

### Put Your Code Where Your Mouth Is
Some of my in-progress efforts will help to quantify this identification of an _allotment of development work_, for comparison between beginner ("traditional"?) XPages development with SSJS libraries to contain relevant control and validation mechanisms and otherwise "vanilla" _xp:_ control elements, Java bean backed XPages with controller classes, and a client (AngularJS) app with RESTful servlet implementation (utilizing those controller classes). I want to show off a more complete spectrum, highlighting the benefits of the theory <s>I've talked about</s> I hope I'm done talking about, so I can _just show you_. While this is all relatively not complex, with the example I have in mind, it is taking some time, which I seem to have increasingly less of. In the end, I'll get there, so while my blog may be quiet until I have something to share, rest assured that it is on its way.

For more on application structuring, I recommend [the recording of Jesse's MWLUG 2014 session on the subject](//www.youtube.com/watch?v=KJvydKVsqXk); he also writes on his blog about the intricacies of [how to use his Frostillic.us framework](//frostillic.us/blog/posts/D815DC7ED059395885257D6B00001006). This is also (I hope) the last time I need to cite Jesse's efforts and can begin to cite my own efforts as I progress in my examples.

<p class="text-center"><a href="{{ site.url }}/images/post_images/app_logic_nightmares.jpg" data-toggle="tooltip" title="keep sane and structure your code!"><img src="{{ site.url }}/images/post_images/app_logic_nightmares.jpg" alt="keep sane and structure your code!" /></a></p>