var gulp = require('gulp');
var config = require('./config.json');
var plugins = require('gulp-load-plugins')();
// plugins.browserSync = require('browser-sync').create();

// A handy helper function...
function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.replace(/[A-Z]/g, function(s){ return "-" + s; }); // camel case handling
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;",
      to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(from[i], to[i]);
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

// Initialize modules in config...
Object.keys(config).forEach(function (key) {
  var exceptions = ['tasksPath','browserSyncWatch'];
  if(exceptions.indexOf(key) === -1) require(config.tasksPath + '/'+string_to_slug(key))(gulp, plugins, config);
});
