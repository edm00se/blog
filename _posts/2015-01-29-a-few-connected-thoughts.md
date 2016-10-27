---
layout: post
type: post
title: "A Few ConnectED Thoughts"
description: "IBM ConnectED 2015"
category: xpages
tags: [xpages, domino, ibm, conference, lotussphere, bluemix ]
modified: 2015-01-29
comments: true
share: true
---

### IBM ConnectED 2015
Also known in some circles as "LotusSphere 15", the 2015 IBM ConnectED conference has now come to an official close. This was my first Connect-usSphere and, making things more interesting, I was named an IBM Champion for 2015 about the time when I knew I would be a speaker (even if it was _just_ a Chalk Talk). I wasn't sure what to make of the conference when I arrived, but I must say, I'm glad for attending some great sessions and meeting up with many great developers in the community (some of whom I had met before, others I had only interacted with in a digital capacity).

### Trending Themes
As I noted as the theme (that I took away) [from MWLUG 2014](/xpages/community-code-and-evolution/), there's a significant community effort in "upping our game". While I can't say that this is a unique concept, the execution in the various aspects of application development have been rather excellent and traverse the entire application stack. This is why my <s>session</s> Chalk Talk (see below) was on exactly these concepts:

* improve your server/business logic ([M-V-C](/xpages/unraveling-the-mvc-mysteries/) or at least a Controller-focused, "M-V-C light")
* Java for performance/format/stack-completeness/documentation/better code editing/etc. is taken as the norm
* implementing a responsive UI is a standard to hold to (especially [Bootstrap](//getbootstrap.com), which has grown in popularity in the web app and XPages spaces)
* client-side JS frameworks (like [AngularJS](//angularjs.org)) have been proven to automate what's in the browser

Ultimately, I would say that 2014 was a great year as an XPager and 2015 looks to be off to a great start. What's coming from the Extension Library, in the [OpenNTF Domino API](//openntf.org/main.nsf/project.xsp?r=project/OpenNTF%20Domino%20API) (and other fine OpenNTF projects), and the adoption of the XPages Build Pack and runtime (+Domino Data Service) for Bluemix all mean great and powerful things for us as developers.

### Sessions of Noteworthiness
[Note: I'm linking to the session descriptions on [beyondtheeveryday.com](//beyondtheeveryday.com), in which the controller logic is apparently reverting the direct session links back to the all sessions view. I recommend using the search to find the session, or logging into the IBM Event Connect portal and viewing them there, where you can grab the PDF slide decks.]

* [XPages Performance and Scalability](//beyondtheeveryday.com/#/sessions/68839ACEB9BB2918C1257DD3003B5A3C)<br />
Excellent advise on tuning for performance and scalability of XPages applications.
* [IBM Domino Applications on Cloud](//beyondtheeveryday.com/#/sessions/B5BF997770B0137DC1257DD3003B5A42)<br />
The first of several sessions which fit in with IBM's cloud strategy, covering considerations for the shift in deployment.
* [IBM Domino Applications on Bluemix](//beyondtheeveryday.com/#/sessions/2B9099E8A6D5C465C1257DD3003B53A3)<br />
The session <a href="//www.youtube.com/v/iLi2xB82ZyI?start=233&end=262" data-toggle="tooltip" title="W-O-R-D news report on 'literally'">literally</a> blew me away. My passion in development has been to try to bring together business web app development (which isn't always as flexible as other platforms, mostly due to the necessity for backwards support) and more "modern" web development, which is usually on the faster side of the curve, in adopting newer technologies and feature sets. This session did both for me; Bluemix is here to be at the head of the industry and the XPages team is doing its best to bring that to us and our users. There are bound to be many changes over the coming year with the outlined road map by the IBM XPages team and I'm very excited to see what they bring us.
* [The Future of Web Development: Write Once, Run Everywhere with AngularJS and Domino](//beyondtheeveryday.com/#/sessions/7DF68F606C52B584C1257DD3003B55E6)<br />
Epitomizing my want to automate as much in the browser as possible, [Marky Roden](//twitter.com/MarkyRoden) and [Mark Leusink](//twitter.com/markleusink) (part of the power behind the [Bootcards project](//bootcards.org/)) gave a great presentation on using [AngularJS](//angularjs.org/) with a Domino database. This session is why I positioned the portion of my Chalk Talk on client-side frameworks last, as I knew these two would give a bang up presentation on the subject, and they did not disappoint. There was so much interest and attendance that they even gave a repeat session after the first.
* [Bring Your Application to the Next Level with Open Source Software from OpenNTF](//beyondtheeveryday.com/#/sessions/1627AFE7619567B6C1257DD3003B563A)<br />
OpenNTF is known for bringing in projects that benefit the developer. There are many projects which make life easier, such as [Bootstrap4XPages](//openntf.org/main.nsf/project.xsp?r=project/Bootstrap4XPages), [POI4XPages](//openntf.org/main.nsf/project.xsp?r=project/POI%204%20XPages), and the [OpenNTF Domino API](//openntf.org/main.nsf/project.xsp?r=project/OpenNTF%20Domino%20API). I just wish my Chalk Talk hadn't competed with it.
* [Take Your XPages Development to the Next Level](//beyondtheeveryday.com/#/sessions/B905D1464EFE253DC1257DD3003B5461)<br />
Great advise, some I knew of, and some which was new to me; [Brad Balassaitis](//twitter.com/Balassaitis) and [Paul Calhoun](//twitter.com/ptcalhoun) always have some interesting insights into application improvement.
* [Yes! You Can Use Those Cool New Frameworks in Your Mobile Domino Apps](//beyondtheeveryday.com/#/sessions/9622BE9308AC81FEC1257DD3003B55DB)<br />
Front-end libraries and frameworks make our lives easier in developing polished and well performing applications. If you needed to know how to use them in XPages, this was a good session to be in.
* [Nerd Girls Spark Ideas - Meeting Challenges](//beyondtheeveryday.com/#/sessions/FEF4C1BD8D3E37A8C1257DD3003B5AB4)<br />
I wasn't sure what to expect from this session, but walked away glad I went. There were several interesting stories given by the speakers, some on the more ordinary side (with excellent observations and lessons learned) to the more unique stories, each gave some good insight into meeting the challenges that life brings us.
* [1 App, 2 Developers, 3 Servers: Getting the Same Application to Run on Different Servers](//beyondtheeveryday.com/#/sessions/15C1426CF468ECFBC1257DD3003B560A)<br />
Another session which didn't disappoint showed how a properly structured application can work across multiple server stacks. In fact, [porting your app](//www.youtube.com/watch?v=h_8wY0FD1ZI) was shown to be easy (obviously non-trivial, but very achievable), it just takes the right structuring of your app.
* [OpenNTF Domino API: The Community API](//beyondtheeveryday.com/#/sessions/E40FF55DAAEFB3DDC1257DD3003B564B)<br />
OpenNTF again?! Arguably the most important important project (I said arguably!) on OpenNTF, it's certainly the most structural to changing how we interact with the Notes/Domino API. Gone are the days of needing to _recycle_ every Notes/Domino object, but did you <span data-toggle="tooltip" title="thanks @NTF for letting me hijack your speed geeking into a code demo">know about Graph DBs</span>? I'm excited to try this auto-magical full-server graph db access that was described; if I'm lucky, it'll walk my dog for me too (I'll submit a pull request).
* [IBM Domino Application Development](//beyondtheeveryday.com/#/sessions/F875C078E6EEE8B3C1257DD3003B5674)<br />
A great Chalk Talk, with many of the IBM who's-who of XPages development. It started with Q&A, with both great questions and great answers. It could easily have been a full hour (though it may have been due to interest). Great hearing from those involved every bit as I was glad to hear some of the questions I wasn't certain I could ask eloquently (and a couple I did ask, non-eloquently) offered and replied to. Ultimately, as great a year as 2014 was for us, I'm super excited for 2015.
* [From XPages Hero to OSGi Guru: Taking the Scary out of Building Extension Libraries](//beyondtheeveryday.com/#/sessions/FA8B3980697F36EAC1257DD3003B546F)<br />
It's no secret I've been avoiding OSGi plugin development and deployment to my server(s). After seeing the job done in an excellent example, I can _also_ say that I am now planning the first couple of use cases for my company, as the process (while a little bit of an ordeal) has been laid out and demonstrated very well by [Paul Withers](//twitter.com/PaulSWithers) and [Christian Güdemann](//twitter.com/guedeWebGate).
* [Responsive Application Development for XPages](//beyondtheeveryday.com/#/sessions/5BEB54CF89B5A338C1257DD3003B53EF)<br />
Recently brought into the Extension Library (Nov. 2014), Bootstrap (and it's ride-along jQuery) is now a part of XPages. Bootstrap helps to accomplish a great deal in layout and design automation and if you don't love it, you _ought_ to love _some_ CSS framework. Bootstrap is here to stay though, so you might as well learn it.

As you can see, there are many sessions which have great appeal to developers and play to the relevent and dev community trending themes I mentioned above. There were two time blocks in which I didn't find much of interest/relevence to myself, for where my development skill level is. That being said, I was very glad to find myself in some great sessions and discussions with both non-IBM developers and IBMers. I can see why people like LotusSphere.

### Community
As with my previous experiences with Lotus/Domino/XPages conferences, the development community strikes me as strong and closely knit. This is evidenced by the passion, effort, level of sharing, and consumption of :beers: beer that was ascribed to by all in attendance (IBMers, Business Partners, and Customers). I wouldn't have it any other way and I look forward to our next meeting, as ConnectED/LotusSphere or somewhere or something else.


### Aside: My Chalk Talk
As you can tell from above, I'm very excited about these topics. You can also tell that I was hoping to provide an awesome demo db which, <span data-toggle="tooltip" title="it worked out fine and had some great discussion">[for better or for worse](/self-promotion/a-chalk-talk-talk/)</span>, was put on hold until after ConnectED. Over the next couple months I'll be finishing the demo app, but while that's ongoing, I'll be posting a few things which my demo app relies on and directly relate to some of what was asked about during my Chalk Talk. So while I wasn't sure I was happy about my session being a Chalk Talk, I can _absolutely_ say, I was very glad for the discussions we did have, _very_ happy for the turn out (especially at 7am EST) we had (they had to bring more chairs into <s>my closet</s> Parrot 2!), and still a bit humbled that IBM and other developers saw fit to let me talk in any capacity, on a topic I hold near and dear to me. We were victims of our own successful discussion, as we went long in the first two parts and we had to cut short our talks on client-side frameworks (I knew Marky Roden and Mark Leusink were going to be covering AngularJS a great deal, which is why the JS frameworks were last) and we still went over on time.

Being a developer often includes a bit of a rebellious nature. So while we had a great Chalk Talk (full of some lead-in by myself on each of the three main topics) with excellent and on-point discussion from virtually the entire room, I still felt the need to <s>show off</s> present in a fashion that _could_ have been akin to a full session... and provide my attendees with many links and resouces relating directly to what I was talking about. Let's face it, you can't just drop a bunch of opinionated interpretations on M-V-C, UI, and client frameworks on people without having something to back yourself up. As such, for those attending, I included a friendly QR code (and [bit.ly link](//bit.ly/BlueChalkySoup)) via which they could connect to and view my "slides" (non-primary AV, _supporting material only_) and have their mobile (or laptop) browsers updated to the one I was on, via a web socket from a Node.js instance running in Bluemix.


<figure>
  <amp-img src="{{ site.url }}/assets/images/post_images/BlueChalkySoup.png"
  alt="Chalk Talk Soup: hosted on Bluemix"
  layout="fixed"
  width="256" height="320"></amp-img>
 <figcaption><a href="https://bit.ly/BlueChalkySoup">Chalk Talk Soup: hosted on Bluemix</a></figcaption>
</figure>

I felt this was good enough to alter my session to Chalk Talk standards, not use room AV (a requirement reiterated by IBM before ConnectED), and still provide a greater amount of resources to the Chalk Talk. In other words, I don't like being told I _can't_ do something :-D.

##### The Reveal.js Stack
I used reveal.js for that "presentation", on top of a Node.js/Express app that I hacked together from about three different interpretations (one was straight Node.js, I prefer Express, one updated the change event, but didn't push the partial URL state for concurrency, one was so old it wasn't easily updated to the current npm package versions) that came together the night before I flew out. If you're interested in what reveal.js is, how I assembled things, how easy it was to deploy to Bluemix (very), or just want to view the code (I'll chuck it into a GitHub repository soon, it just needs a little cleaning up), let me know in the comments.
