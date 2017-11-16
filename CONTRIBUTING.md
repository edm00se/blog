# Contributing
If you'd like to help spot-check some typos, you can [submit a Pull Request](https://github.com/edm00se/DevBlog/compare) to my GitHub repository's source; simple fixes (e.g.- typos) are much easier to merge from the GitHub interface, so keep your edits as minimal as possible.

If you're looking to contribute to my blog (for some strange reason), contact me first. There will be no blindly accepted PRs.

# Forking
You are free to fork my blog as a starter to creating one of your own, but you should:

1. recognize that this blog uses the [amplify theme for Jekyll](https://github.com/ageitgey/amplify), which is separately maintained, and this blog has some unique features changed/added which are my own
2. remove my post, draft, page, and image content as all content should be **your own** for _your_ blog
3. check out [my blog post on getting started with static site generators with GitHub Pages](https://edm00se.io/web/the-right-tool-for-the-job)
4. install ruby, jekyll, and the `github-pages` and `bundler` ruby gems

For more on getting started with GitHub Pages, check out [GitHub's documentation for GitHub Pages](https://help.github.com/articles/using-jekyll-with-pages/).

To run a local preview, I recommend using the command `bundle exec jekyll serve --config _config.yml,_localPreview.yml`. This will use the `_config.yml` file and override it with with the values from `_localPreview.yml` for while in local preview; specifically removing the domain name from populated hyperlinks, override the Google Analytics code (so as not to report local previews as live hits on the site), and disable the Disqus comments from loading on posts.

# Thanks
If you're reading this, you're interested in what I'm doing. So thanks for paying attention and contact me with any questions.
