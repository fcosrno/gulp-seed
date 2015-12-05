var browserSync = require('browser-sync').create();
module.exports = function(gulp, plugins, config) {
    gulp.task('browser-sync', function() {
        browserSync.init(config.browserSync);
    });
};
