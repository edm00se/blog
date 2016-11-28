---
layout: post
type: post
title: "The JSON RPC Control"
description: "my growing affection for an otherwise neglected control"
category: xpages
tags: [xpages, rpc, ajax, code-for-tim]
modified: 2016-11-29
comments: true
share: true
---

### Intro
As some of you are aware, I'm a bit of a one-man operation in a much larger group and, while I may have other developers to talk to and work with, I'm the only Domino/XPages developer. This has made for an interesting dynamic, especially when I have the occasion to work with XPages developers from consulting firms, but otherwise I live and work in a bubble. Thankfully my bubble includes the shared experiences and blogging of many others within our community, which is a major reason in why I decided some time ago to "give back" by sharing my experiences and perspectives from working within this crazy space of development.

What follows is an attempt at summarizing some of the information, much of which is already out there, on the JSON RPC control. Some people use it and have even raved about it, but until recently I hadn't seen the _need_ for it. That time has now passed and I find myself increasingly a fan. While my _preferred_ approach to building applications with Domino and XPages isn't an XPages control centric approach, I still live and work with more than a few applications (including our largest) in which much is written in a RAD (Rapid Application Development), hopefully-not-spaghetti-code sort of fashion; there is an attempt at a standard, but over the course of greater than my five years working on said large application, the standard(s) have changed, evolved, or been forgotten (sometimes resurrected). In any case, I've found myself re-writing core logic, and sometimes more than just core logic, into a managed bean for more segregation in the application logic.

### The JSON RPC Control
[The JSON RPC control for XPages](https://www-10.lotus.com/ldd/ddwiki.nsf/dx/The_JSON_RPC_Service), `xe:jsonRpcService`, renders a JavaScript (client-side) handle with methods (`xe:remoteMethod`) defined; these methods can take arguments. The control's service  communicates back to the server and returns to the browser purely in JSON content (specifically `text/json;charset=utf8`, according to DevTools), which makes for a rather lightweight implementation, which I always enjoy; there is elegance in simplicity.

#### RPC (Remote Procedure Call)

> In distributed computing a remote procedure call (RPC) is when a computer program causes a procedure (subroutine) to execute in another address space (commonly on another computer on a shared network), which is coded as if it were a normal (local) procedure call, without the programmer explicitly coding the details for the remote interaction.
> <figcaption><a href="https://wikipedia.org/wiki/Remote_procedure_call">source: wikipedia.org</a></figcaption>

An RPC service is created to provide seamless, nuance-free, access to a remotely held and executed operation (subroutine, function, procedure; call it what you will) and allow invocation as a means of increasing access from a different entry point. Ultimately, what this really should mean to us is that we have a nicely packaged, (client-side) JavaScript accessible way to invoke our code or operations from SSJS or Java, in an _asynchronous_ fashion. This is really the key, in my opinion, as some people differentiate an RPC from a normal call as being a "fire and forget", without a return consideration; this is not part of any standard I can find and the RPC control (plus generated service) provides us a response; that came up, more on that below.

### Comparing With Other Controls
Comparing the RPC control to other XPages controls can be a bit tricky, especially as the closest thing to it, in my opinion, is the REST control (`xe:restService`); it gets tricky as they both provide (client-side) JavaScript access to server-side operations/data, yet the way we go about accessing them can be quite different. We generally talk about data via a RESTful service in a collection vs record fashion, with changes being submitted in whole or part based on what we expose for an endpoint and available method (`PUT` vs `PATCH`, etc.). When it comes to the RPC control, we're instead invoking an operation and expecting back only that which we tell it to; a minimum of a success `boolean`.

#### A Note on Return
Always be sure to return a value. At first, I hooked my newly created RPC control's first method to a setter from a managed bean. This is fine and all, but generally setters, especially those auto-generated, "return" `void`, or nothing. This meant that my RPC method was returning a generic looking `error 400` on any request, including those that were succeeding action on the server. Once I changed the return type to `boolean` and changed my setter to treat the returned value as a value of success of the operation (e.g.- initiate at the beginning of the method as `false`, if you process all the way through to prior to the return without error, set to `true`, or force `false` in the event of any captured error event), then my RPC started behaving as expected and stopped throwing errors to the client-side.

#### Considerations
I believe that this is a service/control most useful for situations when an update to the server and response are needed, in an XPage, without the traditional AJAX-y, `XSP.partialRefresh[Get|Post]` style behavior. To phrase it another way, we're not executing the update of DOM elements, which are normally handled via their bound computations (or getter/setter methods), but rather we're performing a programmatic interaction with the server, with our own defined logic; this _may_ involve updating the DOM, but we get full control over the lifecycle. This isn't a control for every situation, but it certainly handy when it's useful. The largest differentiator in my head is that unlike the REST control (`xe:restService`), or any RESTful API, is that instead of performing an action _statelessly_ (against either collection or record/entry by ID), we're fully able to act _statefully_, in a way configured to our preference. There may be a more technical definition or a more fine line that's being tread, this is just my take away.

### Example

- simple bean to work against
- xpage w/ control, fields
- some fields with naming and layout that isn't conducive to normal partial refresh w/ getter+setter calls
- example w/ rpc calls, invoking in specified order via callbacks

### References
- [IBM Notes/Domino App Dev Wiki page](https://www-10.lotus.com/ldd/ddwiki.nsf/dx/The_JSON_RPC_Service)
- [Notes in 9 #33: Intro to Remote Services in Xpages](http://www.notesin9.com/2011/08/25/notesin9-033-introduction-to-remote-services-in-xpages/), by [John Jardin](http://johnjardin.ukuvuma.co.za/2011/10/28/xpage-video-tutorial-remote-services-rpc/)
- [Tim Explains JSON RPC](http://www.notesin9.com/2014/05/21/tim-explains-json-rpc-codefortim/)
- [Steve Zavocki's blogging on his initial take](http://notesspeak.blogspot.com/2014/10/my-first-experience-using-json-rpc.html)
- [Blog post on Error Handling an RPC Service by Brad Balassaitis](https://xcellerant.net/2016/02/17/handling-errors-in-an-xpages-rpc-method/)

### Summary
All in all, I'm not entirely certain how I went so long without having enough of a need for me to dive into the RPC control. While my development style preference is in a certain direction, it certainly is a useful component and one which has eased some of my AJAX heavy issues with a bit of grace. Hopefully this is useful to others, if nothing else as [a roll up of some of the existing information which was out there](#references).
