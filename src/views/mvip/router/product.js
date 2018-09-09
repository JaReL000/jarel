/*
 |--------------------------------------------------------------------------
 | 产品线路由
 |--------------------------------------------------------------------------
 |  周周盈  活期  定期  余额
 |
 */
const _import = require('./_import.' + process.env.NODE_ENV);

import JrRecord from '../components/JrRecord'
import Done from '../products/done'

/**
 * 详情
 * @author 7043
 */
const details = [
  
  { //产品详情页面
    path: '/details/:productid',  
    component: _import('details/detail'), 
  },
]

/**
 * 转入转出
 * @author 7043
 */
const inOut = [
  //转入
  { 
    path: '/productIn/:productid',
    component: _import('products/product-in'),
    // name: '转入',
    children: [
      { path: 'done', component: _import('products/done'), name: '转入成功' },
    ]
  },

  //转出
  { 
    path: '/productOut/:productid',
    component: _import('products/product-out'),
    // name: '转至余额',
    children: [
      { path: 'done', component: _import('products/done'), name: '转出成功' },
    ]
  },
]



/**
 * 周周盈
 * @type 10
 */
// const week = [

//   {
//     path: '/weekProfitDetail',
//     component: _import('weekProfit/WeekProfitDetail'),
//     meta: { title: '周周盈详情' }
//   },
//   {
//     path: '/weekProfitIn',
//     component: _import('weekProfit/WeekProfitIn'),
//     title: '周周盈转入',
//     meta: { title: '周周盈转入' },
//     children: [
//       { path: ':name', component: JrInDone },
//     ]
//   },

//   {
//     path: '/weekProfitOut',
//     component: _import('weekProfit/WeekProfitOut'),
//     title: '周周盈转出',
//     meta: { title: '周周盈转出' },
//     children: [
//       { path: 'rocket', component: _import('weekProfit/Rocket') },
//       { path: 'payDone',  component: _import('weekProfit/payDone'), title: '转出详情',meta: { title: '转出详情' },},
//     ]
//   },
//   {
//     path: '/weekProfitAsset',
//     component: _import('weekProfit/WeekProfitAsset'),
//     title: '周周盈资产',
//     meta: { title: '周周盈资产' },
//     children: [
//       { path: 'jrRecord',  component: JrRecord },
//     ]
//   },
//   { path: '/lockAmount',  component: _import('weekProfit/LockAmount'),  },

// ]


/**
 * 余额
 * @type 2
 * @author 7043
 */
const balance = [
  {
    path: '/balance',
    component: _import('balance/index'),
    name: '余额',
    children: [
      { path: 'index', component: _import('balance/balance'), name: '我的余额'  },
      { path: 'jrRecord', name: '余额交易记录', component: JrRecord },
    ]
  },
  
  {
    path: '/balanceIn',
    name: 'balanceIn',
    component: _import('balance/balance-in'),
    name: '余额充值',
    children: [
      { path: 'balanceInDone', component: require('balance/in-done') },
      { path: 'jrRecord', component: JrRecord },
      { path: 'done', component: _import('products/done'), name: '充值成功' },
    ]
  },
  {
    path: '/balanceOut',
    name: 'balanceOut',
    component: _import('balance/balance-out'),
    name: '余额提现',
    children: [
      { path: 'balanceOutDone', component: require('balance/out-done'), name: '转出详情' },
      { path: 'jrRecord',  component: JrRecord },
      { path: 'done', component: _import('products/done'), name: '提现成功' },
    ]
  },
  // { path: '/balanceExplain',  component: _import('balance/balance-explain'), name: '余额说明'  },
  // { path: '/balanceRecord', component: _import('balance/balance-record'),  },
  
]

const weixin = [
  {
    path: '/weixin',
    name: 'weixin',
    component: _import('weixin/index'),
    children: [
      { path: 'done', component: _import('weixin/done'), },  
    ]
  },
]
export default  [
  // ...week,
  // ...current,
  // ...regular,
  ...details,
  ...inOut,
  ...balance,
  ...weixin,
]
