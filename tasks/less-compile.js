module.exports = function(gulp, plugins, config) {
    gulp.task('less-compile', function() {
        gulp.src(config.lessSrcPath + '/**/*.less')
            .pipe(less())
            .pipe(minifyCSS())
            .pipe(autoprefix('last 10 version'))
            .pipe(gulp.dest(lessDistPath));
    });
};
