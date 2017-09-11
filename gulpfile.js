var gulp = require('gulp');
var webpack = require('webpack');
var webserver = require('webpack-dev-server');
var config = require('./webpack.config.js');

var error = function (err) {
  console.log(err.message);
  this.emit('end');
};

gulp.task('webpack', function (callback) {
  // run webpack
  webpack(webpack(config), function (err, stats) {
    if (err) throw error();
  });
});

gulp.task('server', function (callback) {
  console.log('[static]: http://localhost:8080/');

  // Start a webpack-dev-server
  new webserver(webpack(config), {
    // server and middleware options
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    stats: { colors: true },

  }).listen(8080, 'localhost', function (err) {
    if (err) throw error();
  });
});

gulp.task('default', ['server']);
