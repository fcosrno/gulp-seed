module.exports = function(gulp, plugins, config) {
    gulp.task('clean',config.clean.runAfter, function() {
        return plugins.del.sync(config.clean.target);
    });
};
