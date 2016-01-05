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

// loading browser-sync as a proxy, must load after json-server
gulp.task('browser-sync', function() {
    browserSync.init({
        /*
        proxy: {
          target: "http://localhost:4000/"
        },
        */
        server: {
            baseDir: "./_site/"
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

gulp.task('jekyll-dev', function(){
  runSequence(
      'jekyll-build',
      'watch',
      'browser-sync');
});

gulp.task('jekyll-build-dev', function(done){
  browserSync.notify('Building Jekyll');
  return spawn('bundle', ['exec', 'jekyll', 'build', '--config', '_config.yml,_localPreview.yml' ], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-build', function(done){
  browserSync.notify('Building Jekyll');
  return spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('close', done);
});

// generic build, assuming we don't want the preview
gulp.task('build', ['jekyll-build']);

gulp.task('auto-reload', function(){
  spawn('gulp', [], {stdio: 'inherit'});
  process.exit();
});

// define the default task and add the watch task to it
gulp.task('default', ['jekyll-dev']);
