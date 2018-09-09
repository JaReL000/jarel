
// const routes = [{
//   path: '/',
//   meta: '产品列表页',
//   name: 'index',
//   component: require('../views/index/index').default
// }, {
//   path: '/asset',
//   name: 'index',
//   component: require('../views/index/index').default,
//   meta: {
//     title: '鲸鱼贷资产'
//   }
// }]

const routes = [
  {
    path: '/',
    meta: '产品列表页',
    name: 'index',
    component: require('../views/index/index').default
  },{
    path: '/details',
    meta: '产品详情',
    name: 'details',
    component: require('../views/details/details').default
  },{
    path: '/asset',
    name: 'index',
    component: require('../views/asset/index').default,
    meta:{
      title: '鲸鱼贷资产',
      textCopy: '交易记录',
      textUrl: '/record/index'
    }
  },{
    path: '/record/index',
    name: 'index',
    component: require('../views/asset/record').default,
    meta:{
      title: '交易记录',
    }
  },{
    path: '/asset/detail',
    name: 'index',
    component: require('../views/asset/detail').default,
    meta:{
      title: '详情',
    }
  },{
    path: '/introduce',
    meta:{
      title: '项目介绍'
    },
    name: 'index',
    component: require('../views/introduce/index').default
  }
]

export default routes
