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
  * 此文件为项目私有接口配置文件。
  */
// 项目名称

// const serverRoot = 'http://hbjr.jinrgame.com'   // 测试机域名
const serverHost = ''

const pathDir = '/activity/Mammon'    // 项目的文件路径前导(一般由后台提供过来)
// demo
// const pathDir = '/CheYueBao'

// demo
// 可以使用以下方式暴露出接口
// 之后就可以在项目中以： this.jr.url.portName 的形式引用此接口
// 注意，所有的公共接口都有Common前缀，所以私有接口尽量不要使用Common前缀，避免覆盖。
// export const portName = serverHost + pathDir + '/接口名称'
const ports = []
function getUrls (ports) {
  let urls = {}
  ports.forEach((port) => {
    urls[port] = serverHost + pathDir + '/' + port
  })
  return urls
}

export const urls = getUrls(ports)
