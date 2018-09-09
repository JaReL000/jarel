import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/zhitou/page/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '*',
			redirect: '/home'
		},
		{
			path:'/home',
			component:home
		}
  ]
})