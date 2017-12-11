var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var ghPages = require('gulp-gh-pages');
var cleanCss = require('gulp-clean-css');

gulp.task('uglify-js', function() {
    var js = ['src/js/*.js'];

    return gulp.src(js)
            .pipe(uglify())
            .pipe(gulp.dest('dist/js/script.js'))
});

gulp.task('compress-html', function () {
  var html = ['src/**/*.html'];

	return gulp.src(html)
		.pipe(minifyhtml())
		.pipe(gulp.dest('dist/'));
});

gulp.task('minify-css', () => {
  var css = ['src/css/*.css'];

  return gulp.src(css)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('deploy', function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['uglify-js', 'compress-html', 'minify-css', 'deploy']);
