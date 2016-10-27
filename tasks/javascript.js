module.exports = function(gulp, plugins, config) {

    var argv = require('yargs').argv;

    var environment = 'development';
    if (argv.production) environment = 'production';
    if (argv.staging) environment = 'staging';

    gulp.task('javascript', config.javascript.runAfter, function() {
        // Speed up development by skipping uglify and rev
        if (environment === 'development') {
            return gulp.src(config.javascript.from)
                .pipe(plugins.concat(config.javascript.filename))
                .pipe(gulp.dest(config.javascript.to));
        } else {
            return gulp.src(config.javascript.from)
                .pipe(plugins.concat(config.javascript.filename))
                .pipe(plugins.uglify())
                .pipe(plugins.rev())
                .pipe(gulp.dest(config.javascript.to));
        }
    });
};
