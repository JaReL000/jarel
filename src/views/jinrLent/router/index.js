import Vue from 'vue'
import Router from 'vue-router'
import {routes} from './routes'

console.log('route-------', routes)
Vue.use(Router)

export default new Router( // 参数必须是一个对象
   {routes}
)