/*
 |--------------------------------------------------------------------------
 | 接口
 |--------------------------------------------------------------------------
 |
 |
 */

/**
 * protocol :// hostname[:port] / path / [;parameters][?query]#fragment
 * 协议部分  protocol
 * 域名部分  hostname
 * 端口部分  port
 * 虚拟目录部分 从域名后的第一个“/”开始到最后一个“/”为止
 * 文件名部分  从域名后的最后一个“/”开始到“？”为止
 * 锚部分  从“#”开始到最后，都是锚部分
 * 参数部分  从“？”开始到“#”为止之间的部分为参数部分，又称搜索部分、查询部分
 * @type {String}
 */

// const serverRoot = 'https://' //M站开发机
// const serverHost = 'pay.mdev.jinr.com/'

const serverRoot = '' //jr7071  process.env.BASE_API
const serverHost = ''


/*
 |--------------------------------------------------------------------------
 |  周周盈(10)        |        活期(3)        |     余额(2)     |
 |--------------------------------------------------------------------------
 |
 | ==> 余额(2)          ==>|余额(2)银行卡(1)      ==>|银行卡(1)
 |
 |    | 活期(3)
 |    | 微信(9)                 余额(2)
 | <==|                   <==|银行卡(1)          <==|微信(9) 银行卡(1)
 |    | 余额(2)                 微信(9)
 |    | 银行卡(1)
 */


// 产品名称 pay_type
export const good_type = {
  weixin: 9,  //微信
  bank: 1,  //银行卡
  balance: 2, //余额
  current: 3, //活期
  week: 10,  //周周盈
  regular: 4,  //定期
}

// 支付方式
export const do_type = {
  in: 1,  //转K入
  out: 2,  //转出
  recharge: 3, // 充值
  withdrawals: 4, // 体现
}

// 键盘
export const keyboardKeyCode = {
  '49' : '1',
  '50' : '2',
  '51' : '3',
  '52' : '4',
  '53' : '5',
  '54' : '6',
  '55' : '7',
  '56' : '8',
  '57' : '9',
  '48' : '0',
}

//index
export const typeName = {
  5: 'weekProfitDetail',  //周周赢路由参数
  1: 'xcurrentDetail',    //活期路由参数
  4: 'regularDetail',     //定期路由参数

}
// 金额正则
export const regMoney = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

export const downloadAPP ='http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core' //下载APP'

export const protocolApp ='http://www.jinr.com/User/xieyi/id/5' //协议

const pathDirUser = ''
export const login =  serverHost + '/m/index'  //登陆
export const register =  serverHost + '/m/index'  //注册
export const logout =  serverHost + '/m/index'  //退出
export const userIndex =  serverHost + '/m/index'  //用户个人中心

// export const getIndex = serverHost + '/index/getIndex'  //获取首页数据
export const getIndex = serverHost + '/m/index'  //获取首页数据
export const myAsset =  '/m/index'  //获取资产数据

const pathDirWeek = ''
export const weekDetail = pathDirWeek + '/detail'  //周周盈详情
export const weekAsset =  pathDirWeek + '/m/index'  //获取周周盈资产
export const lockList =  pathDirWeek + '/m/index'  //获取周周盈锁定金额列表

export const selectPay =  '/order/selectPay'  //支付列表选择
export const validOrder =  '/order/validOrder'  //银行卡支付接口
export const getValidCode =  '/m/index'  //发送短信验证码接口
export const valiteluse =  '/m/index'  //验证手机号码是否已经注册

export const validateCode =  '/order/validateCode'  //验证短信验证码接口：

export const transactRecord =  '/m/index'  //交易记录列表
export const incomeListRecord =  '/order/incomeList'  //累计收益
export const currentRecord =  '/order/index'  //活期交易记录列表
export const weekRecord =  '/order/index'  //周周盈交易记录列表

export const coupon =  '/m/index'  //卡券列表接口 coupon_type 4
export const coupoDetail =  '/m/index'  //卡券列表详情
export const financing =  '/m/index'  //理财红包列表 coupon_type 4
export const financingDetail =  '/m/index'  //理财红包详情
export const cash =  '/m/index'  //现金红包列表  coupon_type 4
export const cashDetail =  '/m/index'  //现金红包详情

export const setWxOrderCacheData = '/order/setWxOrderCacheData'  // 微信支付
export const handleWxorder = '/pay/handleWxorder'  // 跳转微信支付链接：

const pathDirCurrent = ''
export const currentDetail = pathDirCurrent + '/m/index'  //活期详情
export const currentAsset =  pathDirCurrent + '/m/index'  //获取活期资产

export const activeCurrentCoupon = '/m/index'  //激活加息

// 定期
export const regularDetail = '/Regular/detail'  //定期详情
export const regularAsset = '/m/index'  //定期资产
export const regularGetAssertsLists = '/Regular/getAssertsLists'  //定期资产记录
export const regularGetRegularDetail = '/m/index'  //定期资产记录详情
export const assertProtocol = '/Regular/assertProtocol' //协议
















