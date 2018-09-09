const routes = [{
  path: '/',
  meta: '首页',
  name: 'index',
  component: require('../views/index/index').default
}, {
  path: '/setTotalMoney',
  meta: '投资返现4.0发送总金额设置',
  name: 'demo',
  component: require('../views/setTotalMoney/setTotalMoney').default
}]
export default routes
