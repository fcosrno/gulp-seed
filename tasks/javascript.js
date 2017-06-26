module.exports = function(gulp, plugins, config) {
    gulp.task('javascript',config.javascript.runAfter,function() {

      var toPump = [
        gulp.src(config.javascript.from),
        plugins.concat(config.javascript.filename),
        plugins.uglify(),
        plugins.rev(),
        gulp.dest(config.javascript.to)
      ];

      // Speed up development by skipping uglify and rev
      var argv = require('yargs').argv;
      var environment = 'development';
      if (argv.production) environment = 'production';
      if (argv.staging) environment = 'staging';
      if (environment === 'development') {
        toPump = [
          gulp.src(config.javascript.from),
          plugins.concat(config.javascript.filename),
          gulp.dest(config.javascript.to)
        ];
      }
      return require('pump')(toPump);
    });
};
