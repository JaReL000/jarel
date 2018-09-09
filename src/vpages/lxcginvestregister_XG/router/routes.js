
import Vue from 'vue'
import Router from 'vue-router'
import home from '../home.vue'
import rule from '../page/rule/rule.vue'
import gift from '../page/gift/gift.vue'

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
			path:'/rule',
			component:rule
		},
		{
			path:'/gift',
			component:gift
		}
  ]
})
export default routes
