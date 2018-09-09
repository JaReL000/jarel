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
const invite = [
  // 邀请
  { 
    name: '鲸鱼VIP专享', 
    path: '/invited', 
    component: _import('invite/invited'), 
  }, 
  // 受邀请
  { 
    name: '鲸鱼VIP专享', 
    path: '/', 
    component: _import('invite/beinvited')
  },
  // 结果
  { 
    name: '鲸鱼VIP专享', 
    path: '/result', 
    component: _import('invite/result')
  },
]

export default  [
  ...invite,
]