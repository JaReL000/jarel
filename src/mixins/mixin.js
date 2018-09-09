import {
  DataLength
} from 'utils/validate'
import i18n from 'utils/i18n'
import CryptoJS from 'utils/aes.js'
import md5 from 'md5'

// 应用宝下载链接
const downloadAPP = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core"
const mUrl = "https://m.jinr.com/#/register"

let fromUrl = process.env.NODE_ENV == 'dev' ? 'vip.dev.jinr.com' : window.location.hostname
// 'vip.dev.jinr.com' : 'vip.jinr.com'
// let fromUrl = 'vip.dev.jinr.com'
// const fromUrl = window.location.hostname

let vipUrl = window.location.host + '/pc' // 区分pc给后台接口

const fromId = '309784179' //MVIP专用
const m_front_secret_key = 'jr_m_!@309784179' //验证加密

/**
 * 处理签名
 * @param {* Object} data 
 */
function signFun(data) {
  let fromDataStr = '';
  for (let val in data) {
    if (data[val] !== '') {
      fromDataStr += (val + '=' + decodeURIComponent(data[val]))
    }
  }

  let sign = md5(md5(fromDataStr) + md5(m_front_secret_key))
  return sign.toUpperCase()
}

/**
 * 
 * @param {*} title 页面title
 * @param {*} bool  是否截取字符串
 */
function changeTitle(title, bool) {
  bool = bool || true
  // 截取字符处理
  if (true) {

    let lengthMax = isIOS ? 12 : 16
    let num = DataLength(title)
    if (num > lengthMax) {
      title = title.substring(0, lengthMax) + '...'
    }
    // console.log(num, title);
  }

  document.title = title;

  // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
  // if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {

  // }

  let hackIframe = document.createElement('iframe');
  hackIframe.style.display = 'none';
  hackIframe.src = '/test.html?r=' + Math.random()
  // if(process.mFormalDomain===location.hostname){

  // }else{
  //   hackIframe.src = '/m/3.0/test.html?r=' + Math.random();
  // }


  // let d = ()=> {
  //   setTimeout(()=> {
  //     hackIframe.removeEventListener('load', d);
  //     document.body.removeChild(hackIframe);
  //   }, 0);
  // };
  // hackIframe.addEventListener('load', d);
  // document.body.appendChild(hackIframe);

  document.body.appendChild(hackIframe);
  setTimeout(() => {
    document.body.removeChild(hackIframe)
  }, 300)
}

function isIOS() {
  return navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}



export default {
  data() {
    return {
      downloadAPP,
      mUrl,
      productId: {
        1: '活期',
        2: '年定期',
        3: '保险箱',
        4: '日增息',
        5: '周周盈',
        6: '月定期',
        7: '季定期',
        8: 'VIP年定期',
      },
      m_front_secret_key,
      fromUrl,
      fromId,

    }
  },
  // watch: {
  //   '$route': 'fetchData'
  // },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.$root.title = to.name
    next()
  },

  created() { },
  methods: {
    changeTitle,
    encrypt(data) {
      // var data="test123456";//加密字符串
      // var key = CryptoJS.enc.Latin1.parse('@12345678912345!');//密钥
      // var iv = CryptoJS.enc.Latin1.parse('@12345678912345!');//与密钥保持一致
      var key = CryptoJS.enc.Latin1.parse(this.m_front_secret_key); //密钥
      var iv = CryptoJS.enc.Latin1.parse(this.m_front_secret_key); //与密钥保持一致
      //加密
      data = JSON.stringify(data); //将数据对象转换为json字符串
      var encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
      // encrypted =  escape(encrypted); // 废弃
      encrypted = encodeURIComponent(encrypted);
      // console.log(encodeURI(encrypted),'----');
      // console.log(encodeURIComponent(encrypted),'----');
      // console.log(escape(encrypted),'----');
      return encrypted
    },

    fetchData() {

    },
    changeI18n(val) {
      return i18n[val]
    },
    getToken() {
      return this.$root.appData.token
      // if(!sessionStorage.getItem('token')){
      //   return JSON.parse(this.$root.token).token
      // }
      // return this.$root.token
    },
    /**
     * 跳转方法
     * @param path
     * @param query
     * @returns {*}
     * @author weizihua
     */
    routerPush(path, query, name) {
      // console.log(path, query, name);

      if (path) {
        this.$router.push({
          path: path,
          query: query,
          name: name,
        })
      }
    },
    routerReplace(path, query, name) {
      this.$router.replace({
        path: path,
        query: query,
        name: name,
      })
    },
    goToUrl(url) {
      let bool = !/http/.test(url)
      if (bool) {
        this.$router.push(url)
      } else {
        window.location = url
      }

      return
      // url = 'http://blog.csdn.net/geyu8476771/article/details/53258932'
      if (validateURL(url)) {
        window.location = url
        return
      }

      this.$flash(`${url}---不合法`)

    },
    buildBackgroundUrl(url) {
      let ishttps = 'https:' == document.location.protocol ? true : false;
      if (ishttps) {
        url = url.replace("http:", "https:");
      }
      return `url(${url})`
    },

    buildUrl(url) {
      let ishttps = 'https:' == document.location.protocol ? true : false;
      if (ishttps) {
        url = url.replace("http:", "https:");
      }
      return url
    },
    prompt() {
      this.$flash("请移步鲸鱼app进行此项操作")
    },
    isIOS,

    // 4.1.0 设置title
    setTitleText(title) {
      if (title) {
        this.$root.title = title
      } else {
        this.$root.title = this.$router.name
      }
    },
    // 判断是移动端还是pc端
    getEnter(callback) {
      // 判断是否是手机访问
      var browser = {
        versions: (function () {
          var u = navigator.userAgent;

          return {
            trident: u.indexOf("Trident") > -1, //IE内核
            presto: u.indexOf("Presto") > -1, //opera内核
            webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
            gecko: u.indexOf("Firefox") > -1, //火狐内核Gecko
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android
            iPhone: u.indexOf("iPhone") > -1, //iPhone
            iPad: u.indexOf("iPad") > -1, //iPad
            webApp: u.indexOf("Safari") > -1 //Safari
          };
        })()
      };

      if (
        browser.versions.mobile ||
        browser.versions.ios ||
        browser.versions.android ||
        browser.versions.iPhone ||
        browser.versions.iPad
      ) {
        typeof callback === 'function' ? callback() : ''
        // alert("移动端");
      }
      console.log('browser', browser)
    },
    RefreshUp(idName,callback,isAuto) {
      console.log('调用成功')
      // 下拉初始化
      var _this = this;
      let resf = new MiniRefresh({
        container: idName,
        down: {
          callback: function () { },
          isLock: true // 锁定下拉刷新
        },
        up: {
          callback:callback,
          isAuto: isAuto!=='undefine' ? true : isAuto
          // loadFull:{  //是否开启满屏加载
          //   isEnable:false,
          //   delay:1000
          // }
        },
        isScrollBar: false
      });
      return resf
    }
  }
}

export {
  changeTitle,
  m_front_secret_key,
  downloadAPP,
  mUrl,
  fromUrl,
  vipUrl,
  fromId,
  getEnter,
  signFun
}