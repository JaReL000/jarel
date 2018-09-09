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
  data: {
    log: false,
    alertGetMoney:false,//返回的弹框
    productId:"",//产品ID
    productName:"",//产品名称
    money:""//返回金额
  },
  render: h => h(App),
})
