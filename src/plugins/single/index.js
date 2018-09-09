/*
 |-------------------------------------------------
 | 单页面
 |--------------------------------------------------
 |   404 系统升级
 |
 */
const _import = file => require('./' + file + '.vue').default
// const _import = file => (resolve) => {
//   import('./' + file + '.vue').then((module) => {
//     resolve(module)
//   })
// }

/**
 * 单页面
 * @author 7043
 */
const single = [
  {
    path: '/single',
    component: _import('index'), 
    children:[
      {path: '404',component: _import('404'), name: '未知页面'},
      {path: 'upgrade',component: _import('upgrade'), name: '系统升级中'},
      {path: 'upgrade',component: _import('upgrade'), name: '系统升级中'},
      { path: 'newhb', component: _import('newhb'), name: '新手礼包', }, //meta: {isShowMore: true}
    ]
  },
]

export default  [
  ...single,
]


