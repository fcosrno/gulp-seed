module.exports = function(gulp, plugins, config) {
    // Reference: https://github.com/roblayton/reactjs-shopping-cart/blob/master/gulpfile.js
    var argv = require('yargs').argv;
    var exec = require('child_process').exec;


    var project_slug = config.docker.project;
    var docker_machine_name = config.docker.machine || "default";

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
        exec('docker-compose -f ' + config.docker.path_to_containers + '/docker-compose-' + environment + '.yml -p ' + project_slug + ' build', function(err, stdout, stderr) {
            console.log(stdout);
        });
    });

    gulp.task('compose', ['build-docker', 'build-reverse-proxy'], function() {
        exec('docker-compose -f ' + config.docker.path_to_containers + '/docker-compose-' + environment + '.yml -p ' + project_slug + ' up -d', function(err, stdout, stderr) {
            if (err) {
                throw stderr;
            } else {
                console.log(stdout);
                // Get docker machine ip
                console.log('You may need to enter your sudo password to edit your hosts file.');
                exec('docker-machine ip ' + docker_machine_name, function(err, stdout, stderr) {
                    if (environment === 'dev') {
                        addHost(stdout);
                    }
                });
            }
        });
    });

    function addHost(ip) {
        ip = ip.trim() || '0.0.0.0';
        var hosts = (argv.hosts || '/etc/hosts');
        var data = ip.trim() + ' ' + project_slug + '.dev';

        // Remove any previous ocurrences first
        exec("sudo sed '/" + data + "/d' </etc/hosts", function(err, stdout, stderr) {
            var command = 'sudo sh -c "echo \'' + stdout + data + '\' > /etc/hosts"';
            exec(command, function(err, stdout, stderr) {
                if (err) {
                    console.error('Unable to write to the hosts. Try running this command on terminal: ' + command);
                }
                console.log('Added the following data to your host file: ' + data.trim());
                console.log('Make sure this domain name equals what you defined as VIRTUAL_HOST in docker-compose-dev.yml');
            });
        });
    }

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
            exec("echo 'You may need to enter your sudo password to edit your hosts file.'");
            if (environment === 'dev') {
                addHost(stdout);
            }
        });

        function addHost(ip) {
            ip = ip.trim() || '0.0.0.0';
            var hosts = (argv.hosts || '/etc/hosts');
            var data = ip.trim() + ' ' + project_slug + '.dev';

            // Remove any previous ocurrences first
            // FIX: make sure the new IP matches too
            exec("sudo sed '/" + data + "/d' </etc/hosts", function(err, stdout, stderr) {
                var command = 'sudo sh -c "echo \'' + stdout + data + '\' > /etc/hosts"';
                exec(command, function(err, stdout, stderr) {
                    if (err) {
                        console.error('Unable to write to the hosts. Try running this command on terminal: ' + command);
                    }
                    console.log('Added the following data to your host file: ' + data.trim());
                    console.log('Make sure this domain name equals what you defined as VIRTUAL_HOST in docker-compose-dev.yml');
                });
            });
        }
    });

    // ---------

    gulp.task('construct', ['machine-start', 'machine-env-notification']);
    gulp.task('teardown', function() {
        exec('docker stop $(docker ps --filter="name=' + project_slug + '_' + environment + '_*" -aq)', function(err, stdout, stderr) {
            console.log(stdout);
        });
    });
};
