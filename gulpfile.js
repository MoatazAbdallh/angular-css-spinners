/**
 *  Welcome to your gulpfile!
 * this file will contain the build task that will responsible for minifying js & compile sass
 */

'use strict';

var gulp = require('gulp');
var del = require('del');
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');

var errorHandler = function (title) {
    'use strict';
    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
/**
 *  Clean task for cleaning build folder before 
 */
gulp.task('clean', function () {
    return del('dist/', { force: true });
});
gulp.task('partials', function () {
    return gulp.src('src/**/*.html')
      .pipe(minifyHtml({
          empty: true,
          spare: true,
          quotes: true
      }))
      .pipe(angularTemplatecache('templateCacheHtml.js', {
          module: 'angular-css-spinners',
          root: 'src'
      }))
      .pipe(gulp.dest('temp'));
});
gulp.task('minifyJs', function () {
    return gulp.src(['src/*.js', 'temp/*.js'])
      .pipe(concat('angular-css-spinners.js'))
      .pipe(uglify()).on('error', errorHandler('Uglify'))
      .pipe(rename(function (path) {
          path.basename += ".min";
          path.extname = ".js"
      }))
      .pipe(gulp.dest('dist'));
});
gulp.task('compileSass', function () {
    var sassOptions = {
        style: 'expanded'
    };
    return gulp.src('src/*.scss')
      .pipe(sass(sassOptions)).on('error', errorHandler('Sass'))
      .pipe(autoprefixer()).on('error', errorHandler('Autoprefixer'))
    .pipe(gulp.dest('dist'))
});
gulp.task('cleanTemp', function () {
    del('temp', { force: true })
})
/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('build', function () {
    runSequence('clean', 'partials', 'minifyJs','compileSass','cleanTemp')
})
