---
layout: post
type: post
title: "Fortune and Glory"
description: "MVC with Java, Domino, and XPages"
category: xpages
tags: [xpages, domino, java, rest, api]
modified: 2014-09-09
comments: true
share: true
---

### An Evolution of Development
I'm about to get slightly abstract with a couple concepts regarding web/software development.  I'm sorry. I also apologize for the sports metaphors, but hey, know your audience, right? I hope you can stick with me through this one, as I think those who are looking to "level up" their XPages development will see a few pieces start to line up and maybe click into place. As Short Round said to Indy, "fortune and glory, Dr. Jones"; this is what I'm chasing. Truth be told, it's closer than you might think.

### TL;DR
For those accustomed to advanced XPages development, I'm aiming to cover the advantages on a more strict M-V-C archetectural pattern in XPages/Domino development as a vehicle for enabling better applications, with portable logic, and modern system interconnections. I may be plagiarizing many concepts from <a href="https://frostillic.us/blog/posts/B0DD2BC3CBC6884985257A06006175C2">Jesse Gallagher</a> and _numerous others in the community_, who have been at this game much longer than I. I hope those people take this as the flattery it is intended to be.

### Why Should I Change How I Develop?
I always come back to something a professor said to our class my freshman year, "a good developer is lazy". This is something I've reference to my manager on occasion, who had apparently never heard it; he had of course heard of the "why reinvent the wheel?" argument. The concept is primarily to write _re-usable code_. That's it. On the surface this sounds easy, but after you get done writing your master, do-it-all function, you'll do one of about three things, programmatically:

* never do the same thing again
* re-use it, once, and duplicate a good portion of the function ()
* use it more than once or twice (which makes this into more of either an operational pattern or part of business logic)

If you're re-using the same operation/function more than once or twice, per the <a href="http://sourcemaking.com/refactoring/when-should-you-refactor">rule of three</a>, you should probably refactor your code to use an abstracted function/method to do the same thing. This makes your calls much more maintainable, read more easily, and get back to this "be lazy" approach. It makes your code more portable, as you can drop an individual function from one application into another to do the same thing with minimal fuss; it _makes your development_ more fluid, letting you focus on the portion of an app that needs to change at any given point, long term. This, to me, is a hall mark of good architecture, as my end users tend to change their minds with some frequency.

Not going this route is akin to "I don't wanna" or "but I do my own thing this other way". I know development patterns aren't black and white, and honestly, if you have a successful application which does what it's supposed to do and runs well while maintaining perfect harmony with the universe, that's great. I'm attempting to illiterate an approach which enables you as the developer and makes system interaction much easier; a topic which comes up in my day job quite a lot lately.

### What Is M-V-C?
Application design, especially in the non-web, desktop application world, has always fought the good fight with segregating your UI from your data and application logic. It's no surprise that web applications should go through the same thing. This is the highlight of a <a href="http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller">Model-View-Controller</a> architectural approach. Most of the XPage developers out there are going to use a Domino file as their data store and will be presenting it in an XPage; this covers the _Model_ (NotesDocument) and _View_ (XPage and Custom Controls) respectively. Leaving the Controller, into which we shove all our application logic, workflow, validation, and other custom operations.

So, where the rubber meets the road for most XPage developers, and where we can make the most improvements (IMO), is in the use of Controller classes for our application logic. Jesse has done some work with demonstrating how to use <a href="http://www.notesin9.com/2013/04/08/notesin9-106-intro-to-java-controller-classes/">Controller Classes</a> to our advantage.

### Spaghetti Code
XPages makes it easy to create, what I refer to, as spaghetti code. One of the main applications I support uses a large amount of function libraries in Domino SSJS. This hints at the concept, of using segregated controller code in a separate location from the display, but in the end, it's far too easy for "just a couple lines" to keep finding their way into controls implemented in the XPage or Custom Control. Those "couple lines" eventually get modified into a few more and suddenly, even with the best intentions, things get sloppy. Ultimately, this plays into using a better Controller, performing server-side actions and validations, with minimal "clutter" in the XPage components.

Worse, not only is this "spaghetti code" cluttered and make for a less clean XPage source, if you are using SSJS code libraries heavily, in large applications, it begins to slow down your application. <a href="http://nathantfreeman.wordpress.com/2013/04/12/xpages-performance-pro-tips/">This post by Nathan T. Freeman</a> covers it better than I will, and the <a href="http://www.linkedin.com/groups/What-are-top-XPages-performance-3707727.S.230901244?qid=788288b9-1ba4-4429-baf9-8c1c680ea284&trk=group_most_popular-0-b-ttl&goback=%2Egmp_3707727">LinkedIn discussion</a> on the topic is somewhat enlightening. The gist I got from it all boils down to: XPages implements JSF, so compiling Java Classes makes sense whereas this Domino SSJS beast is essentially a run-time parsed mega-string, making it fine for a while, but run-time intensive after a certain size.

///////break/////////

### Getting Into M-V-C
asdf

### Something New
By implementing our Controller code into Java classes, we can 

#### Stack Your Team
"Drafting" data formats and logic (DAO / data model objects) (M)

#### Create Your Playbook
controllers for operations, how to perform "operation x" (C)

#### Pre-Game Your UI?
prepare for the audience, know who you're up against (keep your strategy in mind)

#### Kick Off
implementation in the presentation layer (V)

#### Post-Game Analysis
What does this achieve us?

### Back to the Beginning
Client-side frameworks/applications, stateful vs stateless transfer, JSON as data source, server-side validation and workflows, 