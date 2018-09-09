import Vue from 'vue'
import Router from 'vue-router'
import yiyuan from '../views/yiyuan.vue'
import plane from '../components/plane/plane.vue'
// import gift from '../page/gift/gift.vue'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '*',  
			redirect: '/yiyuan'
		},
		// {
		// 	path:'/register',
		// 	component:register
		// },
		{
			path:'/yiyuan',
			component:yiyuan
		},
		{
			path:'/plane',
			component:plane
		},
		// {
		// 	path:'/gift',
		// 	component:gift
		// }
  ]
})
