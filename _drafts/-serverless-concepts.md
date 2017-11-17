---
layout: post
type: post
title: "Serverless Concepts"
description: "yes, the code still runs on servers"
category: serverless
tags: [serverless, virtualization, containers, intro, concepts]
modified: 2017-10-16
comments: true
share: true
permalink: /serverless/concepts/
series: serverless-intro
---

<figure>
  <amp-img src="{{ site.url }}/assets/images/post_images/AnceintOneLearnsStrangeSomeSpells.jpg"
      width="800"
      height="421"
      alt="Doctor Strange gets his learning on with the Ancient One"
      layout="responsive"></amp-img>
  <figcaption>behold the power of serverless!</figcaption>
 </figure>

Unless you've been living under a rock, you've heard the term ["serverless"][wiki-serverless] come up a few times. If you're curious as to what it is, why it matters, and whereabouts it fits into development, I'm hoping this will clear some of that up. But first, there are a couple things to get out of the way.

### Terminology

The terminology of "serverless" is half-awful. It's only awful in that inspires in the uninformed a sense that [servers are somehow no longer involved][commitstrip-serverless-url]. This is untrue, but remember a server is only ever "some other computer" that should be managed (well) to support the running of the applications or services that it hosts. I've noticed an alternative term, FaaS (Functions as a Service), starting to be used over approximately the last year. Depending on how you look at things, this might be more useful in explaining the order of magnitude of difference in how this incarnation of virtualization plays against other \*aaS offerings work (SaaS, IaaS, PaaS, etc.); especially to someone in management. I currently use both "serverless" and "FaaS" interchangeably.

If you find yourself needing to explain the pedantic nature of "serverless" to someone who _insists_ that it _just can't_ be a proper term, then just remind them 

> "there is no \'cloud\', only someone else's servers".

### Background

As you may have caught on to already, I regard serverless functionality as being an extension of [virtualization][wiki-virtualization]. If you've been keeping track of advancements of in virtualization over the last decade or so, this shouldn't be surprising. For someone who's been retired for a decade or more, this could be a bit shocking. What began as a way of dividing system resources, we've progressed through various degrees of virutal machines (VMs) and management thereof to containers and container orchestration. Docker didn't invent containerization, but it did bring it to the masses and make things incredibly easy to get started with configurations of an environment, without needing to worry about specifics of the runtime's host OS.

As such, we can think of each progressive form of virtualization as an abstraction layer. VMs abstract away our operating system (OS) from the physical hardware we run them on, making it accessible and easy(easier) to create backups and snapshots. It also slims down the specifics regarding the host, so that when it comes to things like backups, we need only backup those files, resources, and settings more directly related to the application(s) or service(s) we running in a VM.

A container (Docker, LXC, etc.) lets us abstract away almost anything to do with a host OS, letting us specify a base image. Yes, a container run on Docker runs on top of a VM layer, but the implementation is slimmed down to only that which we need to run\*. We have flexibility over the base image we use in Docker containers, to create or extend our own, or utilize a common and well-known one. The flexibility is pretty amazing and the results are impressive. What's more impressive is the advances in container orchestration, which allow for us to make better use of [microservice architecture practices][wiki-microservices], to create parts of our application(s) or service(s) independent from the other parts, but deployed as a cohesive whole entity.

\* Distributions like [alpine linux][alpine-url] help strip away as much junk as possible. Between its \<5Mb size and efficient package manager, it's practically made for high performance and carries a low resource cost that works great in containers.

Considering that we can now deploy application stacks with a single configuration file, this makes a team's ability to deploy far more desirable than ever before. In the case of Docker, consider you have a `docker-compose.yml` (or `docker-cloud.yml`, the latest official default file name for a Docker Cloud stack) file, defining both the application code _and_ the database requirement. Assuming the database has its volume exposed and persisted, this makes maintenance of the database pretty easy and even more easily set up the first time; for any migrations, etc. My previous example of [setting up a GitLab server with Docker compose]({{ site.url }}/docker/composing-with/) did just this and, as far as the application knew, the database instance never "changed". So, provided you have a stack config defining each of your microservices (potentially including database, or at least configuration to connect to it), you have a highly reproducible application stack and great flexibility in working on any of the components to the application, without the need to halt an entire monolithic application in the process.

### Enter: Serverless!

This is where serverless comes in. If microservices 

### What Is It?

asfd

#### But What Does It Mean to Me?

asdf

### How Does It Work?

asdf

### How Can I Use It?

asdf

where to run
  - local
  - self hosted
  - cloud service

### What Does It Solve?

On-demand highly scalable "workers" that are configured so as not to require additional customer-driven server changes.

### WIP: Lets Play

#### Orders of Magnitude

For the order of operations, my suspicion is that the big hosted serverless providers (~~OpenWhisk on Bluemix~~ IBM Cloud Functions, AWS Lambda, Azure Functions) are using some orchestration of container configuration, on top of VMs; just all abstracted away from the user, since the configuration itself provides the requirements in the underlying runtime, etc.. There's [an open source project called OpenFaaS][gh-openfaas] which lets you deploy your own serverless environment into a [Docker swarm][docker-swarm-getting-started] or [Kubernetes][k8s-url] cluster. If you're looking for a DIY version of Kubernetes for playing around on your localhost, check out [minikube][gh-minikube], which was made for just that purpose. As for Docker swarm, if you're looking to check out how to run a simple swarm to play with, check out [Play With Docker][pwd-url], which is a sandboxed environment that allows you to create up to 5 nodes, with a limited time of 4 hours; it's worth checking out and I may prepare a demo utilizing it in the near future.


[wiki-virtualization]: https://wikipedia.org/wiki/Virtualization
[wiki-serverless]: https://wikipedia.org/wiki/Serverless_computing
[wiki-microservices]: https://wikipedia.org/wiki/Microservices
[gh-openfaas]: https://github.com/openfaas/faas
[docker-swarm-getting-started]: https://docs.docker.com/engine/swarm/swarm-tutorial/\
[k8s-url]: https://kubernetes.io/
[gh-minikube]: https://github.com/kubernetes/minikube
[pwd-url]: https://labs.play-with-docker.com/
[commitstrip-serverless-url]: http://www.commitstrip.com/en/2017/04/26/servers-there-are-no-servers-here/
[alpine-url]: https://alpinelinux.org
