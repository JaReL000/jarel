/**
 * Created by ZIHUA on 2017/7/5.
 */

const _import = require('./_import.' + process.env.NODE_ENV);



/**
 * 弹窗
 * @author 7043
 */
const popup = [
  {
    path: '/popup',
    name: '弹窗',
    component: _import('popup/index'),
    children: [
      { path: ':productid', component: _import('popup/alert'), name: '福利详情', },
      { path: '3', component: _import('popup/alert'), name: '福利详情-保险箱', },
      { path: '4', component: _import('popup/alert'), name: '福利详情-日增息', },
    ]
  },
]

export default  [
  ...popup,
]