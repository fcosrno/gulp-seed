var browserSync = require('browser-sync').create();
module.exports = function(gulp, plugins, config) {
    gulp.task('watch', function() {
        
        // Builds JavaScript
        plugins.watch(config.jsSrcPath, function() {
            gulp.start('javascript');
        });

        // Builds CSS from SASS
        plugins.watch(config.scssSrcPath + '/**/*.scss', function() {
            gulp.start('css-compile');
        });

        // Builds CSS from LESS
        plugins.watch(config.lessSrcPath + '/**/*.less', function() {
            gulp.start('less-compile');
        });

        // Converts Jade
        plugins.watch(config.jadeSrcPath + '/**/*.jade', function() {
            gulp.start('jade-convert');
        });

        // Optimizes Images
        plugins.watch([config.imgSrcPath + '/**/*.jpg', config.imgSrcPath + '/**/*.png', config.imgSrcPath + '/**/*.svg'], function() {
            gulp.start('image-minification');
        });

        // Refresh Browser
        plugins.watch(config.browserSyncWatch, function() {
            plugins.browserSync.reload();
        });

    });
};
