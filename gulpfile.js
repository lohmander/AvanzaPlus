var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('scripts', function () {
    gulp.src('./js/*.js')
        .pipe(concat('avzplus.concat.js'))
        .pipe(gulp.dest('./'));

    gulp.watch('./js/*', ['scripts']);
});