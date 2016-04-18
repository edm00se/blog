---
layout: pageminimal
title: Node + Express and More
permalink: /node-express-app-fun/index.html
series: node-express-iseries-nsf
tags: [node, express, iseries, jdbc, jt400, notes, domino, nsf]
description: "Posts about Node + Express being used to create RESTful APIs to nearly any data source, with specifics on IBM i (iSeries/AS400) via jt400 and NSF via domino-nsf (from npm)."

---

<h2 id="seriesTitle" style="color: #c91b26">Series on Node + Express RESTful APIs to connect to a variety of data sources</h2>
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

The posts in this {{ count }}-part series cover a couple varieties, concerns, and implementation capabilities for implementing RESTful APIs with an IBM i, Notes/Domino NSF (via `domino-nsf` on npm, uses the C++ lib), or virtually any data source.

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