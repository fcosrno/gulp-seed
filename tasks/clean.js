module.exports = function(gulp, plugins, config) {
    gulp.task('clean', function() {
        return gulp.src(config.cleanTarget, {
                read: false
            })
            .pipe(plugins.clean());
    });
};
