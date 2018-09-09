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
import {fetch1 as fetch} from './fetchData/axios'
// import jinrsdk from '../../jinr-sdk/index'

import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import { install as Jinr } from 'components'
// import header from './components/header/index'
// Vue.use(header)
Vue.use(Jinr)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.fetch = fetch
FastClick.attach(document.body)
document.body.addEventListener('touchstart', function () {}, false)
router.beforeEach((to,from,next)=>{
  setTimeout(()=> {
    window.scroll(0,0)
    next()
  }, 0);
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
