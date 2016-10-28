---
layout: post
type: post
title: "Using Node to Connect to ... Almost Anything"
description: "the options are nearly limitless"
category: node
series: node-express-iseries-nsf
tags: [node, express, iseries, jdbc, jt400, notes, domino, nsf]
modified: 2016-04-18
comments: true
share: true
---

{% include series.html %}
{% include toc.html %}
### Intro
This is currently expected to be [a three-part series]({{ site.url }}/node-express-app-fun/). It will seem like a bit of a departure from my usual Domino and XPages grounded topics, but it will come full circle by the end of the series; trust me. This first post will be the ground work to a fully functional Node+Express app that will be the foundation for two different flavors that I'll get into over the following couple of posts.

I've recently had two things surface, both of which are rather related and different in implementation. I'll describe both in the next two posts, but first, some ground work on the common base of the Node app that will be used by both versions. The best part of this all is that when you create well structured app, the abstraction of the data service becomes different only by configuration.

### Node and Express
I'm using [Express](http://expressjs.com/) to assist in some of the web server aspects of this app; it's a pretty popular framework that reads fairly easily. There are plenty of other web frameworks for Node out there, but Express has generally been my preference for some time; use whatever works for you, but be sure to read the API docs.

### Scope of Demo
This will illustrate setting up an Express app with:

* a highly configurable app layout, with:
  * app `config` module
  * a `routes` module
* data access through a `util` module

I am not demonstrating:

1. authentication middleware, such as any of the "strategies" for [passport](http://passportjs.org/)
2. [Express Router](http://expressjs.com/en/4x/api.html#router)
3. specifics of individual data service connections... yet (two interesting ones coming over the next two posts in this series)

### Base App Layout
Structurally speaking, both versions are the same app, just with different data services plugged into them. At a high level, the common parts are:

* `server.js` - contains the main definition of the server, creates the app as an Express app, and pulls in the `routes` module (Node is generally pretty big on the [module design pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript))
* the `routes`  module, which since the `require` pulls it in by directory, it grabs the `/routes/index.js` first, which then pulls in the other endpoints' `.js` files, establishing the route information for those collections (and inevitably more beyond this example)
* each of those endpoint definition files perform the data service operations via functions defined in the `util` module (this is where I copied in a version of the functions to perform the actual API specific look ups, wrapped up and exported again as a module)
* the `util` module and `server.js` make use of some app config, which is defined in the `config` module, which also allows for a couple of environment variables

Here's a project tree breakdown, minus the `node_modules` folder, ReadMe, etc.:

```bash
.
├── config
│   └── index.js
├── package.json
├── public
│   └── readme.html
├── routes
│   ├── index.js
│   └── views.js
├── server.js
└── util
    └── index.js
```

#### Dependencies
I breezed over the dependencies when I first posted this, since there are a whopping two (you'll note I require 'path', but that's part of the Node core, so it's a freebie, just like 'os'), and I've [blogged about installing npm packages before]({{ site.url }}/task-runners-with-domino-apps/). To make a long story short, with the required dependencies of [express](https://www.npmjs.com/package/express) and [express-toobusy](https://www.npmjs.com/package/express-toobusy), our install will look like `npm i -S express express-toobusy`. The `i` is short for `install` and the `-S` is short for `--save` (which saves to the `package.json`).

Alternatively, if you [clone the repository's `master` branch](https://github.com/edm00se/express-app-fun/tree/master), all you need is to run `npm install`.

#### `server.js`
The main server definition, which sets itself up with an [express](http://expressjs.com/) app handle, instantiates [`express-toobusy`](https://www.npmjs.com/package/express-toobusy) (to keep the Node process from melting under _extremely_ high loads), pulls in the `routes` module for the endpoint handling, and creates an error handler. The last thing is telling the app to listen on a port, meaning the app is running.

```javascript
/*  file: /server.js */
var express = require('express'),
  app = express(),
  os = require('os');

//enables and instantiates express-toobusy, which keeps it from melting under HIGH pressure
app.use(require('express-toobusy')());

require("./routes")(app);

//establish simple text catch for Error 500
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send("<h1>Error 500</h1>\nSomething broke! The error has been logged to the server console.");
});

//set to listen on environment port or port 3333, if no detected env var port
var portToListenOn = process.env.PORT || 3333;
app.listen(portToListenOn, function(){
  console.log("NodeJS serving content from "+__dirname+" on "+os.hostname()+":"+portToListenOn);
});
```

#### `routes/index.js`
The `index.js` of the `routes` module is there to pull in the specific endpoints, which are contained within their own js files within the `./routes/` path.

```javascript
/*  file: /routes/index.js */
var path = require('path')

// export a function that accepts `app` as a param
module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.sendFile(path.join(__dirname, '../public', 'readme.html'));
    });

    // this should be in a `beers.js` file, pulled in by require('./beers')
    app.get('/beers', function(req, res, next){
        res.send('beers!');
    });

    // require('./breweries')(app);
    // require('./vineyards')(app);
    // add new lines for each other endpoint defined in its own file for simplicity
};
```

#### Config
The config module holds configuration info about the app, which is mostly unused in the initial version of this app. The two specific ones will rely on external connections, the properties of which will get stored here. For now, it's a placeholder module.

### Code Repository
The code for this base version of the app in its entirety, confirmed working with "hello world" style endpoints, returning `application/json` data, can be found [on GitHub](https://github.com/edm00se/express-app-fun) in my [edm00se/express-app-fun repository](https://github.com/edm00se/express-app-fun). More will be added as [this blog series]({{ site.url }}/node-express-app-fun/) progresses.

### Summary
Hopefully this all seems pretty straight forward. The next post should come along soon, containing some goodies related to one flavor of this style of RESTful API microservice that I had used for a while, to pull some data off of our IBM i. I'll get into the benefit of doing so in th enext post.
