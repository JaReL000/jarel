/**
 * Created by zi on 2017/4/23.
 * 鲸鱼工具方法
 */

export function saveToLocal (id, key, value) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
};

function onBridgeReady(){
  WeixinJSBridge.call('hideOptionMenu');
}

export function JrWxProhibitSharing() {
  if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  }else{
    onBridgeReady();
  }
}

// 获取url的参数
export function getRequest(dataUrl) {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
  }
  return dataUrl ? theRequest[dataUrl] : theRequest;
}


export function initGetUrl(host) {
  // hbjr.jinrgame.com
  return 'http://'+host+'/YuanXiao/getData'
}

// 一分钟倒计时
export function oneMinuteountdown() {
  var res = {};

  return res;
}

// 测试方法
export function test(val='jinr') {
  var res = val;

  return res;
}

// 生成指定位数的随机整数
export function randomNum (n){
  var t='';
  for(var i=0;i<n;i++){
    t+=Math.floor(Math.random()*10);
  }
  return t;
}

// 生成指定范围内的随机整数
export function randomNumRange(minNum, maxNum){

  switch(arguments.length){
    case 1:
      return parseInt(Math.random()*minNum+1);
      break;
    case 2:
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum);
      break;
    default:
      return 0;
      break;
  }
}

// 随机数
export function ran() {
  // let result1 = Math.floor(Math.random() * (5) + 5);
  /*result = Math.round(Math.random()*10);*/
  /*   0~10   */
  //Math.floor(n); 返回小于等于n的最大整数。
  let result = Math.floor(Math.random() * (9) + 1);
  console.log('----------------'+result)
  /*   0~9   */
  /*result = Math.ceil(Math.random()*10);*/
  /*   1~10   */
  return result;
}


export function versions() {
  var browser = {
    versions : function() {
      var u = navigator.userAgent;
      return {//移动终端浏览器版本信息
        trident : u.indexOf('Trident') > -1, //IE内核
        presto : u.indexOf('Presto') > -1, //opera内核
        webKit : u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile : !!u.match(/AppleWebKit.*Mobile.*/)
        || !!u.match(/AppleWebKit/), //是否为移动终端
        ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone : u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad : u.indexOf('iPad') > -1, //是否iPad
        webApp : u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部
        google : u.indexOf('Chrome') > -1
      };
    }(),
    language : (navigator.browserLanguage || navigator.language)
      .toLowerCase()
  }
  document.writeln("语言版本: " + browser.language);
  document.writeln(" 是否为移动终端: " + browser.versions.mobile);
}

export function directRightUrl () {
  let paths = window.location.href.split('#')
  paths[1] = paths[1] || '/'
  // 老式的#!分隔跳转
  if (paths[0].charAt(paths[0].length - 1) !== '?') {
    paths[0] = `${paths[0]}?`
  }
  if (paths[1].charAt(0) === '!') {
    paths[1] = paths[1].substr(1)
  }
  let url = `${paths[0]}#${paths[1]}`
  if (window.location.href !== url) {
    window.location.href = url
  }
}

export function investRate(str){
  str = str.substr(str.length-1, 1)

}




