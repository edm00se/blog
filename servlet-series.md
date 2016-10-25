---
layout: page
permalink: /servlet-series/index.html
title: A Saga of Servlets
series: servlet-series
tags: [xpages, json, java, servlet]
description: "Posts about Java servlet creation and use with IBM Domino/XPages."
---

<h2 id="seriesTitle" style="color: #c91b26">Series on Java servlets in Domino/XPages applications</h2>
{% assign count = '0' %}
{% assign idx = '0' %}
{% for post in site.posts reversed %}
    {% if post.series == page.series %}
        {% capture count %}{{ count | plus: '1' }}{% endcapture %}
        {% if post.url == page.url %}
            {% capture idx %}{{count}}{% endcapture %}
        {% endif %}
    {% endif %}
{% endfor %}

The posts in this {{ count }}-part series cover the varieties, concerns, and implementation capabilities for implementing RESTful _HTTPServlets_ with _DesignerFaces_ and Notes _Session_ access in an app for Domino/XPages.

<ul class="post-list">
{% assign count = '0' %}
{% for post in site.posts reversed %}
{% if post.series == page.series %}
    {% capture count %}{{ count | plus: '1' }}{% endcapture %}
    <li>Part {{ count }} -
    {% if page.url == post.url %}
        This Article
    {% else %}
        <a href="{{post.url}}">{{post.title}}
        	<span class="entry-date">
				<time datetime="{{ post.date | date_to_string }}" itemprop="datePublished">{{ post.date | date_to_string }}</time>
			</span>
        </a>
    {% endif %}
    </li>
{% endif %}
{% endfor %}
</ul>
