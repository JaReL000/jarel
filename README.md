# 鲸鱼
> 为了解决开发时间成本 建立一个工程 目前服务于M站、APP主业务需求

# 前端OSS服务器
|  服务器   |                    域名                    |
| :----: | :--------------------------------------: |
|  开发机   | https://jinrfe.dev.jinr.com |
|  预发布机  | http://jinrfe.pre.jinr.com |
|  公测机   | http://jinrfe.beta.jinr.com |
|  正式机   | https://jinrfe.jinr.com |


## APP接口配置
```bash
  dev: {
    domain: '"http://jinrapp.dev.jinr.com"',
    bucket: "jinrfedev"
  },
  pre: {
    domain: '"http://jinrapp.pre.jinr.com"',
    bucket: "jinrfepre"
  },
  beta: {
    domain: '"http://jinrapp.beta.jinr.com"',
    bucket: "jinrfebeta"
  },
  prod: {
    domain: '"https://jinrapp.jinr.com"',
    bucket: "jinrfe"
  }
```

## 活动接口配置
```bash
  dev: {
    domain: '"http://hbnew.dev.jingyugame.com"',
    bucket: 'jinrfedev',
  },
  pre: {
    domain: '"http://hbnew.pre.jingyugame.com"',
    bucket: 'jinrfepre',
  },
  beta: {
    domain: '"http://hbnew.beta.jingyugame.com"',
    bucket: 'jinrfebeta',
  },
  prod: {
    domain: '"http://hbnew.jingyugame.com"',
    bucket: 'jinrfe',
  },
```



> VIP
|  服务器   |                    域名                    |
| :----: | :--------------------------------------: |
|  开发机   | http://vip.dev.jinr.com |
|  预发布机  |  |
|  公测机   | |
|  正式机   | https://vip.jinr.com |

#   项目初衷
该样板代码使用 `vue-cli` 作为构建框架。但在实际开发中，存在很多不规范及维护成本的增加，新建`dev`分支，目的是为了完善项目框架体系及更好的协作，进行团队项目开发，如有更好的想法或者方案可在`issue.md`分享

> 每日任务

* 编写文档 习惯书写注释
* 先拉取代码 下班前提交无bug代码
* 分享前沿技术

### 起步

0. 安装 [node.js](https://nodejs.org/zh-cn/)，需要使用 `node@8.9.4`(强制) -长期稳定版本

1.  安装 [git-for-windows](https://git-for-windows.github.io/) 命令行工具，新前端必备，相关命令行学习自行百度

2.  推荐使用 [VSCode](https://code.visualstudio.com/) 编辑器开发, 代码工程有效规范，开启速度快, 支持多平台语言使用，更多操作移步详细文档`docs`

3. 推荐 [yarn](https://code.visualstudio.com/) 作为软件包管理器，因为它可以更好地处理依赖关系(锁定版本)，并可以使用 yarn clean 帮助减少最后构建文件的大小。


```bash
# 安装yarn
npm install -g yarn

# 克隆工程
git clone xxx qrs

# 安装依赖并运行你的程序
cd qrs
yarn
npm run dev

# 上传 (默认为vpages 如需打包views 目录需加 -m views)
jinr u [-m views] # node bin upload [-m views]
jinr b [-m views] # node build/bin.js u [-m views]

# 打包 (默认为vpages 如需打包views 目录需加 -m views)
jinr b [-m views] # node bin build [-m views]

# 打包分析

```


## 目录结构

```bash
|—— .vscode  #编辑器配置
|—— build  #项目构建
|—— config  #项目配置
|—— dist  #打包文件(上线文件)
|—— docs  #文档
|—— map  #map文件(快速打包)
|—— src  #源代码
|—— static  #静态资源
|—— .babelrc  #es6配置
|—— .editorconfig  #编程规范
|—— .gitignore  #git过滤配置
|—— .package.json  #npm配置文件
|—— .postcss.config.js  #css后处理配置文件
|—— issue.md  #问题
|—— README.md  #文档
|—— yarn.lock  #yarn锁定版本
|
```

## jinr-sdk
https://github.com/JinrFE/jinr-sdk

## 加解密
``` js
//解
http://jinrpc.dev.jinr.com/m/index/test?tel=eYud6kwr4zJNXGaz9oiKqw==

// 加密
http://hbnew.dev.jingyugame.com/activity/test/testGetEnCombinationId
combinationId: 14870430001
```





### APP活动
- 接口必须参数：
1.token , combinationId 必传参数 （token与原生app的token不一样）

# bin
命令行模式功能开发: 初始化项目、启动本地服务、打包文件、上传文件至OSS

> 详情请参照 `bin` 目录



