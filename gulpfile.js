/* File: gulpfile.js */

// grab our packages
var gulp        = require('gulp'),
  gutil         = require('gulp-util'),
  runSequence   = require('run-sequence'),
  spawn         = require('child_process').spawn,
  compress      = require('compression'),
  browserSync   = require('browser-sync').create();

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch(['./_drafts/*.md','./_posts/*.md'], ['browser-sync-reload']);
});

// starts the json-server instance
gulp.task('serverStart', function(){ server.start(); });

// reload the json-server instance, and its assets
gulp.task('serverReload', function(){ server.reload(); });

// loading browser-sync as a proxy, must load after json-server
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: {
          target: "http://localhost:4000/"
        },
        ui: {
          weinre: {
              port: 9090
          }
      }
    });
});

// reload browserSync
gulp.task('browser-sync-reload', function(){
  browserSync.reload();
});

// generic build, assuming we don't want the preview
gulp.task('build', function(){
  runSequence(); // needed?
});

gulp.task('auto-reload', function(){
  spawn('gulp', [], {stdio: 'inherit'});
  process.exit();
});

// define the default task and add the watch task to it
gulp.task('default', ['watch', 'serverStart','browser-sync']);
