---
layout: post
type: post
title: "Using Node to Connect to an IBM i"
description: "iseries data for a Node app, microservice, or any custom API"
category: node
series: node-express-iseries-nsf
tags: [node, express, iseries, jdbc, jt400, notes, domino, nsf]
modified: 2016-04-20
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
asdf

As I break down the specifics for each implementation, you will find that I'm focusing on changing only two files, the js files for the `config` module and for the `util` module. If I were to be using separate data connections within the same app, I would likely separate them into different modules.

The first started when I stumbled across [a long forgotten Facebook message (in the category of Facebook thought I didn't want to see it)](http://www.usatoday.com/story/tech/news/2016/04/07/read-your-secret-messages-on-facebook/82747624/) regarding a comment I had made on [a developerWorks article](https://www.ibm.com/developerworks/community/blogs/pd/entry/using_ibm_db2_from_node_js4?lang=en), stemming from a micro-service I had written, to stand up a Node instance so I could consume data from our IBM i (iSeries/AS400/a power system by any other name) in a more RESTful/REST-like JSON API capacity.

The funny thing about the developerWorks article was that it eventually was refactored/updated to get around a dependency of a data server driver, which apparently is freely available for DB2 on other platforms than the IBM i (the strange things I had to learn at the time). In the end, I switched to using a jdbc package from npm, specifically the one titled 'jdbc' (at version 0.0.15), which since has undergone significant changes in their API format, meaning that I'm going to show a version with updated specifics using the 'jdbc-pro' package from npm.


### Specifics With IBM i and JT400
The core connection component here is [the `jt400.jar`](http://jt400.sourceforge.net/) allowing for a [JDBC connection](https://en.wikipedia.org/wiki/Java_Database_Connectivity). When I first implemented my initial version, I tried using the `jt400` package, which I ended up not using in favor of the `jdbc` package due to [some issues](https://github.com/nodenica/jt400.js/issues/5) and preferences. Currently, the `jdbc` package I used has moved on to a newer, major breaking API change, which I haven't used, so the following will make use of the [`jdbc-pro` package](https://www.npmjs.com/package/jdbc-pro) from npm, which looks to be the one I would choose should I start it again, today.

#### Config
For the config of connection, we'll want to reference establish the url to the IBM i, the path to the `jt400.jar` (my example assumes up a level, in the root of the project), driver name (provided), and a valid user name and password.

Next, I defined a common connection closing function, then two functions for the actual SQL statement handling, one for queries (e.g.- `SELECT * FROM ...`) and one for updates (either `UPDATE` or `INSERT` operations); per the npm package documentation. Lastly, I export those two priary functions as a JS object to be called via their require statement in my app logic.

{% gist ef66a551a04cae3378b42215f3449f03 jt400_util.js %}

#### Use
asdf

### Summary
asdf