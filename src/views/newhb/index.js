/*
 |-----------------------------------------
 | 鲸鱼APP主入口
 |-----------------------------------------
 |
 |
 */

// import  'utils/growingio.js'
import 'flexiblejs'
import  'style/jrReset.styl'
// import 'babel-polyfill'

import Vue from 'vue'
import FastClick from 'fastclick'
import fetch  from './api'
// import main from './newhb'
const main = require('./main-' + process.env.NODE_ENV).default 

import mixin from 'mixins/mixin'
import JinrSDK from '../../jinr-sdk'

Vue.prototype.$http = fetch
Vue.prototype.$JinrSDK = JinrSDK

JinrSDK.isBug = process.env.NODE_ENV === 'dev' ? true : false

// 清除300ms延迟
FastClick.attach(document.body)
// 兼容ios点击css :active
document.body.addEventListener('touchstart', function () {}, false)
// 关闭生产模式下给出的提示
Vue.config.productionTip = false
// 开启debug模式
Vue.config.debug = true
// 混合
Vue.mixin(mixin)

new Vue({
  render: h => h(main),
  data: {
    title: '新手福利',
    twoTitle: '',
    token: null,
    show: true,
    isAPP: false,
    isProd: false,
    appData: {
      token: '',
      platform: '',  //操作平台 3-IOS|4-Android
      v: '',  //接口的升级通过版本来号区别。如：3.6.3
      appid: '',  //应用标识
      app_v: '4.1.0',  //APP 版本号
      longitude: '',  //经度
      latitude: '',  //纬度
      sign: '',  // 暂不使用
    },
    showHeader: true,
    latestVersion: true,
    appVersion: 420,
    showShare: true,
    shareTitle: '',
    shareContent: '',
    shareUrl: '',
  }
}).$mount('#app')
