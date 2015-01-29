---
layout: post
type: post
title: "A Few ConnectED Thoughts"
description: "IBM ConnectED 2015"
category: xpages
tags: [xpages, domino, ibm, conference, lotussphere, bluemix ]
modified: 2015-01-28
comments: true
share: true
---

### IBM ConnectED 2015
Also known in some circles as "LotusSphere 15", the 2015 IBM ConnectED conference has now come to an official close. This was my first Connect-usSphere and, making things more interesting, I was named an IBM Champion for 2015 about the time when I knew I would be a speaker (even if it was _just_ a Chalk Talk). I wasn't sure what to make of the conference when I arrived, but I must say, I'm glad for attending some great sessions and meeting up with many great developers in the community (some of whom I had met before, others I had only interacted with in a digital capacity).

### Trending Themes
As I noted as the theme (that I took away) [from MWLUG 2014](/xpages/community-code-and-evolution/), there's a significant community effort in "upping our game". While I can't say that this is a unique concept, the execution in the various aspects of application development have been rather excellent and traverse the entire application stack. This is why my ~~session~~ Chalk Talk (see below) was on exactly these concepts:

* improve your server/business logic (M-V-C or at least a Controller-focused, "M-V-C light")
* Java for performance/format/stack-completeness/documentation/better code editing/etc. is taken as the norm
* implementing a responsive UI is a standard to hold to (especially Bootstrap, which has grown in popularity in the web app and XPages spaces)
* client-side JS frameworks (like AngularJS) have been proven to automate what's in the browser

Ultimately, I would say that 2014 was a great year as an XPager and 2015 looks to be off to a great start. What's coming from the Extension Library, in the OpenNTF Domino API (and other fine OpenNTF projects), and the adoption of the XPages Build Pack and runtime (+Domino Data Service) for Bluemix all mean great and powerful things for us as developers.

### Sessions of Note Worthiness
* [XPages Performance and Scalability](//beyondtheeveryday.com/#/sessions/68839ACEB9BB2918C1257DD3003B5A3C)
* [IBM Domino Applications on Cloud](//beyondtheeveryday.com/#/sessions/B5BF997770B0137DC1257DD3003B5A42)
* [IBM Dominon Applications on Bluemix](//beyondtheeveryday.com/#/sessions/2B9099E8A6D5C465C1257DD3003B53A3)
* [The Future of Web Development: Write Once, Run Everywhere with AngularJS and Domino](//beyondtheeveryday.com/#/sessions/7DF68F606C52B584C1257DD3003B55E6)
* [Bring Your Application to the Next Level with Open Source Software from OpenNTF](//beyondtheeveryday.com/#/sessions/1627AFE7619567B6C1257DD3003B563A)
* [Take Your XPages Development to the Next Leve](//beyondtheeveryday.com/#/sessions/B905D1464EFE253DC1257DD3003B5461)
* [Yes! You Can Use Those Cool New Frameworks in Your Mobile Domino Apps](//beyondtheeveryday.com/#/sessions/9622BE9308AC81FEC1257DD3003B55DB)
* [Nerd Girls Spark Ideas - Meeting Challenges](//beyondtheeveryday.com/#/sessions/FEF4C1BD8D3E37A8C1257DD3003B5AB4)
* [1 App, 2 Developers, 3 Servers: Getting the Same Application to Run on Different Servers](//beyondtheeveryday.com/#/sessions/15C1426CF468ECFBC1257DD3003B560A)
* [OpenNTF Domino API: The Community API](//beyondtheeveryday.com/#/sessions/E40FF55DAAEFB3DDC1257DD3003B564B)
* [IBM Domino Application Development](//beyondtheeveryday.com/#/sessions/F875C078E6EEE8B3C1257DD3003B5674)
* [From XPages Hero to OSGi Guru: Taking the Scary out of Building Extension Libraries](//beyondtheeveryday.com/#/sessions/FA8B3980697F36EAC1257DD3003B546F)
* [Responsive Application Development for XPages](//beyondtheeveryday.com/#/sessions/5BEB54CF89B5A338C1257DD3003B53EF)

As you can see, there are many sessions which have great appeal to developers and play to the relevent and dev community trending themes I mentioned above. There were two time blocks in which I didn't find much of interest/relevence to myself, for where my development skill level is. That being said, I was very glad to find myself in some great sessions and discussions with both non-IBM developers and IBMers. I can see why people like LotusSphere.


### Aside: My Chalk Talk
As you can tell from above, I'm very excited about these topics. You can also tell that I was hoping to provide an awesome demo db which, [for better or for worse](/self-promotion/a-chalk-talk-talk/), was put on hold until after ConnectED. Over the next couple months I'll be finishing the demo app, but while that's ongoing, I'll be posting a few things which my demo app relies on and directly relate to some of what was asked about during my Chalk Talk. So while I wasn't sure I was happy about my session being a Chalk Talk, I can _absolutely_ say, I was very glad for the discussions we did have, _very_ happy for the turn out (especially at 7am EST) we had (they had to bring more chairs into ~~my closet~~ Parrot 2!), and still a bit humbled that IBM and other developers saw fit to let me talk in any capacity, on a topic I hold near and dear to me. We were victims of our own successful discussion, as we went long in the first two parts and we had to cut short our talks on client-side frameworks (I knew Marky Roden and Mark Leusink were going to be covering AngularJS a great deal, which is why the JS frameworks were last) and we still went over on time.

Being a developer often includes a bit of a rebellious nature. So while we had a great Chalk Talk (full of some lead-in by myself on each of the three main topics) with excellent and on-point discussion from virtually the entire room, I still felt the need to ~~show off~~ present in a fashion that _could_ have been akin to a full session... and provide my attendees with many links and resouces relating directly to what I was talking about. Let's face it, you can't just drop a bunch of opinionated interpretations on M-V-C, UI, and client frameworks on people without having something to back yourself up. As such, for those attending, I included a friendly QR code (and [bit.ly link](//bit.ly/BlueChalkySoup)) via which they could connect to and view my "slides" (non-primary AV, _supporting material only_) and have their mobile (or laptop) browsers updated to the one I was on, via a web socket from a Node.js instance running in Bluemix.

<a href="//bit.ly/BlueChalkySoup" data-toggle="tooltip" title="Chalk Talk Soup: hosted on Bluemix"><img class="img-responsive center-block" src="{{ site.url }}/images/post_images/BlueChalkySoup.png" /></a>

I felt this was good enough to alter my session to Chalk Talk standards, not use room AV (a requirement reiterated by IBM before ConnectED), and still provide a greater amount of resources to the Chalk Talk. In other words, I don't like being told I _can't_ do something :-D.

##### The Reveal.js Stack
I used reveal.js for that "presentation", on top of a Node.js/Express app that I hacked together from about three different interpretations (one was straight Node.js, I prefer Express, one updated the change event, but didn't push the partial URL state for concurrency, one was so old it wasn't easily updated to the current npm package versions) that came together the night before I flew out. If you're interested in what reveal.js is, how I assembled things, how easy it was to deploy to Bluemix (very), or just want to view the code (I'll chuck it into a GitHub repository soon, it just needs a little cleaning up), let me know in the comments.