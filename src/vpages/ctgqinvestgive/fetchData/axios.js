import axios from 'axios'
import Flash from '@/components/flash'
// 无拦截器版本;无拦截器版本;无拦截器版本;无拦截器版本;无拦截器版本;
export const fetch1 = (url, data)=>{
  let domain = process.domain
  let ishttps = 'https:' == document.location.protocol ? true: false
  if(ishttps){
    domain = domain.replace("http", "https")
  }
  return new Promise((resolve, reject) =>{
    let instance = axios.create({
      // 新建一个请求实例，配置默认项
      method: 'post',
      // baseURL: 'http://hbnew.dev.jingyugame.com/',
      baseURL: domain,
      timeout: 25000
    })
    instance({
      // 接口调用走这里,先走拦截器
      method: 'post',
      url: url,
      data: data
    }).then(response => {
      // 只要数据格式不出问题，都走这里,非10000的请求经过拦截器后还是会走这里
      // 这里的response是由下面的handle返回的
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

