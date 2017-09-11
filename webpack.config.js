const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    'app': ['./src/app.js']
    // 'create': ['./src/create.js'],
    // 'load': ['./src/load.js'],
    // 'embed': ['./src/embed.js'],
    // 'common': ['./src/common.js']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?[a-z0-9=&.]+)?$/i,
        loader: 'file-loader',
        query: {
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  devServer: {
    // contentBase: 'dist',
    // hot: true,
    inline: true
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['IE 11', 'last 4 versions'] })];
  },
  plugins: [
    new webpack.ProvidePlugin({ 'Promise': 'bluebird' }),
    new ExtractTextPlugin('css/[name].css', { allChunks: true }),  // 本番は '[name]-[hash].css'
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
    // new webpack.HotModuleReplacementPlugin(),
  ]
};
