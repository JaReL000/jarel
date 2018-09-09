import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'
import ProductA from '../pages/product-a.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      title: ''
    },
    {
      path: '/product-a',
      name: 'ProductA',
      component: ProductA,
      title: ''
    }
  ]
})
