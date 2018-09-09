// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource'
import jrInstall from './plugins/jr'
import './plugins/growingio'
Vue.config.productionTip = false
// 配置鲸鱼工具
jrInstall(Vue)
// 配置ajax
Vue.use(Resource)
// 配置请求方式
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
})

