---
layout: post
type: post
title: "Using Node to Connect to an IBM i or an NSF"
description: "why do one when you can do both?"
category: node
tags: [node, express, iseries, jdbc, jt400, notes, domino, nsf]
modified: 2016-04-15
comments: true
share: true
---

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

### Intro
I've recently had two things happen, both of which are rather related and different in use. The first started when I stumbled across [a long forgotten Facebook message (in the category of Facebook thought I didn't want to see it)](http://www.usatoday.com/story/tech/news/2016/04/07/read-your-secret-messages-on-facebook/82747624/) regarding a comment I had made on [a developerWorks article](https://www.ibm.com/developerworks/community/blogs/pd/entry/using_ibm_db2_from_node_js4?lang=en), stemming from a micro-service I had written, to stand up a Node instance so I could consume data from our IBM i (iSeries/AS400) in a more RESTful/REST-like JSON API capacity.

The funny thing about the developerWorks article was that it eventually was refactored/updated to get around a dependency of a data server driver, which apparently is freely available for DB2 on other platforms than the IBM i (the strange things I had to learn at the time). In the end, I switched to using a jdbc package from npm, specifically the one titled 'jdbc' (at version 0.0.15), which since has undergone significant changes in their API format, meaning that I'm going to show a version with updated specifics using the 'jdbc-pro' package from npm.

The second was from something I learned of in the `#dominonodejs` channel of the OpenNTF Slack chat ([click here to join](http://openntfslackin.mybluemix.net/)). Specifically, I was made aware of an early release of an npm package called [domino-nsf](https://www.npmjs.com/package/domino-nsf) by [Nils Tarjei Hjelme](https://medium.com/@nthjelme); here's the corresponding [GitHub source](https://github.com/nthjelme/nodejs-domino). Not being the patient sort, I apparently felt it could use an expanded example, in the form of an Express app. Here's the thing though, when you create well structured app, the abstraction of the data service becomes minimally differently. I'll attempt to illustrate that over the remainder of this post.

### Lead Into Node and Express
Structurally speaking, both versions are the same app, just with different data services plugged into them. At a high level, the common parts are:

* `/server.js` - contains the main definition of the server, creates the app as an Express app, and pulls in the `routes` module (Node is generally pretty big on the [module design pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript))
* the `routes`  module, which since the `require` pulls it in by directory, it grabs the `/routes/index.js` first, which then pulls in the `views.js` and `docs.js` files, establishing the route information for those collections (and inevitably more beyond this example)
* each of those endpoint definition files perform the data service operations via functions defined in the `util` module (this is where I copied in a version of the `domino.getViewAsync` and `domino.getDocumentAsync` functions, wrapped up and exported again as a module)
* the `util` module and `server.js` make use of some app config, which is defined in the `config` module, which also allows for a couple of environment variables

Here's a project tree breakdown, minus the `node_modules` folder, ReadMe, etc.:

```bash
express-domino-nsf
├── config
│   └── index.js
├── package.json
├── public
│   └── readme.html
├── routes
│   ├── docs.js
│   ├── index.js
│   └── views.js
├── server.js
└── util
    └── index.js

4 directories, 8 files
```

### Base App Layout
asdf

### Specifics With IBM i and JT400
asdf

### Specifics With `domino-nsf` and Notes/Domino NSF
asdf

### Summary
asdf