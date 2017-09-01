#!/bin/bash

rm -rf ../_site
bundle exec jekyll serve --config _config.yml,_localPreview.yml --drafts --incremental
