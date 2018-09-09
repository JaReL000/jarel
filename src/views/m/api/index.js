import * as url from './urlConfig'
import axios from './service'
import http from 'axios'
// import qs from 'qs'
import { stringify } from 'qs'
import { signFun } from 'mixins/mixin'


export const upload = (url, formData) => {
  return axios.post(url, formData, {
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    }).then(res => {
      
      return res
  })
}

/**
 * 封装请求
 * @param {* object} data 
 * @param {* string} sign 
 * @author 7043
 */
export default function fetch (data = {}, headers) {
  data.nonceStr = Math.random()
  data.sign = signFun(data) 
  
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      data: stringify(data),
      headers: headers || {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    }).then(response => {
      // console.log(response);
      
        resolve(response.data)
    }).catch(error => {

      console.log('封装主入口-->')
      console.log(error)
      reject(error)
    })
  })

  // Vue.prototype.$axios = axios
}

/********************************* */


//获取首页
export const indexApi = {
  getIndex() {
		return axios.post(url.getIndex, stringify({'servicename':'api.index'})).then((res) => {
			return res
		})
	}
}

// 用户
export const userApi = {
  login(params) {
		return axios.post(url.login, stringify(params)).then((res) => {
			return res
		})
	}
}


// 交易记录
export const transactRecordApi = (params) => {
  return axios.post(url.transactRecord, stringify(params)).then((res) => {
    return res
  })
}


// 支付
export const selectPayApi = (params) => {
  return axios.post(url.selectPay, stringify(params)).then((res) => {
    return res
  })
}

// 各种资产
export const assetApi =  {
  currentAsset(params) { //活期资产
    return axios.post(url.currentAsset,stringify(params)).then((res) => {
      return res
    })
  },
  regularAsset(params){
    return axios.post(url.regularAsset,stringify(params)).then((res) => {
      return res
    })
  },
  weekAsset(params){ //周周赢我的资产页面
    return axios.post(url.weekAsset,stringify(params)).then((res) => {
      return res
    })
  },
  myAsset(params) { //所有资产 
    return axios.post(url.myAsset, stringify(params)).then((res) => {
      return res
    })
  },
}

// 详情
export const detailApi =  {
  currentDetail(params) {
    return axios.post(url.currentDetail, stringify(params)).then((res) => {
      return res
    })
  },
  regularDetail(){
    return axios.post(url.regularDetail).then((res) => {
      return res
    })
  },
  weekDetail(){
    return axios.post(url.weekDetail).then((res) => {
      return res
    })
  },

}



// M新站 产品线
export const productApi = {
  productDetail(params) {
    return axios.post(url.getIndex, stringify(params)).then((res) => {
      return res
    })
  }
}

// 用于交互请求接口
export const baseApi = {
  baseHttp(params) {
    return http.post('/m/index', stringify(params)).then((res) => {
      return res
      console.log(res.data.code)
    })
  }
}



//键盘支付 validOrder,getValidCode,validateCode,
// 支付
export const checksApi = {
  validOrder(params) {
    return axios.post(url.validOrder, stringify(params)).then((res) => {
      return res
    })
  },
  getValidCode(params){
    return axios.post(url.getValidCode, stringify(params)).then((res) => {
      return res
    })
  },
  validateCode(params){
    return axios.post(url.validateCode, stringify(params)).then((res) => {
      return res
    })
  },
}
