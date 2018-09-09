import axios from './service'
import { stringify } from 'qs'

// 封装请求
export default function fetch(data, sign) {
  sign = sign || ''
  data = data || {}

  data['v'] = '103' //接口版本 100
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
   params = params ? Object.assign(params,getUrl()) : getUrl()

  console.log('..xxxx..', params)
  return axios.post(url, stringify(params)).then((res) => {
    return res
  })
}




function getUrl(){
  var kstr,vstr;
  var url1=location.href;
  var url="?"+url1.split('?')[1]
  var url2=url.split('#')[0]
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url2.indexOf("?") != -1) {
    var str = url2.substr(1);
    var strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      var idx=strs[i].indexOf('=')
      if(idx>=0){
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].substr(idx+1));
      }else{

      }
    }
  }
  return theRequest;
}