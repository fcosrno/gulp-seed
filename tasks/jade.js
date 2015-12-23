module.exports = function(gulp, plugins, config) {
    gulp.task('jade',config.jade.runAfter,function() {
        gulp.src(config.jade.from)
            .pipe(plugins.jade({
                locals: {}
            }))
            .pipe(gulp.dest(config.jade.to));
    });
};
