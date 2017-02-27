var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('development'),
        'PORT': JSON.stringify('3000'),
        'WS_PORT': JSON.stringify('8082')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'React redux hot demo',
      template: path.join(__dirname, 'assets/index-template.html')
    })
  ],
  resolve: {
    extensions: ['', '.js'],
    root: path.join(__dirname, 'src')
  },
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: false
    },
  module: {
    preLoaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint'
        }
    ],
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?cacheDirectory'],
      include: path.join(__dirname, 'src')
    }, {
       test: /\.css$/,
       loaders: ['style-loader', 'css-loader']
     }, {
       test: /\.json/,
       loaders: ['json-loader']
     },
    {
        test: /\.scss$/,
        loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    },
    {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    }
     ]
  }
};
