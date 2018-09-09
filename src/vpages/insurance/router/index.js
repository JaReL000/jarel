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
  router.beforeEach((to, from, next) => { //禁止从其他页面进入保单填写页面
    console.log(to, '---', from)
  //   if (from.fullPath !== '/health' && to.fullPath === '/insuranceList'&&from.fullPath!=='/information?index=1'&&from.fullPath!=='/agreement?index=1') { // 不能从支付页面返回订单
  //     // console.log('建立了')
  //     next('/myInsurance');
  //   }
    if (from.name !== 'index' && to.fullPath === '/health'&&from.name!=='insuranceList') { // 不能从支付页面返回订单
      console.log('xxx烦xx')
      next('/');
    }
  //   if (from.fullPath !== '/insuranceList' && to.fullPath === '/payment'&&from.name!=='myInsurance') {
  //     next('/')
  //  }
    next()
  })
  return router // 返回router实例
})()
