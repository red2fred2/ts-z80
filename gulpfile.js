const extReplace = require('gulp-ext-replace'),
      del        = require('del'),
      gulp       = require('gulp'),
      typescript = require('gulp-typescript')

exports.compile = exports.default = () =>
    gulp.src(['src/**/*.ts'])
    .pipe(typescript())
    .pipe(extReplace('.js'))
    .pipe(gulp.dest('build'))

exports.clean = () =>
    del('build/**')
