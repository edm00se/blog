---
layout: post
type: post
title: "Nerdy Yet Awesome"
description: "using web development skills for unconventional purposes"
category: web
tags: [node, cli, emoji, markdown, gitbook]
modified: 2015-12-22
comments: true
share: true
---

### Intro
Building on what I've been talking about recently, between a greater understanding of front-end development tooling and practices along with a skill set that reaches outside our day-to-day work, here's an interesting thing I did recently to solve a unique problem.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">I just wrote something so nerdy yet so awesome, I&#39;m having trouble containing my excitement.</p>&mdash; Eric McCormick (@edm00se) <a href="https://twitter.com/edm00se/status/664661632337997824">November 12, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### Ultra Nerdy
How nerdy was it? We'll get to that by the end and I'll let you be the judge. The problem I was faced with was that I was working on reconciling some content for a side project, which is in [markdown](https://help.github.com/articles/markdown-basics/) (md). The content I needed to update was a number of emojis which had been rendered via a plugin, which would recognize the short name inside of a colons. For example `:​smile​:` which becomes :smile:, as you can see in this blog post. The plugin isn't available for the destination, but like all Markdown, will render in HTML. While I may be packaging what I've done up for a plugin for that environment _now_, the same functionality wasn't there when I started, so I had to DIY.

Ultimately, my task was to:

* scan my existing files for occurrences
* register what needed to be replaced
* replace with a corresponding HTML image tag (or the md image markup, like so `![description of image which becomes the alt value](https://path/to/image.png)`)

### Something Neat
The side project I'm working on is collecting my better blog posts into an eBook format. This is mostly to be able to say I've done so, and when that finally hits, it'll be freely available in all major eBook formats. If you keep referencing my blog, that's the primary source, so no worries there.

[GitBook](https://www.gitbook.com/) is a project that [Jesse Gallagher](https://twitter.com/gidgerby) turned me on to. It's a full service that connects to your GitHub account and automates some of what I'm doing, but I went the DIY route and am merely using their CLI implementation (gitbook-cli), available via npm, as outlined in the readme of their [GitHub repository](https://github.com/GitbookIO/gitbook). Basically, when I update the git repository that is the "book" version of the first year of my blog, my Jenkins instance pulls in the latest changes, runs the appropriate `npm install` (and other affiliated plugin install tasks), then runs the commands to generate the appropriate formats. As a bit of a convenience, so I don't have to wait around for anything, it automatically publishes them into a folder in my Dropbox account (which is token authorized). I even have the files being named according to the build number.

Again, this was just something to force myself to get familiar with some tools that I'm looking to do more with, and I'm quite happy with that result, as I've never felt better about my Jenkins-fu and GitHub or Bitbucket webhooks.

### Bringing It All Together
To achieve my results, I needed to do scan multiple files (all in a given directory) of a particular type (or at least with a given extension), check their contents with what would be ultimately a RegEx test for whether or not to perform the replace tasks as necessary, along with saving them back to the origin file with the changes. I've done some BASH scripting before and even a little Windows batch work, but I wanted something I was familiar enough to be fluent with, with minimal effort; this is, after all, nothing more than a "glamor" project, so the KISS approach was ideal. I settled on writing a NodeJS based script, seeing how I'm already using Node for the project and have a set of dependencies that could easily tie into the package.json as development dependencies. Better yet, Node includes an [out of the box file system API which is well documented](https://nodejs.org/api/fs.html).

#### The RegEx
Coming up with the correct RegEx is what took the longest. There are over 800 separate emojis supported on GitHub. The plugin I am using on my blog is the [GitHub Pages available `jemoji`](https://pages.github.com/versions/). GitHub Pages doesn't have _every_ Jekyll plugin available, but it's been growing steadily since my blog started (from around 3 then to several now).

Ultimately, not caring about the simple "emojis" (such as `:-D`), rather just the true emoji short names, I started by examining the entire sample set of emoji short names. GitHub has an undocumented API (really just a JSON reference) at [api.github.com/emojis](https://api.github.com/emojis). This let me know that all the emoji short names I would potentially have to match (even though I've only used certain ones), would be a list of effectively word characters immediately surrounded by colons.

To make a long story short (ending with a space after the colon, or sentence ending character and accounting for a `+` or `-` explicit character), you can find [my full RegEx test on regex101.com](https://regex101.com/r/hI5qF5/1). The expression I settled on is:

```
/(\:(\w|\+|\-)+\:)(?=\s|[\!\.\?]|$)/gim
```

Hopefully that makes sense after my description above, if not, check out the RegEx101.com link, as they have some helpful tools on the side that explain character matching and match successes, etc.

#### The Images
With my ability to receive an object with keys identifying all possible emoji short names and a corresponding URL, all seemed good and well, until I realized that I was still going to need an offline copy of the image, as my eBook renderings were completing before the response of all images had completed. So I scripted out another task which I won't get into here, that saved a copy of each image into a local folder, named according to a `<shortName>.png` format. Finally, I had all the components I needed.

#### Creating Running the Script
Something I ran into while creating and testing the script was that Node's async nature was processing the file, inside the nested callback function, at a different timing that I had anticipated. While this can seem counterintuitive, it's part of the non-blocking i/o nature of Node; I was able to switch over to using a synchronous version of the same functions for [fs.readdirSync(path)](https://nodejs.org/api/fs.html#fs_fs_readdirsync_path) and [fs.readFileSync(file[, options])](https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options), though I kept [fs.writeFile(file, data[, options], callback)](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) async, as I didn't need to wait around for the file write to complete before continuing processing. For a quick idea of how this is beneficial, [this SlideShare deck](http://www.slideshare.net/AmyHua/intro-to-node-and-non-blocking-io/16) seemed mildly worthy; although this is a _huge_ topic in and of itself.

Before I show you the full version, here's a basic overview of both how my script is structured and the async nature of Node.

{% gist d7215253f732bb198482 test.js %}
<br />

You may take note of the first line, which is `#! /usr/local/bin/node` and points to my local node binary, after the "hash bang". This is akin to how one might specify a shell script, such as `#!/bin/sh`. Basically, so long as you make the file executable, you can run a node script as if it's a shell script, since the shell script starts by pointing at what interpreter to use, it's legitimate! This is ultimately just a nifty thing, and one should take care as not to use any packages that might not be able to be used from a globally installed context, as most people don't like random `node_modules` directories strewn about their file systems.

Here's the full thing:

{% gist d7215253f732bb198482 handleEmojis.js %}
<br />

#### Effort For Gain
In the end, I had something around 40 occurrences of emoji short names, so this may not have saved me much more work than I could have done with something else, but it was worth the experience to get more familiar with how to do such a thing in Node and also for what is in the next section.

#### Tying Into <s>Build Task</s> Jenkins
As you may have caught on from my blog series, I'm a big fan of task runners. [Jenkins CI](http://jenkins-ci.org/), another tool I have a great love for, is essentially a highly configurable task runner (and more) in its own right. It's also a great tool for build automation and, if it hasn't hit yet, is the subject in another blog post in the [task runner series of mine]({{ site.url }}/task-runners-with-domino-apps).

As for how to hook this into my Jenkis process, I ultimately am running a shell invocation for my "build" process. I could have multiple, but for this task, it's relatively uncomplicated, so it's just one. There are those in the camp that all build tasks should be contained in individual shell scripts, so that all the Jenkins configuration does is invoke the shell script, which has the advantage that it can be maintained independent of Jenkins, but I find it easy enough to log into my Jenkins instance to do so; this is one of those things that everyone will have a preference for, so go with what works for you.

To add it into my build task, after calling my `npm install` (and `gitbook install`) but before my building of my eBook files (`a`), I 

### Summary
asdf