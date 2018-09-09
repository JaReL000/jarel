import axios from './service'
import { stringify } from 'qs'

// 封装请求
export default function fetch(data, sign) {
  sign = sign || ''
  data = data || {}

  data['v'] = '101' //接口版本 100
  data['appid'] = 'jinr_embed' //应用标识  jinr_test jinr_embed

  // 此参数对应上术示例中未格式化的 JSON 数据。必须进行 URL ENCODE 转换。
  data = JSON.stringify(data)

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',

      /**
       * `data` 是作为请求主体被发送的数据。
       *  sign  此参数对应上述救命中生成的签名值。
       */
      data: stringify({
        data: data,
        sign: '037d3f060c6c78e833ed3b6edd706cfe'
      }),
    }).then(response => {
      //   let data = response.data
      resolve(response.data)

    }).catch(error => {

      console.log('封装主入口-->')
      console.log(error)
      reject(error)
    })
  })
}

export const postApi = (url, params) => {
  return axios.post(url, stringify(params)).then((res) => {
    return res
  })
}