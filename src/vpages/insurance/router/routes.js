const routes = [{
    path: '/',
    meta:'保险详情页',
    name: 'index',
    component: require('vpages/insurance/views/insurance-detal/index.vue').default
  },{
    path: '/health',
    meta:'被保人健康告知',
    name: 'health',
    component: require('vpages/insurance/views/health/health.vue').default
  },{
    path: '/insuranceList',
    meta:'保单填写',
    name: 'insuranceList',
    component: require('vpages/insurance/views/insuranceList/insurance-list.vue').default
  },{
    path: '/payment',
    meta:'确认支付',
    name: 'payment',
    component: require('vpages/insurance/views/payment/payment.vue').default
  },{
    path: '/orderDetails',
    meta:'订单详情',
    name: 'orderDetails',
    component: require('vpages/insurance/views/payment/order-details.vue').default
  },{
    path: '/information',
    meta:'投保须知',
    name: 'information',
    component: require('vpages/insurance/views/information/index.vue').default
  },{
    path: '/myInsurance',
    meta:'我的保险',
    name: 'myInsurance',
    component: require('vpages/insurance/views/myInsurance/myInsurance.vue').default
  },{
    path: '/agreement',
    meta:'合同协议',
    name: 'agreement',
    component: require('vpages/insurance/views/agreement/index.vue').default
  }
  // {
  //   path: '/problems',
  //   name: 'problems',
  //   meta:'常见问题',
  //   component: r => require.ensure([], () => r(require('view/problems/problems.vue')), 'page1'),
  //   // children:[{
  //   //   path: '/test',
  //   //   name: 'test',
  //   //   meta:'test',
  //   //   component: r => require.ensure([], () => r(require('view/test/test.vue')), 'page2'),
  //   // }] introduce
  // }

]
export default routes
