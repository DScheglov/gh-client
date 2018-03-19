const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DEV = 'development';
const PROD = 'production';

const PUBLIC_FOLDER = './docs';
const CDN = process.env.CDN || '/'; // //dscheglov.github.io/gh-client/


const NODE_ENV = process.env.NODE_ENV || DEV;
const APP_FOLDER = process.cwd();

process.noDeprecation = true;

const config = {
  entry: {
    ghClient: './build/ghClient.js'
  },

  output: {
    path: path.join(APP_FOLDER, PUBLIC_FOLDER),
    publicPath: CDN,
    chunkFilename: '[name].[chunkHash].js',
    filename: '[name].[chunkHash].js'
  },

  watch: NODE_ENV === DEV,
  devtool: NODE_ENV === DEV ? 'source-map' : false,

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new HtmlWebpackPlugin({
      template: './build/index.ejs',
    }),
    new CopyWebpackPlugin(['./build/404.html']),
  ],

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules(?!\/sn-front\.)/,
        options: {
          babelrc: false,
          presets: ['airbnb', 'react', 'es2015', 'es2016', 'stage-0', 'flow'],
          plugins: [
            'transform-class-properties',
            'transform-runtime'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          loader: 'css-loader',
          options: {
            modules: false,
            localIdentName: (
              NODE_ENV === PROD ? '[hash:base64:5]' : '[local]-[hash:base64:5]'
            ),
          }
        })
      },
    ]
  },

  devServer: {
    contentBase: './public',
    host: '0.0.0.0',
    historyApiFallback: {
      index: '/'
    }
  }
};

module.exports = config;
