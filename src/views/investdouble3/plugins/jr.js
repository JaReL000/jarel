import * as commonUrl from '../config/common'
import {urls as url} from '../config/project'
import flexible from './flexible'
// 设置rem
flexible()
// 配置url
const urls = Object.assign({}, commonUrl, url)

// 获取url中"?"符后面得字符串，并解析成为一个对象返回。
function getRequest () {
  // 获取url中"?"符后的字串
  const url = location.search
  const theRequest = {}
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].slice(strs[i].indexOf('=') + 1))
    }
  }
  return theRequest
}

// function getCookie (cName) {
//   let start = ''
//   let end = ''
//   if (document.cookie.length > 0) {
//     start = document.cookie.indexOf(cName + '=')
//     if (start !== -1) {
//       start = start + cName.length + 1
//       end = document.cookie.indexOf('', start)
//       if (end === -1) end = document.cookie.length
//       return unescape(document.cookie.substring(start, end))
//     }
//   }
//   return ''
// }

// 警告提示信息。
// 此元素插入到app元素之下，所以，此提示信息的样式，可以写在app.vue中。
// #warning{//...}
function warningInfo (text) {
  if (document.getElementById('warning') !== null) {
    return
  }
  let body = document.body
  let div = document.createElement('div')
  div.innerHTML = text
  div.setAttribute('id', 'warning')
  body.appendChild(div)
  setTimeout(function () {
    document.getElementById('warning').remove()
  }, 2000)
}

// 更新验证码
function upImgVerifyCode (id) {
  if (!id || typeof id !== 'string') {
    console.warn('upImgSms "id" is need a string')
    return
  }
  let $imgSms = document.getElementById(id)
  var src = $imgSms.src
  src = src.indexOf('?') !== -1 ? src.slice(0, src.indexOf('?') + 1) : src + '?'
  $imgSms.src = src + new Date().getTime()
}

// 通用的正则表达式
const regs = {
  tel: /^1[34578]\d{9}$/,
  verificaCode: /\d{6}/,
  pw: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,20}$/,       //  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  imgcode: /^(?![0-9]$)(?![a-zA-Z]$)[0-9a-zA-Z]{5}$/
}
// 轮播
// 使用方法，需要传入，列表的ID，列表父元素的ID。
const marquee = {
  innerBoxId: '',
  outBoxId: '',
  outBoxHeight: '',
  innerBoxHeight: '',
  listItemHeight: '',
  moveDistance: 0,
  isRuntime: false,
  $vue: null,
  playMessage () {
    const $ul = document.getElementById(marquee.innerBoxId)
    marquee.moveDistance -= marquee.listItemHeight
    if (Math.abs(marquee.moveDistance) + marquee.outBoxHeight > marquee.innerBoxHeight) {
      marquee.isRuntime = true
      marquee.$vue.isRuntime = marquee.isRuntime
      marquee.moveDistance = 0
      $ul.style.webkitTransform = 'translate3d(0px, ' + marquee.moveDistance + 'px, 0px)'
      $ul.style.transform = 'translate3d(0px, ' + marquee.moveDistance + 'px, 0px)'
      setTimeout(marquee.playMessage, 50)
    } else {
      marquee.isRuntime = false
      marquee.$vue.isRuntime = marquee.isRuntime
      $ul.style.webkitTransform = 'translate3d(0px, ' + marquee.moveDistance + 'px, 0px)'
      $ul.style.transform = 'translate3d(0px' + marquee.moveDistance + 'px, 0px)'
      setTimeout(marquee.playMessage, 1100)
    }
  },
  startPlay (innerBoxId, outBoxId, $vue) {
    marquee.innerBoxId = innerBoxId
    marquee.outBoxId = outBoxId
    marquee.$vue = $vue
    const $ul = document.getElementById(innerBoxId)
    marquee.innerBoxHeight = $ul.clientHeight
    marquee.listItemHeight = $ul.getElementsByTagName('dd')[0].clientHeight
    marquee.outBoxHeight = document.getElementById(outBoxId).clientHeight
    setTimeout(marquee.playMessage, 1100)
  }
}
let jr = {
  warningInfo,
  getRequest,
  regs,
  urls,
  upImgVerifyCode,
  marquee
}

function install (Vue) {
  // 配置跨组件事件传递插件
  jr.bus = new Vue()
  // 配置为vue实例插件
  Vue.prototype.jr = jr
}

export default install
