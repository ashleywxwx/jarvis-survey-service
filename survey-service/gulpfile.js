var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('dev', function () {
    nodemon({
        script: 'index.js',
        ext: 'js',
        tasks: ['lint']
    })
});

gulp.task('lint', function () {
    return gulp.src(['*.js', '!gulpfile.js', '/*/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
