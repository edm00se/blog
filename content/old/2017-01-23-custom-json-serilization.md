---
layout: post
type: post
title: "Custom JSON Serialization With GSON"
description: "forcibly preventing scientific notation?"
category: java
tags: [java, xpages]
modified: 2017-01-23
comments: true
share: true
---

### Intro

Here's a curious one, in which I found myself with a limitation of not being able to output JSON with scientific notation values.

<figure class="center">
  <amp-anim src="/assets/images/post_images/ExcuseMe.gif"
  alt="wait, what?"
  width="500" height="213"
  layout="responsive"></amp-anim>
 <figcaption>wait, what?</figcaption>
</figure>

If you're wondering why that is, since both JSON and JavaScript allow scientific notation of number values, you are absolutely correct and that's a great question. The strange thing was that I found myself outputting perfectly valid JSON to be consumed by something specific which didn't allow scientific notation. I'm not entirely sure why that was a bridge I had to cross, but the path of least resistance involved my forcing the output values to be serialized in standard notation.

### Serializing JSON With GSON

Normally, serialization of JSON via GSON is so simple, a developer with merely a basic understanding of Java could pull it off ð. Here's a sample for baseline comparison.

{% include gist.html id="095626db6513c4bf01cadeff92935094" file="Generic.java" %}

So, since the formatting of the numeric values, which I was passing into a `Map` as `Double`s for serialization, so we'll be registering a new `TypeAdapter` with the `JsonSerializer` and instruct it how to handle the value in place of the default. Here's the result, wrapped into a method in a utility class.

{% include gist.html id="095626db6513c4bf01cadeff92935094" file="Utils.java" %}

Now that we have a new way of handling our `Gson` instantiation, we can use it as such:

{% include gist.html id="095626db6513c4bf01cadeff92935094" file="New.java" %}

### Summary

I'm still left questioning why I had to do this, but the exercise is an intersting one anyway. Should someone need to customize their responses even further, this is a great place to start from. I'm still a pretty big fan of GSON and while it may not be for everyone, or even the best option in OSGi plugin development with options like JAX-RS and others, it's certainly a heavily used library that is both useful and generally easy to implement.

### ð»
