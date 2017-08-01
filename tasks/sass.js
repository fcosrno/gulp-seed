module.exports = function(gulp, plugins, config) {
  gulp.task('sass', config.sass.runAfter, function() {

    for (i = 0; i <= config.sass.from.length - 1; i++) {
      toPump = [
        gulp.src(config.sass.from[i]),
        plugins.sass(config.sass.options).on('error', plugins.sass.logError),
        plugins.cleanCss(),
        // plugins.rev(), // Wordpress stack does not use inject
        gulp.dest(config.sass.to[i])
      ];

      // Speed up development by skipping cleanCSS
      var argv = require('yargs').argv;
      var environment = 'development';
      if (argv.production) environment = 'production';
      if (argv.staging) environment = 'staging';
      if (environment === 'development') {
        toPump = [
          gulp.src(config.sass.from[i]),
          plugins.sass(config.sass.options).on('error', plugins.sass.logError),
          gulp.dest(config.sass.to[i])
        ];
      }
    }

    return require('pump')(toPump);

  });
};
