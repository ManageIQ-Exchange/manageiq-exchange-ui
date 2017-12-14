"use strict";

const isDevBuild = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: isDevBuild ? 'inline-sourcemap' : null,
  entry: path.join(__dirname, 'src', 'app-client.js'),
  devServer: {
    inline: true,
    port: 3333,
    contentBase: "src/static/",
    historyApiFallback: {
      index: '/index-static.html'
    }
  },
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    publicPath: "/js/",
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'src'),
      loader: ['babel-loader'],
      query: {
        cacheDirectory: 'babel_cache',
        presets: isDevBuild ? ['react', 'es2015', 'react-hmre'] : ['react', 'es2015']
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'GALAXY_API_BACKEND': JSON.stringify(process.env.GALAXY_API_BACKEND),
      'GALAXY_API_VERSION': JSON.stringify(process.env.GALAXY_API_VERSION),
      'GITHUB_OAUTH_ID': JSON.stringify(process.env.GITHUB_OAUTH_ID),
      'GITHUB_REDIRECTUI': JSON.stringify(process.env.GITHUB_REDIRECTUI)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    }),
  ]
};
