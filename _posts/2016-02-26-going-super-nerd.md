---
layout: post
type: post
title: "Nerdy Yet Awesome"
description: "using web development skills for less conventional purposes"
category: web
tags: [node, npm, cli, emoji, markdown, gitbook, yeoman]
modified: 2016-02-26
comments: true
share: true
---

### Intro
Here's something that I cooked up a little while back, then found a further use for, then found an even greater use; it was an evolutionary project that sort of took off and helped me to learn a few things and adopt some new tools, which is always nice.

Building on what I've been talking about recently, between a greater understanding of front-end development tooling and practices along with a skill set that reaches outside our day-to-day work, here's an interesting thing I did recently to solve a unique problem.

{% include tweet.html id="664661632337997824" %}

### Ultra Nerdy
How nerdy was it? We'll get to that by the end and I'll let you be the judge. The problem I was faced with was that I was working on reconciling some content for a side project, which is in [markdown](https://help.github.com/articles/markdown-basics/) (md). The content I needed to update was a number of emojis which had been rendered via a plugin, which would recognize the short name inside of a colons. For example `:​smile​:` which becomes 🙂, as you can see in [this blog post's source](https://github.com/edm00se/DevBlog/edit/master/_posts/2016-02-26-going-super-nerd.md#ultra-nerdy) vs the rendered content here. The plugin isn't available for the destination, but like all Markdown, will render in HTML. While I may be packaging what I've done up for a plugin for that environment _now_, the same functionality wasn't there when I started, so I had to DIY.

Ultimately, my task was to:

* scan my existing files for occurrences (such as `:‌beers‌:`, which happens a surprising amount)
* register what needed to be replaced
* replace with a corresponding HTML image tag (or the md image markup, with an `img` tag  and a `src` attribute pointing to a copy of an image file corresponding to the short code `src="https://path/to/beers.png`"`)

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

```javascript
/(\:(\w|\+|\-)+\:)(?=\s|[\!\.\?]|$)/gim
```

Hopefully that makes sense after my description above, if not, check out the RegEx101.com link, as they have some helpful tools on the side that explain character matching and match successes, etc.

#### The Images
With my ability to receive an object with keys identifying all possible emoji short names and a corresponding URL, all seemed good and well, until I realized that I was still going to need an offline copy of the image, as my eBook renderings were completing before the response of all images had completed. So I scripted out another task which I won't get into here, that saved a copy of each image into a local folder, named according to a `<shortName>.png` format. Finally, I had all the components I needed.

#### Creating Running the Script
Something I ran into while creating and testing the script was that Node's async nature was processing the file, inside the nested callback function, at a different timing that I had anticipated. While this can seem counterintuitive, it's part of the non-blocking i/o nature of Node; I was able to switch over to using a synchronous version of the same functions for [fs.readdirSync(path)](https://nodejs.org/api/fs.html#fs_fs_readdirsync_path) and [fs.readFileSync(file[, options])](https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options), though I kept [fs.writeFile(file, data[, options], callback)](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) async, as I didn't need to wait around for the file write to complete before continuing processing. For a quick idea of how this is beneficial, [this SlideShare deck](http://www.slideshare.net/AmyHua/intro-to-node-and-non-blocking-io/16) seemed mildly worthy; although this is a _huge_ topic in and of itself.

Before I show you the full version, here's a basic overview of both how my script is structured and the async nature of Node.

{% include gist.html id="d7215253f732bb198482" file="test.js" %}

You may take note of the first line, which is `#!/usr/bin/env node` and points to my local node binary (according to its being picked up by the environment), a.k.a- the "hash bang". This is akin to how one might specify a shell script, such as `#!/bin/sh`. Basically, so long as you make the file executable, you can run a node script as if it's a shell script, since the shell script starts by pointing at what interpreter to use; it's perfectly legitimate! This is ultimately just a nifty thing, and one should take care as not to use any packages that might not be able to be used from a globally installed context, as most people don't like random `node_modules` directories strewn about their file systems. It's alternately equivalent to invoking the same script via `node script.js` as opposed to `./script.js` or `sh script.js`.

Here's the full thing, in its original form:

{% include gist.html id="d7215253f732bb198482" file="handleEmojis.js" %}

#### Effort For Gain
In the end, I had something around 40 occurrences of emoji short names, so this may not have saved me much more work than I could have done with something else, but it was worth the experience to get more familiar with how to do such a thing in Node and also for what is in the next section.

#### Tying Into <s>Build Task</s> Jenkins
As you may have caught on from my blog series, I'm a big fan of task runners. [Jenkins CI](http://jenkins-ci.org/), another tool I have a great love for, is essentially a highly configurable task runner (and more) in its own right. It's also a great tool for build automation and, if it hasn't hit yet, is the subject in another blog post in the [task runner series of mine]({{ site.url }}/task-runners-with-domino-apps).

As for how to hook this into my Jenkins process, I ultimately am running a shell invocation for my "build" process. I could have multiple, but for this task, it's relatively uncomplicated, so it's just one. There are those in the camp that all build tasks should be contained in individual shell scripts, so that all the Jenkins configuration does is invoke the shell script, which has the advantage that it can be maintained independent of Jenkins, but I find it easy enough to log into my Jenkins instance to do so; this is one of those things that everyone will have a preference for, so go with what works for you.

To add it into my build task, after calling my `npm install` (and `gitbook install`) but before my building of my eBook files (`a`), I

### One Step Further
Since I had created something neat I hadn't seen before (my search for an existing npm package was negligible for my purposes), I was able to tackle a small challenge in an environment I was previously less knowledgable in. It also gave me an opportunity to try out something else new in a more in-depth fashion; [yeoman](http://yeoman.io/)'s [generator-node](https://github.com/yeoman/generator-node). For those that have [followed my blog series on task runners](http://localhost:3000/task-runners-with-domino-apps), caught [my recent IBM Connect session](https://github.com/edm00se/BeardAppBlender/) in-person or the pending release of my Notes in 9 of my session's highlights, you may be aware that I've mentioned that when it comes to yeoman, there seems to be a generator for nearly everything. Using `generator-node`, I was able to fairly quickly scaffold out a full project that's a nicely contained npm package which is installable from the npm registry, contains a (server) module for use via a `require` statement [in a JavaScript context](https://tonicdev.com/edm00se/emoji-transmogrifier), or as a command [via the cli](https://github.com/edm00se/emoji-transmogrifier#cli-utility). It even has unit tests, continuous integration [via travis-ci](https://travis-ci.org/edm00se/emoji-transmogrifier), [dependency checking via david-dm](https://david-dm.org/edm00se/emoji-transmogrifier), [code coverage reporting via codecov](https://codecov.io/github/edm00se/emoji-transmogrifier), and...  you get the picture, just check the readme's badges at the top.

<a href="http://npm.im/emoji-transmogrifier">
  <amp-img src="https://badge.fury.io/js/emoji-transmogrifier.svg"
  alt="NPM"
  layout="responsive"
  width="126" height="20"></amp-img>
</a>

### Another Step Further
This is an update to the original article, expanding on some further developments that didn't quite warrant their own post.

As it turns out, by the time I got around to (finally) creating the `gitbook-plugin-` version of this script, someone else had [created one to do something similar](https://github.com/codeclou/gitbook-plugin-advanced-emoji), using emojify.js; which is another, well maintained package. All in all, I would probably have used that, had it not been for the fact that I wrote the above. For those interested, I checked and their initial commit is 6 days after I started down this path, originally.

I also grew tired of needing a Jenkins CI instance to do what I could do for free using one of the multitude of options available to an open source GitHub repository, which was always going to be the end destination for the originating project. That being said, I created a [Travis CI](https://travis-ci.org/) task for the repository, which does what the Jenkins CI task did, but instead publishes the [static site](http://edm00se.github.io/dev-blog-book/) (of the ebook format, from `gitbook-cli`) to [a separate, `gh-pages` branch](https://github.com/edm00se/dev-blog-book/tree/gh-pages), and the built ebook files to [a `built` branch](https://github.com/edm00se/dev-blog-book/tree/built).

Here's the [`.travis.yml` configuration file](https://github.com/edm00se/dev-blog-book/blob/master/.travis.yml). The reason it got larger than expected was due to the need to resolve the dependency of [calibre](http://calibre-ebook.com/), which wasn't working as I expected in the legacy vm. You can also notice that I'm using a GitHub Personal Access Token exposed (privately) to Travis CI as an environment variable for authenticated access, without exposing my credentials.

{% include gist.html id="65d1555dc0e522a2667a" file=".travis.yml" %}

### Summary
All in all, I learned a few things, found a solution to a problem I had, and grew from the experience. I call this a "win". Hopefully this can inspire some of you to give something new a try, as it never hurts to expand the skill set.
