---
layout: post
type: post
title: "Serverless Concepts"
description: "the code still runs on servers"
category: serverless
tags: [serverless, virtualization, containers, intro, concepts]
modified: 2017-10-16
comments: true
share: true
permalink: /serverless/concepts/
series: serverless-intro
---

### Intro

Unless you've been living under a rock, you've heard the term "serverless" come up a few times. If you're curious as to what it is, why it matters, and whereabouts it fits into development, I'm hoping this will clear some of that up. But first, background and context.

### Virtualization

asdf

#### Virtual Machines

asdf

#### Containers

asdf

#### Orders of Magnitude

asdf

So, that should hopefully bring into place the question of how serverless compares to other virtualization technologies. For the order of operations, my suspicion is that the big servlerless (FaaS) providers (~~OpenWhisk on Bluemix~~ IBM Cloud Functions, AWS Lambda, Azure Functions) are using some orchestration of container configuration, on top of VMs; just all abstracted away from the user, since the configuration itself provides the requirements in the underlying runtime, etc.. There's [an open source project called OpenFaaS][gh-openfaas] which lets you deploy your own servlerless environment into a [Docker swarm][docker-swarm-getting-started] or [Kubernetes][k8s-url] cluster. If you're looking for a DIY version of Kubernetes for playing around on your localhost, check out [minikube][gh-minikube], which was made for just that purpose. As for Docker swarm, if you're looking to check out how to run a simple swarm to play with, check out [Play With Docker][pwd-url], which is a sandboxed environment that allows you to create up to 5 nodes, with a limited time of 4 hours; it's worth checking out and I may prepare a demo utilizing it in the near future.

### Enter: Serverless!

asdf

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

[gh-openfaas]: https://github.com/openfaas/faas
[docker-swarm-getting-started]: https://docs.docker.com/engine/swarm/swarm-tutorial/\
[k8s-url]: https://kubernetes.io/
[gh-minikube]: https://github.com/kubernetes/minikube
[pwd-url]: https://labs.play-with-docker.com/
