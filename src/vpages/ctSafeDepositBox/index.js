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
import {fetch as axios} from './fetchData/fetch'
import JinrSDK from '../../jinr-sdk'


Vue.config.productionTip = false
Vue.prototype.$JinrSDK = JinrSDK

FastClick.attach(document.body)
document.body.addEventListener('touchstart', function () {}, false)

Vue.prototype.$http = axios
new Vue({
  el: '#app',
  render: h => h(App),
})
