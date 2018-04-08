---
layout: post
type: post
title: "Git Squash"
description: "and a couple updates"
category: scm
tags: [scm, git, xpages, ibm]
modified: 2016-10-20
comments: true
share: true
---

### Intro
If you're just here to learn a little about [how to "squash" commits with `git`, skip down a ways](#git-squash). Otherwise, hold on, and I will catch you up on a couple of personal notes before we get there.

#### On the Blog
It's been a little while since I blogged last. This has been due to a combination of reasons; specifically, I've been busy with:

- my family, it was the end of summer with lots of things going on
- a number of projects around the house (a deck removal and basement remodeling)
- some personal projects I've been working on (software related, )
- the day job
- preparing for, and going on, a(n amazing) vacation

#### On the XPages Platform
There's one more thing involved, which is a tougher topic. Since MWLUG, there was a bit of a shift from the previous head scratching and beard stroking (for those of us so endowed) regarding the future of platform development of Domino.

<figure class="center">
  <amp-img src="{{ site.url }}/assets/images/post_images/BeardStroke.jpg"
  alt="a beard grants pondering skills, +10"
  height="480" width="480"
  layout="responsive"></amp-img>
 <figcaption>a beard grants pondering skills, +10</figcaption>
</figure>

For the majority of my history on this blog, I've taken an approach to creating and using a "thick" app in the client-side, with a focus on driving the backing data service via RESTful APIs. This is generally how much of the rest of the industry seems to be progressing, insofar as web applications. I've been pretty happy that the more modern tooling which optimizes content so far as to minimize the foot print of the built assets that go into an NSF's `WebContent` path, and it certainly helps avoid the constraint of the limitation of design elements in an NSF, but while this eases one side of an application, [there has been a disturbing amount of quiet](https://blog.darrenduke.net/Darren/DDBZ.nsf/dx/there-is-no-9.0.2.-dead.-canceled.-killed.-.htm) for some time, to the point that many have even been quite skittish or outright fearful of the future direction of the Domino and XPages platform. Thankfully, there has finally been a break in the "radio silence" from IBM on the future of the development of the Domino/XPages platform. This isn't to say [the world is perfect](http://www.notesin9.com/2016/09/13/no-more/), but I'm trying to keep focused on the positives.

Instead of looking for all the relevant links to list out here myself, I'm going to blatantly share a link to [Johnny Oldenburger's blog post laying out a nice summary, "The Future of IBM Notes Domino and XPages Revealed ?"](https://xpagesandmore.blogspot.com/2016/10/the-future-of-ibm-notes-domino-and.html). The short version is to the effect of:

- there is a road map
- the "versioning" of Domino is switching from [semver](http://semver.org/)-like to feature packs*
- some needed updates are coming (including an update to the JVM for 1.8, currently slated for Q1 2017 in FP8)

\* As an aside, the shift to a rolling release mechanism has greatly helped one of our large projects at my day job. I still assign a version to the the release, but that's for internal tracking. The reduction in emphasis on monolithic style releases has aided our flexibility (and generally our sanity).

### Git Squash
For starters, I'm not talking about the [family of fruit](https://en.wikipedia.org/wiki/Squash_(plant)) (including pumpkins and other gourds) or [the game](https://en.wikipedia.org/wiki/Squash_(sport)) often found adjacent to [racquetball](https://en.wikipedia.org/wiki/Racquetball) courts.

There comes a time on occasion, due to preference or rules of others (like in a Pull Request), that a developer may wish to "squash" their commits. This is, strictly speaking, just a `git rebase` going back `n` commits, to make the total summary of changes fit into a single commit. Essentially, you're making the commit history "easier to read" for the accepted changes and comes up more often in large code bases, especially with git repositories where people tend to perform a [rebase instead of merge](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/) or [squash merge](https://github.com/blog/2141-squash-your-commits), instead of just a merge.

Once you have identified the number of commits back to 'squash', then you can run `git rebase -i HEAD~n`. You'll be "cherry picking" the commits to squash, so make sure it looks right before proceeding. When done, "save", then it'll prompt you to confirm the commit message; by default it brings them all into one.

#### Asciicast

If the asciicast gives you trouble (possibly on mobile), just [take this link](https://asciinema.org/a/89834?autoplay=1).

<div class="center">
  <amp-iframe
    height="420"
    width="518"
    sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
    layout="responsive"
    allowfullscreen
    frameborder="0"
    src="https://asciinema.org/a/89834/embed?autoplay=0&size=big">
    <div overflow
    tabindex="0"
    role="button"
    class="ampstart-card py1"
    aria-label="Show more">Click to show more</div>
  </amp-iframe>
</div>

### IBM Champion Nominations
The IBM Champion program is now accepting nominations in Social Business, Power Systems, Analytics, and Cloud. The [IBM developerWorks page](https://www.ibm.com/developerworks/champion/index.html) has a pretty thorough breakdown of [what the IBM Champion program is about](https://www.ibm.com/developerworks/champion/learn.html). The general idea is that a qualified person is a non-IBMer, who makes exceptional contributions to the community, including accessibility to the community through various engagements (such as speaking at conferences, blogging, being active in forums, etc.).

If you feel you know someone who deserves to be nominated, especially if someone has assisted you from the community, please fill out the nomination form.

[Nomination form link!](https://www.ibm.com/developerworks/community/profiles/dw/anonymous.jsp?id=2016)

### Hacktoberfest
In case you missed it, [Hacktoberfest 2016](https://hacktoberfest.digitalocean.com/) is under way! If you haven't already, all you need is 4 Pull Requests on GitHub to get there. If you're looking to contribute on a project, you may know of one that is more than willing to take on some PRs. 😉

Seriously, if you're interested in and are looking to contribute to my [XPages compatible Yeoman generator, "generator-xsp"](http://npm.im/generator-xsp), I am more than happy to bring others in to contribute. I have some [general guidelines](https://github.com/edm00se/generator-xsp#want-more) and [a few ideas](https://github.com/edm00se/generator-xsp/projects/1) for a couple additional features.

### Summary
As always, thanks for reading. 🍻
