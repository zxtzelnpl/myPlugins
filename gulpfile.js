var todaydir = '20170224FRI/';
var todayLess = '20170224FRI/css/*.less';
var todayStyle = '20170224FRI/css';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var connect = require('gulp-connect');



gulp.task('styles', function () {
    return gulp.src(todayLess)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        // .pipe(cssmin())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(todayStyle));
});

gulp.task('html', function () {
    gulp.src(todaydir+'*.html')
        .pipe(connect.reload());
});

gulp.task('js',function(){
    gulp.src(todaydir+'js/*.js')
        .pipe(connect.reload());
});

gulp.task('watch',['styles'],function(){
    gulp.watch([todaydir+'*.html'],['html']);
    gulp.watch([todaydir+'*.js'],['js']);
    gulp.watch([todayLess],['styles']);
});

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('default', ['connect','watch']);