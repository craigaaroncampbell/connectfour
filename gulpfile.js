var gulp = require('gulp');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');

gulp.task('sass:dev', function() {
  gulp.src('./*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('./build'));
});

gulp.task('default', ['sass:dev']);
