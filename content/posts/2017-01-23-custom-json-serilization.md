---
title: 'Custom JSON Serialization With GSON'
description: 'forcibly preventing scientific notation?'
date: 2017-01-23
published: true
tags: ['java', 'xpages']
canonical_url: false
category: java
---

### Intro

Here's a curious one, in which I found myself with a limitation of not being able to output JSON with scientific notation values.

![wait, what?](./images/ExcuseMe.gif)

If you're wondering why that is, since both JSON and JavaScript allow scientific notation of number values, you are absolutely correct and that's a great question. The strange thing was that I found myself outputting perfectly valid JSON to be consumed by something specific which didn't allow scientific notation. I'm not entirely sure why that was a bridge I had to cross, but the path of least resistance involved my forcing the output values to be serialized in standard notation.

### Serializing JSON With GSON

Normally, serialization of JSON via GSON is so simple, a developer with merely a basic understanding of Java could pull it off 😜. Here's a sample for baseline comparison.

https://gist.github.com/edm00se/095626db6513c4bf01cadeff92935094#Generic.java

So, since the formatting of the numeric values, which I was passing into a `Map` as `Double`s for serialization, we'll be registering a new `TypeAdapter` with the `JsonSerializer` and instruct it how to handle the value in place of the default. Here's the result, wrapped into a method in a utility class.

https://gist.github.com/edm00se/095626db6513c4bf01cadeff92935094#Utils.java

Now that we have a new way of handling our `Gson` instantiation, we can use it as such:

https://gist.github.com/edm00se/095626db6513c4bf01cadeff92935094#New.java

### Summary

I'm still left questioning why I had to do this, but the exercise is an intersting one anyway. Should someone need to customize their responses even further, this is a great place to start from. I'm still a pretty big fan of GSON and while it may not be for everyone, or even the best option in OSGi plugin development with options like JAX-RS and others, it's certainly a heavily used library that is both useful and generally easy to implement.

### 🍻
