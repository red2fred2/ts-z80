const extReplace = require('gulp-ext-replace'),
      del        = require('del'),
      gulp       = require('gulp'),
      typescript = require('gulp-typescript')

/*
 * Default Task
 */
gulp.task('default', () =>
    gulp.src( 'src/**/*.ts' )
        .pipe( typescript() )
        .pipe( extReplace('.js') )
        .pipe( gulp.dest('build') )
)

gulp.task('clean', () =>
    del(['build/**'], {force:true})
)