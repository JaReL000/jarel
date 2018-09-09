/*
 |--------------------------------------------------------------------------
 |  app主入口
 |--------------------------------------------------------------------------
 |  The Vue build version to load with the `import` command
 |  (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 */

import 'utils/flexible.js'
import 'style/jrReset.styl'
// import 'babel-polyfill'

import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store'
import { install as Jinr } from 'components'
import JinrSDK from '../../jinr-sdk'
import {postApi} from './api'

Vue.use(Jinr)
Vue.config.productionTip = false
Vue.prototype.$JinrSDK = JinrSDK
Vue.prototype.$http = postApi
FastClick.attach(document.body)
document.body.addEventListener('touchstart', function () {}, false)

new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
