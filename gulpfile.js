'use strict';
const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', function gulpTest() {
  gulp
    .src('./mongo_04.js')
    .pipe(mocha())
    .on('error', function(err) {
      this.emit('end');
    });
});

gulp.task('watch', function gulpWatch() {
  gulp.watch('./*.js', ['test']);
});
