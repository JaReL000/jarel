/*
 |-------------------------------------------------
 | 合同协议模块
 |--------------------------------------------------
 |  
 |
 */
// const _import = file => require('./' + file + '.vue').default
const _import = file => (resolve) => {
  import('./' + file + '.vue').then((module) => {
    resolve(module)
  })
}

/**
 * 协议
 * @author 7043
 */
const protocol = [
  // 产品协议与合同共用，这里是M站的,用月定期组件来渲染页面
  {
    path: '/product',
    // name: '协议/',
    component: _import('index'),
    children: [
      { path: 'protocol', component: _import('components/app'), }, //name: '协议'
      // { path: '6', component: _import('components/noon'), name: '月定期协议', },
      // { path: '7', component: _import('components/quarter'), name: '季定期协议', },
      // { path: '2', component: _import('components/year'), name: '年定期协议', },
      // { path: '5', component: _import('components/week'), name: '周周盈协议', },
      // { path: '3', component: _import('components/safe'), name: '保险箱协议', },
      // { path: '4', component: _import('components/day'), name: '日增息协议', },
    ]
  },

  // 转让协议
  { path: '/treaty/transfer', name: '转让协议', component: _import('transfer') },

  // 注册协议
  { path: '/treaty/register', name: '注册协议', component: _import('register') },

  // 余额协议
  { path: '/treaty/balance', name: '余额协议', component: _import('balance') },

  // 绑卡协议
  { path: '/bindcard/protocol', name: '绑卡协议', component: _import('bindcard') },

  // 活期委托投资协议
  { path: '/current/protocol', name: '活期委托投资协议', component: _import('current') },

   // 鲸鱼金融用户服务协议
   { path: '/treaty/user', name: '用户服务协议', component: _import('user') },

   // 鲸鱼用户银行卡更换协议
   { path: '/treaty/change', name: '用户银行卡更换协议', component: _import('change') },
]

/**
 * 合同
 * @author 7043
 */
const contract = [
  // 合同与协议共用，这里是app的,用季定期组件来渲染页面
  {
    path: '/assert',
    name: '/合同',
    component: _import('index'),
    children: [
      // 通用合同
      { path: 'contract', component: _import('components/app'), name: '合同' }, 
      // 月季年
      // { path: 'contract-yjn', component: _import('components/app-yjn'), name: '合同' }, 

      // { path: '6', component: _import('components/noon'), name: '月定期合同', },
      // { path: '7', component: _import('components/quarter'), name: '季定期合同', },
      // { path: '2', component: _import('components/year'), name: '年定期合同', },
      // { path: '5', component: _import('components/week'), name: '周周盈合同', },
      // { path: '3', component: _import('components/safe'), name: '保险箱合同', },
      // { path: '4', component: _import('components/day'), name: '日增息合同', },
    ]
  },
]

const protocolM = [
  // 产品协议与合同共用，这里是M站的,用月定期组件来渲染页面
  {
    path: '/productM',
    // name: '协议/',
    component: _import('index'),
    children: [
      { path: 'protocol', component: _import('components/m'), name: '协议', },
    ]
  },
]

// moneyid=1000690

export default  [
  ...protocol,
  ...contract,
  ...protocolM,
]