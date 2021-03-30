---
title: Signs of an Advancing Web
description: a flash back to a bygone era, signs that the web is maturing,
  evolving, getting stronger, better
date: 2021-03-30T19:00:03.533Z
published: true
tags:
  - web
  - javascript
  - front-end
cover_image: ./images/old_flash.jpg
category: web
canonical_url: false
permalink: /web/sings-of-the-web-advancing
---
The web stack has been evolving and accelerating over the last few years. One of the things I don't miss is having moved on from supporting Internet Explorer. While some people are prone to comparing Safari to IE these days, a parallel in their non-evergreen deployment cycles, I would argue that's still not the case. Regardless, supporting IE was a _huge_ impediment to making use of new and available web stack features for some time.

### Handling Query Parameters

The context here is from browser logic, in JavaScript; not server-side handling, which is usually managed through frameworks for defining server logic. I ran across the need recently for a one-off thing in which I needed to parse and grab a query parameter's value. This is easy to do now, and has been for a while provided you don't need to support IE.

#### A Blast From The Past

It used to be that without the ability to rely on the native web api, we could either turn to libraries (such as jquery or dojo) or write our own utility function to handle that need. There's nothing to stop a person from doing so today, it's just not as common over something as simple as url query param parsing.

Having had to walk this path before, it basically amounted to:

- get the string value of everything after the `?`, probably via something like `window.location.split('?')[1]`
- parse the values into an object for referencing by key
  - note: since this is in support of IE, things like es6 methods like `Array.prototype.map` are unavailable
- access via a function to keep that silliness self-contained

Example:

```js
function getQueryParam(searchKey){
  var qs = window.location.split('?')[1];
  var parmAr = qs.split('&');
  var parm = {};
  for(i = 0; i<parmAr.length; i++) {
    var cur = parmAr[i].split('=');
    var key = cur[0];
    var val = cur[1];
    parm[key] = val;
  }
  return parm[searchKey];
}
```

This example is somewhat contrived but illustrates the approach. Ultimately, this thankfully feels like nails on a chalkboard after living with JavaScript after es6 (EcmaScript2015) for some time now. It reminds me that I hated writing es5 (or below!) compliant code and supporting Internet Explorer.

\*note: this is not how to do things in this day and age

#### A Much More Appropriate Way to Do Things

It's easy to make use of one of a couple implementations here. You can use the `URL` constructor directly on the output of `window.location` or use `URLSearchParams` with `window.location.search`. An example:

```js
const parm = new URLSearchParams(window.location.search);
console.log(parm.get('foo')); // 'bar'
```

Two lines to accomplish what was a separate function before, or one if you chain off the returned `URLSearchParams` instance and don't need to assign it to a temporary variable.

#### Why Couldn't I Use Them Before?

Ultimately, using [the `URL` constructor][url-constructor] and [URLSearchParams][url-searchparams] are something that isn't supported by IE. For those who have developed for an IE compatible back before modern polyfilling was widely available, this was a hard limitation in that you would just have to wait and hope that future releases would support it per the web standard.

### Something to Learn Here?

Having partially relived my trauma from these past escapades, I was happy to realize that the reason I haven't had to worry about waiting and hoping for IE to support newer web api standards is that the industry has moved forward. There are some poor saps out there still supporting IE due to contractual reasons, but the ability to split modern vs legacy builds has only improved over time. Those legacy builds can be as crammed full of necessary polyfills as needed, and I doubt anyone will be spending too much time prioritizing IE/legacy build _optimization_ when there are better things to do. Also, if anyone's allowing IE users to access their web app without warning them _several times over_ in an age in which [Microsoft has moved on from Internet Explorer][ms-bye-ie], even the first implementation of Edge, that's a sad way to live.

[url-constructor]: https://developer.mozilla.org/en-US/docs/Web/API/URL/URL#browser_compatibility
[url-searchparams]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#browser_compatibility
[ms-bye-ie]: https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666
