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
I'm back, with the third in my 3-part series on connecting to "almost anything". First, we created a base application, from which nearly any db connection could be made and routes established to be handled through 

...the second was from something I learned of in the `#dominonodejs` channel of the OpenNTF Slack chat ([click here to join](http://openntfslackin.mybluemix.net/)). Specifically, I was made aware of an early release of an npm package called [domino-nsf](https://www.npmjs.com/package/domino-nsf) by [Nils Tarjei Hjelme](https://medium.com/@nthjelme); here's the corresponding [GitHub source](https://github.com/nthjelme/nodejs-domino). Not being the patient sort, I apparently felt it could use an expanded example, in the form of an Express app. Here's the thing though, when you create well structured app, the abstraction of the data service becomes minimally differently.

### Before We Get Started, A Reminder About App Structure
This is a pretty important topic, in my opinion, and one that never seems to get quite the right level of import assigned to it. I've preached the advantages of a well laid out application before, but here's an opportunity to show exactly what I mean.

I had previously created [an example Node+Express application](https://github.com/edm00se/express-domino-nsf), which established what I'm doing in this example. The implementations are nearly identical, save for the fact that this one implements the same endpoints as the other examples, for consistency (and assumes a collection driven View by the respective name). The best part about this example though, is that it is so consistent with the other implementations, that you can simply [compare the iseries branch to the domino branch](https://github.com/edm00se/express-app-fun/compare/iseries...domino?w=1) or the [compare the master branch to the domino branch](https://github.com/edm00se/express-app-fun/compare/master...domino?w=1). If you check those links, which go to the comparison screen for the specified branches (I added the `?w=1` query parameter, which tells it to ignore whitespace differences), you can see that once again, the only things to change (aside from the ReadMe) are:

* the `config/db.js` with the db config specifics
* the `util` module, which defines different methods for handling, but exposes them nearly identically
* the `routes` module, which adapts to the slightly different implementation from the `util` methods

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