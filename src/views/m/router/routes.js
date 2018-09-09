/**
 * Created by ZIHUA on 2017/7/5.
 */

const _import = require('./_import.' + process.env.NODE_ENV)

import sidebar from './sidebar'
import product from './product'
import assets from './assets'

import treaty from 'plugins/treaty'
import explain from 'plugins/explain'
import picTell from 'plugins/pic-tell'
import single from 'plugins/single'

const routes = [
  {
    name: '鲸鱼',
    path: '/',
    component: _import('index/Index'),
  },
  {
    name: '登录',
    path: '/login',
    component: _import('user/Login'),
  },
  {
    name: '开通微信登录',
    path: '/bindWx',
    component: _import('auth/loginAuth'),
  },
  {
    name: '绑定成功',
    path: '/bindWxDone',
    component: _import('auth/done'),
  },
  {
    name: '注册',
    path: '/register',
    component: _import('register/Register'),
  },
  {
    path: '/registertwo',
    component: _import('register/Registertwo'),
  },

  ...sidebar,
  ...assets,
  ...product,

  ...treaty,
  ...explain,
  ...picTell,
  ...single,

  //制定404页面
  // { path: '*', redirect: '/single/404' },

]
export default routes
