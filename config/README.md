# 配置中心

## oss.env.js

> 配置 上传oss

``` js
const project = require('./project')
console.log(project.bucket);

module.exports = {
  accessKeyId: '',
  accessKeySecret: '',
  bucket: project.bucket,
  region: '',
}
```

## project.env.js

> 项目配置文件

``` js
/*
 |--------------------------------------------------------------------------
 | 项目配置文件
 |--------------------------------------------------------------------------
 |  @author weizihua
 |  10-08
 |
 |  vcs_type: 'APP', //当前开启的项目名 APP M
 |  name: 'jinr', // 项目名，提取出来以方便dev环境使用，否则会出现undefined = =
 |
 |  version: '1.0.0', //版本号 默认
 |
 |  project: {
 |    // 项目列表
 |    // 组织格式 ： 项目名 => 以项目根目录为基准的index.vue路径
 |    // 其在webpack中的对应格式为：[name](生成的js名) => [main.js所在路径]
 |    demo: './src/views/demo', // 示例项目，新建页面可以直接复制该项目的代码
 |    blog: './src/views/blog', // 示例项目，利用个人blog提供公共api进行测试
 |  },
 |
 |  domain: '',
 |
 |
 */

// M站项目
const M = {
  name: 'm',
  version: '3.0',
  title: "鲸鱼",
  project: {
    m: './src/views/m',
  },
  port: 8990,
  domain: {
    dev: '"http://jinrpc.dev.jinr.com"',
    pre: '"http://jinrpc.pre.jinr.com"',
    beta: '"http://jinrpc.beta.jinr.com"',
    prod: '"http://jinrpc.jinr.com"'
  },
  dev: {
    domain: '"http://jinrpc.dev.jinr.com"',
    bucket: 'jinrfedev',
  },
  pre: {
    domain: '"http://jinrpc.pre.jinr.com"',
    bucket: '',
  },
  beta: {
    domain: '"http://jinrpc.dev.jinr.com"',
    bucket: '',
  },
  prod: {
    domain: '"http://jinrpc.jinr.com"',
    bucket: '',
  },
}

// APP项目
const APP = {
  name: 'app',
  version: '4.0',
  title: "4.0版本APP",
  project: {
    app: './src/views/app',
  },
  port: 8999,
  domain: {
    dev: '"http://jinrapp.dev.jinr.com"',
    pre: '"http://jinrapp.pre.jinr.com"',
    beta: '"http://jinrapp.beta.jinr.com"',
    prod: '"http://jinrapp.jinr.com"'
  },
  dev: {
    domain: '"http://jinrapp.dev.jinr.com"',
    bucket: 'jinrfedev',
  },
  pre: {
    domain: '"http://jinrapp.pre.jinr.com"',
    bucket: '',
  },
  beta: {
    domain: '"http://jinrapp.dev.jinr.com"',
    bucket: '',
  },
  prod: {
    domain: '"http://jinrapp.jinr.com"',
    bucket: 'jinrfe',
  },
}

// 组件项目
const CUT = {
  name: 'cut',
  version: '1.0',
  title: "cut 组件开发测试版",
  project: {
    app: './src/views/cut/example/index.js',
  },
  port: 9000,
  dev: {
    domain: '"http://jinrapp.dev.jinr.com"',
    bucket: 'jinrfedev',
  },
  pre: {
    domain: '"http://jinrapp.pre.jinr.com"',
    bucket: '',
  },
  beta: {
    domain: '"http://jinrapp.dev.jinr.com"',
    bucket: '',
  },
  prod: {
    domain: '"http://jinrapp.jinr.com"',
    bucket: 'jinrfe',
  },
}

module.exports = {
  M,
  APP,
  CUT,
}
```
