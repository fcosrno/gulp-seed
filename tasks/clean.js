module.exports = function(gulp, plugins, config) {
    gulp.task('clean',config.clean.runAfter, function() {
        return gulp.src(config.clean.target, {
                read: false
            })
            .pipe(plugins.clean());
    });
};
