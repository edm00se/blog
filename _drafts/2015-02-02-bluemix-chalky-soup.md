---
layout: post
type: post
title: "Blue Chalky Soup"
description: "repo now on GitHub, a few Bluemix thoughts"
category: self-promotion
tags: [xpages, domino, ibm, connected, conference, lotussphere, bluemix ]
modified: 2015-02-02
comments: true
share: true
---

### Blue Chalky Soup
This is the code name I gave my boiled down session to keep it more in fitting with IBM's description of a Chalk Talk, I got interesting with things. Specifically a reveal.js mini presentation (mostly so I could give people further reading or references and resources), served by a Node.js/Express app, with live updating presenter controlled slide state, triggered via a web socket. I am clearing my queue, as it were, so here is [a link to the repository with my code base on GitHub](//github.com/edm00se/BlueChalkySoup).

Note: the basic authentication represented in the code and in the ReadMe.md is not what is in my Bluemix deployed version of the app. There's a reason for that, one which I'll outline further down. What this repo does do is provide the code base so that if someone else wanted to implement it, they wouldn't need to go through the same hackery I did, to get the right combination of elements to work (EJS, slide state push by web socket instead of event, and current versions of npm packages).

If you're not interested in learning about my Bluemix experiences, then you can feel free to stop reading now. TLDR; I like what Bluemix does and can(/will) do, but there may be a way to make things easier for customer adoption, from the developer's perspective. For more on this, just scroll to the end of the post.

### Some Bluemix Thoughts
I deployed [my nifty one-off app to Bluemix](//bit.ly/BlueChalkySoup). I've done the same in the past with a digital version of my resume on [heroku](//heroku.com) and a simple (but custom) feed reading app on a node instance (which presents the full HTML content from RSS or Atom feeds, in a Bootstrap 3 layout, with app caching for minimal load while reading from a mobile device), hosted on [OpenShift](//www.openshift.com/); strangely enough, I've not dabbled with [AWS Elastic Beanstalk](//aws.amazon.com/elasticbeanstalk/). These two apps, while somewhat trivial, let me play with the (at the time) only two major PaaS solutions I had seen as easily accessible to developers, and capable of scaling in demand to meet business needs. This was before Bluemix came about (initial release was the end of June 2014), so when given the opportunity to deploy something to it, I was happy to do so and try out the platform, even if in a limited capacity.

##### Bluemix Runtimes
The available run times are pretty comparable to the competitors, with notable exception (from my perspective) being the upcoming XPages build pack (.xsp run time and Domino Data Service, both of which are very exciting for very obvious reasons to any Domino/XPage developer). I'm sure I'll post again once I've had my first taste of deploying an XPages app to Bluemix, and I can't wait to do it.

<blockquote class="twitter-tweet" lang="en"><p><a href="http://t.co/8g5RDwyzSu">pic.twitter.com/8g5RDwyzSu</a></p>&mdash; Mark Roden (@MarkyRoden) <a href="https://twitter.com/MarkyRoden/status/559799570775830529">January 26, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

For a more thorough look at run times and service, by all means check out something like [paasify.it](//www.paasify.it), which gives a good look at the run time environments and services offered by each PaaS they list. Be forewarned, I feld that the Bluemix information was either a little outdated or that it just didn't map well to the model of information listed (each PaaS has different units of measure, like gears, workers, or RAM and instances, for example). If there's an IBMer in the crowd, paasif.it says they welcome [pull requests on their GitHub repo](//github.com/stefan-kolb/paas-profiles/tree/master/profiles) to the pertaining <PaaSname>.json file under /profiles; in the case of a need to update information.

##### Bluemix Dashboard
I was happy to see a number of things in my Bluemix account's dashboard. Specifically, when working with heroku and OpenShift, I found their terminologies of "gears" and "workers" more confusing than not. A developer can look up the definition and equate it to something in their head, but with Bluemix, you look at your dashboard and you can see how much RAM each instance uses and how many instances you will allow it to scale to, out of your max allotment. These are terms that those who don't understand the cloud can grasp, and makes it easier on my part as a developer to sell my management to the platform. Chalk that one up in the success column.

##### Bluemix Use of Cloud Foundry CLI
Both of the other two PaaS services I've tried and used include a command line tool for managing your cloud deployment and deployed app management; in addition to the web interfaces they provide with some of these tools. The power given by Bluemix's use of the Cloud Foundry CLI tool is impressively easy to use by any developer. With heroku, there's the heroku toolbelt, and with OpenShift, there's the rhc tool. As a comparison, it's probably on-par for ease of use, but maybe it's my being more accustomed to these PaaS CLI tools, but I found my use of the CF CLI was a very quick learning curve, with minimal fuss.

##### Getting Started With Your App
The Cloud Foundry CLI isn't the only way to deploy to Bluemix. You can also use a plugin for Eclipse (I saw a version demonstrated with the Domino/XPages on Bluemix session in DDE!) or automate the deployment via a git repository through IBM DevOps. There's a solution for every need here. The only upside to the CF CLI tool is that it is agnostic to the git branch you are on, so you can take your current, working set and just push the files (which it bundles into a droplet) to Bluemix's servers.

##### Integration With DevOps
One handy feature is the ability to connect from DevOps. This means you can push your changes to DevOps via the master branch of a git repository that can trigger a build on Bluemix. This integrates services across IBM's spectrum of cloud solutions and was pretty easy to use. I tested it, even though I had to re-add my files to the git repo for DevOps as it semi-forced me to take a starter app when I initialized the repo, as the Bluemix app was created first; which seems to be out of their preferred sequence. In other words, if you're going to use DevOps, start things from there and tell it to enable Bluemix deployment.

<a href="{{ site.url }}/images/post_images/bluemix_thoughts/DevOpsSettingsEnableBluemix.png" data-toggle="tooltip" title="Settings > Options > Enable Bluemix"><img src="{{ site.url }}/images/post_images/bluemix_thoughts/DevOpsSettingsEnableBluemix.png" class="img-responsive center-block" /></a>

##### Bluemix's Trial Account Comparison
So earlier I 