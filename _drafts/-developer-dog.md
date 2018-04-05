---
layout: post
type: post
title: "Developer Dog"
description: "an Alexa skill for fun and encouragement"
category: serverless
tags: [serverless, alexa, aws, amazon, echo, javascript, node, faas]
modified: 2017-09-29
comments: true
share: true
permalink: /serverless/encouraging-developers/
series: serverless-intro
---

### Background

Here's a post I've been working on for longer than I care to admit to. For a few months, I've been wanting to kick off a series on serverless development practices, theory behind why serverless is such a game changer, as well as a couple of demos. The fact of the matter is, each time I've started, I've gotten so bogged down in writing a post about _what serverless is_ and the backing theory, I've managed to loose blogging momentum and it has since idled in my drafts folder for a while. So, what I've settled on for now, is a brief introductory to my first Alexa Skill, and the basics of how it works.37

### Intro

Have you gotten past your fears of an always listening device on in your home? Has conversational computing started to change how you think about software development? Have you wanted to build your first Alexa Skill, with more than a simple "hello world"?

[Amazon's Alexa (Echo) devices][amazon-echo] and [services][alexa-voice-service], along with [Google's Home][google-home] line of voice/audio products, are chaning the way everyday computing exists and is used in our lives. They're not the only ones, along with Siri, Cortana, and more, these voice and audio services have helped to begin a bit of a minor revolution. This one doesn't require singing and dancing, unless that's your thing, but rather that we re-examine the nature of how we interact with computing devices. The very nature of being able to speak aloud, give instruction in a natural langauge format, and receive information is probably one of the more underrated paradigm shifts of this decade. With any luck, it will only go onwards and upwards from here... unless Skynet takes over.

A while back I tweeted out a short poll on what sort of Alexa Skill I should build. I only included a couple options and got a couple votes back. Here are the results.

{% include tweet.html id="845786561186795521" %}

### What Makes Up an Alexa Skill?

At the most basic level, an Alexa Skill is comprise of two parts:

1. a backing service, generally a serverless implementation, hosted _somewhere_ that the Alexa skill can invoke
  - this can be a publicly accessible HTTP(S) endpoint
  - for Amazon's product usage, the most common is AWS Lambda
  - AWS Lambdas use their ARN (Amazon Resource Names), which is an Amazon internal name space; quite easy to talk from Amazon Lambda to an Alexa Skill
  - for Alexa skills, most often make use of the Alexa SDK or related packages (to assist in handling the hooks in a consistent fashion)
2. a configuration of the Alexa Skill
  - matches vocal commands such as name and actions, responses
3. it is published to the Alexa Skill "store" on Amazon
  - it can be available to test pre-release / while in development, for the developer's associated account (and beta testers)

### How About an Example Skill?

Before we go further, I'd like to ask you to think about how we register human speech and match up the intentions behind them to any conveyed ideas or actions to take. It's no small task, but thankfully we don't have to reinvent the wheel. For Alexa Skills, the Alexa Skills Kit brings a fair amount of tooling easily installed via `npm` (and respective equivalents for other runtimes and languages). For the most part, we'll have our functions that define what happens when an action is taken, and the "Intent" definitions, that call corresponding actions. There's lots of room to talk about what these mean and I am taking a somewhat simplistic approach to the theory, but enough theory for now! I know I'm bound to come back to the theory, I seem to do so more than I might like, but for now, let's assume we know what we're doing and why. On to the examples!

#### Example 1: Hello World

Good ol' "Hello world", you know this one, right? So, what do we need to start with?

##### Scaffold The Project

1. this is a Node.js example, so we'll be creating a new project directory and initializing with npm
  - `mkdir hello-world`
  - `cd hello-world`
  - `npm init -y`
2. we'll use the official [Alexa Skills Kit SDK for Node.js][alexa-sdk-node]
  - `npm install --save alexa-sdk`
3. we'll have a short and sweet Node.js module, so create the source file
  - `touch index.js`
4. massage your `package.json`, update your:
  - name
  - description
  - ensure the "main" points to `index.js` (that should be the default)

##### Build Out Your `index.js`

???
To properly match up with the Alexa SDK expects, we'll **export** a function, which will include some passing of a couple things. Why stick to this format? Because we'll be running on their server to be invoked by their runtime, so it needs to know what we have to provide. The `event` and `context` will get shuffled around, but the biggest thing to pay attention to here is the `handlers` that we'll be registering. These handlers are an object (map) that will match up a handful of "Intent"s with a function of their own.
???

Here's a commented start to this file:

```js
'use strict';
const Alexa = require('alexa-sdk');

// this exported handler is what defines how the Alexa runtime can interact with our module
exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context); // a new instance
    alexa.registerHandlers(handlers); // registers handlers (below)
    alexa.execute(); // now it's ready
};

// we'll populate these shortly
const handlers = {}
```

#### Example 2: Developer Dog

asdf

### Want More?

asdf

[amazon-echo]: http://www.amazon.com/echo
[alexa-voice-service]: https://developer.amazon.com/alexa-voice-service
[google-home]: https://madeby.google.com/home/
[alexa-sdk-node]: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
[alexa-developer-skills]: https://developer.amazon.com/alexa-skills-kit/build