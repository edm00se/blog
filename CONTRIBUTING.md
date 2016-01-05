# Contributing
Let's face it, this is personal blog. If you're looking to get started with your own blog, contribute in part to this one, or even guest write an entire post or series, please contact me first. No Pull Requests will be blindly accepted.

# Forking
You are free to fork my blog as a starter to creating one of your own, but you should:

1. recognize that this blog uses the [HMFAYSAL Omega Theme](https://github.com/hmfaysal/hmfaysal-omega-theme), which is separately maintained, and this blog uhas some unique features changed/added which are my own
2. remove my post, draft, and image content as all content should be **your own** for your blog
3. check out [my blog post on getting started with static site generators with GitHub Pages](https://edm00se.io/web/the-right-tool-for-the-job)
4. install ruby, jekyll, and the `github-pages` ruby gem

For more on getting started with GitHub Pages, check out [GitHub's documentation for GitHub Pages](https://help.github.com/articles/using-jekyll-with-pages/).

You should also appreciate and potentially make use of my [gulpfile.js](https://github.com/edm00se/DevBlog/blob/gh-pages/gulpfile.js) with [gulpjs](http://gulpjs.com/), which detatches the need for keeping your local preview (e.g.- with `bundle exec jekyll serve --drafts` after modifying your `_config.yml`) running perpetually in your terminal by instead invoking a `bundle exec jekyll build` with the appropriate config override for local preview, on post or draft content change, reloading the browser page on change to the built post. Gulp, and task runners in general, are a topic of my recent [series on task runners](https://edm00se.io/task-runners-with-domino-apps).

# Thanks
If you're reading this, you're interested in what I'm doing. So thanks for paying attention and contact me with any questions.
