module.exports = function(gulp, plugins, config) {
  // Reference: https://github.com/roblayton/reactjs-shopping-cart/blob/master/gulpfile.js
  var argv = require('yargs').argv;
  var exec = require('child_process').exec;
  var fs = require('fs');

  var environment = 'dev';
  if (argv.production) environment = 'production';
  if (argv.staging) environment = 'staging';

  gulp.task('build-reverse-proxy', function() {
    // Only run on development env
    if (environment === 'dev') {
      exec('docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy', function(err, stdout, stderr) {
        console.log(stdout);
      });
    }
  });

  gulp.task('compose', ['build-reverse-proxy'].concat(config.docker.runAfter), function() {

    var command = 'docker-compose -f ./docker-compose.yaml ';
    if (environment !== 'dev') {
      command += '-f ./docker-compose.' + environment + '.yaml ';
    }
    command += 'up --build --force-recreate -d';

    console.log(command);

    exec(command, function(err, stdout, stderr) {
      if (err) throw stderr;
      console.log(stdout);
    });
  });
};
