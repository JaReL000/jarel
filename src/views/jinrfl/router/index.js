import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/jinrfl/page/home/home'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path:'/home',
			component:home
		},
		{
			path: '*',
			redirect: '/home'
		}
  ]
})