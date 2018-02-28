// import modules
const gulp = require('gulp');
const sass  = require('gulp-sass');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify');
const babel = require('gulp-babel');
const del = require('del');

// paths
const sources = {
    sass: ['app/sass/**/*.scss'],
    js: 'app/javascript/app.js',
    css: 'app/css/app.css',
    idx: 'app/index.html'
};

// browrser sync server init
gulp.task('browserSync', ['sass'], () => {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });

    gulp.watch(sources.sass, ['sass']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
    gulp.watch('app/javascript/*.js').on('change', browserSync.reload);
});

gulp.task('serve', ['build'], () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('dist/*.min.css', browserSync.reload);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
    gulp.watch('dist/*.min.js', browserSync.reload);
})

// sass compile task
gulp.task('sass', () => {
    return gulp.src(sources.sass)
        .pipe(plumber())
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// js process to dist/
gulp.task('js-minify:build', () => {
    return gulp.src(sources.js)
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(rename((path) => path.basename += '.min'))
        .pipe(gulp.dest('dist/'))
        .pipe(notify('Javascript files are processed and saved to dist/'))
        .pipe(browserSync.stream())
});

// css process to dist/
gulp.task('css:build', () => {
    return gulp.src(sources.css)
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(cleanCSS({ compatibility: '*' }))
        .pipe(rename((path) => path.basename += '.min'))
        .pipe(gulp.dest('dist/'))
        .pipe(notify('CSS files are processed and saved to dist/'))
        .pipe(browserSync.stream())
});

// html process to dist/
gulp.task('html:build', () => {
    return gulp.src(sources.idx)
        .pipe(plumber())
        .pipe(gulp.dest('dist/'))
        .pipe(notify('Html file are processed and saved to dist/'))
        .pipe(browserSync.stream())
});

gulp.task('default', ['browserSync']);
gulp.task('build', ['js-minify:build', 'css:build', 'html:build']);


gulp.task('clean:dist', () => {
    return del(['dist']).then(paths => {
        console.log('Files and folders are deleted in:\n', paths.join('\n'));
    });
});

