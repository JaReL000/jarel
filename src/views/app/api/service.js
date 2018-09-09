/*
 |--------------------------------------------------------------------------
 | 网络拦截器
 |--------------------------------------------------------------------------
 |
 |
 */



import Vue from 'vue'
import axios from 'axios';
import { stringify } from 'qs'
import axiosConfig from './axios.config'
import status from './status.code'
import Loading from 'components/loading'
import MessageBox from 'components/message-box'
// import Indicator from 'components/indicator'
import Flash from 'components/flash'
// import store from '../store';
// import { getToken } from 'utils/auth';


// 创建axios实例
const service = axios.create(axiosConfig);
let domain = process.domain;
var ishttps = 'https:' == document.location.protocol ? true: false;
if(ishttps){
  domain = domain.replace("http", "https");
}
service.defaults.baseURL = domain;
// service.defaults.baseURL = "http://jinrapp.dev.jinr.com"
// service.defaults.baseURL = 'http://jinrapp.pre.jinr.com'
// service.defaults.baseURL = 'http://jinrapp.beta.jinr.com'
// service.defaults.baseURL = "http://jinrapp.jinr.com"

// request拦截器
service.interceptors.request.use(config => {
  Loading.open('Loading...');
  // Indicator.open('Loading...');

  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  //   debugger
  // }

  // console.log('request拦截器')
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})
// respone拦截器
service.interceptors.response.use((response) => {
  response = response.data
  // 酷派coolpad 4.4.2 返回字符串格式
  if(typeof response === 'string'){
    response = JSON.parse(response)
  }
  Loading.close()
  // Indicator.close()

  return callbackFun(response)


}, (error) => {
  Loading.close()
    console.log('err' + error);// for debug
    // Message({
    //   message: error.message,
    //   type: 'error'
    //   duration: 5 * 1000
    // });
    return Promise.reject(error);
  }
)

export default service;


function callbackFun(res){
   // 状态码正确返回
  if(res.code === status.SUCCESS){

    return res;
  }else if(res.code ===  status.NOT_CASH){
    return {data: res};
  }else if(res.code ===  status.ERR_CODE){
    return {data: res};
  } else {

    Flash(res.msg)
    return res;
  }
}

