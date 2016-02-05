module.exports = function(gulp, plugins, config) {
    gulp.task('sass-compile', function() {
        return gulp.src(config.scssSrcPath + '/main.scss')
            .pipe(plugins.plumber({
                errorHandler: plugins.notify.onError("ERROR: CSS Compilation Failed")
            }))
            .pipe(plugins.compass({
                style: 'compressed',
                css: config.cssDistPath,
                sass: config.scssSrcPath,
                image: config.imgSrcPath
            }))
            .pipe(plugins.autoprefixer(config.browserList))
            .pipe(gulp.dest(config.cssDistPath));
    });
};
