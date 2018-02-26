// import modules
const gulp = require('gulp');
const sass  = require('gulp-sass');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');

// paths
const sassSource = ['app/sass/**/*.scss'];

// browrser sync server init
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './app'
    }
  });

  gulp.watch(sassSource, ['sass']);
  gulp.watch('app/*.html').on('change', browserSync.reload);
  gulp.watch('app/javascript/*.js').on('change', browserSync.reload);
});

// sass compile task
gulp.task('sass', function() {
  return gulp.src(sassSource)
    .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
    .pipe(sass())
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('default', ['browserSync']);

// watch files and reload browserSync
// gulp.task('watch', ['browserSync', 'sass'], function() {
//   gulp.watch(sassSource, ['sass']);
//   gulp.watch('app/*.html', browserSync.reload);
//   gulp.watch('app/javascript/**/*.js', browserSync.reload);
// });


