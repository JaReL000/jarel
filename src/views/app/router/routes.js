/**
 * Created by ZIHUA on 2017/7/5.
 */

const _import = require('./_import.' + process.env.NODE_ENV);

import main from '../main-dev.vue'

import treaty from 'plugins/treaty'
import explain from 'plugins/explain'
import picTell from 'plugins/pic-tell'
import single from 'plugins/single'
import popup from './popup'


const routes = [{
  path: '/',
  name: '',
  // component: main,

},
  // 产品线
  // {
  //     path: '/details',
  //     // 只有设置了name才可以向组件中传递参数
  //     // name: '详情',
  //     component: _import('details/index'),
  //     children: [
  //         // 1 为活期，2为定期  3保险箱  4日增息  5周期性 name: '详情',
  //         { path: ':productid', component: _import('details/detail'), meta: { isShowMore: true } },
  //         { path: '1', component: _import('details/detail'), name: '活期详情', meta: { isShowMore: true } },
  //         { path: '5', component: _import('details/detail'), name: '周周盈详情', meta: { isShowMore: true } },
  //         { path: '8', component: _import('details/detail'), name: '月定期详情', meta: { isShowMore: true } },
  //         { path: '9', component: _import('details/detail'), name: '季定期详情', meta: { isShowMore: true } },
  //         { path: '2', component: _import('details/detail'), name: '年定期详情', meta: { isShowMore: true } },
  //         { path: '3', component: _import('details/detail'), name: '保险箱详情', meta: { isShowMore: true } },
  //         { path: '4', component: _import('details/detail'), name: '日增息详情', meta: { isShowMore: true } },

  //     ]
  // },

  {path: '/details/:productid', component: _import('details/detail'), meta: {isShowMore: true}},

  // 资产订单详情
  {
    path: '/order',
    name: '订单详情',
    component: _import('order/index'),
    children: [
      {path: 'detail', component: _import('order/detail'), name: '详情',},
    ]
  },

  // 体验金/红包(福利)
  {
    path: '/welfare',
    name: '福利',
    component: _import('welfare/index'),
    children: [{
      path: 'myCore',
      component: _import('welfare/my-core'),
      // component: _import('welfare/my-core-cut'),
      name: '福利',
      meta: {
        textCopy: '使用规则',
        textUrl: '/explain/welfare',
      },
    },
      {
        path: 'detail',
        component: _import('welfare/welfare-detail'),
        name: '详情',
      },

      // { path: 'cash', component: _import('welfare/cash'), name: '现金红包', },
      // { path: 'coupon', component: _import('welfare/coupon'), name: '卡券', },
      {path: 'choice', component: _import('welfare/choice'), name: '选择卡券',},
    ]
  },

  // 关于鲸鱼
  {
    path: '/about',
    name: '关于鲸鱼',
    component: _import('about/index'),
    meta: {
      textCopy: '服务中心',
      textUrl: '/service/centre',
    },
    children: [{
      path: 'index',
      // component: _import('about/index'),
      name: '关于鲸鱼',
      meta: {
        textCopy: '服务中心',
        textUrl: '/service/centre',
      }
    },

      // { path: 'honor', component: _import('about/honor'), name: '荣誉咨质', },
      // { path: 'safety', component: _import('about/safety'), name: '安全保障', },
      // { path: 'data', component: _import('about/data'), name: '平台数据', },
      // { path: 'introduce', component: _import('about/introduce'), name: '公司介绍', },
      // { path: 'report', component: _import('about/report'), name: '媒体报道', },
      // { path: 'partner', component: _import('about/partner'), name: '合作伙伴', },
      // { path: 'contactUs', component: _import('about/contact-us'), name: '联系我们', },

      {path: 'honor', component: _import('about/honor'), name: '荣誉资质',},
      {path: 'safety', component: _import('about/safety'), name: '安全保障',},
      {path: 'introduce', component: _import('about/introduce'), name: '公司介绍',},
      {
        path: 'report',
        component: _import('about/report'),
        name: '媒体报道',
        children: [
          {path: 'details', component: _import('about/detail'), name: '媒体报道详情'}
        ]
      },
      {path: 'partner', component: _import('about/partner'), name: '合作伙伴',},
      {path: 'contact', component: _import('about/contact'), name: '联系我们',},

    ]
  },

  // 服务中心
  {
    path: '/service',
    name: '服务',
    component: _import('service/index'),
    children: [
      {path: 'centre', component: _import('service/centre'), name: '服务中心',},
      {path: 'faq', component: _import('service/faq'), name: '常见问题',},
      // name: '二层列表',
      {path: 'twoList', component: _import('service/two-list'),},
      // name: '具体问题',
      {path: ':problemid', component: _import('service/details'), name: '详情',},
    ]
  },

  // 消息模块
  {
    path: '/message',
    name: '消息模块',
    component: _import('message/index'),
    children: [
      // { path: 'index', component: _import('message/index'), name: '消息', },
      {path: 'system', component: _import('message/system'), name: '系统消息',},
      {path: 'coupon', component: _import('message/coupon'), name: '福利消息',},
      {path: 'notice', component: _import('message/notice'), name: '鲸鱼公告',},
      {path: 'bigdatas', component: _import('message/bigdatas'), name: '鲸鱼大数据',},
      // { path: 'details', component: _import('message/details'), name: '消息详情', },
      {path: 'detail', component: _import('message/detail'), name: '公告详情',},
      {path: 'report', component: _import('message/report'), name: '运营报告详情',},
    ]
  },

  // 活动咨讯
  {
    path: '/activity',
    name: '活动',
    component: _import('activity/index'),
    children: [
      {path: 'news', component: _import('activity/news'), name: '活动资讯',},
      {path: 'tell', component: _import('activity/tell'), name: '鲸鱼说',},
      // { path: 'dynamic', component: _import('activity/dynamic'), name: '鲸鱼动态', },
      // { path: 'story', component: _import('activity/story'), name: '鲸鱼故事', },
      {path: 'dynamic', component: _import('activity/dynamic'), name: '鲸鱼动态',},
      {path: 'story', component: _import('activity/story'), name: '鲸鱼故事',},
      {path: 'detail', component: _import('activity/detail'), name: '文章详情',},
      {path: 'storyDetail', component: _import('activity/story-detail'), name: '文章详情',},
    ]
  },

  /**
   * 意见反馈
   * @author 7043
   */
  // { path: '/feedback', component: _import('user/feedback'), name: '意见反馈' },

  ...treaty,
  ...explain,
  ...popup,
  ...picTell,
  ...single,

  // { path: '*', redirect: '/single/404' },

  // { path: '/test', component: _import('user/test'), name: '测试' },
  { path: '/test', component: _import('test/virtual-scroll-list'), name: '测试' },

]

export default routes
