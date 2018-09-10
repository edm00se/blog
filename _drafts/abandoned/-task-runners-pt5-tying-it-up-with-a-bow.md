---
layout: post
type: post
title: "Task Runners pt.5:"
description: "tying it all up with a bow"
category: web
series: task-runners-with-domino
tags: [grunt, gulp, git, scm, static, generator]
modified: 2015-12-10
comments: true
share: true
---

{% include series.html %}

<!-- auto-magic TOC! -->
<section>
  <header data-toggle="tooltip" title="it's dangerous to go alone, take this">
    <h2>Contents</h2>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section>

### Intro
Last time, we covered how to install, configure, and use gulp to automate some useful tasks and how gulp is differentiated from Grunt. Some of those differences were specific to "piping" task actions through each other, is a bit more succinct, embraces streams which let the async capabilities take off, and the available plugins make the `json-server` back-end mock easy to invoke for continuous use while in ongoing development, or for one-off build commands (`gulp` vs `gulp build`, or other individual tasks).

### Taking It Further
Last time I attempted to answer the question of "where is this all going?" with a focus on answering some of the greater automation concerns that have been on my mind. In fact, I've recently been making greater strides towards automating XPages application builds in no small part thanks to the [Swiper](https://github.com/camac/Swiper) and [BuildXPages](https://github.com/camac/BuildXPages) efforts by [Cameron Gregor](http://www.gregorbyte.com/). Cameron has been helpful in answering the occasional question as well, adding him to the list of people I would enjoy purchasing a beverage for in-person, should the opportunity arise. What I want, ultimately, is automatic builds, automatic tests (unit and browser), and automatic documentation.

For now, I want to bring the focus of this task runner series back to how it started, as a solution to aiding the front-end asset development, building, and testing. I'll be coming back to the testing aspect in a subsequent post, as it is large enough to be its own topic.

### Unit Testing
I mentioned that I will be coming back to this topic, but I'm going to describe the "moving pieces", in case anyones unfamiliar with them. A good description can be found [from artofunittesting.com](http://artofunittesting.com/definition-of-a-unit-test/),

> A unit test is an automated piece of code that invokes a unit of work in the system and then checks a single assumption about the behavior of that unit of work.

In order to write a test, we need a way to define what the test performs as the test, how what we're testing should act, and bounds for success and failure. This all runs within a test runner. Seeing as I'm an AngularJS fan, one of the test runners of note is [karma](http://karma-runner.github.io/) (previously known as testacular). Karma is installable via npm (`npm install karma --save-dev`) and has additional plugins for launching in specific browsers and different report formatters, etc.

We then create a config file (such as with `karma init`) and set up the rules to follow regarding testing framewark (like 'jasmine'), dependencies, browsers to test in, where the source files are located (e.g.- `./src/**/js/*.js` and `./test/**/*Spec.js`), and whether to watch the test files and re-run on change. Those test spec files are what actually define individual tests and by convention should mirror the organizational structure of the application code.

For example, should we have a controller managing the logic of a routed part of an Angular app, a test would likely be written to test that the controller instantiates correctly, interacts with services correctly, validates (if it does so) correctly, and performs any CRUD operations as-expected. This may seem like a fair amount of overhead to "just coding", but if you've ever had to trouble-shoot a quriky issue only to find that the source could have been easily prevented with some continuous integration style testing, you may join the ranks that find it worthwhile. Taking a Test-Driven Development approach, where you write the test as you write the actual application code, has merits in that you take the test writing in small chunks, as you progress, making it become a more fluid process.

The structure of a test spec generally follow a couple of similar conventions revolving around the main block _describing_ what a tested bit of code _should do_ (making it handy to report to the log or console) and contain individual definitions about the tested logic; this generally amounts to an "assertion".

For example, should you be using karma as your test runner, you would need to describe your tests using a framework such as [mocha](https://mochajs.org/) or [chai](https://github.com/xdissent/karma-chai) to write according to the assertion library's appropriate definition. Here's [a link to how chai defines its assertions](http://chaijs.com/api/bdd/).

### Automation in Continuous Integration
asdf

### Document on Every Build
asdf

### The Sky's The Limit
asdf

### To Be Continued?
