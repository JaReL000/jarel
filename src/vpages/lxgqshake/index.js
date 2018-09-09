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

import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'


import VueRouter from 'vue-router'
import home from './home.vue'
import hbInfo from './components/hbInfo/hbinfo.vue'

import {fetch as axios} from './fetchData/fetch'
import JinrSDK from '../../jinr-sdk'


Vue.use(VueRouter)
let router = new VueRouter({
  // mode: 'history',
  // base: __dirname, //获取当前路径下的完整路径
  routes: [
    {
      path: '/',
      component: home,
      name: 'home'
    },
    {
      path: '/hbInfo',
      component: hbInfo,
      name: 'hbInfo'
    }
  ]
})
Vue.config.productionTip = false

Vue.prototype.$JinrSDK = JinrSDK

FastClick.attach(document.body)
document.body.addEventListener('touchstart', function () {}, false)
Vue.prototype.$http = axios
new Vue({
  router,
  el: '#app',
  render: h => h(App),
})
