---
layout: post
type: post
title: "Git History Searching"
description: "a quick git tip"
category: scm
tags: [scm, git]
modified: 2016-07-12
comments: true
share: true
---

### Intro
Here's a quick tip from an example case I ran into at the day job relatively recently. I had a situation in which, due to one reason or another, a section of code had disappeared from an application. I happened to know exactly which design element (file) it disappeared from and, while I could have done so, I didn't feel like _only_ restoring the code (from an old, known working version), I also wanted to know what commit in my git repository showed its removal.

#### TL;DR
Git is powerful, you can find commits that change the occurrences of a given string (and even specify a given file name, for brevity). For the command, either keep reading or [check out the command on explainshell](http://www.explainshell.com/explain?cmd=git+log+-S+%27mysteryString%27+--+file.ext).

### Searching With Git
We're basically using the [`git log`](https://git-scm.com/docs/git-log) command with just a little complexity, I promise it's not too scary. If you're still feeling put off, here's a Link Octocat to help you on your way.

<a data-toggle="tooltip" title="it's dangerous to go alone, take this" href="https://assets-cdn.github.com/images/modules/styleguide/linktocat.png"><img src="https://assets-cdn.github.com/images/modules/styleguide/linktocat.png" class="img-responsive center-block"></a>

#### The Command
> `git log -S 'mysteryString' -- file.ext`

#### An Explanation
- `git log` shows commit logs
- `-S` looks for changes in the references in a specified string ('mysteryString')
- `--` tells BASH to end command interpretation, start looking for only positional information; in our case, a specific file (`file.ext`)

#### Reference: Explainshell.com
For those of (us) out there who like to see a more complex command interpretation before plugging them into their shell, I recommend checking out [explainshell.com](http://www.explainshell.com/).

[Here's the above mentioned command, for interpretation.](http://www.explainshell.com/explain?cmd=git+log+-S+%27mysteryString%27+--+file.ext)

### Git Completion
In my Windows vm, the Git BASH shell environment contained git command completion. This is absolutely a benefit for those of us who revert to CLI for more complex operations, but don't remember everything. If your environment is a bit different, or you find yourselves not using the Git BASH CLI (and you don't have git completion), there are official git autocompletion files you can download and use in your environment. To do so:

- download your [bash](https://github.com/git/git/blob/master/contrib/completion/git-completion.bash), [zsh](https://github.com/git/git/blob/master/contrib/completion/git-completion.zsh), or [other](https://github.com/git/git/tree/master/contrib/completion) autocompletion file
- source the autocompletion file from your `.bashrc`, `.zshrc`, etc. ([git-scm.com talks about this very thing](https://git-scm.com/book/en/v1/Git-Basics-Tips-and-Tricks#Auto-Completion))

If you're unsure what I mean by "Git BASH" and find yourself working in [SourceTree](https://www.sourcetreeapp.com/) on Windows, try clicking on the button in the upper bar on the far right, that says "Terminal". That "Terminal" button will, on Windows, launch the "Git BASH" shell, which is a [cygwin](https://www.cygwin.com/) derived environment that lets you interact with a more *nix-like CLI.

### Summary
All in all, having a solid basic understanding of a common tool set can help with some of the more "arcane" situations and CLI-fu, as chances are that if you find yourself in need, someone else has probably run into it. I had run into a simplified version of this search (without the file specificity) and was able to get what I needed pretty quickly. Here's hoping you're a bit more prepared. :beers:
