var gulp = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('app/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('app/css'));
});


gulp.task('css', function () {
	var plugins = [
		autoprefixer({overrideBrowserslist: ['last 4 versions', 'Chrome >= 41', 'iOS >= 7', 'Safari >= 7']}),
		cssnano()
	];
	return gulp.src('./app/css/**/*.css')
			.pipe(postcss(plugins))
			.pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function (){
	return gulp.src('./app/js/**/*.js')
			.pipe(babel())
			.pipe(gulp.dest('./dist/js'));
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './app'
		},
		notify: false
	})
});

gulp.task('del', function() {
	return del.sync('/.dist');
});

gulp.task('build', function(callback) {
	runSequence('del',
			'sass',
			'css',
			'js',
			callback);

	gulp.src('./app/**/*.html')
			.pipe(gulp.dest('./dist'));

	gulp.src('./app/**/*.php')
			.pipe(gulp.dest('./dist'));

	gulp.src('./app/favicon.ico')
			.pipe(gulp.dest('./dist'));

	gulp.src('./app/fonts/**/*')
			.pipe(gulp.dest('./dist/fonts'));

	gulp.src('./app/img/**/*')
			.pipe(gulp.dest('./dist/img'));
});

gulp.task('watch', ['sass', 'browser-sync'], function(){
	gulp.watch('./app/sass/*.sass', ['sass']);
	gulp.watch('./app/**/*.html', browserSync.reload);
	gulp.watch('./app/**/*.js', browserSync.reload);
});