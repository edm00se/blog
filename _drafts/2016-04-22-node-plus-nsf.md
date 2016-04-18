---
layout: post
type: post
title: "Using Node to Connect to a Notes/Domino NSF"
description: "since we're doing things the Node way, might as well get Domino in on the fun"
category: node
series: node-express-iseries-nsf
tags: [node, express, iseries, jdbc, jt400, notes, domino, nsf]
modified: 2016-04-22
comments: true
share: true
---

{% include series.html %}

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
...the second was from something I learned of in the `#dominonodejs` channel of the OpenNTF Slack chat ([click here to join](http://openntfslackin.mybluemix.net/)). Specifically, I was made aware of an early release of an npm package called [domino-nsf](https://www.npmjs.com/package/domino-nsf) by [Nils Tarjei Hjelme](https://medium.com/@nthjelme); here's the corresponding [GitHub source](https://github.com/nthjelme/nodejs-domino). Not being the patient sort, I apparently felt it could use an expanded example, in the form of an Express app. Here's the thing though, when you create well structured app, the abstraction of the data service becomes minimally differently.

### Specifics With `domino-nsf` and Notes/Domino NSF
asdf

##### routes/views/js
{% gist ef66a551a04cae3378b42215f3449f03 routes_views.js %}<br />

##### routes/docs/js
{% gist ef66a551a04cae3378b42215f3449f03 routes_docs.js %}

#### Config
asdf

#### Use
asdf

### Summary
asdf