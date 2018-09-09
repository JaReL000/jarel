'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  // development
  // 注意，由于这里的值会被作为代码执行，所以必须要加上引号，否则会导致错误！
  NODE_ENV: '"dev"', 
  // BASE_API: '"http://pay.mdev.jinr.com"',
  APP_ORIGIN: '"https://wallstreetcn.com"',
  APP: {
    dev: 'http://jinrapp.dev.jinr.com',
    pre: 'http://jinrapp.pre.jinr.com',
    beta: 'http://jinrapp.beta.jinr.com',
    prod: 'http://jinrapp.jinr.com'
  } 
})