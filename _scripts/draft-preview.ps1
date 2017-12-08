Remove-Item .\_site -recurse
bundle exec jekyll serve --config _config.yml,_config.dev.yml --drafts --incremental
