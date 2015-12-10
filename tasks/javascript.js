module.exports = function(gulp, plugins, config) {
    gulp.task('javascript', function() {
      return gulp.src(config.jsSrcPath)
          .pipe(plugins.concat('script.js'))
          .pipe(plugins.uglify())
          .pipe(plugins.rev())
          .pipe(gulp.dest(config.jsDistPath));
    });
};
