var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var ghPages = require('gulp-gh-pages');
var cleanCSS = require('gulp-clean-css');
var livereload = require('gulp-livereload');

var js = ['src/js/*.js'];
var css = ['src/css/*.css'];
var html = ['src/**/*.html'];
var lib = ['src/lib/*.js'];

gulp.task('uglify-js', function() {
    return gulp.src(js)
            .pipe(uglify())
            .pipe(gulp.dest('dist/js/'))
});

gulp.task('compress-html', function () {
	return gulp.src(html)
  .pipe(minifyhtml())
		.pipe(gulp.dest('dist/'));
});

gulp.task('minify-css', function () {
  return gulp.src(css)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('copy-lib', function() {
  return gulp.src(lib)
    .pipe(gulp.dest('dist/lib/'));
});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(js, ['uglify-js']);
	gulp.watch(css, ['minify-css']);
	gulp.watch(html, ['compress-html']);
  gulp.watch(lib, ['copy-lib']);
	gulp.watch('dist/**/*').on('change', livereload.changed);
});

gulp.task('deploy', ['uglify-js', 'compress-html', 'minify-css', 'copy-lib', 'watch'], function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});
