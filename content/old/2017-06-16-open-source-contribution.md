---
layout: post
type: post
title: "Open Source Contribution"
description: "learning by doing more and playing nice with others"
category: open-source
tags: [javascript, open-source, node, prettier, eslint, jest]
modified: 2017-06-16
comments: true
share: true
permalink: /open-source/contribution/
---

### Intro

It's time to clear some of the backlog. I started this post a few months back and it should probably be sent on its way to clear the pile of drafts I haven't finished yet... ð¤

I have a bit of a passion for open source software. My preferred distribution of Linux has been Ubuntu since 4.10, the Warty Warthog (I was even a minor contributor on a short lived, wildly popular project that aimed at improving the Ubuntu experience early on), I've enjoyed most open source projects I've run into, and I thoroughly enjoy supporting open source projects. Recently I had an opportunity to learn a little more than I knew prior to, by being nudged to submit a pull request to a project I'm interested in.

### The Project

The project is [prettier-eslint's cli tool](https://github.com/kentcdodds/prettier-eslint-cli), to which I added a (simple) logging option `--silly-logs`. This came about while running a requested test from Mr. Kent C. Dodds, while the project was still in beta (pre-release). Why am I celebrating a CLI flag for a cli tool? I'm not, I'm more geeking out over the tool itself instead of my minor partial involvement. That's a part of the beauty of open source, anyone can contribute or help, even with something as small as testing out a beta version.

{% include tweet.html id="821767817569583104" %}

#### Issue

This led to an observation that while I was getting the benefits of [prettier](http://npm.im/prettier), it was inducing a dangling comma, making it fail my [eslint](http://npm.im/eslint) configuration (which explicitly disallows them). While I could reconfigure my eslint config to accommodate for and/or use a dangling comma, that sort of defeats the purpose of plugging into an existing eslint config. The whole point of Mr. Dodds's [`prettier-eslint`](http://npm.im/prettier-eslint-) and its cli tool, [`prettier-eslint-cli`](http://npm.im/prettier-eslint-cli) which I was testing, was to provide a more seamless integration with the two.

<figure class="center">
  <amp-img src="/assets/images/post_images/PrettierEslint_DanglingComma.png"
  alt="prettier working, just not playing great with eslint"
  width="1184" height="704"
  layout="responsive"></amp-img>
  <figcaption>prettier working, just not playing great with eslint</figcaption>
</figure>

#### Prettier?

What is [prettier](http://npm.im/prettier)? It's a tool for consistently formatting JavaScript, including support for modern syntaxes, in an opinionated fashion. I liken it to how I have My Eclipse and DDE settings, so that my XML attributes get forcibly formatted onto separate lines. In the end, it's supposed to help make your code more readable and less confusing. ð

### The Pull Request

Since it was requested, and it was something I thought would help me learn a little and potentially be of interest to others, I [followed Kent's recommendation](https://github.com/prettier/prettier-eslint-cli/pull/1#issuecomment-273576020) and submitted a pull request (PR) to add the `--sillyLogs` option. Did it go perfectly the first time? Not at all! That's a sure sign in my book that I'm learning; I was mildly out of my comfort zone and trying something new. In fact, since this time frame, I've gone on to find a true appreciation for [jest](http://npm.im/jest) over [mocha](http://npm.im/mocha) for my Node test runner and framework; it's incredibly slick and has lots of great benefits, and I found it thanks to this PR and Kent's use of, and recommendations of, it.

Since this project was a CLI tool consuming a "regular" Node module (API), so the logging option I added was under [a dependent repo's (PR #8 for `prettier-eslint`)](https://github.com/prettier/prettier-eslint/pull/8).

### The Results

This speaks for itself. Once the logging was established, some modifications were made in the `-cli` project, and now it plays great with my project's eslint config. That's a big win, in my opinion. Here it is, doing what it does w/ the same section of my code, acting as I want and cleaning things up for me.

<figure class="center">
  <amp-img src="/assets/images/post_images/PrettierEslint_WorkingGreat.png"
  alt="prettier working, and respecting the h*ck out of my eslint config"
  width="733" height="216"
  layout="responsive"></amp-img>
  <figcaption>prettier working, and respecting the h*ck out of my eslint config</figcaption>
</figure>

### Shout Out

Now that it has hit version 1.0, the cli tool works great! It formats my code using `prettier` and triggers an `eslint --fix`, making my `eslint` config win in the end, with the formatting assist from `prettier`. It helps make for some good looking code, so you may wish to check it out. There's also [a package for Atom](https://github.com/kentcdodds/prettier-eslint-atom) and for [VS Code](https://marketplace.visualstudio.com/items?itemName=RobinMalfait.prettier-eslint-vscode).

### Want to Get Involved?

My suggestion, especially if you're new at it, is to follow a small handful of developers on Twitter or GitHub; preferably ones with interesting projects that sound useful and innovative to you. Watch, read, learn, listen. When there's an opportunity to help, go for it. My only words of caution, don't commit to more than you can do and if you need help, ask for it. You'll `<sarcasm>` never guess who one of the developers I follow is `</sarcasm>` ð. In fact, one of the reason I follow Kent is that he actively creates, maintains, and contributes to projects that help people contribute more; in my estimation, that's one hallmark of a truly good person in the open source world. In fact, he's even got a (free) series on [egghead.io](https://egghead.io) that is helpful for such beginners, for any interested:

> [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

### Closing Thoughts

This is far from my first open source contribution, and it certainly won't be my last, but what stood out to me was that I was more assistive in being aware and willing to test something that just hacking away on my own side projects. Don't get me wrong, those have plenty of usefulness in their own right, but when we interact with others, we learn how they do things, and that can help us change and grow our own habits, processes, and traits.

Until next time, cheers!

### ð»
