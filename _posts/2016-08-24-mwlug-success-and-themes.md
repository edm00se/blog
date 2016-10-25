---
layout: post
type: post
title: "MWLUG Success"
description: "and some thoughts on themes of the conference"
category: self-promotion
tags: [node, npm, yeoman, angular, vue.js, webpack, java, xpages, rest, api, scm, git, mwlug]
modified: 2016-08-24
comments: true
share: true
---

### Intro
MWLUG was a great success as far as I'm concerned. Each time I've gone I've had the great enjoyment of being able to attend some high quality sessions, meet with lots of colleagues and friends from the community, and get a view into products and solutions many people are undertaking, over conversations and interactions outside of the sessions. This is always a great way of interacting with others who were able to make it. Unlike the IBM conference of Connect(EDsphere), this is purely community driven, put on by a great crowd, and benefits a worthy charity at an excellent venue.

### Session Info
My session title was "BP101 - A Modernized Developer's Workflow with Domino/XPages". This was meant to be extension to of the concepts and topics I talked about both at Connect and ICONUS; I had previously focused on the front-end development and "build to ODP/WebContent/" process, which carries several advantages.

#### Topics
To extend that thought, I covered, in addition to the above, a combination of:

- back-end/front-end separation philosophy
- business logic segregation
- front-end framework usage in Domino/XPages
- project scaffolding
- automated builds and deployments

#### Topics I Meant To Cover
Also known as "topics I ran out of time for", but that's the hazard of doing a "choose your own adventure" with the audience for the demo portion. In fairness, I didn't expect to make it that far, as most of the demo was a grab bag of practices and components.

- unit tests
- code coverage
- pre-git commit hooks (for enforcing of test coverage and code quality levels)

#### Tools
Some specific tools I used and demonstrated were:

{:.table .table-bordered .table-striped}
| Tool                                                   | Purpose                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------- |
| [generator-xsp](http://npm.im/generator-xsp)           | For scaffolding out a Domino/XPages compatible ODP         |
| [angular-cli](http://npm.im/angular-cli)               | For scaffolding out an Angular(2) app                      |
| [vue-cli](http://npm.im/vue-cli)                       | For scaffolding out a vue.js app                           |
| [npm scripts](https://css-tricks.com/why-npm-scripts/) | For scaffolding out a Domino/XPages compatible ODP         |
| [webpack](https://webpack.github.io/)                  | As part of angular-cli(@webpack) and vue-cli dependencies  |

Many scaffolding tools make use of [npm scripts](https://css-tricks.com/why-npm-scripts/) for [build pipelines](http://blog.modulus.io/using-npm-scripts-to-build-asset-pipeline) and they're handy to learn regardless.

As for [`generator-xsp`](https://github.com/edm00se/generator-xsp#readme), it's in its early stages, but it's a [yeoman]() generator which scaffolds a base Domino/XPages compatible On Disk Project, for easy application scaffolding. It's in its early stages, but I have a basic [road map](https://github.com/edm00se/generator-xsp#road-map) established, PRs are welcome. Once configured and set, all that's needed is for the ODP to be imported into Domino Designer (DDE) for the back-end work and previewing the front-end against a "live" back-end. As demonstrated in the demo, I showed how a built front-end app could mock the back-end for editing and previewing outside of DDE, with an optimized (distributable) version built into the ODP's `WebContent` path for highly performant and modern web application use.

#### Process
All in all, the ultimate goal of my session was to demonstrate more of the higher process of development workflow automation. If a job is repeatable and/or configurable, why not automate it? There's a great [argument for automation](https://medium.com/@kentcdodds/an-argument-for-automation-fce8394c14e2), which hinges on the concept of automation not just as a convenience, but as a configurable standard. We can all use a bit more automation in CI/CD concerns, building performant versions of our web apps, testing, documentation, and even project scaffolding.

<figure>
	<a href="{{ site.url }}/assets/images/post_images/AutomateTheStuffing.png"><img src="{{ site.url }}/assets/images/post_images/AutomateTheStuffing.png"></a>
	<figcaption>We should all be a bit more like Mark Whatney.</figcaption>
</figure>

#### Slides and Repository
The [git repository is on GitHub](https://github.com/edm00se/BP101-A-Modernized-Developer-Workflow-With-Domino-and-XPages), which isn't overly special other than it contains a number of "hello world" style apps with various front-end technologies (TypeScript, Angular 1, Angular 2, and vue.js), along with one slightly more intensive app (vue.js) which demonstrated the above capabilities. As for the slides, they're available in the `docs/` directory in the GitHub repo in `.key`, `.pptx`, and `.pdf` formats, as well as on [SlideShare](http://www.slideshare.net/edm00se/bp101-a-modernized-workflow-w-dominoxpages). If you're looking for more of my talking points, check out the `.key` or `.pptx` formats, as my speaker notes should be in there.

### Themes and Subtext
MWLUG saw its fair share of conjecture regarding the future of Domino. While we've been getting a mix somewhere between radio silence and confusing messages, hopefully we can have the record set straight and be able to get back to work. For some time, I've been a proponent of using Domino/XPages in a way that speaks to the power of the XPages runtime and uses all the modern front-end tooling. This helps us keep our skills sharp and marketable, yet makes good use of our existing systems. I won't talk about _should the worst happen_, as I've not heard anything truly definitive yet, but keeping our applications and business logic portable is _always_ a good idea.

### Summary
Thanks to those that attended my session. I think we had a great time and some good discussion, along with a few cool toys being demonstrated. Until next time, :beers:!
