/*
 |-----------------------------------------
 | 鲸鱼APP主入口
 |-----------------------------------------
 |
 |
 */
import  'utils/growingio.js'
import 'flexiblejs'
import  'style/jrReset.styl'
import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import fetch  from './api'
import router  from './router'
// import main from './main-dev'
const main = require('./main-' + process.env.NODE_ENV).default 

import mixin from 'mixins/mixin'
import header from './components/header'
import { install as Jinr } from 'components'
import JinrSDK from '../../jinr-sdk'
// import Slide from 'src/components-cut'
// import 'minirefresh/dist/minirefresh.min.css'
// import 'components/upRefresh/minirefresh.css'
import MiniRefreshTools from "components/upRefresh/minirefresh.js"  // 上拉加载插件

Vue.use(VueRouter);
Vue.use(Jinr)
// Vue.use(Slide)
Vue.use(header)
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
  router,
  render: h => h(main),
  data: {
    title: '',
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
