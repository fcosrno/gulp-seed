module.exports = function(gulp, plugins, config) {
    var argv = require('yargs').argv;
    var exec = require('child_process').exec;
    var fs = require('fs');

    var environment = 'dev';
    if (argv.production) environment = 'production';
    if (argv.staging) environment = 'staging';

    gulp.task('add-hostname', config.addHostname.runAfter, function() {
        if (environment === 'dev') {
            if (config.addHostname.hosts) {
                config.addHostname.hosts.forEach(function(host) {
                    _addHost('0.0.0.0', host);
                });
            } else {
                project_slug = process.cwd().split('/').pop();
                _addHost('0.0.0.0', project_slug + '.dev');
            }
        }

    });

    function _addHost(ip, domain) {
        ip = ip.trim() || '0.0.0.0';
        var hosts = (argv.hosts || '/etc/hosts');
        var newLine = ip.trim() + ' ' + domain;

        fs.readFile('/etc/hosts', 'utf8', (err, data) => {
            if (err) throw err;

            if (data.indexOf(newLine) !== -1) {
                console.log(domain + " already in hosts file.");
            } else {
                console.log(domain + " is not in your hosts file. Please enter password...");
                // Remove any previous ocurrences first
                exec("sudo sed '/" + newLine + "/d' </etc/hosts", function(err, stdout, stderr) {
                    var command = 'sudo sh -c "echo \'' + stdout + newLine + '\' > /etc/hosts"';
                    exec(command, function(err, stdout, stderr) {
                        if (err) {
                            console.error('Unable to write to the hosts. Try running this command on terminal: ' + command);
                        }
                        console.log('Added to hosts file successfully!');
                        console.log('Make sure this domain name equals what you defined as VIRTUAL_HOST in docker-compose-dev.yml');
                    });
                });
            }
        });
    }
};
