module.exports = function(gulp, plugins, config) {
    gulp.task('sass', config.sass.runAfter, function() {
        return gulp.src(config.sass.from)
            .pipe(plugins.sass(config.sass.options).on('error', plugins.sass.logError))
            .pipe(plugins.minifyCss())
            .pipe(plugins.autoprefixer('last 10 version'))
            .pipe(plugins.rev())
            .pipe(gulp.dest(config.sass.to));
    });
};
