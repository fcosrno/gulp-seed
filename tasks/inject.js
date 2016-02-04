module.exports = function(gulp, plugins, config) {
    gulp.task('inject',config.inject.runAfter, function() {
        return gulp.src(config.inject.to)
            .pipe(plugins.inject(gulp.src(config.inject.from, {
                read: false
            }), config.inject.options))
            .pipe(gulp.dest(config.inject.folder));

    });
};
