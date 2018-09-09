'use strict'
const path = require('path')
const webpack = require('webpack')

const version = require('../package.json').version
const isProduction = process.env.NODE_ENV === 'production'
console.log('');


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const config = {
  entry: resolve('index.js'),
  output: {
    filename: isProduction ? 'index.js' : 'jinr-sdk.min.js',
    path: resolve('dist'),
    library: 'jinrSdk',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version)
    }),
    // Set the production environment
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    // Minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    // Minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    modules: [
      resolve('..'),
      resolve('node_modules')
    ],
    alias: {
      src: 'src',
      vue$: 'vue/dist/vue.common.js'
    },
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // {
      //   // 图片资源处理器
      //   // 10kb以下数据直接转为base64,否则置于img/文件夹中
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 1020,
      //     name: utils.assetsPath('img/[name].[hash:7].[ext]')
      //   }
      // },
    ]
  },
  // Stats is used to customize Webpack's console output
  // https://webpack.js.org/configuration/stats/
  stats: {
    hash: false,
    colors: true,
    chunks: false,
    version: false,
    children: false,
    timings: true
  }
}

// if (isProduction) {
//   // production only
//   config.plugins = config.plugins.concat([
//     // Set the production environment
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify('production')
//     }),

//     // Minify with dead-code elimination
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: false,
//       compress: {
//         warnings: false
//       }
//     })
//   ])
// }

module.exports = config