const routes = [{
    path: '/',
    meta: '首页',
    name: 'index',
    component: require('vpages/MotherSday/views/index/index.vue').default
  },
  {
    path: '/myGift',
    meta: '我的奖品',
    name: 'myGift',
    component: require('vpages/MotherSday/views/my-gift/my-gift.vue').default
  }, {
    path: '/demo',
    meta: '测试',
    name: 'demo',
    component: require('vpages/MotherSday/views/demo/demo.vue').default
  },
]
export default routes
