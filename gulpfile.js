var gulp = require('gulp');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');

gulp.task('sass:dev', function() {
  gulp.src('./*.scss') // pick your OWN path here
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(maps.write('./')) // NOT ./build!
  .pipe(gulp.dest('./build'));
});

gulp.task('default', ['sass:dev']);

gulp.task('sass:watch', function() {
  gulp.watch('./*.scss', ['sass:dev']);
});
