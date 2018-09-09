/*
 |--------------------------------------------------------------------------
 |  app主入口
 |--------------------------------------------------------------------------
 |  The Vue build version to load with the `import` command
 |  (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 */
import  'utils/growingio.js'
import 'utils/flexible.js'
import router from './router'
import 'style/jrReset.styl'
import 'babel-polyfill'

import {fetch as axios} from './fetchData/fetch'
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import { install as Jinr } from 'components'
import header from './components/header/index'
Vue.use(header)
Vue.use(Jinr)

Vue.config.productionTip = false
Vue.prototype.$http = axios
FastClick.attach(document.body)
router.beforeEach((to,from,next)=>{
  setTimeout(()=> {
    window.scroll(0,0)
    next()
  }, 0);
})
document.body.addEventListener('touchstart', function () {}, false)

new Vue({
  el: '#app',
  router,
  data: {
    countDownTime: 0,
    log: false,
    end: false,
    alertGiftFlag: false,
    alertRule: false,
    title:'好货0元购'
  },
  render: h => h(App),
})
