'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')


const projectRoot = path.resolve(__dirname, '../')
const os = require('os');
const HappyPack = require('happypack');
const happThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
}); // 采用多进程，进程数由CPU核数决定

// const webpack = require('webpack')
// const version = require('../package.json').version

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // cache: true, // 开启webpack的默认缓存
  entry: config.projectConfig.project, // 根据不同的入口生成对应的app.js
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js', // [chunkhash]用于长效缓存
    publicPath: process.env.NODE_ENV === config.build.name ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': resolve('src'),
      'mixins': resolve('src/mixins'),
      'style': resolve('src/style'),
      'stylus': resolve('src/stylus'),
      'assets': resolve('src/assets'),
      'utils': resolve('src/utils'),
      'plugins': resolve('src/plugins'),
      'components': resolve('src/components'),

      'asset': resolve('src/views/m/asset'),
      'welfare': resolve('src/views/m/welfare'),
      'weekProfit': resolve('src/views/m/weekProfit'),
      'current': resolve('src/views/m/current'),
      'regular': resolve('src/views/m/regular'),
      'balance': resolve('src/views/m/balance'),
      'vpages': resolve('src/vpages'),

      // 关于鲸鱼模块的图片路径
      // 'comUrl': resolve('src/views/app/about/components'),
    }
  },

  plugins: [
    // ...
    // new HappyPack({
    //   id: 'js',
    //   loaders: ['babel-loader?cacheDirectory=true'],
    //   threadPool: happThreadPool
    // }),

    // new webpack.DefinePlugin({
    //   __VERSION__: JSON.stringify(version)
    // })
  ],

  module: {
    rules: [
      // //尤大大方案
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [utils.resolve('src'), utils.resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          vueLoaderConfig,
          postcss: [
            require('autoprefixer')({
              browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
            })
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src'), utils.resolve('test')]
      },

      // 加速进程
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //     loaders: {
      //       js: 'happypack/loader?id=js' // 将loader换成happypack
      //     }
      //   }
      // },
      // {
      //   test: /\.js$/,
      //   loader: ['happypack/loader?id=js'], // 将loader换成happypack
      //   include: [path.join(projectRoot, 'src')],
      //   exclude: [path.join(projectRoot, 'node_modules')]
      // },



      {
        // 图片资源处理器
        // 10kb以下数据直接转为base64,否则置于img/文件夹中
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: utils.resolve('src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1020,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          // 'image-webpack-loader'
        ],
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
        // 字体资源处理器
        // 10kb以下数据直接转为base64,否则置于fonts/文件夹中
        // test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        test: /\.(woff2?|woff|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        // include: srcAndExampleAndTestAndDocument,
        // include: resolve('src'),
        options: {
          limit: 10240,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.md$/,
        include: resolve('src'),
        loader: 'vue-markdown-loader',
        options: {
          preventExtract: true
        }
      }
    ]
  },

}
