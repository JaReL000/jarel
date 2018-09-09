import Vue from 'vue'
import vueRouter from 'vue-router'
import routes from './routes'
Vue.use(vueRouter)


export default (function createRouter() {
  let router = new vueRouter({
    routes,
    mode: 'hash', // 路由地址后面有#号
    // mode: 'history', // 去掉路由地址后的#号
    // base: '/' //应用的基路径

  });
  // router.beforeEach((to, from, next) => { //禁止从其他页面进入保单填
  // })
  return router // 返回router实例
})()
