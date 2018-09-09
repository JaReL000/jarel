"use strict"
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const html_template_generator = require('./plugin/generate.html.template')
const env = config.dev.env
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// webpack 复制文件和文件夹的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')

// add hot-reload related code to entry chunks
// 这里有一个问题，因为js里是按引用传递的，所以如果按照原先的做法直接对baseWebpackConfig.entry进行操作
// 会导致config.project里的配置也会随之变化，导致后续代码出错
// 因此需要单独创建一个变量，避免污染config配置
let project_list = {};
// Object.keys(config.projectConfig.project).forEach(function(name) {
//   project_list[name] = ['./build/dev-client'].concat(config.projectConfig.project[name])
// })
Object.keys(config.projectConfig.project).forEach(function(directory) {
  project_list[directory] = ['./build/dev-client'].concat(config.projectConfig.project[directory])
})

baseWebpackConfig.entry = project_list

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development  #cheap-module-source-map
  devtool: '#cheap-module-eval-source-map', // eval-source-map只能看，不能调试，得不偿失
  plugins: [
      // 全局NODE变量
      new webpack.DefinePlugin({
        'process.env': config.dev.env,
        'process.domain': config.projectConfig.domain,
        'process.mFormalDomain': config.domain.mFormalDomain,
      }),
      // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      // 复制静态资源
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }]),
      // https://github.com/ampedandwired/html-webpack-plugin
    ].concat(html_template_generator.generate_html_template_list(config.dev.env)).concat([new FriendlyErrorsPlugin()]) // 不能用push,push的返回值是数组的长度，不是数组本身。。。
})