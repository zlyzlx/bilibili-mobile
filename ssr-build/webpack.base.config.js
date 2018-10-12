'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    /*path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',*/
    filename: '[name].[chunkhash].js',
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'public': path.resolve(__dirname, '../public'),
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'nodePath': resolve('node_modules'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
             presets: ['es2015']
          }
        }],
        //exclude: /node_modules(?!\/.*(vux).*)/
        //windows
        exclude: /node_modules(?!(\/|\\).*(vux).*)/
      },
      {
        test: /(\.less?)|(\.css?)$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: { minimize: true }
                },
                'less-loader'
              ]
            })
          : ['vue-style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new webpack.BannerPlugin("                   _ooOoo_                    "),
        new webpack.BannerPlugin("                  o8888888o                   "),
        new webpack.BannerPlugin("                 88\" . \"88                  "),
        new webpack.BannerPlugin("                  (| -_- |)                   "),
        new webpack.BannerPlugin("                  O\  =  /O                   "),
        new webpack.BannerPlugin("               ____/`---'\____                "),
        new webpack.BannerPlugin("             .'  \\|     |//  `.              "),
        new webpack.BannerPlugin("            /  \\|||  :  |||//  \             "),
        new webpack.BannerPlugin("           /  _||||| -:- |||||-  \            "),
        new webpack.BannerPlugin("           |   | \\\  -  /// |   |            "),
        new webpack.BannerPlugin("           | \_|  ''\---/''  |   |            "),
        new webpack.BannerPlugin("           \  .-\__  `-`  ___/-. /            "),
        new webpack.BannerPlugin("         ___`. .'  /--.--\  `. . __           "),
        new webpack.BannerPlugin("      .   '<   .___\_<|>_/___.   >'  .        "),
        new webpack.BannerPlugin("     | | :  `- \`.;`\ _ /`;.`/ - ` : | |      "),
        new webpack.BannerPlugin("     \  \ `-.   \_ __\ /__ _/   .-` /  /      "),
        new webpack.BannerPlugin("======`-.____`-.___\_____/___.-`____.-'====== "),
        new webpack.BannerPlugin("                   `=---='                    "),
        new webpack.BannerPlugin("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ "),
        new webpack.BannerPlugin("            佛祖保佑       永无BUG              ")].reverse().concat([
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
      ])
}
/*vuxLoader.merge(webpackConfig, {
  plugins: [
    'vux-ui',
    'progress-bar',
    {
      name: 'duplicate-style',
      options: {
        cssProcessorOptions : {
          safe: true,
          zindex: false,
          autoprefixer: {
            add: true,
            browsers: [
              'iOS >= 7',
              'Android >= 4.1'
            ]
          }
        }
      }
    }
  ]
})*/
module.exports = webpackConfig
