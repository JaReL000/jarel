/*
 |--------------------------------------------------------------------------
 | 侧边栏模块
 |--------------------------------------------------------------------------
 |  首侧边栏  银行卡  其他   修改密码 收货地址
 |
 */
const _import = require('./_import.' + process.env.NODE_ENV);

const _asynImport = file => (resolve) => {
  import('../'+ file + '.vue').then((module) => {
    resolve(module)
  })
}
/**
 * 首侧边栏
 * @author 7182
 */
const index = [
  { 
    name: '个人中心', 
    path: '/personalCenter', 
    component: _import('user/PersonalCenter'), 
  }, 
  { 
    name: '身份认证', 
    path: '/certification', 
    component: _import('user/certification')
  },
  // {
  //   name: '我的福利',
  //   path: '/myWelfare',
  //   component: _import('welfare/my-welfare'),
  //   children: [
  //     {path: 'myWelfareDetail',  component: _import('welfare/welfare-detail'),name: '福利详情'}
  //   ]
  // },
]

/**
 * 我的福利
 * @author 7043
 */
const welfare = [
  {
    path: '/welfare',
    name: '福利',
    component: _import('welfare/index'),
    children: [
      { 
        path: 'myCore', 
        component: _import('welfare/my-core'), 
        name: '体验金/红包', 
        children: [
          { 
            path: 'detail', 
            component: _import('welfare/welfare-detail'), 
            name: '详情', 
          },
        ]
      },
      // { path: 'choice', component: _import('welfare/choice'), name: '选择卡券', },
    ]
  },
]

/**
 * 银行卡
 * @author 7182
 */
const bank = [
  { 
    name: '绑定银行卡', 
    path: '/bindCard', 
    component: _import('user/bindcard')
  },
  { 
    name: '银行卡',
    path: '/bindaread',  
    component: _import('user/bindaread')
  },
  // { 
  //   name: '解绑银行卡',
  //   path: '/unbundling',  
  //   component: _import('user/unbundling')
  // },
  { 
    name: '绑定银行卡输入验证码',
    path: '/bindCard/message',  
    component: _import('user/components/message-bload')
  },
  { 
    name: '绑定银行卡输入密码', 
    path: '/certification/password', 
    component: _import('user/components/password-bload')
  },
]

/**
 * 其他
 * @author 7182
 */
const other = [
  {
    name: '鲸鱼用户服务协议',
    path: '/agreement', 
    component: _import('agreement/Agreement'),
  },
  {
    name: '鲸鱼服务合同',
    path: '/contract', name: 'contract',
    component: _import('agreement/contract'),
  },
  {
    name: '关于我们',
    path: '/aboutus',
    component: _import('agreement/aboutus'),
  },
  {
    name: '安全保障',
    path: '/security',
    component: _import('agreement/security'),
  },
]

/**
 * 修改密码
 * @author 7182
 */
const password = [
  
]

/**
 * 收货地址
 * @author 7043
 */
const address = [
  {
    path: '/address',
    component: _asynImport('address/index'),
    children: [
      { path: 'list', component: _asynImport('address/address-list'), name: '收货地址', },
      { path: 'new', component: _asynImport('address/address-new'), name: '新增地址', },
      { path: 'edit', component: _asynImport('address/address-edit'), name: '编辑地址', },
    ]
  },
]

export default  [
  ...index,
  ...bank,
  ...other,
  ...address,
  // ...password,
  ...welfare,
]