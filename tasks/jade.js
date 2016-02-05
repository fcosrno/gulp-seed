module.exports = function(gulp, plugins, config) {
    gulp.task('jade',config.jade.runAfter,function() {
        return gulp.src(config.jade.from)
            .pipe(plugins.jade({
                locals: {}
            }))
            .pipe(gulp.dest(config.jade.to));
    });
};
