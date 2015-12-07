module.exports = function(gulp, plugins, config) {
    gulp.task('browser-sync', function() {
        plugins.browserSync.init(config.browserSync);
    });
};
