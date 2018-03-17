const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const DEV = 'development';
const PROD = 'production';

const PUBLIC_FOLDER = './public';


const NODE_ENV = process.env.NODE_ENV || DEV;
const APP_FOLDER = process.cwd();

process.noDeprecation = true;

const config = {
  entry: {
    ghClient: './build/ghClient.js'
  },

  output: {
    path: path.join(APP_FOLDER, PUBLIC_FOLDER),
    publicPath: '',
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
    new HtmlWebpackPlugin()
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
          presets: ['react', 'env', 'flow'],
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
            modules: true,
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
    host: '0.0.0.0'
  }

};


if (NODE_ENV === PROD) {
  config.plugins.push(new UglifyJsPlugin({
    minimize: true,
    debug: false,
    beautify: false,
    comments: false,
    dead_code: true,
    exclude: /babel-polyfill/,
    compress: {
      sequences: true,
      booleans: true,
      loops: true,
      unused: true,
      warnings: false,
      drop_console: false,
      unsafe: true,
      screw_ie8: true,
      dead_code: true
    }
  }));
  config.module.loaders[1].options.presets.push('react-optimize');
}

module.exports = config;
