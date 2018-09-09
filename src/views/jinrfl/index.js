/*
 |--------------------------------------------------------------------------
 |  app主入口
 |--------------------------------------------------------------------------
 |  The Vue build version to load with the `import` command
 |  (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 */

import  'utils/growingio.js'
import  'utils/flexible.js'
import 'style/jrReset.styl'
import router from './router'
import store from './store/'
import 'babel-polyfill'
import {fetch as axios} from './fetchData/fetch'


import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import { install as Jinr } from 'components'
Vue.use(Jinr)
Vue.config.productionTip = false
Vue.prototype.$http = axios
FastClick.attach(document.body)
document.body.addEventListener('touchstart', function () {}, false)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
