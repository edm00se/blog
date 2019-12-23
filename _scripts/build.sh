#!/bin/bash

gem install bundler:2.1.2
bundle exec jekyll build --config _config.yml
npm init -y && npm install --no-save workbox-build && node _config/workbox-build.js
