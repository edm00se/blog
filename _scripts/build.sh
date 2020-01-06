#!/bin/bash

gem install bundler
bundle exec jekyll build --config _config.yml
npm init -y && npm install --no-save workbox-build && node _config/workbox-build.js
