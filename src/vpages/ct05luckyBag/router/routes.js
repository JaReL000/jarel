const routes = [{
  path: '/',
  meta: '首页',
  name: 'index',
  component: require('../views/index/index').default
}, {
  path: '/demo',
  meta: '首页',
  name: 'demo',
  component: require('../views/demo/demo').default
}]
export default routes
