---
title: 'Redmine, CodeRay, and Domino, Oh My!'
date: 2014-08-11
published: true
tags: ['xpages', 'domino', 'redmine', 'source control']
canonical_url: false
description: 'getting the syntax highlighting everyone wants'
category: xpages
permalink: /xpages/redmine-coderay-domino-syntax-highlighting/
---

### Syntax Highlighting in Redmine Project Repository

Redmine is a greate way to track projects and their code repositories in a "one stop shopping" locale. The only issue is that, while Redmine makes use of its syntax highlighter of choice (CodeRay, by default), it doesn't know about the custom file extensions used by Domino Designer. This can be easily remedied with a few quick edits.

### Updating Redmine CodeRay to Syntax Highlight (most) Domino/XPages Design Elements

Get into the correct file that pertains to file extensions and syntax highlighting definitions.

- go to your Redmine directory (ex- `/var/www/redmine`)
- enter your vendor library path for CodeRay (ex- `vendor/bundle/ruby/1.9.1/gems/coderay-1.0.9/`)
- edit the `file_type.rb` file (which defines the language syntax associtiations, ex- `lib/coderay/helpers/file_type.rb`) with your preferred editor

Now that you're there, we need to associate the design elements accordingly. Scroll down to the section defining the array of TypeFromExt (or search, in nano CTRL+W, for something like xml), and add in the following:

```yaml
- 'fa' => :xml,
- 'form' => :xml,
- 'frameset' => :xml,
- 'jss' => :java_script,
- 'page' => :xml,
- 'properties' => :xml,
- 'view' => :xml,
- 'xsp' => :xml,
```

The Notes (classic) design elements, especially Form and View, are best viewed in source control if you have un-checked the 'Use Binary DXL for source control opersations' in Domino Designer (Domino Designer > Source Control) and will read like a semi-decent XML structure. If you're just concerned about the XPage'd elements, the 'xsp' file extension and 'jss' are the only necessary definitions.
