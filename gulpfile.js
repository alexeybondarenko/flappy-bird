var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    docco = require("gulp-docco");

gulp.task('docs', function () {
    return gulp.src("./src/**/*.js")
        .pipe(docco())
        .pipe(gulp.dest('./docs'));
});

gulp.task('serve', function () {
    return browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
