---
layout: post
type: post
title: "A Quick Note on JARs"
description: "I learn something new every day"
category: xpages
tags: [xpages, domino, java]
modified: 2015-02-09
comments: true
share: true
---

### What?
While preparing for my <span data-toggle-tooltip title="I swear it's coming!">impending blog series on servlets</span>, I've been hammering out a couple of details regarding external dependencies (aka- JAR files). The short story is that I assumed things had to be a certain way (including the java.policy edit for granting all permissions), but that wasn't the case. If you want to read the full circle of comments, [go check them out](//disqus.com/home/discussion/em-devblog/building_java_objects_from_json_93/#comment-1813504147).

### Why?
It seems that setting up what I regard as server elements, even these add-on ones, is something I don't do every day. Any developer can see quickly that re-importing the same JAR file you use across your application instances can become quite tedious, quickly. But it would seem that there is a better way of doing things than just adding your JAR and needing to add 
```
grant { permission java.security.AllPermission; }
```

To rule out what I have going in my primarily development environment (something that doesn't come up for me as a staff employee of an IBM customer, as my environment doesn't change, unless I add a picture of my kid to my desk), I created a fresh install of Notes/Domino Designer. I took a look at the &lt;install&gt;/jvm/lib/security/java.policy file and noticed something that works to our advantage as developers.

<a href="{{ site.url }}/images/post_images/JARs/StockJvmPropertiesJvmLibExt.png" data-toggle="tooltip" title="we can put our JARs in the jvm/lib/ext folder"><img src="{{ site.url }}/images/post_images/JARs/StockJvmPropertiesJvmLibExt.png" class="img-responsive center-block" /></a>

So, without the need to edit the java.policy file, this makes things a much easier sell to your admins (even though I recommend just buying them their beverage of choice <i class="twa twa-beer"></i>), as adding an industry accepted library to your server stack has a whole different tone than potentially scaring them with words like "grant" and "java.security.AllPermission". One still needs access to the file system, so it may not do some people a lot of good; which is why, going forward with this series, I'll be making the effort to give every GSON specific task I perform a fair shake with the equivalent using the _com.ibm.commons.util.io.json_ package.

### See It In Action
<div class="row">
<div class="col-md-6">
Here's my import from my series demo code imported into my fresh install via my Git repo. As expected, without any JAR to find, it's going to fail.
</div>
<div class="col-md-6">
<a href="{{ site.url }}/images/post_images/JARs/ImportingGsonWithoutJAR.png" data-toggle="tooltip" title="hey look, nothing"><img src="{{ site.url }}/images/post_images/JARs/ImportingGsonWithoutJAR.png" class="img-responsive center-block" /></a>
</div>
</div>

<div class="row">
<div class="col-md-6">
Having shut down Designer and placing the com.google.gson JAR into the &lt;install&gt;/jvm/lib/ext/ path and then starting it back up again, you can see that it's now resolved. All without touching the java.policy file.
</div>
<div class="col-md-6">
<a href="{{ site.url }}/images/post_images/JARs/JARaddedOnlyToJvmLibExt.png" data-toggle="tooltip" title="looking? found someone I would say you have, hmmm?"><img src="{{ site.url }}/images/post_images/JARs/JARaddedOnlyToJvmLibExt.png" class="img-responsive center-block" /></a>
</div>
</div>

##### Added Benefit
The plus side to this approach is that it's now also available in Java agents.
<a href="{{ site.url }}/images/post_images/JARs/JARaccessibleFromJavaAgent.png" data-toggle="tooltip" title=""><img src="{{ site.url }}/images/post_images/JARs/JARaccessibleFromJavaAgent.png" class="img-responsive center-block" /></a>