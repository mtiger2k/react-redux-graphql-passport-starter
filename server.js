var path = require('path');
var webpack = require('webpack');
var express = require('express');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.dev.config');
var history = require('connect-history-api-fallback');
var proxy = require('http-proxy-middleware');

const PORT = process.env.PORT || '3000';
const API_PORT = process.env.API_PORT || '3010';

var app = express();
var compiler = webpack(config);

app.use(history());

const apiHost = `http://localhost:${API_PORT}`;
const apiProxy = proxy({ target: apiHost });
app.use('/graphql', apiProxy);
app.use('/graphiql', apiProxy);
app.use('/signin', apiProxy);
app.use('/signup', apiProxy);
app.use('/user', apiProxy);

/*app.use(proxy('/api', {target: 'http://localhost:'+API_PORT, changeOrigin: true,
    pathRewrite: function (path, req) { return path.replace('/api', '') }
}));*/

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

app.use(hotMiddleware(compiler));

app.listen(PORT, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:'+PORT);
});
