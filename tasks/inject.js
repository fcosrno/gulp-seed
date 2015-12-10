module.exports = function(gulp, plugins, config) {
    gulp.task('inject', ['javascript', 'jade'], function() {
        return gulp.src(config.injectTarget)
            .pipe(plugins.inject(gulp.src(config.injectSources, {
                read: false
            }), {
                relative: true
            }))
            .pipe(gulp.dest(config.injectDestination));
    });
};
