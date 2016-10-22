---
layout: post
type: post
title: "A Brief Intro to Nginx"
description: "liberating your DDE local web preview"
category: nginx
tags: [xpages, domino, javascript, nginx]
modified: 2015-03-23
comments: true
share: true
---

### Intro
This is a brief intro to nginx, the reverse proxying web server I've fallen in love with every time I've used it. I'm by far [not the first person to blog on the subject](https://frostillic.us/blog/search?q=nginx), but this may be a good starting point for some people.

While setting myself up for editing the AngularJS version of my app for [my Java servlet series]({{ site.url }}/servlet-series/), I set up my git repo to be accessible both inside and outside of my DDE vm, fired up local web preview, and realized that my connection to said local web preview was denying my connections, as I was accessing it from another IP. On top of all this, unless I'm hosting my HTML, JS, or CSS files (my static content) from within the design elements of Pages, Scripts, or Style Sheets, I wasn't going to get any _gzip_ response benefits, regardless of the XSP Properties setting.

<blockquote class="twitter-tweet" lang="en"><p>Wanted to use local web preview w/ <a href="https://twitter.com/hashtag/XPages?src=hash">#XPages</a> outside my vm, access denied. Now, my <a href="https://twitter.com/hashtag/nginx?src=hash">#nginx</a> reverse proxy has solved that problem in ~5 minutes.</p>&mdash; Eric McCormick (@edm00se) <a href="https://twitter.com/edm00se/status/579458988883988480">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### Nginx: the 'What' and 'Why'
Nginx (pronoucned "engine X") is an open source HTTP [reverse proxy](//en.wikipedia.org/wiki/Reverse_proxy) web server. It also does normal file serving, etc., but its primary goal is to be a reverse proxy. This has many benefits and comes up very commonly as being a front-end server for [Node.js](//nodejs.org/) applications; so serve the static content, offload cached response handling to something other than a Node.js REST API (e.g.- if the content doesn't change, don't re-build it), and other front-end things like minification or gzipping responses or more complex tasks like load balancing. These all have very obvious advantages, I'll just fill you in on the few I've used for this situation.

Aside: I've used Nginx as a front-end server for a couple Node.js apps at work and have impressed my admins with the ability to make their lives easier with their managing of a web server's SSL certificates and other admin-y thngs, all independent of the application server, it's been a hit. In fact, if we weren't running all our Domino server traffic through a Citrix NetScaler, we would be running an Nginx reverse proxy in front of every Domino server serving web content, after this past year's POODLE scare.

### Setup and Config
In order to access a server hosted within a vm (guest), for development purposes from the host OS, which is restricted to same origin / localhost only requests, I set up a siple nginx reverse proxy to forward my requests.

### Steps

1. To install in a Windows VM, download and install [nginx](http://nginx.org/) from the current, stable release; I installed to C:\nginx\
2. Edit the _&lt;install path&gt;/conf/nginx.conf_ file with the marked changes in the file of the same name in this gist.
3. Start the nginx executable, located in your install path. There are service wrappers for Windows, or you can just kill the process to stop the nginx instance.

#### Commands for Windows
More information on the implementation of nginx in Windows can be found on [the corresponding docs page](//nginx.org/en/docs/windows.html). Here's the basic breakdown of commands, form within the nginx install directory:

{:.table .table-bordered .table-striped}
| Command         |                                                                                      |
|-----------------|--------------------------------------------------------------------------------------|
| start nginx     | starts the process                                                                   |
| nginx -s stop   | fast shutdown                                                                        |
| nginx -s quit   | graceful shutdown                                                                    |
| nginx -s reload | config change, graceful shutdown of existing worker proc, starts new                 |
| nginx -s reopen | re-open log files                                                                    |

### Description
The config file contains a _server_ block, inside which is a _location /_ block. Inside that location block, we need to replace the root and index assignment with a *proxy_pass  http://127.0.0.1:8080;* line and a *proxy_http_version  1.1;* line.

### Sample Nginx.conf
{% gist 306e8dacaac50ec49e56 nginx.conf %}<br />

### My Speed Claim
I tweeted a pretty strong sounding result. In fact, I believe that my DDE local web preview being freshly restarted was part of the ridiculously long response for my data set, but there was still a significant improvement of around 400-500ms (down from just over a full second to just over half of one); which shows the improvements gained from *gzip*ing the static elements.

<blockquote class="twitter-tweet" lang="en"><p>Enabling gzip, minification, and caching for static assets in <a href="https://twitter.com/hashtag/nginx?src=hash">#nginx</a> and watching my load time drop from 2.5s to 550ms makes me a happy guy.</p>&mdash; Eric McCormick (@edm00se) <a href="https://twitter.com/edm00se/status/579719285012094976">March 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### Summary
You don't always need a reverse proxying server in front of your application server, but what it can add to your immediately accessible capabilities, and the segregation between admin-y tedium and application development, is pretty awesome.
