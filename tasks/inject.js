module.exports = function(gulp, plugins, config) {
    gulp.task('inject', config.inject.runAfter, function() {

        var target = gulp.src(config.inject.to);
        var sources = gulp.src(config.inject.from, {
            read: false
        });

        return target.pipe(plugins.inject(sources, config.inject.options))
            .pipe(gulp.dest(config.inject.folder));

    });
};
