var path = require('path');
var webpack = require('webpack');
var express = require('express');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.dev.config');
var history = require('connect-history-api-fallback');
var proxy = require('http-proxy-middleware');

var app = express();
var compiler = webpack(config);

app.use(history());
app.use(proxy('/api', {target: 'http://localhost:8080', changeOrigin: true}));

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

app.use(hotMiddleware(compiler));

app.listen(3000, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
