---
title: Proxying APIs With Parcel v2!
description: parcel as a local dev server with back-end/api call proxying has
  been updated with the Parcel v2 Release Candidate
date: 2021-08-05
published: true
tags:
  - development
  - web
  - tooling
  - proxy
  - parcel
  - javascript
cover_image: ./images/which-way.jpg
category: web
canonical_url: false
permalink: /web/proxying-apis-with-parcel-v2/
---
It's no secret I've been a fan of [Parcel](https://parceljs.org/) for some time. As a bundler, it's taken what's best about webpack and made it more friendly towards end users, uses more sane defaults, and allowed for some really powerful adaptations that would otherwise not be incredibly available. Previously I've blogged about the ease of setting up a local proxy to use with parcel, so that any back-end components can have their traffic accordingly directed. There's an update now with [the v2 release candidate available](https://v2.parceljs.org/blog/rc0/), so I figure it's worth talking about again.

### Parcel v2 RC

The release candidate is exciting to me as it is the culmination of a couple years worth of alpha and beta releases. To their great credit, the parcel team did not rush the release candidate, which seems awfully tempting these days. If you're looking to get started or read up in their documentation, I recommend it. Just pointing your application's `package.json` towards a given target seems to be all the magic sauce required these days, and that's impressive with their many out of the box features and default support.

#### [v2.parceljs.org](https://v2.parceljs.org/)

### Previously...

Previously, what was required to proxy api calls to say `/api` involved writing a thin node script implementation, making use of `http-proxy` and directing any traffic matching your api endpint's starting path, like `/api`, and forwarding the rest to parcel's local dev server. The parcel api made this all possible from a single script file, so to me it was a great win for power and simplicity. It also took slightly more effort up front, but was a relatively lean implementation of a development dependency. Ideally this is something that would live in a configuration and not an application script, which is exactly what the parcel team seemed to think.

### Doing It With v2

You can read [the documentation here](https://v2.parceljs.org/features/api-proxy/), as they have a page on just this topic, but the short version is to do two things:

1. install a middleware package alongside your other dev dependencies

```
npm install --develop http-proxy-middleware
```
2. generate a `.proxyrc` configuration, like so:

```
#.proxyrc
{
  "/api": {
    "target": "http://localhost:8000/",
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

That's it, any requests with a path starting with `/api` now will be forwarded to `localhost:8000`. That's pretty simple and incredibly useful.

### Jumping In Now

If you've been away from front-end tooling for a little while, the landscape has predictably changed again. If you're looking to get started, I'd recommend having a look at either [Parcel v2](https://v2.parceljs.org/) or [Vite](https://vitejs.dev/). These are the two big contenders I'm tracking that make use of some interesting and modern tooling that makes for some powerful and friendly developer experiences. I won't dive into those and their differences here, but they're worth the look.

Happy coding.