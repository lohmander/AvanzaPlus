var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

gulp.task('scripts', function () {
    return gulp.src('./js/*.js')
        .pipe(concat('avzplus.concat.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('styles', function () {
    return gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./'));
});

gulp.task('watch', ['scripts', 'styles'], function () {
    gulp.watch('./sass/*', ['styles']);
    gulp.watch('./js/*', ['scripts']);
});