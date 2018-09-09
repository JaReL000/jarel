import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/investreturnmon/page/home/home.vue'

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