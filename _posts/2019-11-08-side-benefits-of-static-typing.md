---
layout: post
type: post
title: "Side Benefits of Static Typing"
description: "static typing your JavaScript carries more than the obvious"
category: web
tags: [web, javascript, typescript, preprocessing]
modified: 2019-11-08
comments: true
share: true
---

Regardless of your being for or against statically typing and transpiling your JavaScript code, there are advantages to doing so. No system is absolute and yes, it does transpile into JavaScript proper. That said, there can be a great number of conveniences brought in by typing your JS source code. The most obvious major reasos is that, properly defined, your models, API use, and function input and output will be consistently to an expected format. This addresses one of the largest complaints about JavaScript as a language, that everything is so [loosey-goosey](https://m-w.com/dictionary/loosey-goosey).

<figure class="bg-dark">
  <amp-img src="/assets/images/post_images/untitledGoose.png"
  alt="good news everyone"
  width="250" height="250"
  layout="fixed"></amp-img>
 <figcaption>Eponymous antihero of the <a href="https://goose.game/">Untitled Goose Game</a></figcaption>
</figure>

Beyond this primary advantage, there are a good number of side benefits to using a static typed system in front of your JavaScript code base.

### Side benefits

Adding static typing to your JavaScript, such as with TypeScript, brings with it a couple of concepts by the sheer nature of the fact that there's a build phase of the source code to create the ultimately consumed JavaScript. This would happen the same if we used a build tool and [babel](https://babeljs.io/) to process JavaScript, so while it's not entirely unique to add to the process around JS, it carries with it some benefits as well.

#### Pre-Processing

By merely having a build phase in the life cycle of an application, we can do a number of things to ease our concerns. We can create config files for different environments, allowing for the different setups or variable inclusions based on environment. This can be done a number of different ways, such as keeping different `.env` files containing their respective values or having a `config.js` file which resolves an object with its respective variables through a single object interface. Whichever route you take, having this as a pluggable constant in your application helps take the guesswork out of things.

We can also abbreviate or mock different integrations or even down to the function level, for the purposes of testing. A testing environment is after all just another environment. This makes scaffolding a bit more self-explanatory as well, thankfully. Most test runners, such as jest, flag the node environment variable (a la `process.env.NODE_ENV`) to `test` during its run, so setting your testing configuration as _just another environment_ is not only well supported, but desirable.

#### Compilation / Transpilation

The names of things matter, but when it comes to something processing what is or will be JavaScript I have given up on caring _too much_. There's a difference, I just don't care to get into it here. TypeScript relies on their compiler `tsc` to compile source into browser consumable JavaScript, so with TS feel free to use the word "compile". If you happen to use the term 'transpile', since that's what happens with babel and other JavaScript tooling, I will treat you as having said the correct thing, even though there may be some difference in the nuance of what's going on under the hood. It's sort of like "Merry Christmas", "happy holidays", "happy Kwanzaa", and more. Most people celebrate _something_ around the end of the year, prior to the new year, and if we all want to live healthier and happier lives, we won't take offense to whatever it is someone wishes us. For bonus points, turn it into a game and see how many varied phrases you can "collect" receipt of by others to tally up after the completion of the holiday rush. No, the points don't actually matter, like Who's Line.

#### The Side Benefits

Some of the key side benefits to static typing in your work flow seem to come in a couple of flavors.

##### Better Editor / Tooling

VS code is my primary editor for all-things-front-end. TODO: more!!1

https://code.visualstudio.com/docs/editor/intellisense

- better editor tooling
  - VS Code includes intellisense
  - works well w/ JS
  - works w/ better understanding of code w/ TS
- true understanding of imports/exports (can be achieved w/ JS and esm)
  - aids tree shaking
  - aids code splitting
- asdf

### Summary

Over the last year, I've been increasing my use of TypeScript in my day-to-day work and have considered incorporating it more 
