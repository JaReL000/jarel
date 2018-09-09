/*
 |--------------------------------------------------------------------------
 |  app主入口
 |--------------------------------------------------------------------------
 |  The Vue build version to load with the `import` command
 |  (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 */

import 'utils/flexible.js'
import 'style/jrReset.styl'
import 'babel-polyfill'
import './assets/css/public.styl'
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import http from './api'
// import {fetch as axios} from '../ctgqinvestreturn/fetchData/fetch'
import cp from './components'
import mix from './mixin/mixin'
import { install as Jinr } from 'components' // 引入与鲸鱼APP组件
import JinrSDK from '../../jinr-sdk-sc' // 引入与鲸鱼组件交互的方法
// console.log('ffffffff', fetch)
Vue.prototype.$http = http
// Vue.prototype.$http = axios;
Vue.prototype.$JinrSDK = JinrSDK
Vue.use(cp)
Vue.use(Jinr)
Vue.mixin(mix)
Vue.config.productionTip = false
FastClick.attach(document.body)
document.body.addEventListener('touchstart', function () {}, false);
// router.beforeEach((to, from, next) => {
//   // ...
//   console.log(to,'xxx',from)
//   if(from.fullPath === '/'){ // 不能从支付页面返回订单
//     // next({path:'/agreement'});
//   }
//   next()
// })
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
