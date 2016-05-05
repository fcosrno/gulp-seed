module.exports = function(gulp, plugins, config) {
  var browserSync = plugins.browserSync.create();
    gulp.task('browser-sync',config.browserSync.runAfter, function() {
        plugins.browserSync.init(config.browserSync);
    });
};
