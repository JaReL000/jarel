import axios from 'axios'
import { stringify } from 'qs'
import Flash from '@/components/flash'
import Loading from 'components/loading'

export const fetch = (url, data)=>{
  let domain = process.domain
  let ishttps = 'https:' == document.location.protocol ? true: false
  if(ishttps){
    domain = domain.replace("http", "https")
  }
  return new Promise((resolve, reject) =>{
    let instance = axios.create({
      // 新建一个请求实例，配置默认项
      method: 'post',
      // baseURL: 'http://192.168.28.141:9001',
      baseURL: domain,
      timeout: 45000
    })
    
    instance.interceptors.request.use(config => {
      Loading.open('请求中...')
      return config
    
    }, error => {
      Loading.close()
      Flash('请求超时，请重试')
      console.log(error) // for debug
      Promise.reject(error)
    })

    instance.interceptors.response.use(response => {
      console.log( response,'response' )
      // 创建拦截器
      response = response.data
      Loading.close()
      return hander( response )
    }, error=> {
      Loading.close()
      return Promise.reject(error)
    })
    instance({
      // 接口调用走这里,先走拦截器
      method: 'post',
      url: url,
      data: stringify(data)
    }).then(response => {
      // 只要数据格式不出问题，都走这里,非10000的请求经过拦截器后还是会走这里
      // 这里的response是由下面的handle返回的
      if(typeof(response) === 'string'){
        response = JSON.parse(response)
      }
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

function hander(res){
  if(res.code == 10000){
    return res
  }else{
    Flash(res.msg)
    // 此处返回的数据会resolve到接口的then里面去
    // return {data: res}
  }
}
