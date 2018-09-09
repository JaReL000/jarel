title: APP站4.0项目文档
author: weizihua
date: 2017-10-28 09:13:56
---

## 目录结构

```bash
app
|—— about  #关于我们
| |—— 
| |—— 
|
|—— activity  #活动资讯
|—— api   #网络层
|—— article   #文章组件
|—— components  #APP站组件
|—— details  #产品详情模块 
|—— explain  #说明模块 
|—— images  #图片资源
|—— message  #消息模块
|—— order  #资产订单详情模块
|—— popup  #各种小弹窗
|—— router  #路由模块
|—— service  #服务中心
|—— treaty  #协议合同
|—— user  #用户相关
|—— utils  #工具类
|—— welfare  #福利
|—— index.js  #项目主入口
|—— main-dev.vue  #开发阶段
|—— main-prod.vue  #上线阶段
|—— README.md  #文档
| 
```

# API-WEB接口方法转接

```js
// 根目录
url: 'Embed/Index/Index',

// 使用主站对接接口
api: [
  // about
  // 活动咨询
  "article.list",
  "article.detail",
  "trend.list",
  "trend.detail",
  "ikon.list",
  "system.activty.home.ad",
  "system.activty.home.list",
  // 产品详情 合同
  "product.web",
  "user.info.web",
  // 消息
  "message.centre",
  "report.list",
  "message.list",
  "notice.list",
  "notice.detail",
  // 资产订单详情
  "money.detail",
  // 服务中心
  "problem.hot",
  "problem.solve",
  "problem.list",
  // 福利
  "red.Packet.list",
  "user.coupon.list",
  "red.packet.detail",
  "user.coupon.detail",
  "user.coupon.select.list",
  "user.coupon.activate",
  // other 
  "user.login",
  'system.stats'
  'product.web.limit',

  //4.2
  //切换续投
  'regular.continue.invest'
]
```

## 获取`token`机制
在开发调试阶段中，通过`main-dev.vue`提供用户登录来获取用户登录信息 `token`，暂提供以下组件工具

```bash 

# main-dev.vue
x-header  #自定义导航
login #登录
share  #分享

palette-button  #工具类
```

线上使用`main-prod.vue` 通过 `jinr-sdk`中  `Jinr.getToken()` 获取 返回值
```js 
// 初始化数据
let appData = {
  v: '',  //接口的升级通过版本来号区别。如：3.6.3
  appid: '',  //应用标识
  app_v: '',  //APP 版本号
  token: '',  //有则返回用户Token,无则返回“ ”,
  platform: '',  //操作平台 3-IOS|4-Android
  longitude: '',  //经度
  latitude: '',  //纬度
  // version: '',  //整数APP版本号
  isShowLogin: false,
  isAPP: false,
  isBug: process.env.NODE_ENV !== 'dev' || false,
}
```
* 因为ios在跳转第二次外链的时候交互方法需要重新生成，有概率性的出现获取不到交互方法，所有在`jinr-sdk`中独立出 `_version（）` 方法即时获取

# 鲸鱼app优化

> 首次请求时间

> 渲染时间

> 骨架屏