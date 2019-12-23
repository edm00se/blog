---
layout: post
type: post
title: "Composing With Docker"
description: "a config in the repo beats a script on the host"
category: docker
tags: [scm, git, gitlab, docker, docker-compose]
modified: 2017-11-02
comments: true
share: true
permalink: /docker/composing-with/
header_img: larisa-birta-102093.jpg
header_img_w: 920
header_img_h: 359
header_img_alt: "orchestral strings section"
header_img_attrib: "https://unsplash.com/photos/slbOcNlWNHA"
---

### Background

About a year ago, I blogged on [automating server upgrades with Docker and a BASH script](/docker/scripting-server-upgrades/). This met the needs I had at the time, and worked itself out to be pretty stable. But, since I think about such things and always question my preconceptions, I went down a path of creating a [Docker compose config file][compose-file], something I wouldn't have had to create from scratch by waiting a little while as [one appeared as an example from GitLab][gitlab-compose-file-ex]. As it turns it, it was a great learning experience regardless, so this post isn't so much meant to solely cover the contents of a config, but rather the process I took to get there.

In the process of converting, the logic has wwitched from being contained purely a script, which was written in BASH and could be somewhat more difficult for some to read, to a [YAML][yaml-url] config file; `docker-compose.yml`. YAML may seem strange at first to some people, but most people understand the concept of `key` to `value` pairings, so I would hazard this would pass the "my mother" test\* of ease of reading. YAML is meant to be "...a human friendly data serialization standard for all programming languages."

\*Note: that's not an insult mom, it just illustrates the point.

### Docker Compose

A Docker compose file is written in [YAML][yaml-url] and follows a [certain file specification][compose-file]. The basic idea is to define "services", configured with any port, volume, or links to other dependant containers. These generally follow the `docker run` command line option flags, along with some other added benefits. If you caught it, that means that a Docker compose file can define between one and a large number of containers, as opposed to requiring a separate execution of `docker run ...` to create each one manually from the CLI; this multi-container capability, combined with setting my options permanently\*, is what first drew me into using Docker compose.

#### A Brief Conceptual

Say you have a web application, which runs in Node, and talks to a database (this should work for any runtime that has a dependency list and manager). Presuming you're handling all db creation/configuration via scripts already, the creation of a specific instance, aside from instance/live data, is pretty trivial, especially if you can pull it from a base Docker image already. So, assuming your applications `Dockerfile` achieves the basic requirements, then all that's left is to effectively "wire up" the configuration of things such as persisted volumes, port mapping, etc.

If you're looking for such an example that's boiled down and easy to follow, [here's one I prepared earlier][gh-compose-example].

### Creating the Config

A `docker-compose.yml` file, alternatively any `.yml` and can be used with the `docker-compose` command (`-f some-other.yml` or `--file`) has properties defined at the high level and inside of others. At the high level, a `version` is required, as specifics change across different release versions. Then, we'll need to define our services. Additional high level properties could be `volumes`, as sharing a persisted volume between containers requires a higher level definition than inside a given service.

#### Project Directory

Here's a simplified directory tree of how this would look.

```sh
my-sample-app
âââ app.js
âââ docker-compose.yml
âââ Dockerfile
âââ node_modules
âââ package.json
```

#### Config Basics

{% include gist.html id="ccab5a897aa47faa4b2fb4881f8a6bf2" file="docker-compose.yml" %}

The `Dockerfile` information relevant to build a container from a base image, so only things like persisting volumes and port bindings are generally at play.

#### Filling It Out

From the given example, you can see the ports are bound and persisted volumes are specified. The formatting of these lines follows `hostPort:containerPort` (the port on the host OS binding to the port that the containerized application is exposing). If you ever question the syntax, consult [the documentation][docker-compose-port-short-syntax]. If you're forgetful like myself, you may need to re-read it a couple times before it sinks in.

The only tricky thing you may see in this config is that the database, a service called "redis", is mentioned by image name (from the [Docker hub][docker-hub-url] registry), but that it is marked as a dependency by the "web" service, by its service name. Otherwise the "build" property just tells compose that the current working directory is the base application ("web" service) to be built; I was explicit in the default `Dockerfile` name, which isn't needed, and the "context" property just tells it where to find where to run the default "build" from.

#### Completed Config

Here's the completed config file for my GitLab instance.

{% include gist.html id="6d095caa3e2d9753b2b1d773a011ef23" file="docker-compose.yml" %}

You may notice I'm referencing the current working directory with `.`. This works fine in Docker compose and is a great way to reference the current working directory (or project path, relative to the location of the `docker-compose.yml` file).

##### A Note on CWD

Current working directory (cwd), denoted as `.` on *nix systems (and PowerShell) is pretty powerful. It's available in Docker compose config files, but not in a vanilla `docker run...` command. If you're looking to get around that limitation and have access to a *nix or like environment, check out my [quick tip on subject on YouTube][yt-docker-cwd].

<figure class="center">
  <amp-youtube
    data-videoid="MdRWkqcbLJI"
    layout="responsive"
    width="560" height="315"></amp-youtube>
    <figcaption>mounting current working directory for use inside a container</figcaption>
</figure>

### Updating the Upgrade Shell Script

The last thing I did was to update the "upgrade" BASH script I had written, as my admin and I were using it already and it provides a sense of consistency. Underlying the script invocation and the wrapper I placed around the "guts" to handle a lockfile, I swapped out the `docker run ...` command and options for simply:

```sh
docker-compose pull # pulls the latest of any images in the registry
docker-compose down # downs the current instance containers
docker-compose up -d # creates and runs in the background a new, updated instance
```

### Deployment Concerns

As you can probably guess, our logic of where we keep our "single source of truth" to build and run our application has shifted away from a script that needs to be copied to, or configured on, a host machine to being an asset of the source control repository. This has a lot of advantages, as it means that any instance should inherit from the source control, being the "single source of truth", instead of relying on the assets having been copied correctly, at the correct version, and the appropriate dependencies installed. This leads obviously into a more continuous deployment model and is one I favor. If the configuration is correct, then the specifics of the instance should only vary in data and cloned (commit) level. This is great and eliminates lots of fiddling around with deployment concerns and checks and balances to protect against an "oops". Checks and balances are still good for sanity, but become secondary to the fact of the matter that the assets exist at a commit level and the correctness is boolean.

### Profit

If you're able to put together a `docker-compose.yml` file without too much fuss, you'll find yourself able to do other things with YAML configurations, up to and including [Docker "stacks"][docker-stacks-url], which seek to provide a similar mechanism to define an entire server stack via configuration, since Docker compose is orientated more towards multiple container applications. All in all, YAML is used by more than just Docker, is easy to pick up, and the Docker compose configurations aren't terribly difficult to understand; your career skills will thank you for spending a little time getting familiar with compose.

### Source Repository

Per usual, I have a repository on GitHub where you can find this in full. Feel free to use it, modify it, or whatnot.

#### [github.com/edm00se/composing-gitlab-docker][gh-repo]

The simple node example can be found on GitHub as well, [github.com/edm00se/simple-docker-compose-node-redis-demo][gh-compose-example].

Until next time, ð»!

[compose-file]: https://docs.docker.com/compose/compose-file/
[gitlab-compose-file-ex]: https://docs.gitlab.com/omnibus/docker/README.html#install-gitlab-using-docker-compose
[yaml-url]: http://yaml.org
[gh-compose-example]: https://github.com/edm00se/simple-docker-compose-node-redis-demo
[docker-stacks-url]: https://docs.docker.com/compose/bundles/
[yt-docker-cwd]: https://www.youtube.com/watch?v=MdRWkqcbLJI&t=3s&index=3&list=PLk_BgI9qpsGjVwLPqBpVKqA3M4Sdv8wlw
[docker-hub-url]: https://hub.docker.com/
[docker-compose-port-short-syntax]: https://docs.docker.com/compose/compose-file/#ports
[docker-compose-up-specifics]: https://docs.docker.com/compose/reference/up/
[gh-repo]: https://github.com/edm00se/composing-gitlab-docker
