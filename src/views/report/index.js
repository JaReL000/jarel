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
import fetch from './api'

import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import { install as Jinr } from 'components'

// import Echarts from 'vue-echarts3'
import VueRouter from 'vue-router'
import home from './home.vue'
import shareOne from './components/shareAfter/shareOne.vue'
import shareTwo from './components/shareAfter/shareTwo.vue'
import shareThree from './components/shareAfter/shareThree.vue'


Vue.use(Jinr)
Vue.config.productionTip = false
  // Vue.component('echarts', Echarts);
Vue.prototype.$http = fetch
  //路由
Vue.use(VueRouter)
let router = new VueRouter({
  // mode: 'history',
  // base: __dirname, //获取当前路径下的完整路径
  routes: [{
      path: '/',
      component: home,
      name: 'home'
    },
    {
      path: '/shareOne',
      component: shareOne,
      name: 'shareOne'
    },
    {
      path: '/shareTwo',
      component: shareTwo,
      name: 'shareTwo'
    },
    {
      path: '/shareThree',
      component: shareThree,
      name: 'shareThree'
    }
  ]
})

FastClick.attach(document.body)
document.body.addEventListener('touchstart', function() {}, false)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')