module.exports = function(gulp, plugins, config) {
    gulp.task('less',config.less.runAfter, function() {
        gulp.src(config.less.from)
            .pipe(plugins.less())
            .pipe(plugins.minifyCss())
            .pipe(plugins.autoprefixer('last 10 version'))
            .pipe(gulp.dest(config.less.to));
    });
};
