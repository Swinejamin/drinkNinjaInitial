var gulp = require('gulp'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    fs = require("fs");
var converter = require('sass-convert');
var sassdoc = require("sassdoc");
var plugins = require('gulp-load-plugins')({
    lazy: true,
    camelize: true
});
var mainStyle = 'client/styles/src/*.s+(a|c)ss';
var stylePaths = ['client/styles/src/*.css', mainStyle];
var jsxPaths = ['client/*.jsx','client/components/*.jsx'];

gulp.task('bundle', function bundleJS() {
        return browserify({
            entries: 'client/components/main.jsx',
            debug: true
        })
            .transform('reactify')
            .bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest('./client/components/build'))


});
gulp.task('bundle-dash', function bundleJS() {
        return browserify({
            entries: 'client/dashboard.jsx',
            debug: true
        })
            .transform('reactify')
            .bundle()
            .pipe(source('dashboard.js'))
            .pipe(gulp.dest('./client'))


});
gulp.task('bundle-console', function bundleJS() {
    return browserify({
        entries: 'client/console.jsx',
        debug: true
    })
        .transform('reactify')
        .bundle()
        .pipe(source('console.js'))
        .pipe(gulp.dest('./client'))


});

gulp.task('views', function buildHTML() {
    fs.writeFileSync('client/styles/style.css', '');
    return gulp.src(['server/views/index.pug', 'server/views/reader.pug', 'server/views/login.pug'])
        .pipe(plugins.pug())
        .pipe(gulp.dest('./server/views/compiled'));
});

gulp.task('sc2sa', function () {
    return gulp.src(mainStyle, {
        base: './'
    })
        .pipe(converter({
            from: 'scss',
            to: 'sass',
        }).on('error', plugins.util.log))
        .pipe(sassdoc())
        .pipe(gulp.dest('./'));
});

gulp.task('style-lint', function () {
    return gulp.src(mainStyle)
        .pipe(plugins.sassLint({
            configFile: 'sass-lint.yml'
        }).on('error', plugins.util.log))
        .pipe(plugins.sassLint.format())
        .pipe(plugins.sassLint.failOnError());
});

gulp.task('build-css', function buildStyles() {
    return gulp.src(stylePaths)
        .pipe(plugins.sass().on('error', plugins.util.log))
        .pipe(plugins.concat('style.css'))
        // .pipe(plugins.uncss({
        //     html: ['server/views/compiled/*.html'],
        //     ignore: [
        //         "#reader",
        //         ".fade",
        //         ".fade.in",
        //         ".collapse",
        //         ".collapse.in",
        //         ".collapsing",
        //         ".alert-danger",
        //         "/open+/",
        //         "/social-btn+/"
        //   ]
        // }))
        // .pipe(plugins.cleanCss())
        .pipe(gulp.dest('./client/styles'));
});

gulp.task('compile-css', function buildStyles() {
    return gulp.src(mainStyle)
        .pipe(plugins.sass().on('error', plugins.util.log))
        .pipe(gulp.dest('./client/styles/src'));
});

gulp.task('sass:watch', function () {
    gulp.watch(mainStyle, ['build-css']);
});

gulp.task('jsx:watch', function () {
    gulp.watch(jsxPaths, ['bundle-console', 'bundle-dash']);
});