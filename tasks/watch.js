module.exports = function(gulp, plugins, config) {
  gulp.task('watch', config.watch.runAfter, function() {

    plugins.watch(config.watch.files, function() {
      return gulp.start('build');
    });
  });
};
