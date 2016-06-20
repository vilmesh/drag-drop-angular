var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var cleanCSS = require('gulp-clean-css');
var inject = require('gulp-inject');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');

gulp.task('clean', function() {
  return del('./public');
});

gulp.task('js', function() {
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('template', function() {
  return gulp.src('./app/template/*.html')
    .pipe(templateCache({
      module: 'app',
      moduleSystem: 'IIFE'
    }))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('build-less', function(){
  return gulp.src('./app/styles.less')
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('html', ['js', 'build-less', 'template'], function() {
  return gulp.src('./app/index.html')
    .pipe(inject(gulp.src(['./public/**/*.css', './public/**/*.js'], {read: false}),
      { ignorePath: 'public/', addRootSlash: false }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
	gulp.watch('app/**/*.js', ['js']);
	gulp.watch('app/**/*.less', ['build-less']);
	gulp.watch('app/template/*.html', ['template']);
});

gulp.task('connect', ['html'], function () {
	connect.server({
		root: 'public',
		port: 8080
	});
});

gulp.task('default', ['connect']);
gulp.task('dev', ['connect', 'watch']);