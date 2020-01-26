/*
 * Include modules
 */
const extReplace = require('gulp-ext-replace'),
      del        = require('del'),
      gulp       = require('gulp'),
      typescript = require('gulp-typescript')

/*
 * Compile typescript
 */
const compileTS = () =>
    gulp.src(['src/**/*.ts'])
    .pipe(typescript())
    .pipe(extReplace('.js'))
    .pipe(gulp.dest('build'))


const watch = () =>
    gulp.watch('src/**/*.ts', compileTS)

const clean = () =>
    del(['build/**'], {force:true})


exports.default = exports.typescript = exports.compile = compileTS
exports.watch = watch
exports.clean = clean
