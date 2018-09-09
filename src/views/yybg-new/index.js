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
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ViserVue from 'viser-vue'
Vue.use(ViserVue)
// require styles
// import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
// import { install as Jinr } from 'components'
// Vue.use(Jinr)
Vue.config.productionTip = false

FastClick.attach(document.body)
document.body.addEventListener('touchstart', function () {}, false)

new Vue({
  el: '#app',
  render: h => h(App),
})
