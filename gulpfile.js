// 'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var imgcompress = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('img:compress', function () {
  return gulp.src('./img/**/*')
    .pipe(imgcompress())
    .pipe(gulp.dest('./dst/img'))
});

gulp.task('minify-css', function() {
  return gulp.src('./css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dst/css'));
});

gulp.task('dist',
          [ 'sass',
            'img:compress', 
            'minify-css' ]
          );
