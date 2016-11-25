var gulp   = require('gulp');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');

gulp.task('test',function(){
    return gulp.src('./public/js/Lib/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js/Lib/'))
});