---
layout: post
type: post
title: "Using Node to Connect to a Notes/Domino NSF"
description: "we might as well get Domino in on the fun"
category: node
series: node-express-iseries-nsf
tags: [node, express, iseries, jdbc, jt400, notes, domino, nsf]
modified: 2016-04-22
comments: true
share: true
---

{% include series.html %}
{% include toc.html %}
### Intro
I'm back, with the third in my 3-part series on connecting to "almost anything". First, we created a base application, from which nearly any db connection could be made and `routes` established to be handled with their dependent db operations managed through the `util` module, to consolidate the db interaction functions. This time, we'll be interacting with a Notes/Domino NSF, via the [domino-nsf](https://www.npmjs.com/package/domino-nsf) packge (on npm) by [Nils Tarjei Hjelme](https://medium.com/@nthjelme).

This package is something I learned of in the `#dominonodejs` channel of the OpenNTF Slack chat ([click here to join](http://openntfslackin.mybluemix.net/)). Here's the corresponding [GitHub source](https://github.com/nthjelme/nodejs-domino) to the npm package (it'll link from the npmjs.com page after the next publish, courtesy of [a pull request](https://github.com/nthjelme/nodejs-domino/pull/1)). Not being the patient sort, I apparently felt it could use an expanded example, in the form of an Express app.

### Before We Get Started, A Reminder About App Structure
This is a pretty important topic, in my opinion, and one that never seems to get quite the right level of import assigned to it. I've preached the advantages of a well laid out application before, but here's an opportunity to show exactly what I mean.

I had previously created [an example Node+Express application](https://github.com/edm00se/express-domino-nsf), which established what I'm doing in this example. The implementations are nearly identical, save for the fact that this one implements the same endpoints as the other examples, for consistency (and assumes a collection driven View by the respective name). I'll likely keep this example as historical with this project's intent, highlighting versatility of this sort of structure and implementation, while the other will be updated over time as the _domino-nsf_ package grows and changes, to be a more inclusive and detailed example.

The best part about this example though, is that it is so consistent with the other implementations, that you can simply [compare the iseries branch to the domino branch](https://github.com/edm00se/express-app-fun/compare/iseries...domino?w=1) or the [compare the master branch to the domino branch](https://github.com/edm00se/express-app-fun/compare/master...domino?w=1). If you check those links, which go to the comparison screen for the specified branches (I added the `?w=1` query parameter, which tells it to ignore whitespace differences), you can see that once again, the only things that changed (aside from the ReadMe) are:

* the `config/db.js` with the db config specifics
* the `util` module, which defines different methods for handling, but exposes them nearly identically
* the `routes` module, which adapts to the slightly different implementation from the `util` methods

### Specifics With `domino-nsf` and Notes/Domino NSF
The core connection component here is Domino C and C++ APIs, which are used by the `domino-nsf` package, to provide our available interfacing. Our connection will rely on the local Notes client's ID and the existence and authorization to connect to the specified NSF, View, or Document.

#### Notes ID
My example is connecting via my local Notes client, which is using my Notes ID (which I'm already signed into), that can access anything my ID has rights to access on either my local or on a server my environment can access. This is quite probably (and more usefully) able to be run in a server context, with a server ID (or dedicated ID file); I've not tried it in that capacity yet, personally.

#### Data Connection Config
The main config contains only two things of note, the server (black for local) and file name (accessible via the DOM_SRV and DOM_DB environment variables, respectively).

{% include gist.html id="ef66a551a04cae3378b42215f3449f03" file="d-config_db.js" %}

#### Data Service
Once again, I'm using a common defined session open and close function (instead of connection init and terminate), with some wrapped functions for the different operations I'm using, passing in what I _need_ to invoke the calls, and passing in the callback function. This is all exported as a module that is consumed in `routes`.

{% include gist.html id="ef66a551a04cae3378b42215f3449f03" file="d-util_index.js" %}

#### Use
Just the same as last time, now that my connections are configured and my data handling is provisioned, all I need to do is invoke it in my various `routes`. As you can see from my data `util` module, the exposed `query` method is simple enough to use:

* `require` the module
* call the `getView` or `getDoc` method (you can see how a `saveDoc` would work here)
* passing in the parameter (View name, UNID string) and
* a function, which has two parameters, error or data

{% include gist.html id="ef66a551a04cae3378b42215f3449f03" file="d-routes_beers.js" %}

The other available `routes` all get updated as well.

### Source Code
You can find my source code for this version of the project, in full, in [the same GitHub repository as last time, just in the `domino` branch](https://github.com/edm00se/express-app-fun/tree/domino).

### Summary
All in all, I tried not to repeat myself from the last post, but as you can see, there is a high degree of similarity. As I mentioned, the `domino-nsf` package is likely to go through a round of changes, but that shouldn't stop you from trying anything out or contributing to the project; either in the #dominonodejs channel of the OpenNTF Slack chat or on GitHub. In fact, Nils Tarjei Hjelme has an open issue regarding the build scripts for both Windows 64-bit and for Linux/*nix environments (he's already building the 32-bit one, which I've tested). Not being a C dev, it's a bit beyond my immediate skill set, but if someone out there is knowledgable, @nthjelme has [marked that issue as "help wanted"](https://github.com/nthjelme/nodejs-domino/issues/2) so he's looking for assistance.

For those who find this to be a good topic, please contribute or at least show your interest, as it's always great to contribute to an open source project you care about and show support for it.

Until next time, ð»!
