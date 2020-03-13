---
title: 'Using Node to Connect to an IBM i'
description: 'iSeries data for a Node app, micro-service, or any custom API'
date: 2016-04-20
published: true
tags: ['node', 'express', 'iseries', 'jdbc', 'jt400', 'notes', 'domino', 'nsf']
series: node-express-iseries-nsf
canonical_url: false
category: node
permalink: /node/node-plus-iseries/
toc: true
---

<!-- {% include series.html %} -->

### Intro

I'm back, this time with a spin on the base application I established in the last post. This flavor of things will utilize JDBC to connect to a DB2 table on an IBM i. This should work with anything the `jt400.jar` can connect to, and should you swap out the `lib/jt400.jar` for any other JDBC jar ([PostgreSQL](https://jdbc.postgresql.org/download.html), [Oracle](https://www.oracle.com/technetwork/database/features/jdbc/index-091264.html), [MySQL](https://dev.mysql.com/downloads/connector/j/5.0.html), etc.), the only changes you would need to make are to ensure your SQL queries/statements are valid for the data source.

As I break down the specifics for each implementation, you will find that I'm focusing on changing only a couple of files, the js files for the `config` module and for the `util` module are the biggest, with mere implementation concerns in the available `routes`.

#### Background

I recently stumbled across [a long forgotten Facebook message (in the category of Facebook thought I didn't want to see it)](https://www.usatoday.com/story/tech/news/2016/04/07/read-your-secret-messages-on-facebook/82747624/) regarding a comment I had made on [a developerWorks article](https://www.ibm.com/developerworks/community/blogs/pd/entry/using_ibm_db2_from_node_js4?lang=en), stemming from a micro-service I had written, to stand up a Node instance so I could consume data from our IBM i (iSeries/AS400/a power system by any other name) in a more RESTful/REST-like JSON API capacity.

The funny thing about the developerWorks article was that it eventually was refactored/updated to get around a dependency of a data server driver, which apparently is freely available for DB2 on other platforms than the IBM i (the strange things I had to learn at the time). In the end, I switched to using a jdbc package from npm, specifically the one titled 'jdbc' (at version 0.0.15), which subsequently underwent significant changes in their API format, meaning that I'm going to show a version with updated specifics using the 'jdbc-pro' package from npm.

### Dependencies

The unique dependencies here are:

* [the `jt400.jar`](https://jt400.sourceforge.net/) (which my `.gitignore` is set to ignore `.jar` files, so you'll need to download and include your own copy of it; I' m parking mine at the path of `lib/jt400.jar`)
* the npm package `jdbc-pro` (which makes its main jdbc module accessible via a `require('jdbc')` statement); install via `npm i -S jdbc-pro`

Part of why you'll need to download and include your own copy is, while I know the project to be open sourced from IBM under the [IBM Public License 1.0](https://opensource.org/licenses/ibmpl.php), I'm just not familiar with that license. For those looking for one, the [tldr legal page for IBMPL](https://tldrlegal.com/license/ibm-public-license-1.0-(ipl)) does a good job summarizing the conditions of the license.

### Specifics With IBM i and JT400

The core connection component here is [the `jt400.jar`](https://jt400.sourceforge.net/) allowing for a [JDBC connection](https://en.wikipedia.org/wiki/Java_Database_Connectivity). When I first implemented my initial version, I tried using the `jt400` package, which I ended up not using in favor of the `jdbc` package due to [some issues](https://github.com/nodenica/jt400.js/issues/5) and preferences. Currently, the `jdbc` package I used has moved on to a newer, major breaking API change, which I haven't used, so the following will make use of the [`jdbc-pro` package](https://www.npmjs.com/package/jdbc-pro) from npm, which looks to be the one I would choose should I start it again, today (and is more consistent with my previous implementation).

#### Data Connection Config

For the config of connection, we'll want to establish the url to the IBM i, the path to the `lib/jt400.jar`, driver name (provided), and a valid user name and password. This is exported as an object, making it directly usable in the data handling (`util`) module, it's been pulled in via a `require` statement. You can see that I'm again using a number of environment variables to assign things like the url property, or username or password. My example has fail-over values, but it's best to keep those separate from the code base.

https://gist.github.com/edm00se/ef66a551a04cae3378b42215f3449f03#i-config_db.js

#### Data Service

Next, I defined a common connection closing function, then two functions for the actual SQL statement handling; that's because this package has two separate methods. One is for queries (e.g.- `SELECT * FROM ...`) and one for updates (either `UPDATE` or `INSERT` operations); per the npm package documentation.

I wrapped up those functions using a common function for both initializing a connection and for closing the jdbc connection. You'll note that I'm approaching [callback hell](https://callbackhell.com/), but I've deliberately avoided this as much as possible by separating out my functions to invoke the passed callback functions and handle any potential errors generated. This can seem tedious, but when it comes to event driven operations, it's best to write code that matches the async nature.

Lastly, I export those two primary functions as a JS object (as methods) to be called via their require statement in my `routes` files.

https://gist.github.com/edm00se/ef66a551a04cae3378b42215f3449f03#i-util_index.js

#### Use

Now that my connections are configured and my data handling is provisioned, all I need to do is invoke it in my various `routes`. As you can see from my data `util` module, the exposed `query` method is simple enough to use:

* `require` the module
* call the `query` (or `update`) method
* passing in the SQL query and
* a function, which has two parameters, error or data

This way, if the error handle is null, it will not execute the error block, and vice versa. At this point, I hope the up-front modularizing is starting to show off its utility, as the implementation is about as simple as you can get.

https://gist.github.com/edm00se/ef66a551a04cae3378b42215f3449f03#i-routes_beers.js

The other available `routes` all get updated as well, but they're virtually identical, save for the specifics of the SQL query.

### Source Code

You can find my source code for this version of the project, in full, in [the same GitHub repository as last time, just in the `iseries` branch](https://github.com/edm00se/express-app-fun/tree/iseries).

### Summary

As you can see, once we've configured and provisioned our connection, we can use it pretty easily. While wrapping up a bunch of queries to an RDBMS via JDBC can seem a bit silly, I have to say that the performance benchmarks I did at the time were quite impressive and the micro-service had the great benefit of being easily maintained outside my main production application, either by myself or another developer (who helped in setting up the SQL queries, due to their more intimate knowledge of the DB2 tables).

You can probably guess what's coming up with the next post in this series. Once we connect, in a well structured way, to any data source, any data source becomes swappable by configuration. So tune in next time for an early, expanded example of the use and implementation of the [domino-nsf](https://www.npmjs.com/package/domino-nsf) package for access to a Notes/Domino file.
