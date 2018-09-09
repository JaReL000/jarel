"use strict"

require('./check-versions')()
var utils = require('./utils')
var config = require('../config')
var chalk = require('chalk')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// 域名赋值
// process.env.BASE_API =  config.dev.env
// console.log(process.env.BASE_API);

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = (config.isTesting || config.isProduction)
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: false,  // display nothing to the console 
  noInfo: false, // display no info to console (only warnings and errors) 
  //  用于统计数据的选项 
  stats: {
    colors: true,
    chunks: false,
    inline: false, // 当源代码改变时，自动刷新页面，通过强制刷新来避免代码修改后页面没跟着热加载的情况
  },
  progress: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// const hotMiddleware = require('webpack-hot-middleware')(compiler, {
//     log: () => {}
// })
  // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// enable hot-reload and state-preserving
// compilation error display
// app.use(hotMiddleware) //新有

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const IPv4 = config.isLocalhost ? 'localhost' : utils.isOS()
// var uri = 'http://'+ IPv4 + ":" + port + config.dev.assetsHTMLFilePath
// var uri = 'http://localhost:' + port
const uri = 'http://' + IPv4 + ":" + port

  // 直接打开最新添加的项目,方便调试
let project_list = config.projectConfig.project
let lasted_project_index = Object.keys(project_list).length - 1
// + Object.keys(project_list)[lasted_project_index]
// let lasted_project_uri = uri + '/' + config.projectConfig.static_root + '/index.html'
let lasted_project_uri = uri + '/' + config.projectConfig.static_root+ "index.html"
console.log(`lasted_project_uri => ${lasted_project_uri}`);

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log(chalk.cyan('> Starting dev server...'))
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + chalk.blue(lasted_project_uri) + '\n')
    // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(lasted_project_uri)
  }
  _resolve()
})

var server = app.listen(port)

// 新
// var _resolve
// var _reject
// var readyPromise = new Promise((resolve, reject) => {
//   _resolve = resolve
//   _reject = reject
// })

// var server
// var portfinder = require('portfinder')
// portfinder.basePort = port

// console.log('> Starting dev server...')
// devMiddleware.waitUntilValid(() => {
//   portfinder.getPort((err, port) => {
//     if (err) {
//       _reject(err)
//     }
//     // process.env.PORT = port
//     // var uri = 'http://localhost:' + port
//     console.log('> Listening at ' + chalk.blue(lasted_project_uri) + '\n')
//     // when env is testing, don't need open it
//     if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
//       opn(lasted_project_uri)
//     }
//     server = app.listen(port)
//     _resolve()
//   })
// })

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}