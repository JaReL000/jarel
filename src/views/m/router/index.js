/*
 |--------------------------------------------------------------------------
 | 路由入口
 |--------------------------------------------------------------------------
 |
 |
 */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import {changeTitle} from 'mixins/mixin'
// week-regular
Vue.use(Router)
const router = new Router({
  // 默认值: "hash" (浏览器环境) | "abstract" (Node.js 环境)
  mode: 'hash', // "hash" | "history" | "abstract"
  hashbang: true,//去除#！开头
  transitionOnload: false,//初次加载的时候是否对<router-view>处理场景切换效果
  history: true,//是否开启html5模式，去掉锚点
  saveScrollPosition: true, //记住页面的滚动位置 html5模式适用
  routes,
})

/**
 * to: Route: 即将要进入的目标 路由对象
 * from: Route: 当前导航正要离开的路由
 * next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
 */
if(false){
  router.beforeEach((to, from, next) => {
    // console.log(to);
    // console.log(from);
    next()

  })
}


router.afterEach(route => {

  // 从路由的元信息中获取 title 属性
  if (route.name) {
    changeTitle(route.name)
    document.title = route.name;
  }
});
export default router

