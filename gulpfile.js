var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

var path = {
  HTML: 'public/index.html',
  JS: 'public/js/**/*.js',
  VENDOR_CSS: 'public/vendor_css/**/*.css',
  CSS: 'public/css/app.scss',
  FONTS: 'public/fonts/**/*',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_JS: 'dist/js',
  DEST_CSS: 'dist/css',
  DEST_FONTS: 'dist/fonts',
  DEST_BUILD: 'dist/build',
  ENTRY_POINT: './public/js/app.js'
};

var b = browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
});

gulp.task('copy', function() {
    gulp.src(path.HTML).pipe(gulp.dest(path.DEST));
    gulp.src(path.FONTS).pipe(gulp.dest(path.DEST_FONTS));
});

gulp.task('bundle', function() {
    b.bundle(function(err, buf) {
        if (err) {
            console.log(err.toString())
        } else {
            console.log('Initial build.js created');
        }
    })
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_JS));
});

gulp.task('watcher', function() {
    gulp.watch([path.HTML], ['copy']);
    gulp.watch('public/css/**/*.scss', ['sass']);

    var w = watchify(b);
    return w.on('update', function() {
        w.bundle(function(err, buf) {
            if (err) {
                console.log(err.toString())
            } else {
                console.log('build.js updated by watcher');
            }
        })
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_JS));
    })
    .bundle(function(err, buf) {
        if (err) {
            console.log(err.toString())
        } else {
            console.log('Initial build.js created');
        }
    })
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_JS));
});

gulp.task('sass', function() {
    return gulp.src(path.CSS)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.DEST_CSS));
});

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(webserver({
            host: 'localhost',
            port: 8000,
            path: '/',
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('build', ['copy', 'sass', 'bundle']);
gulp.task('watch', ['copy', 'sass', 'watcher']);
gulp.task('serve', ['webserver']);
