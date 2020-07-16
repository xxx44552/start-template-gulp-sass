var gulp = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var autoprefixBrowsers = ['> 1%', 'last 10 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'];
var tinypng = require('gulp-tinypng');
var jsmin = require('gulp-jsmin');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('app/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('minify-css', () => {
  return gulp.src('app/css/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('autoprefixer', function() {
  return gulp.src('app/css/*css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function() {
  return gulp.src('app/js/**/*js')
  	.pipe(jsmin())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});

gulp.task('tinypng', function() {
	return gulp.src('app/img/**/*')
	.pipe(tinypng('u8rfBPVHsWVKcYXUJEo0v1Y7ZQklnmE0'))
	.pipe(gulp.dest('dist/img'))
});

gulp.task('del', function() {
	return del.sync('dist');
});

gulp.task('build', ['del', 'sass', 'minify-css', 'autoprefixer', 'minify-js', 'tinypng'], function() {
	var buildHTML = gulp.src('app/**/*.html')
	.pipe(gulp.dest('dist/'))

	var buildAll = gulp.src('app/**/*.php')
	.pipe(gulp.dest('dist'))

	var favicon = gulp.src('app/favicon.ico')
	.pipe(gulp.dest('dist'))

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});

gulp.task('watch', ['sass', 'browser-sync'], function(){
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/**/*.js', browserSync.reload);
});