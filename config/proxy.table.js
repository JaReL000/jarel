/*
 |--------------------------------------------------------------------------
 | 开发接口 跨域处理
 |--------------------------------------------------------------------------
 |  @author weizihua
 |  5-10
 */
"use strict"

const chalk = require('chalk')
const projectConfig = require('./project')

const jr7071 = 'http://192.168.10.123' // jr7071
const jinrM = 'http://pay.mdev.jinr.com' //M站开发机  om.jinr.com
const jinrOM = 'http://om.jinr.com' //M站正式机
const jinrAPP = 'http://jinrapp.dev.jinr.com' //API
const newMPC = 'http://jinrpc.dev.jinr.com' // 新M站PC站
// const newMPC = 'http://jinr.com' // 新M站PC站
const domain = projectConfig.domain
const config = require(process.env.project + '/project.json')
let configProxy = new Object()

if(process.env.project && config.proxy){
  console.log(chalk.blue('代理开始'));

  if(config.arrAPI){

  /**
   * callback : 函数测试数组的每个元素。
   * thisObject : 对象作为该执行回调时使用。
   */
    config.arrAPI.forEach(function(value, index, array) {
      let obj = {}

      let pathDir = '/' + value
      let pathRewriteVal = '^/' + value
      obj[pathRewriteVal] = pathDir

      configProxy[pathDir] = {
        target: config.proxy, //目标主机
        changeOrigin: true, //需要虚拟主机站点
        // ws: true, //代理的WebSockets
        pathRewrite: obj //重写路径
      }
    })
  }else{
    console.log(chalk.yellow('请正确配置代理'));

  }
}else{
  console.log('无代理');
}

module.exports = configProxy