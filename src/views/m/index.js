/*
 |--------------------------------------------------------------------------
 |  app主入口
 |--------------------------------------------------------------------------
 |  The Vue build version to load with the `import` command
 |  (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 */

import  'utils/growingio.js'
import 'utils/flexible.js'
import 'style/jrReset.styl'
// import 'babel-polyfill'

import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import loading from './components/loading'
import { install as Jinr } from 'components'
import http from './api'
import commonJS from 'utils/common'
// import store from './store/store'
import mixin from 'mixins/mixin'

import KeyBoard from './components/wc-keyboard';
import MiniRefreshTools from "components/upRefresh/minirefresh.js"  // 上拉加载插件
Vue.use(KeyBoard);

Vue.use( commonJS)
Vue.use(Jinr)
Vue.use(loading)

Vue.prototype.$http = http

Vue.config.productionTip = false

FastClick.attach(document.body)
document.body.addEventListener('touchstart', function () {}, false)

Vue.mixin(mixin)


new Vue({
  el: '#app',
  router,
  render: h => h(App),
  data: {
    eventHub: new Vue(),
    isLogin: false,
    combinationId: '',
    checked: false,
    isAPP: false,
    appData: {
      token: '',
      platform: '',  //操作平台 3-IOS|4-Android
      v: '',  //接口的升级通过版本来号区别。如：3.6.3
      appid: '',  //应用标识
      app_v: '',  //APP 版本号
      longitude: '',  //经度
      latitude: '',  //纬度
      sign: '',  // 暂不使用
    },
    show: true,
    latestVersion: false, // 4.1.0
  }
})
