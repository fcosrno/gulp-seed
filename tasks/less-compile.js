module.exports = function(gulp, plugins, config) {
    gulp.task('less-compile', function() {
        gulp.src(config.lessSrcPath)
            .pipe(plugins.less())
            .pipe(plugins.minifyCss())
            .pipe(plugins.autoprefixer('last 10 version'))
            .pipe(gulp.dest(config.lessDistPath));
    });
};
