---
title: 'When You Need a Comparator'
description: 'sorting a Collection how you want'
date: 2015-01-09
published: true
tags: ['xpages', 'java', 'bean', 'comparator']
category: java
---

### Introduction

Many of the XPages Managed Bean demonstrations point to your ability to populate an _xp:comboBox_ with a custom defined `List` of `SelectItem`s. One thing that seems to happen to me is that I wind up having to re-sort such lists to work off of their Label, as opposed to their value; so as to look sorted, at least to human eyes.

##### A Brief ComboBox Anatomy Lesson

An _xp:comboBox_ lets us build out a list (preferably somewhat short) of values with their labels, which are selected from a "drop down" like interface. More specifically, from MDN,

> The HTML select (&lt;select&gt;) element represents a control that presents a menu of options. The options within the menu are represented by &lt;option&gt; elements, which can be grouped by &lt;optgroup&gt; elements. Options can be pre-selected for the user.

https://jsfiddle.net/edm00se/acchh2kv?tabs=result,html/

But you're here for the code. Here's an incredibly simple select tag implemented with three options. If you switch to the HTML pane, you'll see that the value (which is what can be data bound for value in the `xp:comboBox` control) is 1, 2, or 3 while the labels are their English equivalent of One, Two, or Three. In classic Notes, we would achieve this by the usual list (line separated) by passing in sets of _Label &#124; Value_, separated by the pipe character. You can still do this in XPages, but if you're defining the source for one in a bean, you'll want to build out your List&lt;SelectItem&gt;. My sample class below shows this, but the meat and potatoes here is the Comparator.

### A Comparator

Enter [java.util.Comparator](https://docs.oracle.com/javase/7/docs/api/java/util/Comparator.html). It's a member of the Collections Framework, making it ideal for sorting Collections (which a List is). So, to begin, we'll define a class (you can nest it in another class, as I have, a stand-alone class, or a member of another, utility class). This class contains a single, public compare method, which returns an int. It returns an int, as that's what's returned by the [compareToIgnoreCase method of java.lang.String](<//docs.oracle.com/javase/7/docs/api/java/lang/String.html#compareToIgnoreCase(java.lang.String)>). All the compare method is doing is comparing whether the first string is before or after the second string.

### Code

Here's my super simple sample bean, with the `selectOptionsList` being read-only (no setter method) as it's just the `selectedOption` being what the value to be stored is.

https://gist.github.com/edm00se/34bc3a534c7e44ff5617#SampleComparatorUse.java

The XPage control implementation is a standard `xp:comboBox` implemented with the value and select items (options) bound via EL. The value which the user selects is bound to the bean's property of `selectedOption` while the list of SelectItems (options list, with both value and labels populated) is the `selectOptionsList` property.

{% include gist.html id="34bc3a534c7e44ff5617" file="SampleSelectItemBean.xsp.xml" %}

[Here's the full gist link](https://gist.github.com/edm00se/34bc3a534c7e44ff5617), with class, XPage, and faces-config (in case anyone is looking for how my bean is registered).
