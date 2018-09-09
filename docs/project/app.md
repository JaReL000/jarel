# APP内嵌页

##### 本地

- http://192.168.29.67:8999/app/4.0/index.html#

##### 线上

#### 根路径

|  服务器  |                      域名                       |
| :------: | :---------------------------------------------: |
| 本地7043 |  http://192.168.29.67:8999/app/4.0/index.html#  |
|  开发机  | https://jinrfe.dev.jinr.com/app/4.0/index.html# |
| 预发布机 | http://jinrfe.pre.jinr.com/app/4.0/index.html#  |
|  公测机  | http://jinrfe.beta.jinr.com/app/4.0/index.html# |
|  正式机  |   https://jinrfe.jinr.com/app/4.0/index.html#   |

> 开发机
- http://jinrfe.dev.jinr.com
> 预发布机
- http://jinrfe.pre.jinr.com
> 公测机
- http://jinrfe.beta.jinr.com
> 正式机
- http://jinrfe.jinr.com

页面访问方式: 域名 + 项目名(`/app/4.0/index.html#`) + 页面名(`/details/1`)

### 例子
访问路径 + 页面

- [https://jinrfe.dev.jinr.com/app/4.0/index.html#/details/1](https://jinrfe.dev.jinr.com/app/4.0/index.html#/details/1 ).


## API

内嵌页面对应服务器

|   服务器    |              域名              |
| :------: | :--------------------------: |
| api-开发机  | http://jinrapp.dev.jinr.com  |
| api-预发布机 | http://jinrapp.pre.jinr.com  |
| api-公测机  | http://jinrapp.beta.jinr.com |
| api-正式机  |   http://jinrapp.jinr.com    |

##    API-WEB接口方法转接

```
# API-WEB接口方法转接

​```js
// 根目录
url: 'Embed/Index/Index',

// 使用主站对接接口
api: [
  // about
  // 活动咨询
  "article.list",  //资讯文章
  "article.detail",  //文章详情
  "trend.list",  //鲸鱼动态
  "trend.detail",  //文章详情
  "ikon.list",  //鲸鱼说
  "system.activty.home.ad",  //广告列表
  "system.activty.home.list",  //活动列表
  // 产品详情 合同
  "product.web",  //产品详情
  "user.info.web",  //用户信息
  // 消息
  "message.centre",  //消息首页
  "report.list",  //系统消息 福利消息 大数据
  "message.list",  //消息
  "notice.list",  //公告列表
  "notice.detail",  //公告详情
  // 资产订单详情
  "money.detail",  //资产订单详情
  // 服务中心
  "problem.hot",  //热门问题
  "problem.solve",  //问题详情
  "problem.list",  //问题列表
  "problem.category",  //常见问题分类
  "problem.detail",
  // 关于我们
  "article.detail"  //文章_详情
  "article.list"  //媒体报道列表
  // 福利
  "red.Packet.list",  //理财红包列表
  "user.coupon.list",  //卡券列表
  "red.packet.detail",  //红包详情
  "user.coupon.detail",  //卡券详情
  "user.coupon.select.list",  //用户选择卡券列表
  "user.coupon.activate",  //激活卡券
  // other
  "user.login",  //用于调试开发
  "system.stats",   //平台数据
  "product.web.limit",  //限额说明

]
```

```
/message/system 系统列表（无详情）
/message/coupon 卡券列表
（/welfare/myCore/detail?type=22&cuserid=441247 红包）-type非零
（/welfare/myCore/detail?type=0&cuserid=441247 卡券）

/message/notice 公告列表 （下级详情 /message/detail?noticeid=56）
/message/bigdatas 大数据列表（下一级不知道谁提供，跳外链）
```




## 跳转路径

### 活动资讯

> 页面路由

|               路径名                |       标题       |
| :---------------------------------: | :--------------: |
|           /activity/news            |    活动主入口    |
|           /activity/tell            |      鲸鱼说      |
|          /activity/dynamic          |     鲸鱼动态     |
|    /activity/story?acolumnid=115    |     鲸鱼故事     |
|     /activity/detail?trendid=3      | 鲸鱼动态文章详情 |
| /activity/storyDetail?articleid=121 | 鲸鱼故事文章详情 |
|                                     |                  |
|                                     |                  |
|                                     |                  |


### 体验进/红包(福利)

> 页面路由

|       路径名        |      标题      |
| :--------------: | :----------: |
| /welfare/myCore?index=0  | 理财红包 现金红包 卡券 |
| /welfare/detail?type=0&cuserid=441074 |      详情      |
| /welfare/choice?token=&money=&productid=1&action=1&index=-1  |     选择卡券     |


### 关于鲸鱼

> 页面路由

|     路径名      |  标题   |
| :----------: | :---: |
| /about/index | 关于主入口 |
| /about/honor | 荣誉资质 |
| /about/safety | 安全保障 |
| /about/introduce | 公司介绍 |
| /about/report | 媒体报道 |
| /about/partner | 合作伙伴 |
| /about/contact | 联系我们 |
| -- | --  |
| /picTell/jinrTreaty | 鲸鱼理财 |
| /picTell/jinrAdvantage | 三大优势 |
| /picTell/jinrWelfare | 鲸鱼公益 |
| /picTell/jinrTarget | 鲸鱼之志 |


### 服务中心(常见问题)

> 页面路由

|       路径名        |  标题  |
| :--------------: | :--: |
| /service/centre  | 主入口  |
| /service/faq  | 常见问题 |
| /service/twoList?typeid=1 | 二层列表 |
| /service/details?problemid=3    |  问题详情    |

### 详情模块（从活动页面跳入转入页面也用下面的id）

> 页面路由

|    路径名     |  标题   |
| :--------: | :---: |
| /details/1 | 活期详情  |
| /details/2 | 年定期详情 |
| /details/6 | 月定期详情 |
| /details/7 | 季定期详情 |
| /details/2 | 年定期详情 |
| /details/3 | 保险箱详情 |
| /details/4 | 日增息详情 |
| /details/8 | vip年定期详情 |
|            |       |

> API


### 消息模块

> 页面路由

|        路径名        |  标题   |
| :---------------: | :---: |
|  /message/system  | 系统消息  |
|  /message/notice  | 鲸鱼公告  |
| /message/ coupon  | 优惠券消息 |
| /message/bigdatas | 鲸鱼大数据 |
|  /message/detail?noticeid=78  | 公告详情  |


### 协议 (条约)

> 页面路由

|              路径名              |    标题    |      备注       |
| :---------------------------: | :------: | :-----------: |
| /product/protocol?productid=6 |   产品协议   | type=protocol |
|        /treaty/balance        |   余额协议   | type=protocol |
|       /treaty/register        |   注册协议   |               |
|       /treaty/transfer        |   转让协议   |               |
|       /current/protocol       | 活期委托投资协议 |               |
|      /bindcard/protocol       |   绑卡协议   |               |
|                               |          |               |

### 合同 (条约)

> 页面路由
               路径名              |  标题   |
  :---------------------------: | :---: |
  /assert/ contract?productid=6 | 月定期合同 |
  /assert/ contract?productid=7 | 季定期合同 |
  /assert/ contract?productid=2 | 年定期合同 |
  /assert/ contract?productid=5 | 周周盈合同 |
  /assert/ contract?productid=3 | 保险箱合同 |
  /assert/ contract?productid=4 | 日增息合同 |


### 资产订单详情

> 页面路由

|      路径名      |  标题  |
| :-----------: | :--: |
| /order/detail |  待定  |

### 说明

> 页面路由

|         路径名         |   标题   |
| :-----------------: | :----: |
|   /explain/limit    |  限额说明  |
|    /explain/out     |  转出说明  |
|  /explain/transfer  |  转让说明  |
|  /explain/balance   |  余额说明  |
|  /explain/welfare   | 福利使用规则 |
| /explain/unbundling | 解绑银行卡  |
| /explain/weekRegular | 周定期说明  |


### 弹窗

> 页面路由

|    路径名    |    标题    |
| :-------: | :------: |
| / popup/3 | 福利详情-保险箱 |
| / popup/4 | 福利详情-日增息 |
|           |          |

### 产品类型id
- 1 为活期，2为定期  3保险箱  4日增息  5周期性

### app跳转url
- 转出说明：https://jinrfe.dev.jinr.com/app/4.0/index.html#/explain/out?token=c659AFUHBgEIVgVSUwlUAAMBUQJXXg4GV1ZVBVkAUgEEVw4JbAAGU1oHUVBRCAlYVAhVBVEKVwFQDQBTUgBXUAdeVwIEPgQBCV4YUlAVAw8QCQUKUQ8MBVQ9BQ&productid=1
- 合同