module.exports = function(gulp, plugins, config) {
    var argv = require('yargs').argv;

    var environment = 'development';
    if (argv.production) environment = 'production';
    if (argv.staging) environment = 'staging';


    gulp.task('sass', config.sass.runAfter, function() {
        if (environment === 'development') {

            for (i = 0; i <= config.sass.from.length - 1; i++) {
                gulp.src(config.sass.from[i])
                    .pipe(plugins.sass().on('error', plugins.sass.logError))
                    .pipe(gulp.dest(config.sass.to[i]));
            }
            return;
        } else {
            for (i = 0; i <= config.sass.from.length - 1; i++) {
                gulp.src(config.sass.from[i])
                    .pipe(plugins.sass(config.sass.options).on('error', plugins.sass.logError))
                    .pipe(plugins.cleanCss())
                    .pipe(gulp.dest(config.sass.to[i]));
            }
            return;
        }
    });
};
