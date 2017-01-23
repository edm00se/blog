---
layout: post
type: post
title: "Open Source Contribution"
description: "learning by doing more"
category: open-source
tags: [java, xpages]
modified: 2017-01-26
comments: true
share: true
---

### Intro

I have a bit of a passion for open source software. My preferred distribution of Linux has been Ubuntu since 4.10, the Warty Warthog, I've enjoyed most open source projects I've run into, and I thoroughly enjoy supporting open source projects. Recently I had an opportunity to learn a little more than I knew prior to, by being nudged to submit a pull request to an interesting project.

### The Project

The project is [prettier-eslint](https://github.com/kentcdodds/prettier-eslint-cli), to which I added a (simple) logging option `--silly-logs`. This came about while running a requested test from Mr. Kent C. Dodds, while the project was still in beta (pre-release).

{% include tweet.html id="821767817569583104" %}

#### Issue

This led to an observation that while I was getting the benefits of [prettier](http://npm.im/prettier), it was inducing a dangling comma, making it fail my [eslint](http://npm.im/eslint) configuration. While I could reconfigure my eslint config to accommodate for and/or use a dangling comma, that sort of defeats the purpose of plugging into an existing eslint config. The whole point of Mr. Dodds's [`prettier-eslint`](http://npm.im/prettier-eslint-) and its cli tool, [`prettier-eslint-cli`](http://npm.im/prettier-eslint-cli) which I was testing, was to provide a more seamless integration with the two.

<figure class="center">
  <amp-img src="{{ site.url }}/assets/images/post_images/PrettierEslint_DanglingComma.png"
  alt="prettier working, just not playing great with eslint"
  width="400" height="225"
  layout="responsive"></amp-img>
  <figcaption>prettier working, just not playing great with eslint</figcaption>
</figure>

#### Prettier?

What is [prettier](http://npm.im/prettier)? It's a tool for consistently formatting JavaScript, including support for modern syntaxes, in an opinionated fashion. I liken it to how I have My Eclipse and DDE settings, so that my XML attributes get forcibly formatted onto separate lines. In the end, it's supposed to help make your code more readable and less confusing.

### The Pull Request

https://github.com/kentcdodds/prettier-eslint-cli/pull/1#issuecomment-273576020

### Shout Out

Now that it has hit version 1.0, the cli tool works great! It formats my code using `prettier` and triggers an `eslint --fix`, making my `eslint` config win in the end, with the formatting assist from `prettier`. It helps make for some good looking code, so you may wish to check it out. There's also [a package for](https://github.com/kentcdodds/prettier-eslint-atom) the [Atom](https://atom.io).

### Want to Get Involved?

asdf

### 🍻
