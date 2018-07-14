---
layout: post
type: post
title: "Developer Dog"
description: "an Alexa skill for fun and encouragement"
category: serverless
tags: [serverless, alexa, aws, amazon, echo, javascript, node, faas, skill]
modified: 2018-06-29
comments: true
share: true
permalink: /serverless/developer-dog-alexa-skill/
series: serverless-intro
series-part: 2
---

When last we left off, we had covered the basic structure of a serverless function, complete with the needed hooks and handlers for use as an Amazon Alexa Skill.

### Why Dogs?

They're pure creatures who are generally friendly and happy to please. This is a pretty encouraging thing, especially combined with many beginners needing a little encouragement when they get into software development.

### An Expanded Example

The skill is one that retrieves an array of possible encouraging sayings, generally within the vein of dad jokes, which are dog themed. This array could come from anywhere, some backing database connected via RESTful API, GraphQL, or more. So long as the serverless function can connect to it, it's viable. This example builds from a JSON response hosted on a static site. It's not terribly dynamic, but it's updatable and serves the purpose of being available from a static site, to show off some of my amazing punny sayings. You can find that site's repository at [github.com/edm00se/dev-dog][dev-dog-site-repo], and the live site at [edm00se.codes/dev-dog][dev-dog-site-url].

Ultimately the skill will allow us to get a random "fact", this follows the fact skill format, when querying an Alexa device. It will get a random selected string from the array, then speak it. So let's being.

#### 1. Getting The Data

We'll be accessing an array of string values. It's coming from a known endpoint and will be a JSON file. My approach is to create a data handling function, in its own JavaScript file, which we can require in and use to access the data. This abstracts away any data operations from the functionality of the application logic.

asdf



### Want More?

I hope this may have sparked some curiosity in getting into both serverless functions and maybe even Alexa Skills. So please feel free to check out [the Developer Dog Alexa Skill][dev-dog-skill-amzn]. It's basic, but brings in much of what's at play in a serverless function and what it takes to create an Alexa Skill.

### Future Plans

In the future, I expect to record a short screencast to go over how to wire up the Alexa Skills themselves, a process which has thankfully improved over time. I've also begun standardizing a couple of the steps for my personal projects, such as incorporating some nifty npm scripts to package and bundle up a zip archive that can be uploaded more easily to the AWS Lambda interface for updating. These will need to be for another day though. Until next time, let's build better apps!

[dev-dog-site-repo]: https://github.com/edm00se/dev-dog
[dev-dog-site-url]: https://edm00se.codes/dev-dog/
[dev-dog-skill-amzn]: https://smile.amazon.com/edm00se-Developer-Dog/dp/B06XVW6TLL?sa-no-redirect=1