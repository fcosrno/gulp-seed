module.exports = function(gulp, plugins, config) {
    gulp.task('javascript',config.javascript.runAfter,function() {
      return gulp.src(config.javascript.from)
          .pipe(plugins.concat(config.javascript.filename))
          .pipe(plugins.uglify())
          .pipe(plugins.rev())
          .pipe(gulp.dest(config.javascript.to));
    });
};
