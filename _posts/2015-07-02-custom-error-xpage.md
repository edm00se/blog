---
layout: post
type: post
title: "Prettify Your Error Code"
redirect_from: "/self-promotion/custom-error-xpage/"
description: "adding style to a custom error XPage"
category: xpages
tags: [xpages, domino, javascript]
modified: 2015-07-02
comments: true
share: true
---

### Intro
Here's an interesting thing. The best part is that I can't attribute myself with credit for the majority of the body of work involved. In fact, I had some help from an [eagle-eyed Marky Roden](//stackoverflow.com/a/30925635/1720082) who spotted a contributing issue, and an astounding three answers from Sven Hasselbach on [a StackOverflow question on a key component subject](//stackoverflow.com/questions/30925066/custom-error-xpage-ability-for-browser-to-load-and-execute-js-script-link-or-bl/).

{% include tweet.html id="611629455069425664" %}

### Custom Error XPage
With that help I was able to finish putting together a modified custom error XPage, based on [the XSnippet by Tony McGuckin](//openntf.org/XSnippets.nsf/snippet.xsp?id=custom-error-page-cw-cause-and-stacktrace-information); this version includes some place holders for custom theming (e.g.- logo, styling) and most importantly, includes code syntax highlighting! I was able to add [Google Code Prettify](//github.com/google/code-prettify) and get it to work when XPages throws a runtime error both from a full refresh event (that was the easy part), but also with a partial refresh.

That last bit is difficult as a partial refresh invokes a dojo xhr POST against the current XPage and, when getting a runtime error, returns a network response of 500 and returns a:

* default error 500 page
* XPage runtime error page
* custom error XPage

If it returns either of the second two options, it injects the contents via effectively an innerHTML injection, which [according to the W3C](//www.w3.org/TR/2008/WD-html5-20080610/dom.html#innerhtml0) [should not execute included JavaScript](//developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#Security_considerations). This is to protect the user, as it `should` eliminate some script based attacks via injects. In any case, we're getting around this by using `onload` as an attribute on our `img` tag. This fires the JS we jam in there, which will append the same linked JS file for Google Code Prettify to the `head` tag, which will then execute.

##### We Might As Well Make It Look Good
Why are we doing this? Well, if you're going to have an error page show off your code, you might as well have it look good.

### Code
Check this baby out, a couple notes on implementation below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xp:view
  xmlns:xp="http://www.ibm.com/xsp/core"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.ibm.com/xsp/core xsdxp://localhost/xsp~core.xsd"
  pageTitle="${javascript:database.getTitle() + ' | Error'}">
  <style
    type="text/css"><![CDATA[
    body {
      background-color: lightblue;
    }
    form {
      width: 1000px !important;
      margin: 0 auto !important;
      background-color: white !important;
      margin-top: 2rem !important;
      padding: 0.5rem !important;
      height: auto;
    }
    .xspTextLabel {
      font-weight: bold !important;
    }
    pre {
      overflow-x: auto;
    }
  ]]></style>
  <img
    class="logo-simple"
    src="//placehold.it/124x32" />
  <xp:panel>
    <xp:br />
    <xp:br />
    <xp:label
      style="font-weight:bold;font-size:12pt"
      value="An Unexpected Error Has Occurred:">
    </xp:label>
    <xp:br />
    <xp:br />
    <xp:label
      value="Error:"></xp:label>
    <xp:br />
    <xp:text
      escape="false">
      <xp:this.value><![CDATA[#{javascript:var output = (requestScope.error.toString() || null)+"<br /><br />";
if(requestScope.error instanceof com.ibm.xsp.exception.XSPExceptionInfo){
  var codeSnippet = requestScope.error.getErrorText();
  var control = requestScope.error.getErrorComponentId();
  var cause = requestScope.error.getCause();
  output += "In the control : " + control + "<br /><br />";
  if(cause instanceof com.ibm.jscript.InterpretException){
    var errorLine = cause.getErrorLine();
    var errorColumn = cause.getErrorCol();
    output += "At line " + errorLine;
    output += ", column " + errorColumn + " of:<br />";
  }else{
    output += "In the script:<br />";
  }
  if( @Contains(codeSnippet,"#{javascript:") ){
    var snipAr = codeSnippet.split("#{javascript:");
    var tmpSnip = snipAr[1];
    var nwSnip = tmpSnip.substring(0, tmpSnip.length - 1);
    output += "#{javascript:<br /><pre class=\"prettyprint\">"+nwSnip+"</pre>}"
  }else{
    output += "<pre class=\"prettyprint\">"+codeSnippet+"</pre>";
  }
}
return output;}]]></xp:this.value>
    </xp:text>
    <xp:br />
    <xp:br />
    <xp:label
      value="Stack Trace:" />
    <xp:br />
    <xp:text
      escape="false"
      style="font-size:10pt">
      <xp:this.value><![CDATA[#{javascript:if( !!requestScope.error ){
    var stackTrace = "";
    var trace = (requestScope.error.getStackTrace() || null);
    if(trace != null){
      for(var i = 0; i < trace.length; i++){
        stackTrace += trace[i] + "<br/>";
      }
      return "<pre class=\"prettyprint\">"+stackTrace+"</pre>";
    }else{
      return "nothing";
    }
  }else{
    return "";
  }}]]></xp:this.value>
    </xp:text>
  </xp:panel>
  <script
    type="text/javascript"
    src="//cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=desert"></script>
  <xp:text
    escape="true"
    id="executeOnAjax"
    tagName="img">
    <xp:this.attrs>
      <xp:attr
        name="src"
        value="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" />
      <xp:attr
        name="onload"
        value="var h=document.getElementsByTagName('head')[0],s=document.createElement('script');h.src=''//cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=desert',h.appendChild(s);this.parentNode.removeChild(this);" />
    </xp:this.attrs>
    <xp:this.rendered>
      <![CDATA[#{javascript:var ex = facesContext.getExternalContext();
var pMap = com.ibm.xsp.util.TypedUtil().getRequestParameterMap(ex);
var refreshId = pMap.get("$$ajaxid");
refreshId?true:false;}]]>
    </xp:this.rendered>
  </xp:text>
</xp:view>
```

As you can see, there's now an `xp:text` tag (one of the only two, the other being `xp:panel`) at the bottom, just after the normal `script` tag, that lets you set and overwrite the `tagName`, to become a an `img` tag, complete with the `onload` event to add the `script` tag to the `head`. This only renders if it's detected as being in a partial refresh, making a full refresh behave normally. An elegantly simple solution to a surprisingly complex situation.

### Next Time
I have more to share, but I can guarantee the pace over the next few weeks won't be anything like this month. In fact, I have some prep to do for <span data-toggle="tooltip" title="MWLUG 2015!">a certain shindig in Atlanta in August</span>. I hope to see you there!
