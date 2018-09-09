// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
// import store from './store'
import {fetch as axios }from './fetchData/fetch'
import jrInstall from './plugins/jr'
import './plugins/growingio'
Vue.config.productionTip = false
// 配置鲸鱼工具
jrInstall(Vue)
// 配置ajax
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  // router,
  // store,
  components: { App }
})

