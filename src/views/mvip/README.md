title: M站3.0项目文档
author: weizihua
date: 2017-10-28 09:13:56
---

## 目录结构

```bash
m
|—— address  #地址模块
| |—— address-list.vue   #收获地址列表
| |—— index.vue  #该层父级路由
|
|—— agreement  #协议
|—— api   #网络层
|—— asset   #资产模块
|—— assets  #静态资源
|—— balance  #余额模块
|—— components  #M站组件
|—— current  #活期（使用?）
|—— details  #产品详情模块
|—— index  #首页面模块
|—— products  #产品转入转出模块
|—— register  #注册模块
|—— router  #路由模块
|—— single  #单页面（暂没有使用）
|—— styles  #样式
|—— user  #用户相关
|—— weixin  #微信
|—— welfare  #福利
|—— App.vue  #父级大路由
|—— index.js  #项目主入口
|—— README.md  #文档
| 
```

## 签名
```

签名规则：
所有参数按键名升序排列，md5(md5(键名+'='+值+... )+md5(m_front_secret_key)) == sign（参数），左边不包含sign
```
### api接口
- 'user.index'
- 