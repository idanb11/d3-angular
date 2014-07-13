var gulp = require('gulp'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  jshint = require('gulp-jshint'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  embedlr = require('gulp-embedlr'),
  livereload = require('gulp-livereload'),
  lr = require('tiny-lr'),
  lrserver = lr(),
  fs = require('fs'),
  requirejs = require('requirejs'),
  http = require('http'),
  errorhandler = require('errorhandler'),
  morgan = require('morgan'),
  express = require('express');

//////////////////////////////
//// Settings
//////////////////////////////
var livereloadport = 35729,
    serverport     = 8000;

//////////////////////////////
//// Default
//////////////////////////////
gulp.task('default', ['watch', 'styles', 'serve']);

gulp.task('serve', function () {
  var app = express();
  app.use(express.static(__dirname));
  app.use(morgan()); // logger
  app.use(errorhandler()); // error handler

  app.listen(serverport, function () {
    console.log('Started server on: ' + serverport);
    livereload.listen(livereloadport, function () {
      console.log('Started livereload server on: ' + livereloadport);
    });
  });
});

gulp.task('watch', function () {
  gulp.watch(['app/scss/**/*'], ['styles']);
  gulp.watch(['app/js/**/*']).on('change', livereload.changed);
  gulp.watch(['app/partials/**/*']).on('change', livereload.changed);
  gulp.watch(['index.html']).on('change', livereload.changed); // adding watch to the main index.html
});

gulp.task('styles', function () {
  return gulp.src(['app/scss/**/*'])
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('app/css/'))
    .pipe(livereload())
    .pipe(notify({ message: 'Styles task complete' }));
});
