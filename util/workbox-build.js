const path = require('path');
const {injectManifest} = require('workbox-build');
const sitePath = path.join(__dirname, '..', 'dist');
const configPath = __dirname;

let config = {
  globDirectory: sitePath,
  globPatterns: [
    '**/*.{html,css,png,jpg,svg,gif,js,ico,eot,ttf,woff,xml,md,lock,txt,json}'
  ],
  swDest: `${sitePath}/sw.js`,
  swSrc: `${configPath}/sw.js`,
  maximumFileSizeToCacheInBytes: 2.5 * 1024 * 1024
};

injectManifest(config)
  .then(({count, size}) => {
    console.log(`Generated ${config.swDest}, which will precache ${count} files, totaling ${size} bytes.`)
  });