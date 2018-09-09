const routes = [{
  path: '/',
  meta: '邀请页面',
  name: 'Invite',
  component: require('../views/Invite/Invite').default
}, {
  path: '/choose',
  meta: '首页',
  name: 'choose',
  component: require('../views/choose/choose').default
}]
export default routes
