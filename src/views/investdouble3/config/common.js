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

 /**
  * 此文件为通用接口配置文件
  */

// const serverRoot = 'http://hbjr.jinrgame.com'    // 测试机域名
const serverHost = ''

export const downloadAPP = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core' // 下载APP

export const protocolApp = '//jinrfe.jinr.com/app/4.0/index.html#/treaty/register' // 鲸鱼协议

export const MWeb = 'http://m.jinr.com/'   // 鲸鱼新M站
// 公用接口路径前缀
const pathDirCommon = '/activity/common'
// 验证码路径前缀
const imgPathDirCmmon = '/activity/commonget'

export const CommonIsRegister = serverHost + pathDirCommon + '/getUserRegisterInfo'

// 发送验证码
export const CommonSendSms = serverHost + pathDirCommon + '/getSmsCode'

// 更新图片验证码
export const CommonUpImgSms = serverHost + imgPathDirCmmon + '/getVerificationCode'

// 注册
export const CommonRegister = serverHost + pathDirCommon + '/commonRegister'

// 获取平台数据
export const CommonGetPlatformUserStatis = serverHost + pathDirCommon + '/getPlatformUserStatis'

// 分享
export const CommonShareConfig = serverHost + pathDirCommon + '/getWechatShare'
