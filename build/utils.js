'use strict'

const path = require('path')
const fs = require("fs");
const glob = require('glob');
const os = require('os') //获取本地ip地址
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssConfig = require('../postcss.config.js')
// const vueLoaderConfig = require('./vue-loader.conf')
// console.log(vueLoaderConfig.postcss);

const adaptive = require('postcss-adaptive');
/**
 * 生成静态资源的路径
 * @method assertsPath
 * @param  {String}    _path 相对于静态资源文件夹的文件路径
 * @return {String}          静态资源完整路径
 */
exports.assetsPath = function(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === config.build.name ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory
  //  path.posix.join与path.join一样，不过总是以 posix 兼容的方式交互
  return path.posix.join(assetsSubDirectory, _path)
}

/**
 * 生成处理css的loaders配置
 * @method cssLoaders
 * @param  {Object}   options 生成配置
 * option = {
 *   // 是否开启 sourceMap
 *   sourceMap: true,
 *   // 是否提取css
 *   extract: true
 * }
 * @return {Object} 处理css的loaders配置对象
 */
exports.cssLoaders = function(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === config.build.name,
      sourceMap: options.sourceMap,
      // sourceMap: true
    }
  }

  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      // sourceMap: true,
      plugins: () => postcssConfig.plugins
    }
  }

  /**
   * generate loader string to be used with extract text plugin
   * 生成 ExtractTextPlugin对象或loader字符串
   * @method generateLoaders
   * @param  {Array}        loaders loader名称数组
   * @return {String|Object}        ExtractTextPlugin对象或loader字符串
   */
  function generateLoaders(loader, loaderOptions) {
    // const loaders = [cssLoader, postcssLoader]
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
          // sourceMap: true,
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  var stylusOptions = {
    'resolve url': true
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus', stylusOptions),
    styl: generateLoaders('stylus', stylusOptions)
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}


exports.resolve = function(dir) {
  return path.join(__dirname, '..', dir)
}

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
exports.getView = function(globPath, pathDir) {
  const files = glob.sync(globPath);
  let entries = {},
    entry, dirname, basename, pathname, extname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);

    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
    entries[pathname] = basename;
  }

  return entries;
}

//获取多级的入口文件
exports.getEntry = function(pagesName, index) {
  let entries = {}
  let chunks = []
  glob.sync(pagesName + '**' + index).forEach(path => {

    const chunk = path.split(pagesName)[1].split(index)[0]
    entries[chunk] = path
    chunks.push(chunk)
  })
  console.log(entries);

  return entries;
}

//获取多级的入口文件
exports.getMultiEntry = function(globPath) {


  fs.readdir("./src/pages/*/", function(err, files) {
    console.log(files)
  })
  console.log(entries);
  return entries;

}

exports.getCommonsChunk = function(globPath) {
  const files = glob.sync(globPath);
  let entries = [],
    entry, dirname, basename, extname;

  for (let i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    entries.push(basename);
  }
  return entries;
}

/**
 * 获取本地ip
 */
exports.isOS = function() {
  let networkWin, networkMac, networkMacWiFi;

  networkWin = os.networkInterfaces()
  networkMac = os.networkInterfaces().en0 //有线
  // networkMacWiFi = os.networkInterfaces().en1 //无线
  networkMacWiFi = os.networkInterfaces().WLAN //无线

  if (networkMac) {
    ///Library/Preferences/SystemConfiguration/NetworkInterfaces.plist
    for (var i = 0; i < networkMac.length; i++) {
      if (networkMac[i].family == 'IPv4') {
        if (isValidIP(networkMac[i].address)) return networkMac[i].address;
      }
    }
  } else if (networkMacWiFi) {
    for (var i = 0; i < networkMacWiFi.length; i++) {
      if (networkMacWiFi[i].family == 'IPv4') {
        if (isValidIP(networkMacWiFi[i].address)) return networkMacWiFi[i].address;
      }
    }
  } else if (networkWin) {

    return networkWin[Object.keys(networkWin)[0]][1].address
  }
}

function isValidIP(ip) {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip);
}