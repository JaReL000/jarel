"use strict"
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
var proxyTable = require('./proxy.table')
// 在配置生成路径时需要projectConfig中的相关信息，故预先导入
const projectConfig = require('./project.js')
console.log('是否选股：' + process.env.isXG)

module.exports = {
  build: {
    name: 'prod',
    // 服务器端配置
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'), // 公共资源地址
    assetsSubDirectory: './' + projectConfig.static_root,
    // assetsSubDirectory: './' + projectConfig.static_root + '/', // 子文件夹前缀 // 在webpack2中编译需要加上后缀/ ，否则会报操作错误Error
    assetsPublicPath: '/', // 静态地址前缀，使用网址以便对外发布
    productionSourceMap: false, // 是否生成map文件(设成ture会额外生成一份map文件方便前端调试，但是由于vue.js编译后的代码就算加了map也看不懂，所以直接使用false即可)
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off process.env.npm_config_report
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    name: 'dev',
    // 本地调试配置
    env: require('./dev.env'),
    port: projectConfig.port, // 调试地址端口
    autoOpenBrowser: true,
    assetsSubDirectory: '.', // 子文件夹前缀
    assetsPublicPath: '/',
    assetsHTMLFilePath: '/customer/home.html',
    proxyTable: proxyTable, // 可以在这里配置端口转发(解决本地调试时的跨域问题),这边为了方便，我就直接在dev-server代码中进行修改了
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  },
  //域名配置
  domain: {
    mFormalDomain: '"m.jinr.com"',
    appFormalDomain: '"app.jinr.com"',
  },
  projectConfig,
  isLocalhost: false,
  ossEnv: process.env.isXG ? require('./oss.env.xg') :  require('./oss.env'),
  isProduction: process.env.NODE_ENV === 'prod',
  isTesting: process.env.NODE_ENV === 'testing'
}