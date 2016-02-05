// `gulp images` - Run lossless compression on all the images.
module.exports = function(gulp, plugins, config) {
    gulp.task('images',config.images.runAfter, function() {
      return gulp.src(config.images.from)
        .pipe(plugins.imagemin(config.images.options))
        .pipe(gulp.dest(config.images.to));
    });
};
