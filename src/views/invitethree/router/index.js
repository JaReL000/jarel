import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/invitethree/page/home/home'
import detail from '@/views/invitethree/page/invitedetail/invite-detail'

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
			path:'/detail',
			component:detail
		}
  ]
})