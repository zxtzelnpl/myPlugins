const gulp = require('gulp');
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({browsers: ['IOS>7','last 4 ChromeAndroid versions']})
const sourcemaps = require('gulp-sourcemaps');

const config = require('./gulp.config.js');



function dev () {
  /**
   * less
   */
  gulp.task('less:dev', function () {
    return gulp.src(config.less)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less({
          plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.cssTo))
        .pipe(browserSync.stream())
  })

  /**
   * serve
   */
  gulp.task('serve', ['less:dev'], function () {
    browserSync.init({
      server: config.root,
      notify: false,
      directory:true
    })

    gulp.watch(config.less_watch, ['less:dev'])
    gulp.watch(config.html).on('change', browserSync.reload);
  })
}

gulp.task('default', ['serve']);

module.exports = dev;
