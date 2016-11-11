---
layout: post
type: post
title: "Scripting Server Upgrades"
description: "GitLab running in Docker and the never-ending case for automation"
category: scm
tags: [scm, git, gitlab, docker, bash]
modified: 2016-11-11
comments: true
share: true
---

### Intro
This one might be slight departure from my usual, but those that have followed my blogging this past year will have noticed a bit more of a leaning towards DevOps in some of my posts. This echoes a lot of what I've been concluding as increasingly a necessary part of _development_; that we need to consider a picture large enough to encompass the themes surrounding development functions and, like any good developer (DRY ~= "lazy"), automate the heck out of it.

{% include tweet.html id="796390523032498176" %}

### Overview
I had [previously blogged]({{ site.url }}/scm/self-hosting-scm-server/) on some of the scm hosting options available, both external and self-hosted options, and my personal take on a few of them. I've generally gone the direction of being increasingly git-centric, which has led me to implement a GitLab instance at work. I had previously run GitLab but then switched off, as I ran into an issue that seemed to be a corrupted data store from back around the version 7.10-ish timeframe. I had also been running it natively on an Ubuntu host. When I finally came back to GitLab, this time for at work, I decided that manually installing via the scripted omnibus package just _wasn't for me_; some of what I remember is that I had to jump through hoops on configuration, fighting dependencies with the Ubuntu repositories, and a surprising amount of upkeep just to upgrade. From what I've heard from others since then, it sounds to have smoothed out a bit, or my experience was atypical; always a likely explanation in my case, it would seem.

#### Docker
Another of my recent infatuations is with containerization, specifically Docker. The best part about this new GitLab server we stood up at work is the fact that my admin and I decided to roll it in a docker instance. This was meant to preclude some of the issues I had run into and provide an initial deploy of our first Docker-ized app, for hopefully an easier to upgrade process. This has held true and paid off several times over. In fact, I've graduated from merely copying and pasting my `docker run` command into wrapping it into an `upgrade.sh` shell script, so as to prevent the possibility of my mistakenly not copying or pasting correctly. This has been a great win, especially as the GitLab team is hard at work with new features and plenty of security patches coming out seemingly weekly, or faster.

### Why Script Something Already Short?
In all honesty, if you've heard of the concept of "configuration over code", my take on it is that we should go out of our way spend a little bit of programming effort making our code more easily configured. This may or may not match up exactly with any coding ideologies, but the important take-away is that this is all an [argument for automation](https://medium.com/@kentcdodds/an-argument-for-automation-fce8394c14e2). Automated, or scripted, processes mean not just a reduction in time spent, but also a decrease in likelihood of human error and provides a learning opportunity for those embracing the process.

### Details
The GitLab instance I've settled on is not far off of [the example docker command given on the GitLab site](https://docs.gitlab.com/omnibus/docker/#run-the-image). What is different is a couple of specifics relating to our HTTPS certificates. Here's the genericized version of the docker command at the heart of things.

#### The Docker Command

{% include gist.html id="764c067ec485f5cf1d1518f71dd2d029" file="docker_cmd.sh" %}

For those wondering, the published ports are binding the exposed ports (80 and 443) on alternate bound ports to the host OS. This then runs through a host OS [Nginx](http://nginx.org/) reverse proxy. You can note that the executed instance is `--detached`, meaning not bound to the immediate shell session (runs in the background), `--restart always` is set so that it will start when the host OS is restarted (and the docker daemon starts up). Additionally, you can see our `--volume` mount points which bind the local file system (in `/srv/gitlab/`) to various directories contained within the docker container; these give persistence, as the upgrade process actually removes, as in deletes, the existing instance entirely, then is created again new, just quickly and consistently enough to not realy seem "new". It also specifies that we're going to use [the "latest" corresponding tag for gitlab-ce (in the gitlab published space) from Docker Hub](https://hub.docker.com/r/gitlab/gitlab-ce/).

#### The BASH Script

{% include gist.html id="764c067ec485f5cf1d1518f71dd2d029" file="upgrade.sh" %}

Even if you aren't accustomed to writing or reading shell scripts, you should be able to follow this pretty easily. For the most part, you can see I'm setting some variables such as the `CONTAINER_NAME` (gitlab), `DOCKER_SOURCE` (gitlab), and `VERSION` (latest). Otherwise the progression is generally to the effect of:

- pull the latest tag from Docker Hub (done while existing container is running, no harm done)
- existing container stopped and removed
- new version of container (from newly pulled tag) is started up in the same fashion, inheriting data (PostgreSQL), log folders, config, and HTTPS certificates

I even included a helpful reminder at the end of the script to watch for the migration task, which consumes a fair amount of the allowed CPU for a minute or two.

### Summary
All in all, neither the task nor the scripted solution were terribly difficult, but it puts things at a high level of consistency and makes it so easy, that virtually anyone with SSH access to the host server could do the upgrade with virtually no knowledge of either docker or GitLab. To demonstrate how easy this all is, I even went so far as to snag a recording on [asciinema.org](https://asciinema.org), but it's mostly just waiting for progress bars to complete, so I'm not embedding it here.

I hope this may spark some interest for someone out there. I've had nothing but great experiences with running GitLab in a docker container, including the couple (incredibly rare) occasions that something went wrong (generally a permissions thing, easily solved with the right command) as being able to roll back a version is pretty darned easy; one can merely replace "latest" with the previous tag as listed [on Docker Hub for GitLab](https://hub.docker.com/r/gitlab/gitlab-ce/tags/) and re-run the `upgrade.sh` for a reversion. If anyone has further questions, let me know. 🍻
