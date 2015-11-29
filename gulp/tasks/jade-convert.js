module.exports = function(gulp, plugins, config) {
    gulp.task('jade-convert', function() {
        var YOUR_LOCALS = {};
        gulp.src(config.jadeSrcPath + '/**/*.jade')
            .pipe(jade({
                locals: YOUR_LOCALS
            }))
            .pipe(gulp.dest(config.jadeDistPath));
    });
};
