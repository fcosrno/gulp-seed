module.exports = function(gulp, plugins, config) {
    gulp.task('jade', function() {
        var YOUR_LOCALS = {};
        gulp.src(config.jadeSrcPath)
            .pipe(plugins.jade({
                locals: YOUR_LOCALS
            }))
            .pipe(gulp.dest(config.jadeDistPath));
    });
};
