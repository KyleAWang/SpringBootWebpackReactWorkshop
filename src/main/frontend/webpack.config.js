/**
 * Created by Kyle on 6/4/2017.
 */
const path = require('path');
const webpack = require('webpack');

console.log(__dirname);

const PATHS = {
  source: path.join(__dirname, 'app'),
  output: path.join(__dirname, '../../../target/classes/static')
};

module.exports = () => ({
  entry: [
    PATHS.source
  ],
  output: {
    path: PATHS.output,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),
  ],
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false,
  }
});