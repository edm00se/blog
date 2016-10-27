---
layout: post
type: post
title: "The Road Goes Ever On and On"
description: "a quick recap of the servlet series and projections on what's to come"
category: self-promotion
series: servlet-series
tags: [xpages, domino, javascript, servlet, angularjs]
modified: 2015-06-22
comments: true
share: true
---

{% include series.html %}

### The Road Ahead
This past week saw the completion of a series born of a couple <span data-toggle="tooltip" title="including at my Chalk Talk!">discussions at IBM ConnectED</span> at the end of January, combined with my musings on application structure and realizations from having been working on a couple large XPages applications since <span data-toggle="tooltip" title="or the platform's adoption of me?">my first adoption of the platform</span> over three and a half years ago.

### The Series
My series is imperfect and doesn't cover ideal ways of rolling an HttpServlet, but it does show the concept and the ability to do so within an NSF with <span data-toggle="tooltip" title="some, as little as I could make it">minimal external server configuration</span>. I'm excited for [Toby Samples to follow up to his first post on getting JAX-RS](//tobysamples.wordpress.com/2015/04/28/jax-rs-or-the-way-to-do-rest-in-domino-part-1/) up and running on Domino, as it accomplishes considerably more in the realm of automation of endpoint definition, documentation, and some of the hurdles involved with my ridiculously vanilla, NSF only based approach.

This isn't a bad thing. When I started my series, only a couple proof of concept examples were out there on using a straight _[javax.servlet.http.HttpServlet](//docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServlet.html)_, or geared towards OSGi plugins. These are great topics, but I wanted something self-contained and more approachable to those who aren't as versed in OSGi plugin deployment. OSGi plugins have great power, I'm just not as experienced with them yet and nowhere near comfortable blogging about it.. yet. Tomorrow is always a new day :grinning:.

### Adventure Is Out There!
I forced myself to blog about the subject and hold as few assumptions as possible. When it came to my preference to GSON, I also included a version using the IBM commons library. This sets up a considerable amount more of what I would like to build on. I also wanted to get the conversation away from "how do I start", to something more constructive, like "what's the best way to do this?" I think I've accomplished establishing a small base of reference from which we can all build off of. That's what I set out to do.

##### But Eric, You Didn't Cover ...XYZ!
My AngularJS (side of my) app effectively became a shotgun of a delivery. I was tired of talking about theory, but lots of people have covered AngularJS principles, foundations, and more; so I hit on the key points and just figured you were along for the ride :wink:. Several of those people are in the XPages development community and there are _many_ outside who develop AngularJS <span data-toggle="tooltip" title="Node.js, ASP .NET, ColdFusion, etc. ad nauseum">with &lt;insert back-end&gt; for their RESTful API</span>. That's the beauty of this approach, you can use all kinds of universal resources to learn, as it's industry-norm and not specific to our application platform.

So no, I didn't cover everything explicitly, but to read up on how and why my AngularJS code is how it is, just check out some [AngularJS fundamentals in 60-ish minutes](//www.youtube.com/watch?v=i9MHigUZKEM) and then on [using ui-router](//egghead.io/lessons/angularjs-introduction-ui-router). Seriously, if you can walk yourself through an AngularJS app and [ui-router](//github.com/angular-ui/ui-router) principles, you're good to go. I didn't do much in my demo app far out of the "reading level" of most AngularJS examples and it was a good demonstration of standardization of application structure in the front-end.

### Let's Take a Walk
You never know what you'll find when you step out of your usual norms. Without stressing ourselves out of our comfort zones, we don't always find what we're capable of. I'm still a developer learning many things, I'm just lucky to count myself in the company of those who have a similar thirst for knowledge and willingness to share their triumphs and tribulations.

<div class="center">
	<amp-youtube
    data-videoid="dE-vX9eU7hw"
    layout="responsive"
    width="560" height="315"></amp-youtube>
</div>
