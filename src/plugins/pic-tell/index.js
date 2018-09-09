/*
 |-------------------------------------------------
 | 图说鲸鱼
 |--------------------------------------------------
 |  鲸鱼  三大优势  鲸鱼公益   鲸鱼之志
 |
 */
const _import = file => require('./' + file + '.vue').default
// const _import = file => (resolve) => {
//   import('./' + file + '.vue').then((module) => {
//     resolve(module)
//   })
// }

/**
 * 说明
 * @author 7122
 */
const picTell = [
  // tab栏路由
  {
    path: '/picTell',
    component: _import('index'),
    name: '图说鲸鱼',
    children:[
      {path: 'jinrTreaty',component: _import('treaty'), name: '鲸鱼'},
      {path: 'jinrAdvantage',component: _import('advantage'), name: '三大优势'},
      {path: 'jinrWelfare',component: _import('welfare'), name: '鲸鱼公益'},
      {path: 'jinrTarget',component: _import('target'), name: '鲸鱼之志'}
    ]
  },
]

export default  [
  ...picTell,
]


