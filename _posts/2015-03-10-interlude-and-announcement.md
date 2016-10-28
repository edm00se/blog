---
layout: post
type: post
title: "Interlude for Servlets"
description: “a 4-piece arrangement“
category: admin
series: servlet-series
tags: [admin]
modified: 2015-03-10
comments: true
share: true
---

{% include series.html %}
### An Interlude for Servlets
My [series on servlets]( {{ site.url }}/servlet-series ) is in a temporary interlude. Don't worry, I've been working on it, the only problem is the issue I ran into. I was forced to re-evaluate some of the assumptions I had made previously and, to be quite honest, I'm glad I ran into that issue now, as opposed to much later. Suffice it to say, there is much more to come and I am excited to bring my next post, but I won't publish it [<s>again</s>](https://twitter.com/edm00se/status/571629407695069184) until it's ready.

<amp-twitter width="390" height="50"
    layout="responsive"
    data-tweetid="571667777800417280">
</amp-twitter>


### Issues with Java Security
Over the last week or so, I started to run into an issue I had trouble quantifying. Thankfully, with the help of some intelligent people on twitter (Jesse for one, who seemed to know what I ran into almost immediately) I once again appreciate the fact that our #XPages developer community is a strong one which is almost always willing to help someone through an issue. It's a credit to this community and one of the reasons that this blog exists. When David Leedy suggested those with anything they could share, ought to, it hit home as I've benefited greatly from the work of others.

##### The Issue
I shifted my development environment to a new vm and, while doing some actual code work in preparation for the next post in the servlet series, I noticed that my servlets that depended `DesignerFacesServlet` had stopped working. After consulting with Jesse Gallagher, there seems to be some issues with ClassLoader outside of XPages design elements without this.

So, it seems that while I can keep my JARs in `<install>/jvm/lib/ext/`, it *also* seems that I need to continue to apply the *lady-of-the-evening* approach to my java.pol(icy) file to get `FacesContext` access in my servlets; with the following:

```
grant {
	permission java.security.AllPermission;
}
```

##### My Fix
For now, this means I'm adding the grant ...AllPermission line back into my java.pol(icy). I've tried to find ways of keeping that from being necessary, but it seems that if you want `FacesContext` access in your servlet, you should either add that back in, or roll your servlet as an OSGi servlet; an approach I've yet to get into, though [Jason Hook seems to have covered the topic a bit](//8b30b0.wordpress.com/). For those concerned about this edit, I would recommend that the requirements of your servlet (should it require `FacesContext`, which is very likely) include having security permissions. If the admin(s) of whoever owns the server can't think of a better way, then they should roll the above line, otherwise they can manage that as-needed. If someone knows of a better way around this, please don't keep it to yourself.

Reminder note: as [Mark Leusink](//linqed.eu/2014/06/25/considering-a-domino-upgrade-beware-of-custom-java-security-policies/) and [John Dalsgaard have pointed out](//www.dalsgaard-data.eu/blog/java-security-in-ibm-domino/), upgrading to 9.0.1 FP3 <s>can</s> will cause loss of custom entries in your `<install>/jvm/lib/security/java.policy` file; this seems to have to do with the JVM updates. An ideal is to keep your changes in a `<install>/jvm/lib/security/java.pol` file, which gets interpreted with the same syntax as java.policy, and is less likely to be overwritten during an upgrade.

### An Announcement
Speaking of my blog, I am migrating to a new domain name. Don't worry, all your existing bookmarks and feed links will work, as it will be the same blog hosted on [GitHub Pages](https://pages.github.com/). My link references will be updating and the Disqus comments migrating. From here on out, I can save myself a few characters here and there:

{:.h3}
**[edm00se.io](//edm00se.io/)**<br />

### A Second Announcement
Recording has begun! I'm hoping that my efforts will be fruitful to people in the <s>years?</s> months to come, but I also know that many people learn better by seeing instead of reading. My blog can get a bit wordy at times, something I try to keep at bay, but in preparation for the end stages of my servlet series, I have recorded the first few pieces of the companion Notes in 9 episode to-be. It was suggested by some previously and is something I plan on delivering in conjunction with the end of my series.

Until next time, 🍻.
