var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('minify', function() {
  gulp.src('lib/essential.js')
    .pipe(plumber())
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(rename('essential.min.js'))
    .pipe(gulp.dest('lib'));
});

gulp.task('default', ['minify'], function() {
  gulp.watch('lib/**', ['minify']);
});
