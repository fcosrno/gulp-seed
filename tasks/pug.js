module.exports = function(gulp, plugins, config) {
    gulp.task('pug', config.pug.runAfter, function() {
        return gulp.src(config.pug.from)
            .pipe(plugins.pug({
                locals: {}
            }))
            .pipe(gulp.dest(config.pug.to));
    });
};
