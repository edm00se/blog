module.exports = {
  "globDirectory": "_site/",
  "globPatterns": [
    "**/*.{html,css,png,jpg,svg,gif,js,ico,eot,ttf,woff,xml,md,lock,txt,json}"
  ],
  "swDest": "_site/sw.js",
  "swSrc": "_config/sw.js",
  "maximumFileSizeToCacheInBytes": 2.5 * 1024 * 1024
};
