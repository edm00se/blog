---
layout: post
type: post
title: "XPages Comes to Bluemix"
description: "901v00_13 is the ExtLib we've been looking for"
category: bluemix
tags: [xpages, domino, ibm, bluemix ]
modified: 2015-07-10
comments: true
share: true
---

<figure>
  <amp-img src="{{ site.url }}/assets/images/post_images/lookSirDroids.jpg"
  alt="the droids I've been looking for"
  height="240" width="320"
  layout="responsive"></amp-img>
 <figcaption>the droids I've been looking for</figcaption>
</figure>

### Intro
It's here! Ten days into the first month of the 2nd half of 2015, IBM's XPages runtime (and XPages NoSQL DB service) are live in 'beta'/experimental. Does that mean it will change? Absolutely. I also, absolutely, believe that's a good thing, as how the runtime grows and adapts to meet the needs of its user/developer base will only help strengthen it, with the right amount of user/developer feedback. So, I find myself with nearly no free time wondering how soon I can start creating an interesting app for deployment to Bluemix.

### Why Do I Care?
As [I alluded to in my last post on Bluemix]({{ site.url }}/bluemix/bluemix-chalky-soup/#some-bluemix-thoughts), Bluemix is a game changer, for Notes/XPages developers, as the deployment mechanisms, environment, and scalability are far more flexible and in line with the rest of the web app dev community, when it comes to PaaS. We also gain access to other Database formats directly from the XPages runtime, [as Niklas Heidloff has blogged about](//heidloff.net/nh/home.nsf/article.xsp?id=07.07.2015124933NHEEQ3.htm), in addition to having access to other runtimes being able to work with our existing Domino data, once replicated into the Bluemix, XPages NoSQL Database. The permutations give us the best of Domino data (existing or new) and cloud runtime options of XPages or many others.

##### Side Note
Bluemix isn't a magic bullet. It won't write my apps for me or somehow make any app structured or written poorly perform auto-magically better. It gives us a considerable amount of more options and brings us in line with IBM's cloud solutions. I like that, since IBM's focusing on this thing called "cloud" more and more; it means we're not being left behind, but rather kept at the forefront of their efforts.

### XPages Extension Library
Version 901v00_13.20150611-0803 was released today, the 10th of July, 2015. This brings in the required tooling for Bluemix deployment directly from DDE and coincides with the launch of the public, experimental, XPages runtime and XPages NoSQL Database service on Bluemix.

### What's to Come?
Plenty more, it would seem. This is just the initial launch and brings in line some of the best of what's to offer from IBM's existing, enterprise application and collaboration offerings with their flagship cloud solutions. Needless to say, I'm excited. This brings in only more excellent possibilities and opens the door for many things to come.

{% include tweet.html id="619506133452103680" %}

The XPages runtime is considered "experimental", it's not 'alpha' but it's not 'beta'. I still managed to throw together some Pratt Keeping for Bluemix though.

<figure>
  <amp-img src="{{ site.url }}/assets/images/post_images/XPagesOnBluemix_PrattKeeping.png"
  alt="you're my boy Blue!"
  width="1280" height="632"
  layout="responsive"></amp-img>
 <figcaption>you're my boy Blue!</figcaption>
</figure>

### A Quick Plug
For those with an interest in XPages use on Bluemix, I recommend attending the webinar, "An introduction to creating Domino Applications in the Bluemix Environment" on

{% include tweet.html id="618965778013011968" %}

### Links

* Bluemix start documentation on [Building apps with the IBM XPages for Bluemix runtime (Experimental)](//www.ng.bluemix.net/docs/starters/xpages/index.html)
* Bluemix catalog entry for [the XPages Web Starter](//console.ng.bluemix.net/catalog/xpages-web-starter/)
* Bluemix catalog entry for [the XPages runtime](//console.ng.bluemix.net/catalog/ibm-xpages/)
* Bluemix catalog entry for [the XPages NoSQL Database](//console.ng.bluemix.net/catalog/ibm-xpages-nosql-database/)
* YouTube recording of the Teamstudio+TLCC Webinar on [App.Next - The Future of Domino Application Development](//www.youtube.com/watch?v=ntVFNjKnljE)
* Any number of demonstrations of XPages on Bluemix, like [one from Niklas Heidloff](//heidloff.net/nh/home.nsf/article.xsp?id=26.01.2015175730NHEMVZ.htm)
* the slide deck from [ConnectED 2015: IBM Domino Applications in Bluemix](//www.slideshare.net/MartinDonnelly1/connected2015-domino-apps-for-bluemix)
* or Ryan J Baxter's early preview of [Using Your Domino Data In Apps Deployed To Bluemix](//ryanjbaxter.com/2014/09/22/using-your-domino-data-in-apps-deployed-to-bluemix/)
* as usual, the "all things Bluemix" aggregator, [Bluemix.info](//bluemix.info/)
