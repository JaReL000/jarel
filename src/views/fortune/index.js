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
import fetch from './api'

import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import { install as Jinr } from 'components'


Vue.use(Jinr)
Vue.config.productionTip = false
Vue.prototype.$http = fetch

FastClick.attach(document.body)
document.body.addEventListener('touchstart', function() {}, false)
new Vue({
  el: '#app',
  render: h => h(App),
})