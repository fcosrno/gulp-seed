/**
 * Backs up data using a combination of conventions and technologies like Docker and AWS S3.
 * Everything defined in your config will run.
 *
 * TODO Warn in development environment
 * TODO Do not show stdout on development environment
 */
module.exports = function(gulp, plugins, config) {
    var argv = require('yargs').argv;
    var exec = require('child_process').exec;
    var del = require('del');
    var commands = config.backup;

    gulp.task('backup', function() {
        createFolder(function(err) {
            allBackups(null, 0, commands, saveToS3);
        });
    });


    function createFolder(callback) {
        var fs = require('fs');
        // First, some housekeeping. Delete backup folder
        del(['./.backup/**']).then(function() {
            fs.mkdir('./.backup/', callback);
        });

    }

    function runBackup(key, callback) {
        exec(commands[key], callback);
    }

    function allBackups(err, key, obj, final) {
        if (err) {
            // ignore EEXIST errors thrown by fs.mkdir (http://stackoverflow.com/a/21196961/3421505)
            if (err.code != 'EEXIST') final(err);
        }
        if (key > (Object.keys(obj).length - 1)) {
            final(null);
        } else {
            runBackup(Object.keys(obj)[key], function(err, stdout, stderr) {
                if (err) return allBackups(err, key + 1, obj, final);
                if (stdout) console.log(stdout);
                if (stderr) console.log(stderr);
                allBackups(null, key + 1, obj, final);
            });
        }
    }

    function saveToS3(err) {
        if (err) throw err;
        exec('docker-compose -f docker-compose.s3.yaml up -d', function(err, stdout, stderr) {
            if (err) throw err;
            if (stdout) console.log(stdout);
            if (stderr) console.log(stderr);
        });
    }
};
