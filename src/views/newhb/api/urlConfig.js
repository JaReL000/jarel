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

const serverRoot = 'process.env.BASE_API' //jr7071
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
  10: 'weekProfitDetail',
  3: 'xcurrentDetail',
  4: 'regularDetail',

}
// 金额正则
export const regMoney = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

export const downloadAPP ='http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core' //下载APP'

export const protocolApp ='http://www.jinr.com/User/xieyi/id/5' //协议

const pathDirUser = '/user'
export const login =  pathDirUser + '/login'  //登陆
export const logout =  pathDirUser + '/logout'  //退出
export const userIndex =  pathDirUser + '/index'  //用户个人中心

export const getIndex =  '/index/getIndex'  //获取首页数据
export const myAsset =  '/account/myAsset'  //获取资产数据

const pathDirWeek = '/weekcycle'
export const weekDetail = pathDirWeek + '/detail'  //周周盈详情
export const weekAsset =  pathDirWeek + '/myasset'  //获取周周盈资产
export const lockList =  pathDirWeek + '/lockMoneyList'  //获取周周盈锁定金额列表

export const selectPay =  '/order/selectPay'  //支付列表选择
export const validOrder =  '/order/validOrder'  //银行卡支付接口
export const getValidCode =  '/order/getValidCode'  //发送短信验证码接口
export const validateCode =  '/order/validateCode'  //验证短信验证码接口：

export const transactRecord =  '/order/index'  //交易记录列表
export const incomeListRecord =  '/order/incomeList'  //累计收益
export const currentRecord =  '/order/index'  //活期交易记录列表
export const weekRecord =  '/order/index'  //周周盈交易记录列表

export const coupon =  '/Welfare/index/type/coupon'  //卡券列表接口 coupon_type 4
export const coupoDetail =  '/Welfare/detail/type/coupon/id/'  //卡券列表详情
export const financing =  '/Welfare/index/type/financing'  //理财红包列表 coupon_type 4
export const financingDetail =  '/Welfare/detail/type/financing/id/'  //理财红包详情
export const cash =  '/Welfare/index/type/cash'  //现金红包列表  coupon_type 4
export const cashDetail =  '/Welfare/detail/type/cash/id/'  //现金红包详情

export const setWxOrderCacheData = '/order/setWxOrderCacheData'  // 微信支付
export const handleWxorder = '/pay/handleWxorder'  // 跳转微信支付链接：

const pathDirCurrent = '/current'
export const currentDetail = pathDirCurrent + '/detail'  //活期详情
export const currentAsset =  pathDirCurrent + '/myasset'  //获取活期资产

export const activeCurrentCoupon = '/Welfare/activeCurrentCoupon'  //激活加息

// 定期
export const regularDetail = '/Regular/detail'  //定期详情
export const regularAsset = '/Regular/myasset'  //定期资产
export const regularGetAssertsLists = '/Regular/getAssertsLists'  //定期资产记录
export const regularGetRegularDetail = '/Regular/getRegularDetail'  //定期资产记录详情
export const assertProtocol = '/Regular/assertProtocol' //协议

export const testUser = {
  domain: 'http://jinrapp.dev.jinr.com/',
  "userid": 2711606,
  "username": "",
  "identityid": "4444441990********",
  "c_time": "2017-06-08 12:04:25",
  "bank_cardno": "6214863201******",
  "check_status": 1,
  "mobile": "18206052897",
  "passwd": 1,
  "token": "596dVFMGUgQIAFJTBg8BU1UKBFpQClBbUgUMVQ4CVQRXBAFSagJWAA4DVwJQCFBTVg1SX1RbUQJcAAFQXQZXAQcKAFICP1AECQdPUgYVU1IUCAkDVgoJU1w"
}

export const loginApp = {
  method: "user.login", 
  v: "100",
  appid: "jinr_test",
  timestamp: "123456",
  unique_id: "14870610001",
  mobile: "14870430001", // 0001 0002 0003 0004 0005
  password: "a123456",
  type: "pwd"
}











