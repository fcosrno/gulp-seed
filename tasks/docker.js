module.exports = function(gulp, plugins, config) {
    // Reference: https://github.com/roblayton/reactjs-shopping-cart/blob/master/gulpfile.js
    var argv = require('yargs').argv;
    var exec = require('child_process').exec;
    var fs = require('fs');

    // Make docker config settings optional. Project slug defaults to folder name where gulfile resides.
    docker_machine_name = "default"; // To be deprecated
    project_slug = process.cwd().split('/').pop();
    if (config.docker) {
        project_slug = config.docker.project || process.cwd().split('/').pop();
        docker_machine_name = config.docker.machine || "default";
    }

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

    gulp.task('build-docker', function() {
        exec('docker-compose build', function(err, stdout, stderr) {
            console.log(stdout);
        });
    });

    gulp.task('compose', ['build-docker', 'build-reverse-proxy'].concat(config.docker.runAfter), function() {

        var command = 'docker-compose -f ./docker-compose.yaml ';
        if (environment !== 'dev') {
            command += '-f ./docker-compose.' + environment + '.yaml ';
        }
        command += 'up --force-recreate -d';

        console.log(command);

        exec(command, function(err, stdout, stderr) {
            if (err) throw stderr;
            console.log(stdout);
        });
    });

    gulp.task('status', function() {
        // Not working until I find way to pass in the custom yaml location
        exec('docker-compose ps', function(err, stdout, stderr) {
            console.log(stdout);
        });
    });

    gulp.task('machine-start', function() {
        exec('docker-machine start ' + docker_machine_name, function(err, stdout, stderr) {
            console.log(stdout);
        });

    });

    gulp.task('machine-env-notification', function() {
        var cmd = 'echo \' *\' \n';
        cmd += 'echo \' * Heads up!\'\n';
        cmd += 'echo \' * You need to run: eval "$(docker-machine env ' + docker_machine_name + ')" && gulp compose\'\n';
        cmd += 'echo \' *\'\n';
        exec(cmd, function(err, stdout, stderr) {
            console.log(stdout);
        });
    });

    // ---------

    gulp.task('construct', ['machine-start', 'machine-env-notification']);
    gulp.task('teardown', function() {
        exec('docker-compose stop', function(err, stdout, stderr) {
            console.log(stdout);
        });
    });
};
