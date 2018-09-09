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
  name: 'M站-重构3.0版本',
  value: 'M',
  // directory: 'm',
  // version: '3.0',

  directory: '',
  version: '',

  title: "鲸鱼",
  project: {
    m: './src/views/m',
  },
  port: 8995,
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
    bucket: 'jinrfepre',
  },
  beta: {
    domain: '"http://jinrpc.beta.jinr.com"',
    bucket: 'jinrfebeta',
  },
  prod: {
    domain: '"http://jinr.com"',
    bucket: 'jinrfe',
  },
}

// M站项目
const MVIP = {
  name: 'M站-大客户版本(年定期)',
  value: 'MVIP',
  // directory: 'mvip',
  // version: '3.0',
  directory: '',
  version: '',
  title: "鲸鱼",
  project: {
    m: './src/views/mvip',
  },
  port: 8988,
  domain: {
    dev: '"http://jinrpc.dev.jinr.com"',
    pre: '"http://jinrpc.pre.jinr.com"',
    beta: '"http://jinrpc.beta.jinr.com"',
    prod: '"http://jinrpc.jinr.com"'
  },
  dev: {
    domain: '"http://jinrpc.dev.jinr.com"',
    bucket: 'jinrvipdev',
  },
  pre: {
    domain: '"http://jinrpc.pre.jinr.com"',
    bucket: 'jinrvippre',
  },
  beta: {
    domain: '"http://jinrpc.beta.jinr.com"',
    bucket: 'jinrvipbeta',
  },
  prod: {
    domain: '"http://jinr.com"',
    bucket: 'jinrvip',
  },
}

// pc VIP站项目
const PCVIP = {
  name: 'PC-大客户版本(年定期)',
  value: 'PCVIP',
  // directory: 'mvip',
  // version: '3.0',
  directory: 'pc',
  version: '',
  title: "鲸鱼",
  project: {
    m: './src/views/pcvip',
  },
  port: 8974,
  domain: {
    dev: '"http://jinrpc.dev.jinr.com"',
    pre: '"http://jinrpc.pre.jinr.com"',
    beta: '"http://jinrpc.beta.jinr.com"',
    prod: '"http://jinrpc.jinr.com"'
  },
  dev: {
    domain: '"http://jinrpc.dev.jinr.com"',
    bucket: 'jinrvipdev',
  },
  pre: {
    domain: '"http://jinrpc.pre.jinr.com"',
    bucket: 'jinrvippre',
  },
  beta: {
    domain: '"http://jinrpc.beta.jinr.com"',
    bucket: 'jinrvipbeta',
  },
  prod: {
    domain: '"http://jinr.com"',
    bucket: 'jinrvip',
  },
}

// APP项目
const APP = {
  name: 'APP-内嵌页4.0',
  version: '4.0',
  value: 'APP',
  directory: 'app',
  title: "jinr", //4.0版本APP
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
    bucket: 'jinrfepre',
  },
  beta: {
    domain: '"http://jinrapp.beta.jinr.com"',
    bucket: 'jinrfebeta',
  },
  prod: {
    domain: '"http://jinrapp.jinr.com"',
    bucket: 'jinrfe',
  },
}

// 组件项目
const CUT = {
  name: 'cut-组件开发测试版1.0',
  value: 'CUT',
  directory: 'cut',
  version: '1.0',
  title: "cut 组件开发测试版",
  project: {
    app: './src/views/cut',
  },
  port: 9000,
  dev: {
    domain: '"https://jinrapp.dev.jinr.com"',
    bucket: 'jinrfedev',
  },
  pre: {
    domain: '"http://jinrapp.pre.jinr.com"',
    bucket: 'jinrfepre',
  },
  beta: {
    domain: '"http://jinrapp.beta.jinr.com"',
    bucket: 'jinrfebeta',
  },
  prod: {
    domain: '"https://jinrapp.jinr.com"',
    bucket: 'jinrfe',
  },
}

const YYBG = {
  name: "运营报告",
  value: "YYBG",
  directory: "yybg",
  version: "201802",
  title: "运营报告",
  // directory: '',
  // version: '',
  project: {
    yybg: "./src/views/yybg"
    // yybg: './src/views/yybg-new',
  },
  port: 9012,
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
};
const YYBGNEW = {
  name: "运营报告",
  value: "YYBGNEW",
  directory: "yybgnew",
  version: "2018",
  title: "新版运营报告",
  // directory: '',
  // version: '',
  project: {
    yybg: "./src/views/yybg-new"
  },
  port: 9015
  // dev: {
  //   domain: '"http://jinrapp.dev.jinr.com"',
  //   bucket: "jinrfedev"
  // },
  // pre: {
  //   domain: '"http://jinrapp.pre.jinr.com"',
  //   bucket: "jinrfepre"
  // },
  // beta: {
  //   domain: '"http://jinrapp.beta.jinr.com"',
  //   bucket: "jinrfebeta"
  // },
  // prod: {
  //   domain: '"https://jinrapp.jinr.com"',
  //   bucket: "jinrfe"
  // }
};
// 年度报告
const REPORT = {
  name: '鲸鱼财富-年度报告',
  value: 'REPORT',
  directory: 'report',
  version: '2017',
  title: "鲸鱼财富",
  // directory: '',
  // version: '',
  project: {
    yybg: './src/views/report',
  },
  port: 9894,
  dev: {
    domain: '"http://jinrapp.dev.jinr.com"',
    bucket: 'jinrfedev',
  },
  pre: {
    domain: '"http://jinrapp.pre.jinr.com"',
    bucket: 'jinrfepre',
  },
  beta: {
    domain: '"http://jinrapp.beta.jinr.com"',
    bucket: 'jinrfebeta',
  },
  prod: {
    domain: '"http://jinrapp.jinr.com"',
    bucket: 'jinrfe',
  },
}

// 活动-算命
const FORTUNE = {
  name: '活动-算命',
  value: 'FORTUNE',
  directory: 'fortune',
  version: '2018',
  title: "活动",
  // directory: '',
  // version: '',
  project: {
    FORTUNE: './src/views/fortune',
  },
  port: 9894,
  dev: {
    domain: '"http://jinrapp.dev.jinr.com"',
    bucket: 'jinrfedev',
  },
  pre: {
    domain: '"http://jinrapp.pre.jinr.com"',
    bucket: 'jinrfepre',
  },
  beta: {
    domain: '"http://jinrapp.beta.jinr.com"',
    bucket: 'jinrfebeta',
  },
  prod: {
    domain: '"https://jinrapp.jinr.com"',
    bucket: 'jinrfe',
  },
}

// 新手福利
const NEWHB = {
  name: '新手福利',
  value: 'NEWHB',
  directory: 'newhb',
  version: '',
  title: "新手福利",
  // directory: '',
  // version: '',
  project: {
    yybg: './src/views/newhb',
  },
  port: 9895,
  dev: {
    domain: '"http://jinrapp.dev.jinr.com"',
    bucket: 'jinrfedev',
  },
  pre: {
    domain: '"http://jinrapp.pre.jinr.com"',
    bucket: 'jinrfepre',
  },
  beta: {
    domain: '"http://jinrapp.beta.jinr.com"',
    bucket: 'jinrfebeta',
  },
  prod: {
    domain: '"http://jinrapp.jinr.com"',
    bucket: 'jinrfe',
  },
}

const JINRFL = {
  name: '鲸鱼福利',
  value: 'JINRFL',
  directory: 'jinrfl',
  version: '',
  title: "鲸鱼福利",
  project: {
    jinrfl: './src/views/jinrfl',
  },
  port: 8001,
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
}

const INVITETHREE = {
  name: '邀请好友享三重礼',
  value: 'INVITETHREE',
  directory: 'invitethree',
  version: '',
  title: "邀请好友享三重礼",
  project: {
    invitethree: './src/views/invitethree',
  },
  port: 8002,
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
}

const ZHITOU = {
  name: '智投',
  value: 'ZHITOU',
  directory: 'zhitou',
  version: '',
  title: "智投",
  project: {
    invitethree: './src/views/zhitou',
  },
  port: 8005,
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
}

// 投资返现
const INVESTRETURNMON = {
  name: '投资返现',
  value: 'INVESTRETURNMON',
  directory: 'investreturnmon',
  version: '',
  title: "投资返现",
  project: {
    invitethree: './src/views/investreturnmon',
  },
  port: 8006,
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
}

// 春存计划
const SPG = { // 项目启动打开地址： 项目地址/配置名/版本号/index.html   : http://192.168.29.67:9016/spg//index.html
  name: "春存计划", // 上传文件是用于选择
  value: "SPG",
  directory: "spg",
  version: "",    // 版本号可省
  title: "春存计划",
  // directory: '',
  // version: '',
  project: {
    springDpg: "./src/views/spring-deposit"      // 打包入口地址
  },
  port: 9016,                                    // 本地开发所用端口号
  dev: {
    domain: '"http://hbnew.dev.jingyugame.com"', // 活动开发机接口请求地址
    bucket: 'jinrfedev',                         // 开发机静态文件上传地址
  },
  pre: {
    domain: '"http://hbnew.pre.jingyugame.com"', // 预发布接口地址
    bucket: 'jinrfepre',                         // 预发布静态文件上传地址
  },
  beta: {
    domain: '"http://hbnew.beta.jingyugame.com"',
    bucket: 'jinrfebeta',
  },
  prod: {
    domain: '"http://hbnew.jingyugame.com"',
    bucket: 'jinrfe',
  },
};
// 投多少送多少3
const INVESTDOUBLE3 = { // 项目启动打开地址： 项目地址/配置名/版本号/index.html   : http://192.168.29.67:9016/spg//index.html
  name: "投多少送多少3", // 上传文件是用于选择
  value: "INVESTDOUBLE3",
  directory: "investdouble3",
  version: "",    // 版本号可省
  title: "投多少送多少",
  // directory: '',
  // version: '',
  project: {
    springDpg: "./src/views/investdouble3"      // 打包入口地址
  },
  port: 9016,                                    // 本地开发所用端口号
  dev: {
    domain: '"http://hbnew.dev.jingyugame.com"', // 活动开发机接口请求地址
    bucket: 'jinrfedev',                         // 开发机静态文件上传地址
  },
  pre: {
    domain: '"http://hbnew.pre.jingyugame.com"', // 预发布接口地址
    bucket: 'jinrfepre',                         // 预发布静态文件上传地址
  },
  beta: {
    domain: '"http://hbnew.beta.jingyugame.com"',
    bucket: 'jinrfebeta',
  },
  prod: {
    domain: '"http://hbnew.jingyugame.com"',
    bucket: 'jinrfe',
  },
};

// 鲸鱼保险广告
const JINRINSURANCE = { // 项目启动打开地址： 项目地址/配置名/版本号/index.html   : http://192.168.29.67:9016/spg//index.html
  name: "鲸鱼保险", // 上传文件是用于选择
  value: "JINRINSURANCE",
  directory: "jinrinsurance",
  version: "",    // 版本号可省
  title: "鲸鱼保险",
  // directory: '',
  // version: '',
  project: {
    springDpg: "./src/views/jinrinsurance"      // 打包入口地址
  },
  port: 9016,                                    // 本地开发所用端口号
  dev: {
    domain: '"http://hbnew.dev.jingyugame.com"', // 活动开发机接口请求地址
    bucket: 'jinrfedev',                         // 开发机静态文件上传地址
  },
  pre: {
    domain: '"http://hbnew.pre.jingyugame.com"', // 预发布接口地址
    bucket: 'jinrfepre',                         // 预发布静态文件上传地址
  },
  beta: {
    domain: '"http://hbnew.beta.jingyugame.com"',
    bucket: 'jinrfebeta',
  },
  prod: {
    domain: '"http://hbnew.jingyugame.com"',
    bucket: 'jinrfe',
  },
};


// 新手加息劵
const newbie = { // 项目启动打开地址： 项目地址/配置名/版本号/index.html   : http://192.168.29.67:9016/spg//index.html
  name: "新手加息劵", // 上传文件是用于选择
  value: "newbie",
  directory: "newbie",
  version: "",    // 版本号可省
  title: "新手加息劵",
  // directory: '',
  // version: '',
  project: {
    springDpg: "./src/views/newbie"      // 打包入口地址
  },
  port: 9016,                                    // 本地开发所用端口号
  dev: {
    domain: '"http://hbnew.dev.jingyugame.com"', // 活动开发机接口请求地址
    bucket: 'jinrfedev',                         // 开发机静态文件上传地址
  },
  pre: {
    domain: '"http://hbnew.pre.jingyugame.com"', // 预发布接口地址
    bucket: 'jinrfepre',                         // 预发布静态文件上传地址
  },
  beta: {
    domain: '"http://hbnew.beta.jingyugame.com"',
    bucket: 'jinrfebeta',
  },
  prod: {
    domain: '"http://hbnew.jingyugame.com"',
    bucket: 'jinrfe',
  },
};

module.exports = {
  M,
  MVIP,
  PCVIP,
  APP,
  CUT,
  YYBG,
  REPORT,
  FORTUNE,
  NEWHB,
  JINRFL,
  INVITETHREE,
  ZHITOU,
  SPG,
  INVESTRETURNMON,
  INVESTDOUBLE3,
  JINRINSURANCE,
  newbie,
  item: [
    M,
    MVIP,
    PCVIP,
    APP,
    CUT,
    YYBG,
    REPORT,
    FORTUNE,
    NEWHB,
    JINRFL,
    INVITETHREE,
    ZHITOU,
    SPG,
    INVESTDOUBLE3,
    JINRINSURANCE,
    INVESTRETURNMON,
    newbie
  ],
  bucketServers: [{
      name: '开发机',
      value: 'dev'
    }, {
      name: '预发布机',
      value: 'pre'
    }, {
      name: '公测机',
      value: 'beta'
    },
    {
      name: '正式机',
      value: 'prod'
    },
  ]
}