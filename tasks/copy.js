module.exports = function(gulp, plugins, config) {
  gulp.task('copy', config.copy.runAfter, function() {
    config.copy.from.forEach(function(value, key) {
      return gulp.src(value)
        .pipe(gulp.dest(config.copy.to[key]));
    });
  });
};
