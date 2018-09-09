'use strict'
const utils = require('./utils')
const config = require('../config')
const adaptive = require('postcss-adaptive');
const isProduction = process.env.NODE_ENV === config.build.name

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction 
      ? config.build.productionSourceMap 
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  postcss: [
    // require('autoprefixer')({ 
    //   browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] 
    // }),
    // adaptive({
    //   remUnit: 75, //number，rem unit value（默认值：75）
    //   baseDpr: 2, //数字，基本设备像素比（默认值：2）
    //   remPrecision: 6, //数字，rem值精度（默认值：6）
    //   hairlineClass: 'none', //string，类名为1px border（默认'hairlines'）
    //   autoRem: true //boolean，是否转换为rem单位（默认值：false）
    // }),
  ]
}