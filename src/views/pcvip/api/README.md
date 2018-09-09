# 接口文档

## 转入初始化接口

```js 

servicename=api.assetTransaction&type=1&product_type=1&money
type=1,2,3,4,转入，转出，提现，充值
```

## 拦截器

```js
/*
 |--------------------------------------------------------------------------
 | 网络拦截器
 |--------------------------------------------------------------------------
 |
 |
 */


import axios from 'axios';
import MessageBox from 'components/message-box';
// import store from '../store';
// import { getToken } from 'utils/auth';

const status = {
  SUCCESS: 1000200 , // 7136说 只有成功
  NET_ERR: 1000000,   // 网络连接异常，请稍候再试
  BIZ_ERR: 1003, // 业务请求异常
  NO_AUTH: 1004,
  SYS_ERR: 1000500 // 系统错误
}

// 创建axios实例
const service = axios.create({
  baseURL: '', // api的base_url process.env.BASE_API  http://jinrpc.dev.jinr.com/
  headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
  url: '/m/index',
  timeout: 35000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
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
service.interceptors.response.use(response => {
    // MessageBox({
    //   title: '' , 
    //   message: '',
    //   showCancelButton: true,
    //   closeOnClickModal: false,
    // }).then((action) => {
    //   if(action==='cancel'){}else if(action==='confirm'){} 
    // });

    // console.log('回来拦截器');
    return response.data;
    // debugger
    /**
    * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
    * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
    */
   const res = response.data;

    if (res.code !== 10001) {
      MessageBox({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        })
      }
      return Promise.reject('error');
    } else {
      return response.data;
    }
    return response.data;
  },
  error => {
    console.log('err' + error);// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // });
    return Promise.reject(error);
  }
)

export default service;
export {status};

/**
 * 核查状态
 */
function checkStatus(){

}

/**
 * 校验码
 */
function checkCode(){
  
}



```