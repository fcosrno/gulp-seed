module.exports = function(gulp, plugins, config) {
  gulp.task('browser-sync-watch', config.browserSyncWatch.runAfter, function() {
    plugins.watch(config.browserSyncWatch.files, function() {
      return gulp.start(['build'],function() {
          plugins.browserSync.reload();
      });
    });
  });
};
