import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home/home.vue'
import giftDetail from '../page/giftDetail/giftDetail.vue'
import myDetail from '../page/myDetail/myDetail.vue'

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
		},
		{
			path:'/giftDetail',
			component:giftDetail
		},
		{
			path: '/myDetail',
			component: myDetail
		}
  ]
})