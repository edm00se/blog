---
layout: post
type: post
title: "Good News"
description: "and a little retrospective"
category: self-promotion
tags: [scm, git, xpages, ibm, node.js]
modified: 2018-01-23
comments: true
share: true
---

The past year has been great fun. I've had a couple of major changes, including a change in job and beginning to work from home. I've also done a few different projects that I hadn't been involved in before. I'll get to those in a little bit, but first...

<figure>
  <amp-img src="/assets/images/post_images/GoodNewsEveryone.png"
  alt="good news everyone"
  width="480" height="260"
  layout="responsive"></amp-img>
 <figcaption>How about some good news for a change?</figcaption>
</figure>

### Thank You!

I am quite happy to have been named an IBM Champion, returning for the fourth year in a row. I always hope that what I choose to blog about or share in the open source and collaborative spaces is worth something to other people. It's an honor to rejoin my fellow IBM Champions and I'd like to extend a great big welcome to all those newly named!

<!-- insert links to announcements and namings for ICS + Cloud -->

### Projects

#### New Things

As I mentioned, I've gone down the proverbial rabbit-hole on a couple of different projects this past year. As usual, these  If you're interested or want to more about them, let me know. Here are some of the highlights.

- three [npm packages][npm-edm00se] published (of note)
  - [generator-xsp][gen-xsp], a yeoman generator for scaffolding an [XPages][xpages-info] compatible On Disk Project
  - [node-dora][node-dora], a node wrapper for [DORA][dora]
  - [dora-cli][dora-cli], a CLI tool to invoke `node-dora`
- [eleven new repositories on GitHub][edm00se-github-2017]
  - including [an Alexa skill][dev-dog-skill] ([link to skill on Amazon.com][amzn-dev-dog]) and [a companion site][dev-dog-site], which drives the content
- answered [seven questions on StackOverflow][edm00se-stackoverflow]
- blogged nine times

### What Does It All Mean?

I've blogged less than the previous years, that's for certain. I've been trending towards more focused efforts, with more specific blog posts. I've also dabbled at terse (short and relevant) videos, such as with my [Docker Quick Tips][docker-tips-playlist]. I've got a couple of longer efforts in the works, which hopefully will be of use. I'm working on focusing more on cloud offerings, architecture, implementation, and development practices. I was greatly pleased to be named an IBM Champion for Cloud in 2017 in addition to Collaboration Solutions, so I'm looking to keep up that end of things. No matter what happens, it should be a fun ride.

On the side, over the last year, I've also taken up the hobbies of 3D printing, baking, and I finished configuring and setting up my home NAS. All in all, I've been busy, especially with code and other work, just at the expense of writing into the blog. I'll try to catch up on the more interesting things I've been up to, so hopefully others can gain from my experience.

### More Recently

{% include tweet.html id="954467891453284353" %}

Recently, just this past week in fact, I created and launched a "recipe" for [Franz][franz-messenger]. Franz is an [Electron based][electron] application client that wraps around many messenger formats, including WhatsApp, Skype, Slack, and other web services, such as Google Inbox, and more.

Franz version 5, which is in active beta, is pretty stable and has quite an extensible format, which made creating a new "service" type pretty easy. In fact, it was so easy to implement, I added a service "recipe" for [IBM Watson Workspace][ibm-ww] during my lunch break. It's essentially configured as a low complexity [node module][node-module] with some configuration definitions, regarding the live web portal (workspace.ibm.com), and a rather small JS function for an event loop which registers events, such as direct messages or general/chat messages. If you're intrigued, check out the repository.

##### [GitHub: Watson Workspace for Franz][franz-watson-workspace]

Included in the readme are instructions for how to clone the "recipe", until it has been merged into Franz's codebase, which I'll submit after its had some beta testing.

As always, contributions are welcome!

### Until Next Time

Cheers! 🍻


[npm-edm00se]: https://www.npmjs.com/~edm00se
[gen-xsp]: https://www.npmjs.com/package/generator-xsp
[xpages-info]: http://xpages.info
[node-dora]: https://www.npmjs.com/package/node-dora
[dora]: https://github.com/camac/dora
[dora-cli]: https://www.npmjs.com/package/dora-cli
[edm00se-github-2017]: https://github.com/search?p=1&q=user%3Aedm00se+created%3A2017-01-01..2017-12-31&type=Repositories&utf8=%E2%9C%93
[dev-dog-skill]: https://github.com/edm00se/developer-dog-alexa-skill
[dev-dog-site]: https://edm00se.codes/dev-dog/
[amzn-dev-dog]: https://bit.ly/dev-dog-skill
[edm00se-stackoverflow]: https://stackoverflow.com/search?q=user%3A1720082+created%3A2017
[docker-tips-playlist]: https://goo.gl/forms/WkwQLcc7XCaQMPbc2
[franz-messenger]: https://meetfranz.com
[electron]: https://electronjs.org
[ibm-ww]: https://workspace.ibm.com/
[node-module]: https://nodejs.org/api/modules.html#modules_modules
[franz-watson-workspace]: https://github.com/edm00se/franz-recipe-watson-workspace