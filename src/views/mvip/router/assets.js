/*
 |--------------------------------------------------------------------------
 | 资产
 |--------------------------------------------------------------------------
 |  周周盈  活期  定期  
 |
 */
const _import = require('./_import.' + process.env.NODE_ENV);


/**
 * 资产模块
 * @author 7182
 */
const assets = [
  {
    path: '/asset',
    name: 'asset',
    component: _import('asset/index'),
    children: [
      // 总资产
      {
        path: 'myAsset', component: _import('asset/my-asset'), name: "总资产",
        children:[
          { path:'jrRecord', component: _import('asset/asset-record'), name: "交易记录" }
        ]
      },
      // 我的活期
      {
        path: 'currentAsset', component: _import('asset/current-asset'), name: "我的活期",
        children:[
          // { path:'jrRecord', component: _import('components/JrRecord'), name: "活期交易记录" }
          { path:'jrRecord', component: _import('asset/asset-record'), name: "活期交易记录" }
        ]
      },
      // 月定期资产 
      {
        path: 'noonAsset', component: _import('asset/regular-asset'), name: "我的月定期",
        children:[
          { path:'jrRecord', component: _import('asset/asset-record'), name: "月定期交易记录" }
        ]
      },

      // 季定期资产 
      {
        path: 'quarterAsset', component: _import('asset/regular-asset'), name: "我的季定期",
        children:[
          { path:'jrRecord', component: _import('asset/asset-record'), name: "季定期交易记录" }
        ]
      },
      // 年定期资产 
      {
        path: 'regularAsset', component: _import('asset/regular-asset'), name: "我的年定期",
        children:[
          { path:'jrRecord', component: _import('asset/asset-record'), name: "年定期交易记录" }
        ]
      },

      //定期资产交易记录
      // {
      //   path:'regularjrRecord', component: _import('components/JrRecord'),
      // },
      // 订单详情
      { path:'orderDetail',component: _import('asset/order-detail'), name: "订单详情" },
      // 我的周周盈
      {
        path: 'weekAsset', component: _import('asset/week-asset'), name: "我的周周盈",
        children:[
          { path:'jrRecord', component: _import('asset/asset-record'), name: "周周赢交易记录" }
        ]
      },
      {
        path: 'lockAmount', component: _import('asset/week-locklist'), name: "锁定金额",
      }
    ]
  }
]

export default  [
  ...assets
]