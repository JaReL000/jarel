/**
 * Created by ZIHUA on 2017/7/5.
 */

const _import = require('./_import.' + process.env.NODE_ENV)

// import sidebar from './sidebar'
// import product from './product'
// import assets from './assets'

// import treaty from 'plugins/treaty'
// import explain from 'plugins/explain'
// import picTell from 'plugins/pic-tell'
// import single from 'plugins/single'

const routes = [
  {
    name: '鲸鱼',
    path: '/',
    component: _import('invite/invited'),
  },
  {
    name: '鲸鱼',
    path: '/result',
    component: _import('invite/result'),
  },
  // ...sidebar,
  // ...assets,
  // ...product,

  // ...treaty,
  // ...explain,
  // ...picTell,
  // ...single,

  //制定404页面
  // { path: '*', redirect: '/single/404' },

]
export default routes
