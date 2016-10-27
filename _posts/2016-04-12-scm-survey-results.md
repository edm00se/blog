---
layout: post
type: post
title: "SCM Survey Results"
description: "and a shout out"
category: scm
tags: [scm, dvcs, vcs, git, hg, svn, cvs, ciao]
modified: 2016-04-12
comments: true
share: true
---

### Shout Out
The TLCC + Teamstudio webinar today is "Getting Started with the OpenNTF Domino API", presented by Paul Withers and Jesse Gallagher. I've been listening/watching while working and if you're looking to ease your pain with some of the idiosynchrises in XPages, you'll want to check out the webinar (a recording of the webinar should pop up before long, I'll link to it here) and give the [OpenNTF Domino API](https://openntf.org/main.nsf/project.xsp?r=project/OpenNTF%20Domino%20API) a go.

{% include tweet.html id="719903028661338113" %}

### Intro
Last week, I put out a few toughts out in regards to source control management (scm) and even included a single question survey.

### Results
Here is the main donut chart, which is the same from my [previous post]({{ site.url }}/scm/source-control-survey/), which have been live updating, as they're published from right in Google Docs in the [response spreadsheet](https://docs.google.com/spreadsheets/d/1AW-db53FKmx_ppiXGpByjNxNVf99SjP3dlx7vnKqh_E/edit?usp=sharing) I set up.

<div class="text-center">
<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1AW-db53FKmx_ppiXGpByjNxNVf99SjP3dlx7vnKqh_E/pubchart?oid=1932817384&amp;format=interactive"></iframe>
</div>

#### Totals
With a total of 53 unique responses (so far as I can tell), I feel like this was a pretty good turn out in number of votes. Here's the break down; note: I've omitted [CVS (concurrent versions system)](http://www.nongnu.org/cvs/), with 0 total votes.

{:.table .table-bordered .table-striped}
| Value            | Total         | Pct.   |
| ---------------- |:-------------:| ------:|
| git              | 35            | 66.04% |
| Teamstudio Ciao  | 8             | 15.09% |
| hg (mercurial)   | 4             |  7.55% |
| svn (subversion) | 2             |  3.77% |
| file system copy | 2             |  3.77% |
| none             | 2             |  3.77% |

I think it's not a huge surprise that [git](https://git-scm.com/) took first place; it's ubiquitous and used by lots of people. It's especially relevant, IMO, as GitHub is exclusively git and Bitbucket does both git and Hg. [Teamstudio Ciao!](https://www.teamstudio.com/solutions/notestools/ciao) had a pretty good showing as well, which probably reflects the demographics of my blog readers; I had to convert one value of an "other" entry which was a write-in of Ciao. [Mercurial (Hg)](https://www.mercurial-scm.org/) turned out decently as well, though behind the first two. We had a couple of [svn](https://subversion.apache.org/) fans as well. There are pros and cons to each scm, which is why I don't believe this to be a fight or even much of an argument, just a question of what's most valuable to the developer and their development team.

#### Extracting Meaning
For a clearer overall picture, I summed the values of those using a [dvcs](https://en.wikipedia.org/wiki/Distributed_version_control) (git or hg) to a value of 'distributed', those using a centralized version control system to a value of 'central' (this includes Teamstudio Ciao responses, as it requires a check-in, check-out mechanic), those using a file system copy to a value of 'questionable choices' (it's better than nothing I'll grant you, but you could be doing _so much more_), and those with none to 'living dangerously'. Those results, in table and pie chart form:

{:.table .table-bordered .table-striped}
| Value                | Total         | Pct.   |
| -------------------- |:-------------:| ------:|
| distributed          | 39            | 73.58% |
| central              | 10            | 18.87% |
| questionable choices | 2             |  3.77% |
| live dangerously     | 2             |  3.77% |

<div class="text-center">
<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1AW-db53FKmx_ppiXGpByjNxNVf99SjP3dlx7vnKqh_E/pubchart?oid=1995419265&amp;format=interactive"></iframe>
</div>

If you're one of those file system copy or 'none' folks, I seriously hope you're at least making use of Domino Designer's built-in ability to compare versions, which only requires you perform the "Set Up Source Control for this Application...", without needing to commit or track it anywhere. It's a handy feature and worthy of use, esepcially for those of you I deemed to be making "questionable choices" (making a file system copy) or "living dangerously" ('none').

### Summary
All in all, if you're a hold out against using an scm, I think you'll notice that I'm skeptical of your choice in the matter. The advantage of using an scm is, I hope, self-evident. You can store your changes as revisions with minimal overhead to your development process; you can relate your revisions to issues (features, bugs, etc.), often with a simple addition to your commit message (refs, fixes, closes) if you're using something like GitHub, Bitbucket, GitLab, or others; and then there's the confidence in knowing that no matter what you change, you can always roll back to a previous commit (or tag or release) and know that your code will be as pristine as it was when you knew it was working, all by a simple command (or button click, for the GUI fans).

All in all, thanks for the interest and the feed back. It's always nice to know what others think on a matter. As usual, write better code! :beers:
