/**
 *@class gulpfile.js
 *@description gulp 配置文件
 *@time 2014-11-28 10:12
 *@author StarZou
 **/

var gulp = require('gulp'),
    uglify = require('gulp-uglify');

/**
 * 压缩js
 */
gulp.task('minifyJs', function () {
    gulp.src('js/app/technologies/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

/**
 * 默认任务 :
 * 使用 命令行: gulp运行
 */
gulp.task('default', ['minifyJs']);