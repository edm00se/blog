---
layout: post
type: post
title: "CDN Fallbacks: the XPages Way"
description: "fall back from a failed CDN the XPages way"
category: xpages
tags: [xpages, domino, javascript, cdn, angularjs]
modified: 2014-08-15
comments: true
share: true
---

### Why Use a CDN?
A CDN (Content Delivery Network) ["...is a large distributed system of servers deployed in multiple data centers across the Internet. The goal of a CDN is to serve content to end-users with high availability and high performance."](http://en.wikipedia.org/wiki/Content_delivery_network). It is also an excellent way to increase performance and, ultimately, user experience, because its those "other guys" who are hosting the files and persisting them across multiple server locations which _should_ span the comparative geographies which your users will access your web sites from. I'm not a UX guy by a long shot, but I do know that decreasing load times for the end client makes for a better and more positive experience all around. It's the principle of "you're only as strong as your weakest link" applied to network requests and load times. _You're only as fast as your slowest network response._

A CDN achieves these fast responses by:

* pre-positioning their servers in a distributed fashion, giving you the fastest responding server
* dedicating some excellently fast hardware to do the job
* and setting the cache-control value to a large number, as most CDN delivered JS libraries are not about to change (that's what separate versions are for)

For all the ways of loading a JavaScript library into an XPage, I recommend reading [Mark Roden's](http://twitter.com/MarkyRoden) [3 methods for adding jQuery to your XPages](http://xomino.com/2012/03/04/4-methods-on-how-to-add-jquery-to-your-xpages/). The short version is:

* from a CDN
* NSF resource (in /Resources/Images or /WebContent)
* Domino server resource (in the /.ibmxspres/domino/ path, which points to your Domino\data\domino\html directory, alongside the \icons and \js directories)
* OSGI plugin (though ['here be dragons'](http://www.hbo.com/game-of-thrones#/) in my book)

### Front-End CDN Fallbacks
Using a CDN always has the possibility, however small that may be depending on who's hosting, that the CDN server will be down, unreachable by the client, or just plain wrong. This is why many who have experienced this pain will create a client-side check to see if their required libraries are loaded and, if not, programmatically loading them from another, known source (e.g.- your hosting server). Here's a snippet from the bottom of an html file, just before the end <\/body> tag, in the style I prefer.

```html
<!-- attempt to load AngularJS from CDN -->
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min.js"></script>

<!-- if AngularJS fails to load fallback a local version -->
<script type="text/javascript">
if(!window.angular){
	var ang = document.createElement('script');
	//exlpicit path to server library copy
	ang.src = "//server.com/libs/angularjs/1.2.19/angular.min.js";
	// relative path
	// ang.src = "/libs/angularjs/1.2.19/angular.min.js";
	document.getElementsByTagName('head')[0].appendChild(ang);
}
</script>
```

In this example, I would load my application logic, as this is an AngularJS driven page, after this block. By pushing the application libraries and app logic files to the end of the html document, I can increase the load time of the structure of the page, while giving the user the visual feedback of a page loading, even if it's before the content is ready. What's happening is that the standard CDN, coming from [Google's Hosted Libraries](http://developers.google.com/speed/libraries/devguide#angularjs), loads first. Then, in the script block, the call against whether the library exists is invoked and, if it is not, loads from the application server instead of the CDN.

### Comparing
When loading from Google's CDN, I got an initial (un-cached) response, which took a whopping 38ms, with a set cach-control max-age of _anything other than no-cache/0_. This is good as it means we're in business for a while with a lighting response. When I tried it from the Domino\data\domino\html\ path, it came in pretty quickly (from a theme definition on a live application), but at 142ms; for a factor of just over 3.7x the load time.
<a href="{{ site.url }}/images/post_images/angularGoogleCDNresponseHeaders.png" data-toggle="tooltip" title="Google CDN response for AngularJS library"><img src="{{ site.url }}/images/post_images/angularGoogleCDNresponseHeaders.png"></a>


### XPages CDN Fallbacks
To make this entire process happen "the XPages way", we need to move the computation out of the client's browser and onto the server. Here comes the tricky part. Making a simple [HTTPUrlConnection]() request against a file resource (e.g.- our JavaScript library from Google's CDN) is simple enough, but how often do we need to run it? If it's every time the page loads, that's a lot of additional network calls, even if it's from the server. Also, you may run the risk, on a high enough traffic site, that you could essentially cause what may look like a DoS (Denial of Service) attack. This same thing happened at my day job recently, where some static content was used on an intranet site, but with every page load would request some images from our public facing site, which is hosted and maintained externally from the company. So, the big take away is to minimize these connections while making the best educated guess possible. My thoughts were, why not make a simple validation bean against the library in question?

The approach mirrors [this one for email addresses](http://openntf.org/XSnippets.nsf/snippet.xsp?id=validator-bean-method-for-email-adresses) on XSnippets, created by [Oliver Busse](http://twitter.com/zeromancer1972). Essentially, we're just using the bean to have a persistently available validation method that returns a boolean. The basic structure of the function will go like this:

```java
/**
 * Static method, always takes URL parameter, returns
 * true for successful requests, false for bad ones.
 *
 * @param u Url string against which to check.
 * @return boolean of successful check.
 *
 */
public static boolean checkUrl( String u ) {
	HttpURLConnection.setFollowRedirects(false);
	HttpURLConnection con;
	try {
		con = (HttpURLConnection) new URL(u).openConnection();
		con.setRequestMethod("HEAD");
		return (con.getResponseCode() == HttpURLConnection.HTTP_OK);
	} catch (MalformedURLException e) {
		e.printStackTrace();
		return false;
	} catch (IOException e) {
		e.printStackTrace();
		return false;
	}
}
```

Now, to avoid the hammering of Google's CDN every time a user loads a page, the scope for the bean version of this would be session based.
