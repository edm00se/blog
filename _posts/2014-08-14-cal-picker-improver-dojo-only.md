---
layout: post
type: gist
title: "Variations on a Function: XPages Calendar Picker Improver, a Dojo Version"
description: "a dojo-only version of the calendar picker improver script by Mark Roden"
category: xpages
tags: [xpages, domino, javascript, dojo]
modified: 2014-08-14
comments: true
share: true
---

### The Original
The stock XPages date picker control leaves more room for user error than I prefer. Mark Roden [originally came up with this excellent script in jQuery](http://xomino.com/2012/03/14/improving-user-interaction-with-xpages-date-picker/). I love jQuery, but it's not the (client-side) JS library I always have available to me in my XPages work, and I'm not about to load yet another library after Dojo in an existing, Dojo-centric application for a comparatively trivial, one-off function. Since the function can be written in vanilla JS, or any decent JS library, I decided to re-write it into Dojo.

### The Dojo Version
I have this in production on a few applications, and both I and the users love it. So once again, I'm glad to be privy to the fruits of a great community of fellow XPage developers. They've made my life easier on so many occasions and I'm hoping I can give back in a small way. Now, since I'm using Dojo, apparently this can be achieved in more-or-less the same way with the [dijit.form.DateTextBox](http://dojotoolkit.org/reference-guide/1.6/dijit/form/DateTextBox.html) Dojo module (just set the field's DojoType after specifying the resource), as [highlighted in the comments on Mark Roden's blog post](http://xomino.com/2012/03/14/improving-user-interaction-with-xpages-date-picker/#comment-312). While this is certainly functional, it _does_ achieve the picker launch on entering the field, it isn't consistent with the native XPages date picker control, which is already all over _every single XPage'd application in my company_. So, for consistency and UX as decided by others in my organization, I rolled this Dojo version of Mark Roden's script.

Here's the gist:

```javascript
/*
 * Dojo version of the improved behavior of the XPages calendar picker.
 * Adapted from the jQuery version, originally by Marky Roden.
 * credit: http://xomino.com/2012/03/14/improving-user-interaction-with-xpages-date-picker/
 * Adapted by Eric McCormick, @edm00se, http://about.me/EricMcCormick
 */
dojo.addOnLoad(function(){
  //id has _Container and is class of xspInputFieldDateTimePicker
  var myAr = dojo.query("[id$=_Container].xspInputFieldDateTimePicker");
  //iterate over each element to apply affect
  myAr.forEach(function(node, index, arr){
    //current root node, based on id$=_Container
    var curNode = node;
    //span for the button to fire the picker
    var myBtn = dojo.query('> span > span > span.dijitButtonContents',curNode)[0];
    //actual <input> element into which is focused/typed
    var myInputFld = dojo.query('> div > div.dijitInputField > input.dijitInputInner',curNode)[0];
    //connect the focus event to the picker click event
    dojo.connect(myInputFld,"onfocus",function(){myBtn.click()});
    //provide an onkeypress preventDefault
    dojo.connect(myInputFld,"onkeypress",function(evt){evt.preventDefault()});
  });
});
```

### Breaking It Down
We [bootstrap](http://en.wikipedia.org/wiki/Bootstrap) the function via the dojo [addOnLoad](http://dojotoolkit.org/reference-guide/1.6/dojo/addOnLoad.html) call and start by creating an array of the fields with an ID attribute containing '\_Container' and the class _xspInputFieldDateTimePicker_.  We then iterate over these DOM nodes, getting a handle on their button, and connecting the _click()_ event call for that button to the respective field during the _onfocus_ and/or _onkeypress_ events. I'm sure a more advanced user could improve the performance of my version of the function, and I welcome them to post a forked version; after all, why use GitHub/Gist if you don't want your code improved via the aid of others?

Note, for this to work in Dojo 1.8, the _dojo.connect_  and dojo.query calls I establish, which work perfectly fine in 1.6, **must** be converted to [_dojo.on_](http://dojotoolkit.org/reference-guide/1.8/dojo/query.html#usage) and [_query_](http://dojotoolkit.org/reference-guide/1.8/dojo/on.html#usage) calls, respectively. For more, I do recommend reading the Usage section of the Dojo 1.8 docs.
