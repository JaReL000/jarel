/*
 |--------------------------------------------------------------------------
 | 网络拦截器
 |--------------------------------------------------------------------------
 |
 |
 */


import axios from 'axios'
// import Vue from 'Vue'
import axiosConfig from './axios.config'
import MessageBox from 'components/message-box'
import Flash from 'components/flash'

const status = {
  SUCCESS: 1000200, // 7136说 只有成功
  //NET_ERR: 1000000,   // 网络连接异常，请稍候再试
  BIZ_ERR: 1003, // 业务请求异常
  NO_AUTH: 1004,
  SYS_ERR: 1000500, // 系统错误
  LOG_OUT: 1000501, // 账号在其他地方登入
  NOT_TELL: 1000504, // 账号已注册
  N_TELL: 1000505, //  账号未注册
  NOT_BING: 1000301, // 跳转至绑卡页面
  NOT_PASSWORD: 1000302, // 跳转至设置交易密码页面
  NOT_REAL: 1000303, // 跳转至实名验证页面(此错误码目前只有M站调用时返回)

  NOT_CASH: 1000000, // 您还未投资活期，请先投资活期才能激活卡券
  ERR_CODE: 1000305, //  短信验证码错误

  NON_PHONE: 71000440, // 非手机访问，
  jump_code: 71000450, // 错误跳转提示
  JR_EXCEPTION_ERROR: 71000400, // m站提示异常
  ERR_PLATFORM: 1000001, // 非pc端访问
  ERR_BUSINESS: 1000002, // 业务错误
  No_ACCESS: 1000403, //没有权限访问

}

// 创建axios实例
const service = axios.create(axiosConfig);

if (process.env.NODE_ENV == 'dev') {
  service.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'debug') {
  service.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'prod') {
  // 判断协议
  let domain = process.domain;
  let ishttps = 'https:' == document.location.protocol ? true : false;
  if (ishttps) {
    domain = domain.replace("http", "https");
  }
  service.defaults.baseURL = domain
  // service.defaults.baseURL = "http://jinrpc.dev.jinr.com"
  // service.defaults.headers = {
  //   // 'Access-Control-Allow-Origin': '*',
  //   // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
}

// request拦截器
service.interceptors.request.use(config => {
  // console.log(process.mFormalDomain);
  // console.log(location.hostname);
  // MessageBox({
  //   title: '提示' ,
  //   message: config.data,
  //   showCancelButton: false,
  //   showConfirmButton: false,
  //   closeOnClickModal: false,
  // })
  console.log('config', config)
  return config;

}, error => {
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(response => {

  // MessageBox({
  //   title: '提示' ,
  //   message: response.data,
  //   showCancelButton: false,
  //   showConfirmButton: false,
  //   closeOnClickModal: false,
  // })
  if (response.data.code === status.SUCCESS) {
    // console.log('xxxxxxx', response)
    return response.data;

    //  禁止手机访问
  } else if (parseInt(response.data.code) === status.ERR_PLATFORM) {
    // console.log(response)
    Flash(response.data.msg)
    // setTimeout(function(){
    window.location = response.data.data.redirectUrl
    // 业务错误
  } else if (parseInt(response.data.code) === status.ERR_BUSINESS) {
    // console.log(response)
    Flash(response.data.msg)
    return
  } else if (parseInt(response.data.code) === status.NOT_TELL) {
    return { data: response.data }
    // 提示语
  } else if (response.data.code === status.LOG_OUT || response.data.code === status.JR_EXCEPTION_ERROR) {
    // return {data: status.LOG_OUT}
    Flash(response.data.msg)
    if (process.mFormalDomain === location.hostname) {
      setTimeout(function () {
        window.location = "/pc/index.html"
        // console.log('--------', response)
      }, 1000);
    } else {
      setTimeout(function () {
        window.location = "/pc/index.html"
        // console.log('--------', response)
      }, 1000);
      return response;
    }
    // 未绑卡
  } else if (parseInt(response.data.code) === status.NOT_BING) {
    Flash(response.data.msg)
    return { data: status.NOT_BING }
    // 提示语
  } else if (parseInt(response.data.code) === status.jump_code) {
    MessageBox(response.data.msg)
    MessageBox({
      title: '提示',
      message: response.data.msg,
      showCancelButton: false,
      showConfirmButton: false,
      closeOnClickModal: false,
    }).then((action) => {
      if (action === 'cancel') {
      } else if (action === 'confirm') {
      }
    });
    return
    //实名认证
  } else if (parseInt(response.data.code) === status.NOT_REAL) {
    Flash(response.data.msg)
    return { data: status.NOT_REAL }
  } else if (parseInt(response.data.code) === status.SYS_ERR) {
    Flash(response.data.msg)
    return
  } else if (parseInt(response.data.code) === status.NOT_PASSWORD) {

    // Flash('您还未设置交易密码,请前往APP设置吧')
    // Flash('请去绑卡')
    return { data: status.NOT_PASSWORD }
  } else if (parseInt(response.data.code) === status.NOT_CASH) {
    Flash(response.data.msg)
    return { data: response.data }
  } else if (parseInt(response.data.code) === status.ERR_CODE) {
    console.log('-----');
    console.log(response.data);

    return { data: response.data }
  }else if(parseInt(response.data.code) === status.No_ACCESS){ // 没有权限访问
    return { data: response.data }
  }else {
    response && response.data ? Flash(response.data.msg) : ''
  }
  // Flash(response.data.msg)
  // return response
}, error => {
  console.log('err' + error);

  return Promise.reject(error);
})

export default service;
export { status };



