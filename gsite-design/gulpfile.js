
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('default',['serve'], function () {

});

gulp.task('serve', ['sass','sass:watch'], function() {

    browserSync.init({
        server: 'webapp'
    });

    gulp.watch('webapp/**/**').on('change', browserSync.reload);
});


gulp.task('sass', function () {
    return gulp.src('webapp/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('webapp/content/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('webapp/sass/**/*.scss', ['sass']);
});