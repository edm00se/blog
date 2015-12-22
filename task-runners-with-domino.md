---
layout: pageminimal
title: Task Runners with Domino Applications
permalink: /task-runners-with-domino-apps/index.html
tags: [xpages, domino, grunt, gulp, git, scm, static, generator]
description: "Posts about using task runners with Domino/XPages web applications."
series: task-runners-with-domino
---

<h2 id="seriesTitle" style="color: #c91b26">Task Runners with Domino Apps</h2>
Task runners are a set of tools to make build operations consistent, clean, and well documented. They effectively provide a set of helper tasks to process defined operations on the project via the command line; these are things a human could otherwise accomplish, but are best automated.

The two most popular task runners (both JavaScript based) are <a href="http://gruntjs.com/">Grunt</a> and <a href="http://gulpjs.com/">gulp</a>. Both of these tools are powerful and useful, each with some advantages and a couple caveats.

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
<p>
    The posts in this {{ count }}-part series cover the conceptual, implementation of, and rammifcations regarding use of a task runner to process static web content for optimized asset delivery in a web application, including how to hook into a (properly structured) app for Domino/XPages.
</p>
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