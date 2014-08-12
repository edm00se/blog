---
layout: post
type: gist
title: "Redmine, CodeRay, and Domino, Oh My!"
description: "getting the syntax highlighting everyone wants"
category: xpages
tags: [xpages, domino, redmine, source control]
modified: 2014-08-11
comments: true
share: true
---

### Syntax Highlighting in Redmine Project Repository

Redmine is a greate way to track projects and their code repositories in a "one stop shopping" locale. The only issue is that, while Redmine makes use of its syntax highlighter of choice (CodeRay, by default), it doesn't know about the custom file extensions used by Domino Designer. This can be easily remedied with a few quick edits.

{% gist 5eb0a7d6eabcfd9fbfa8 ReadMe.md %}