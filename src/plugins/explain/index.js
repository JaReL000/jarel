/*
 |-------------------------------------------------
 | 说明模块
 |--------------------------------------------------
 |  限额说明  资产转出说明  转让说明   余额说明
 |
 */
// const _import = file => require('./' + file + '.vue').default
const _import = file => (resolve) => {
  import('./' + file + '.vue').then((module) => {
    resolve(module)
  })
}

/**
 * 说明
 * @author 7043
 */
const explain = [
  {
    path: '/explain',
    // name: '说明',
    component: _import('index'),
    children: [
      { path: 'limit', component: _import('limit'), name: '限额说明', },
      { path: 'out', component: _import('out'), name: '说明', },
      { path: 'transfer', component: _import('transfer'), name: '转让说明', },
      { path: 'balance', component: _import('balance'), name: '余额说明', },
      { path: 'welfare', component: _import('welfare'), name: '使用规则', },
      { path: 'unbind', component: _import('unbundling'), name: '解绑银行卡', },
      { path: 'weekRegular', component:_import('weekRegular'), name:'原“活期”升级为“周定期”'}
    ]
  },
]


export default  [
  ...explain,
]

