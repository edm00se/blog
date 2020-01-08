---
title: 'A Java Rite of Passage'
description: 'aka- I learn best by doing'
date: 2015-10-19
published: true
tags: ['xpages', 'bluemix', 'xpages-servlets', 'java', 'github']
canonical_url: false
category: bluemix
---

### Intro

The last couple of weeks has been a roller coaster of fun in regards to a work application and in regards to my extracurricular development activities. Suffice it to say, things are much improved and what follows is what I hope something that others can learn from, though [a simple Google search](https://www.google.com/?gws_rd=ssl#q=xpages+java+static+method) makes me realize that I'm not only not the first, but bound to not be the last, to make the same mistake in Java development. Rest assured, should you work through an issue like this, you'll probably never forget it, even if reading about it on someone else's blog didn't cause it to sink in fully.

### A Java Rite of Passage...

..or a likely potential pitfall. Either way you cut it, I made a mistake on something I _thought_ I knew, but now know much better 😉.

What wound up tripping me up was that I was attempting to access my data NSF in my Bluemix XPages application, via some stored properties in a managed bean, to use a getter method to let me build out a handle on the Database. Where it all went wrong was in the overly liberal application of dependent static methods interacting with the underlying Notes/Domino API (_lotus.domino.Database_, via a getter method, for convenience and consistency) running into "object has been recycled" or "database is already open as..." errors. Both, in the proper light, illuminate that object I was getting a handle on wasn't where I thought it was in the life cycle of my code, but the first one was almost familiar. In fact, there's a decent explanation of this situation, in regards to _lotus.domino.Session_, [on StackOverflow](https://stackoverflow.com/questions/32441640/xpages-managedbean-is-constantly-losing-global-domino-session-object).

#### Static vs Instance Methods
When using a static method, it is attached to the Class it is defined in, not any given instance. For convenience sake, this can be handy as you can invoke it directly by `MyClass.getSomethingStatically()` as opposed to access/create an instance of the Class in order to get the properties, a la `MyClass a = new MyClass(); a.getSomeInstanceProperty();`. Eclipse based editors make it really easy to add the _static_ modifier/key word to a method that you've typed in as if it were static.

![why do you make it so easy!?](./images/easyToMakeStatic.png)

Per the [Understanding Class Members tutorial from the Oracle Java SE docs](https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html),

> Every instance of the class shares a class variable, which is in one fixed location in memory.

This means that I was continuously getting a handle on an object which had been recycled already; aka- I was doomed. A static method _can_ return non-static results, so long as any dependent call pulls from an instance; this was key to my correcting the situation. I wound up using a variable resolver to get the relevant properties from my managed bean by resolving the bean name, from which I could then get the instantiated properties which would let me call server name (or IP for Bluemix) and path to the data NSF to establish my _lotus.domino.Database_ handle.

In short, the completed method I use to pass all my _getDataNSF_ calls through is _static_, but always resolves (correctly) through the managed bean (which contains only instance properties), which is instantiated and kept in memory per the _managed_ defintion of _*Scope_ in the _faces-config.xml_. The intermediary method looks like so:

https://gist.github.com/edm00se/cd65623c3b81ad4e563fcb6656d0ebfe#StaticDatabase.java

For a full view of my [bean](https://github.com/edm00se/Ice-And-Fire-On-Bluemix/blob/master/App%20ODP/Code/Java/com/westeros/config/AppUtil.java#L61-L81) or [intermediary method](https://github.com/edm00se/Ice-And-Fire-On-Bluemix/blob/master/App%20ODP/Code/Java/com/westeros/app/Utils.java#L489-L499), go check out my last paragraph (there's something exciting).

#### Long Story Short...

https://www.youtube.com/watch?v=qr2tmQIbdH8

#### Promise of 🍻
In my last post, I made a promise of a beverage or three of choice to those who helped me figure out what was going on with my, at the time, seemingly absurd set of error messages I was receiving as a result of trying to connect to my data NSF in Bluemix context. Ultimately, [I was running into a combination of a few issues](https://developer.ibm.com/answers/questions/231062/xsp-on-bluemix-accessing-data-nsf-yields-notesexce/), as my above "rite of passage" partially outlines. As far as I can tell, I should give myself a 🍺 on account of _finally_ realize what the error messages meant and how that impacted my _static_ versus instance methods. I owe one to the Internet for giving me enough reading material on the subject of _static_ vs instance methods in Java, and saving the best last, one more for Brian Gleeson for his persistent aid in parsing apart some of the layers of the issues I ran into; which [includes some good advice should you be looking to use local preview an application to get the _BluemixContext_ classes to resolve correctly](https://developer.ibm.com/answers/questions/231062/xsp-on-bluemix-accessing-data-nsf-yields-notesexce.html#comment-232026). Thank you Brian.

### My Demo App Comes to Bluemix
Announcing [the _bluemix_ version of my demo app repository on GitHub](https://github.com/edm00se/Ice-And-Fire-On-Bluemix). This has been a culmination of a number of things and paves the way for some pretty epic plans I have for the future. Please feel free to check it out and poke around a bit. I've got big plans for the future of this demo app and it's just getting started.

App Running on Bluemix: [iceandfire.mybluemix.net](https://iceandfire.mybluemix.net/)

[App (and data ODP) repository](https://github.com/edm00se/AnAppOfIceAndFire):

<iframe width="160" height="30"
    frameborder="0"
    src="https://ghbtns.com/github-btn.html?user=edm00se&repo=Ice-And-Fire-On-Bluemix&type=star&count=true&size=large">
</iframe>

