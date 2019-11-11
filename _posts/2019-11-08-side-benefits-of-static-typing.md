---
layout: post
type: post
title: "Side Benefits of Static Typing"
description: "static typing your JavaScript carries more than the obvious"
category: web
tags: [web, javascript, typescript, preprocessing]
modified: 2019-11-11
comments: true
share: true
---

Regardless of your being for or against statically typing and transpiling your JavaScript code, there are advantages to doing so. No system is absolute and yes, it does transpile into JavaScript proper. That said, there can be a great number of conveniences brought in by typing your JS source code. The most obvious major reasos is that, properly defined, your models, API use, and function input and output will be consistently to an expected format. This addresses one of the largest complaints about JavaScript as a language, that everything is so [loosey-goosey](https://m-w.com/dictionary/loosey-goosey).

<figure class="bg-dark">
  <amp-img src="/assets/images/post_images/untitledGoose.png"
  alt="good news everyone"
  width="250" height="250"
  layout="fixed"></amp-img>
 <figcaption>The titular antihero and miscreant of the <a href="https://goose.game/">Untitled Goose Game</a>.</figcaption>
</figure>

Beyond this primary advantage, there are a good number of side benefits to using a static typed system in front of your JavaScript code base.

### Side benefits

Adding static typing to your JavaScript, such as with TypeScript, brings with it a couple of concepts by the sheer nature of the fact that there's a build phase of the source code to create the ultimately consumed JavaScript. This would happen the same if we used a build tool and [babel](https://babeljs.io/) to process JavaScript, so while it's not entirely unique to add to the process around JS, it carries with it some benefits as well.

#### Pre-Processing

By merely having a build phase in the life cycle of an application, we can do a number of things to ease our concerns. We can create config files for different environments, allowing for the different setups or variable inclusions based on environment. This can be done a number of different ways, such as keeping different `.env` files containing their respective values or having a `config.js` file which resolves an object with its respective variables through a single object interface. Whichever route you take, having this as a pluggable constant in your application helps take the guesswork out of things.

We can also abbreviate or mock different integrations or even down to the function level, for the purposes of testing. A testing environment is after all just another environment. This makes scaffolding a bit more self-explanatory as well, thankfully. Most test runners, [such as jest, flag the node environment variable (a la `process.env.NODE_ENV`) to `test` during its run](https://jestjs.io/docs/en/24.0/getting-started.html#using-babel), so setting your testing configuration as _just another environment_ is not only well supported, but desirable.

#### Compilation / Transpilation

The names of things matter, but when it comes to something processing what is or will be JavaScript I have given up on caring _too much_. There's a difference, I just don't care to get into it here. TypeScript relies on their compiler `tsc` to compile source into browser consumable JavaScript, so with TS feel free to use the word "compile". If you happen to use the term 'transpile', since that's what happens with babel and other JavaScript tooling, I will treat you as having said the correct thing, even though there may be some difference in the nuance of what's going on under the hood. It's sort of like "Merry Christmas", "happy holidays", "happy Kwanzaa", and more. Most people celebrate _something_ around the end of the year, prior to the new year, and if we all want to live healthier and happier lives, we won't take offense to whatever it is someone wishes us. For bonus points, turn it into a game and see how many varied phrases you can "collect" receipt of by others to tally up after the completion of the holiday rush. No, the points don't actually matter, like Who's Line.

#### The Side Benefits

Some of the key side benefits to static typing in your work flow seem to come in a couple of flavors.

##### Better Editor / Tooling

VS code is my primary editor for front-end work. One of the features it brings, by default, is what it calls [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense). As far as I'm concerned, it's implemented nearly seamlessly and is a great feature for editing with JavaScript or TypeScript. It offers a high degree of awareness regarding code, be it your source or imported from `node_module`s, as well as a type-ahead completion suggestions that are pretty solid. With static types in use, this also means that there is a far more intelligent display of what is expected. As someone who has done a large amount of Java work previously, this fills the gap of some of what I felt was missing when focusing more on front-end work, without Eclipse / IntelliJ IDEA.

Additionally, this greater and true understanding of imported code means that things like tree shaking and code splitting are far more powerful, as knowing explicitly, via named imports/exports, whether a function is needed in the built output is now legitimately definitive. This capability has obvious advantages regarding breaking apart modern front-end heavy builds and pushing an increasingly aware amount of what's needed "down the pipes" to the user based on things like which page they're on or whether or not they're even logged into a valid session.

### Summary

Over the last year, I've been increasing my use of TypeScript in my day-to-day work and have considered incorporating it more into my open source and dabbling projects. The best part of it all is that having created [my own preferred flavor of a starter repo](https://github.com/edm00se/vue-parcel-starter) makes this easy to test in a branch and the use of my preferred build tool, [Parcel](https://parceljs.org/), makes this [extremely easy to setup and try out](https://github.com/edm00se/vue-parcel-starter/pull/61/files#diff-60b2029a3ac639f9ff664d542400700aR10).

So, do you _need_ to use TypeScript or another static typing solution in your JavaScript? No, you can write perfectly valid JS without it. What I do ask myself has to do far more with whether I want to skip out on some of what TS can give me, without any additional effort. I'm sure you'll find your own answer, but hopefully I've inspired a little extra consideration.

### Bonus

As mentioned above, adding TS to my starter repo was easy, almost too easy. When tooling does what it should, it can lead us to great places. Here's how easy it was.

<figure class="center">
  <amp-anim src="/assets/images/post_images/addingTypeScript.gif"
  alt="live parcel dev server detects changes, installs typescript dep, new build is good"
  height="482" width="947"
  layout="responsive"></amp-anim>
 <figcaption>adding typescript to vue components with parcel, stupid easy</figcaption>
</figure>
