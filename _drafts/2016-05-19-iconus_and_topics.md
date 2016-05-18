---
layout: post
type: post
title: "ICONUS and Other Topics"
description: "keeping busy"
category: self-promotion
tags: [iconus, structure, front-end, back-end, xpages-servlets, scm, yeoman, grunt, rest, angularjs]
modified: 2016-05-19
comments: true
share: true
---

### Intro
If you were able to attend the ICON US (formerly IamLUG) virtual event, then you lucked out. There were a great many good sessions that I was sadly not able to attend all of, on account of unavoidable travel (more on that in a minute). It was a great event, had a decent turn out for participation, and it's been great to see [the "replays" coming up as Chris has been posting them](http://www.idonotes.com/idonotes/idonotes.nsf). So far the keynote and IBM special announcement are available for replay, though you can [view all of the session info for ICON US right on the website](http://iamiconus.org/iamiconus/iconus2016.nsf/agendas.xsp) or see [the announcements Chris posted on his blog](http://www.idonotes.com/idonotes/idonotes.nsf/dx/search.htm?opendocument&q=iamiconus).

### ICON US Session
Being a good "lazy" developer (in the sense of efficiency), [Shean P. McManus](https://twitter.com/sheanpmcmanus) and I did a superhero team-up for our session. Not only are team-ups all the rage in film right now, but Shean and I have a similar take on what we can accomplish with Domino and XPages in a number of areas. By dividing and conquoring, we were both able to focus on more of the moving parts and worry less about the entire session. It was a great honor to work with Shean and I hope we get a chance to do so in the future.

Why a title of "Normalizing XPages Web Development"? By developing consistently across platforms with the decoupled front-end/back-end association, our data becomes available as a service, letting us focus on what the back-end's strengths are, and the front-end can be focused on what its strengths are. All in all, not only do we open the doors to all sorts of front-end goodies, but it makes good long-term maintenance sense as well.

[The session itself](http://www.idonotes.com/idonotes/idonotes.nsf/dx/normalizing-xpages-web-development.htm) and included demonstrations of:

* modern web app frameworks for Domino/XPages
  * our demo app made use of an AngularJS front-end
  * this front-end consumed JSON APIs (REST-like) from XPages
* more "traditional" XPages implementations of RESTful APIs with JSON
  * `xe:restService` implementations of `xe:customRestService` in SSJS, `xe:viewItemFileService`, and even an `xe:documentJsonService` snuck in there (it gets used as a fail-over from DDS, if you're using local web preview)
  * these were all implemented in a single `api.xsp` XPage, which is both familiar and convenient, without any of the "fiddling" of a `DesignerFacesServlet` that may put people off (this was covered in the session and slides)
  * updating via a LotusScript agent was demonstrated (for those "stuck" between a rock and a quarry)
  * and Domino Data Services made an appearance (though you should really take the full implementation into consideration before exposing full, direct CRUD operations to anyone with ACL access, or facing it externally)
* task runner implementation was demonstrated (via [Grunt](http://gruntjs.com/)) for optimized client-side assets
  * minified HTML, CSS, and JS
  * concatenated HTML partials (converted to templates within JS scripts)
  * uglified JS
  * client-side libraries installed and managed via [bower](http://bower.io/)
  * concatenated and minified libraries (Bootstrap, Angular)
  * images (if any) optimized
* scaffolding the front-end app with [Yeoman](http://yeoman.io/) and the [generator-angular](https://github.com/yeoman/generator-angular) generator to stand up a front-end app quickly

With an agenda like that and a only one hour to cover it all in, I'm really glad Shean had my back with a lot of the back-end topics and slide coverage. Another obstacle we overcame was my travel complication, which ended with me camping out with my laptop in a Starbucks in rural, eastern Ohio. I'm sorry the audio was fairly junky, but I hope it was still clear enough to understand and worthy of listening to.

#### References
Shean and I started from a pretty stock looking NSF, with the front-end app residing in the NSF's `WebContent` directory, which serves out the files like any static web asset. The original version [can be found on Bitbucket](https://bitbucket.org/spmcmanus/beerdebt) in a Mercurial (Hg) repository. When I started incorporating some of the task runner components, I switched to [a git repository](https://bitbucket.org/edm00se/beer-debt-mk2), mostly so I could [mirror it to GitHub](https://github.com/edm00se/beer-debt-mk2), where I tend to keep all my demos and session files.

### The Future
I have several projects all coming to a head at about the same time, so hopefully I can get a couple wrapped up so I can blog about them. My day job is keeping me plenty busy as well, so my blogging frequency may be down a bit during the upcoming month or two, but I'll still be here.

### Summary
Again, thank you to those that attended Shean and my session and let's all build better apps! :beers: