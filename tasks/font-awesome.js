module.exports = function(gulp, plugins, config) {
    gulp.task('font-awesome', config.fontAwesome.runAfter,function () {
      return gulp.src(config.fontAwesome.from)
        .pipe(gulp.dest(config.fontAwesome.to));
    });
};
