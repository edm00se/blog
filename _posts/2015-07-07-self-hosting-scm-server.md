---
layout: post
type: post
title: "Self-Hosting SCM Server Options"
description: "a quick comparison and few observations"
category: scm
tags: [source control, redmine, gitlab, gogs, github, bitbucket]
modified: 2015-07-07
comments: true
share: true
---

### Intro
Source Control has become a rallying point of sorts for me in the last few years. It has saved my bacon on a few occassions and source control in general (and git, specifically) is near and dear to me. I'm always on the quest for the best application development workflow, which can sometimes be difficult to achieve, depending on varying development team sizes.

I've gone through a couple rounds of preferences when it comes to self-hosted source control servers in the past couple years. I'm going to break down what I like about externally hosted solutions and then get into the benefits and trade-offs of a few of the (freely available) self-hosted solutions.

### Externally Hosted
There are two major players in the (free) externally hosted realm. There are more, but the two big ones of late are [GitHub](//github.com) and [Bitbucket](//bitbucket.org).

#### GitHub
I was going to start with a succinct description of [what GitHub is](//github.com/about), straight from their page. Oddly enough, there isn't an easy one I could find. They talk a fair amount about enterprise solutions and some sales lingo about enabling teams, so instead I'll drop in the lead paragraph from [the Wikipedia page on GitHub](//en.wikipedia.org/wiki/GitHub):

> "GitHub is a web-based Git repository hosting service, which offers all of the distributed revision control and source code management (SCM) functionality of Git as well as adding its own features. Unlike Git, which is strictly a command-line tool, GitHub provides a web-based graphical interface and desktop as well as mobile integration. It also provides access control and several collaboration features such as wikis, task management, and bug tracking and feature requests for every project."

So, now that we've established that GitHub is a git repository server, which provides additional features (issue tracking, wikis, forking, etc.), let's get into some of the differentiating specifics:

* only hosts git repositories
* any private repos / enterprise hosting costs 💵
* generally the de facto solution for the Open Source community
* free static site (or generated via [Jekyll](//jekyllrb.com/)) via GitHub Pages (any _gh-pages_ branch for a GitHub repo will have a space at &lt;user&gt;.github.io/&lt;repoName&gt;), like this one (which uses a custom domain now)

I like GitHub, but it's not perfect. There are plenty of upsides due to its popularity though, like [Travis CI](//travis-ci.org/getting_started), which gives CI testing for free to all GitHub repositories, or [Gitter](//gitter.im/) which gives "discussions" to GitHub teams and repositories, across Pull Requests and Issues.

#### Bitbucket
As with GitHub, [Bitbucket](//bitbucket.org/) (from Atlassian) offers repository hosting (for both Git and Mercurial) along with some extras. Here's their description:

>"Bitbucket is a web-based hosting service for projects that use either the Mercurial (since launch) or Git (since October 2011) revision control systems."

* hosts both Git and Mercurial repositories
* free accounts get an unlimited number of public or private repositories
* private repositories with a free account can have up to 5 collaborators
* additional enterprise hosted options with different products for different aspects of code management (issue tracking with Jira, Stash for self-hosted Bitbucket server, Bamboo for CI, and more); also costing 💵
* strong articles and guides (Atlassian blog)

Atlassian is also the creator of SourceTree, a free Mercurial and Git client for Mac and Windows platforms. SourceTree bakes in the Git/Hg-Flow processes, making it easier to implement [feature branching](//www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) workflows (or others).

#### Winner?
What are you looking for? I could claim one as superior to the other, and my inclination is that Bitbucket it technically superior, but I believe we're better off for having both. They bring us a lot of goodies in an attempt to gain our business with increasingly better tools. This is a good thing. 

### Self-Hosting
Why self host? I could a few specific reasons, but ultimately, I've found that self-hosting is really only going to depend on imposed business requirements. Depending on the size of your "shop", this can be a rabbit hole, as you'll see from my experiences with Redmine.

##### Redmine
[Redmine](//www.redmine.org/) was one of the early kids on the block, is written with Ruby on Rails, and supports Git, Mercurial, SVN, CVS, and others. It works and supports quite possibly the highest number of protocols, but can be a bit cumbersome, especially compared to how easy some of the others are to operate. I set up a Redmine instance at my day job and it's been sufficient, though doesn't always sport things we've grown to expect, like a link to clone (HTTPS or SSH) at the top.

##### GitLab CE
In all honesty, [GitLab](//about.gitlab.com/) very nearly replicates all the beauty and ease of use you would come to expect from GitHub or Bitbucket and is freely available. It's slick. If I hadn't run into trouble, I would still be using it. It's worth a look and I **highly recommend extensive backups before upgrading versions**. Its biggest potential downside for some is that it's Git-only.

I fell in love with GitLab's Community Edition... after I got it set up the first time, which was before the omnibus package would install correctly on my home Ubuntu box. Eventually, I switched to the omnibus package, but that eventually failed hard for me on an upgrade (via the recommended steps) and I lost my db. I had enough hassling at that point, as [you can probably tell from the issue](//gitlab.com/gitlab-org/omnibus-gitlab/issues/541) I had open for a while.

##### Gogs
When I went looking for alternates, I found [Gogs](//gogs.io/), which says it's a "self-hosted Git service written in Go". That's [Go as in GoLang](//golang.org/), not that that really matters much. Gogs runs rather light and can [run on a Raspberry Pi](//blog.meinside.pe.kr/Gogs-on-Raspberry-Pi/).

I've been using it for a while, and [even submitted a PR](//github.com/gogits/gogs/pull/1287). I thought it odd that I was directed to a different repo for the PR, but it seems to be a bit of a community effort.

### Summary
All in all, if you're looking to go your own way, most of the self-hosted options focus on Git with no real regard for other protocols. If Mercurial is a must, I recommend using a free account with Bitbucket and if your needs change, roll with the punches. As for those of us who have bought into Git, I thoroughly enjoy the simplicity of Gogs, but will admit to being up for a <s>rematch</s> revisit to GitLab, after we've both had our time to see other <s>people</s> solutions.

##### Recommended
* Fredrik Norling's blog post on how to [Setup a Free Git Server with Domino Credentials in a Few Minutes](//www.xpagedeveloper.com/2014/setup-a-free-git-server-with-domino-credentials-in-a-few-minutes), which uses [GitBlit](//gitblit.com/)
* Notes in 9 #131: [Use SourceTree for Better XPages Source Control](//www.notesin9.com/2013/11/12/notesin9-131-use-sourcetree-for-better-xpages-source-control/)
* Notes in 9 #140: [SourceTree Deep Dive](//www.notesin9.com/2014/03/24/sourcetreedeepdive/)

[Edit]
You should also check out [Show 103: The Show & Tell on Source Control - An End to End Solution](//www.intec.co.uk/show-103-source-control-an-end-to-end-solution/) presentation from IBM Connect 2014 by Paul Withers and Declan Lynch. It's worth a read as these two go into some excellent detail on both the hosting solutions, SourceTree, DORA, and some specifics in using them all together.
[/Edit]
