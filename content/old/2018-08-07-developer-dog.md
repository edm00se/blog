---
layout: post
type: post
title: "Developer Dog"
description: "an Alexa skill for fun and encouragement"
category: serverless
tags: [serverless, alexa, aws, amazon, echo, javascript, node, faas, skill]
modified: 2018-08-07
comments: true
share: true
permalink: /serverless/developer-dog-alexa-skill/
series: serverless-intro
---

{% include series.html %}

Hello from [#THATConference][that-conf]! This is my second year attending and I've been quite happy. The only thing I miss here is the great people I had the privelege of meeting and seeing within the IBM and friends world, such as the always excellent [MWLUG](http://mwlug.com) that was a little over a week ago, but my work has shifted away over the last year. I'm looking forward to a couple of ideas in the future though, so who knows what the future will bring.

There's nothing like a full day at a conference to get your developer juices flowing and a desire to get back to contributing to the blog. I also want to clear out this series to make room for other, related, topics. So here it is! When last we left off, we had covered the basic structure of a serverless function, complete with the needed hooks and handlers for use as an Amazon Alexa Skill.

### Why Dogs?

They're pure creatures who are generally friendly and happy to please. This is a pretty encouraging thing, especially combined with many beginners needing a little encouragement when they get into software development.

### An Expanded Example

The skill is one that retrieves an array of possible encouraging sayings, generally within the vein of dad jokes, which are dog themed. This array could come from anywhere, some backing database connected via RESTful API, GraphQL, or more. So long as the serverless function can connect to it, it's viable. This example builds from a JSON response hosted on a static site. It's not terribly dynamic, but it's updatable and serves the purpose of being available from a static site, to show off some of my amazing punny sayings. You can find that site's repository at [github.com/edm00se/dev-dog][dev-dog-site-repo], and the live site at [edm00se.codes/dev-dog][dev-dog-site-url].

Ultimately the skill will allow us to get a random "fact", this follows the fact skill format, when querying an Alexa device. It will get a random selected string from the array, then speak it. So let's being.

#### 1. Getting The Data

We'll be accessing an array of string values. It's coming from a known endpoint and will be a JSON file. My approach is to create a data handling function, in its own JavaScript file, which we can require in and use to access the data. This abstracts away any data operations from the functionality of the application logic.

{% include gist.html id="f2245b183ce69f28879ab2191a711491" file="facts.js" %}

##### A Note on Fetch

Why am I using [Axios][npm-axios]?

TL;DR: There's no native support of the native browser [Fetch API][mdn-fetch-api]. This means we need to use _something else_. Initially, I tried using the `node-fetch` package for consistency, but that was a little bloated for my needs. Ultimately, I tried `got` and `axios` packages as well and wound up selecting `axios` for its ease of use, popularity, easy to use API, and file size. For more, check out [my asciicast comparing sizes of these options][fetch-option-asciicast].

<br />
<div class="center">
  <amp-iframe
    height="420"
    width="518"
    sandbox="allow-same-origin allow-scripts"
    layout="responsive"
    resizable
    frameborder="0"
    src="https://asciinema.org/a/153546/embed?autoplay=0">
  <div overflow
    tabindex="0"
    role="button"
    class="ampstart-card py1"
    aria-label="Show more">Click to show more</div>
  </amp-iframe>
</div>

\*note: please excuse the junk formatting, apparently asciicasts don't enjoy being shoved into an iframe (in AMP ð)

#### 2. Registering Handlers

Registering the intent handlers is quite similar to [the basic one outlined in the previous post](/serverless/hello-alexa/#configure-your-handlers). The largest difference is that the "facts" are being brought in via a handle to a promise, the resulting array has a random member selected, and the response is built out. In this skill, I'm also building out a "card", which is displayed in the app or on a visual Echo device.

{% include gist.html id="f2245b183ce69f28879ab2191a711491" file="handlers.js" %}

#### 3. Upload and Configure Alexa Skill

The last thing to happen for this to work is a set of build and deploy steps. Specifically:

1. building a zip file (since this is larger than the AWS Lambda in-browser editor will allow to directly edit, with the included dependencies)
2. uploading the zip file to the AWS Lambda console
3. configuring the Alexa Skill in Skill Builder for:
  - utterances
  - intent(s) to launch
  - certifications (regarding privacy, etc.)

This last topic is a whole bit unto itself, so I'll follow-up next time with a video walkthrough of how to wire it all up.

### Want More?

I hope this may have sparked some curiosity in getting into both serverless functions and maybe even Alexa Skills. So please feel free to check out [the Developer Dog Alexa Skill][dev-dog-skill-amzn]. It's basic, but brings in much of what's at play in a serverless function and what it takes to create an Alexa Skill.

### Future Plans

I've begun standardizing a couple of the steps for my personal projects, such as incorporating some nifty npm scripts to package and bundle up a zip archive that can be uploaded more easily to the AWS Lambda interface for updating. These will need to be for another day though. Until next time, let's build better apps!

[that-conf]: https://www.thatconference.com
[dev-dog-site-repo]: https://github.com/edm00se/dev-dog
[dev-dog-site-url]: https://edm00se.codes/dev-dog/
[dev-dog-skill-amzn]: https://smile.amazon.com/edm00se-Developer-Dog/dp/B06XVW6TLL?sa-no-redirect=1
[npm-axios]: https://npm.im/axios
[mdn-fetch-api]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[fetch-option-asciicast]: https://asciinema.org/a/
