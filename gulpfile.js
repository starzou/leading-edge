/**
 *@class gulpfile.js
 *@description gulp 配置文件
 *@time 2014-11-28 10:12
 *@author StarZou
 **/

var gulp = require('gulp'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

/**
 * 清空目录
 */
gulp.task('clean', function (cb) {
    del('build', cb);
});

/**
 * 压缩js
 */
gulp.task('minifyJs', function () {
    gulp.src('app/technologies/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

/**
 * 压缩并合并js
 */
gulp.task('js', function () {
    gulp.src('app/technologies/**/*.js')
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build'));
});

/**
 * 默认任务 :
 * 使用 命令行: gulp运行
 */
gulp.task('default', ['minifyJs']);