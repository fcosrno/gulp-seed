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

    function _addHost(ip) {
        ip = ip.trim() || '0.0.0.0';
        var hosts = (argv.hosts || '/etc/hosts');
        var newLine = ip.trim() + ' ' + project_slug + '.dev';

        // TODO First check if string doesn't exist

        fs.readFile('/etc/hosts', 'utf8',(err, data) => {
            if (err) throw err;

            if(data.indexOf(newLine) !== -1){
              console.log("Project already in hosts file... Skipping!");
            }else{
              console.log(newLine+" doesn't exist in your hosts file. Adding...");
              // Remove any previous ocurrences first
              exec("sudo sed '/" + newLine + "/d' </etc/hosts", function(err, stdout, stderr) {
                var command = 'sudo sh -c "echo \'' + stdout + newLine + '\' > /etc/hosts"';
                exec(command, function(err, stdout, stderr) {
                  if (err) {
                    console.error('Unable to write to the hosts. Try running this command on terminal: ' + command);
                  }
                  console.log('Done! Ammended the following data to your host file: ' + newLine.trim());
                  console.log('Make sure this domain name equals what you defined as VIRTUAL_HOST in docker-compose-dev.yml');
                });
              });
            }
        });
    }


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

    gulp.task('compose', ['build-docker', 'build-reverse-proxy'], function() {

        var command = 'docker-compose -f ./docker-compose.yaml ';
        if (environment !== 'dev') {
            command += '-f ./docker-compose.' + environment + '.yaml ';
        }
        command += 'up --force-recreate -d';

        console.log(command);

        exec(command, function(err, stdout, stderr) {
            if (err) throw stderr;
            console.log(stdout);
            // Get docker machine ip
            exec('docker-machine ip ' + docker_machine_name, function(err, stdout, stderr) {
                if (environment === 'dev') {
                    _addHost(stdout);
                }
            });
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

    gulp.task('add-host', function() {

        // Get docker machine ip
        exec('docker-machine ip ' + docker_machine_name, function(err, stdout, stderr) {
            if (environment === 'dev') {
                _addHost(stdout);
            }
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
