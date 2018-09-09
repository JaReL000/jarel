/**
 * 复杂传参方法
 *
 */

import Flash from '../components/flash/index.js'
import MsgBox from '../components/msg-box/index.js'
import Share from '../components/share/index.js'

const u = navigator.userAgent
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

// 当前版本号
let nowVersion = 431

let i18n = {
  'ReferenceError: Jinr is not defined': '不在APP环境',
  "TypeError: Cannot read property 'messageHandlers' of undefined": 'WKWebView 不识别'
}

/**
 * 获取token
 * @author 1154 1504
 */
function initSDKFun() {
  let token = ''
  // 尝试调用Jinr 调用版本4.0(全) 4.1(全) 4.2(安卓)
  try {
    token = Jinr.getToken()
    return JSON.parse(token)

  } catch (error) {
    console.log(appData.isBug);

    // appData.isBug ? Flash(i18n[error]) : ''

    // IOS 下 WKWebview
    // try {
    //   window.webkit.messageHandlers.getToken.postMessage(null);
    //   return
    // } catch (error) {
    //   Flash(i18n[error])
    // }

    token = sessionStorage.getItem('token') || ''
    let isShowLogin = sessionStorage.getItem('token') ? false : true
    return {
      isShowLogin: isShowLogin,
      token: token,
    }
  }
}

// 初始化数据
let appData = {
  v: '', //接口的升级通过版本来号区别。如：3.6.3
  appid: '', //应用标识
  app_v: '', //APP 版本号
  token: '', //有则返回用户Token,无则返回“ ”,
  platform: '', //操作平台 3-IOS|4-Android
  longitude: '', //经度
  latitude: '', //纬度
  // version: '',  //整数APP版本号
  isShowLogin: false,
  isAPP: false,
  isBug: process.env.NODE_ENV !== 'dev' || false,
}
appData = initSDKFun()
// Flash('-' + appData.app_v)
// appData._version = appData.app_v ?  parseFloat(appData.app_v.replace('.', '').replace('.', '')) : 410
appData.isAPP = ((appData.platform == "3") || (appData.platform == "4"))
appData.isBug = false
let platform = isiOS ? "3" : "4"



export default {
  // 属性
  // v: appData.v || '',  //接口的升级通过版本来号区别。如：3.6.3
  // appid: appData.appid || '',  //应用标识
  // app_v: appData.app_v || '',  //APP 版本号
  // token: appData.token || '',  //有则返回用户Token,无则返回“ ”,
  // platform: appData.platform || platform, //操作平台 3-IOS|4-Android
  // longitude: appData.longitude || '', //经度
  // latitude: appData.latitude || '', //纬度
  // // version: appData._version || '',  //整数APP版本号
  isShowLogin: appData.isShowLogin || false,
  isAPP: appData.isAPP || false,
  isBug: appData.isBug || false,
  get v() {
    return !!appData.v ? appData.v : initSDKFun().v
  },
  get appid() {
    return !!appData.appid ? appData.appid : initSDKFun().appid
  },
  get app_v() {
    return !!appData.app_v ? appData.app_v : initSDKFun().app_v
  },
  get token() {
    // Flash('触发了get')
    return !!appData.token ? appData.token : initSDKFun().token
  },
  get platform() {
    return !!appData.platform ? appData.platform : initSDKFun().platform
  },
  get longitude() {
    return !!appData.longitude ? appData.longitude : initSDKFun().longitude
  },
  get orderId(){
    try {
      return JSON.parse(Jinr.getOrderId()).orderId
    } catch (error) {
      // this.$flash(`orderId获取失败：${error}`)
    }
  },
  isiOS,
  /**********************/
  _version() {
    try {
      let token = Jinr.getToken()
      let version = JSON.parse(token).app_v
      // Flash(version +  ' d')
      return version ? parseFloat(version.replace('.', '').replace('.', '')) : nowVersion
    } catch (error) {
      // Flash(error)
      return nowVersion
    }
  },
  /**
   * 跳转入
   * 所有参数必须是string类型
   * @author 1154 1504
   * @param {*} productId  产品ID
   * @param {*} productName  产品名字，必要参数
   * @param {*} productTypeId 产品类型ID
   * @param {*} fromPage  从哪个页面跳转过来的 1-首页 2-资产页 3-详情页  4-活动页
   * @param {*} eventRefId 活动事件ID,活动的页面点击的时候传，其余默认为“0”    //g 即活动的combinationId，但注意必须是未加密的，可以直接转换成init类型
   * @param {*} couponId 卡券id（4.1.0）
   * @param {*} couponName 卡券名称（4.1.0）
   * @param {*} isShowCoupon 是否显示选择卡券 “0”为不显示，“1”显示（4.2.0）
   *
   */
  pushProductTurnIn(productId, productName, productTypeId, fromPage, eventRefId, couponId, couponName, isShowCoupon) {
    if(productId instanceof Object){ //可以传对象
     var {productId, productName, productTypeId, fromPage, eventRefId, couponId, couponName, isShowCoupon} = productId
    }
    productId = String(productId);
    productName = String(productName);
    productTypeId = String(productTypeId);
    fromPage = String(fromPage);
    eventRefId = String(eventRefId);
    couponId = String(couponId);
    couponName = String(couponName);
    isShowCoupon = String(isShowCoupon);
    console.log('--进来了')
    // if (!this._isStringFun(productId) ||
    //   !this._isStringFun(productName) ||
    //   !this._isStringFun(productTypeId) ||
    //   !this._isStringFun(fromPage) ||
    //   !this._isStringFun(eventRefId) ||
    //   !this._isStringFun(couponId) ||
    //   !this._isStringFun(couponName) ||
    //   !this._isStringFun(isShowCoupon)
    // ) {
    //   this.$flash('参数类型错误，必须为String')
    //   return
    // }
    // Flash(this._version())
    // return
    // 4.0版本
    if (this._version() == 402 || this._version() == 401 || this._version() == 400) {
      // console.log('--进来了2')
      try {
        Jinr.pushProductTurnIn(
          productId,
          productName,
          productTypeId,
          fromPage,
          eventRefId
        )
      } catch (error) {
        appData.isBug ? this.$flash(i18n[error]) : ''

      }
      // 4.1版本
    } else if (this._version() == 410) {
      try {
        Jinr.pushProductTurnIn(
          productId,
          productName,
          productTypeId,
          fromPage,
          eventRefId,
          couponId,
          couponName
        )
      } catch (error) {
        appData.isBug ? this.$flash(i18n[error]) : ''

      }
      // 4.2版本
    } else if (this._version() >= 420) {
      try {
        Jinr.pushProductTurnIn(
          productId,
          productName,
          productTypeId,
          fromPage,
          eventRefId,
          couponId,
          couponName,
          isShowCoupon
        )
      } catch (error) {
        this.isBug ? this.$flash(i18n[error]) : ''

      }
    }
  },


  /**
   * 跳转至登录界面
   * @author 1154 1504
   * return loginState  “0”/“1” “0”,表示未登录,“1”表示已登录
   */
  pushLogin() {
    try {
      let loginState = Jinr.pushLogin()
      return loginState
    } catch (error) {
      this.isBug ? this.$flash(i18n[error]) : ''
    }
  },

  /**
   * 跳转到注册界面 4.1
   * @author 7175 1504
   * return loginState  “0”或“1” ;  “0”,表示未登录,“1”表示已登录
   */
  pushRegister() {
    try {
      let loginState = Jinr.pushRegister()
      return loginState
    } catch (error) {
      this.isBug ? this.$flash(i18n[error]) : ''
    }
  },
 /**
  * 跳转到收货地址页面
  */
  pushAddress(){
    try {
      Jinr.pushAddress()
    } catch (error) {
      this.$flash(`跳转失败，error:${error}`)
    }
  },

  /**
   * 跳转日增息/保险箱 资产页面
   * @param {*} productName  产品的名字，只能是（日增息/保险箱）
   * @param {*} productId    产品的ID，只能是日增息(4)/保险箱(3)的ID
   */
  pushOtherAssets(productName,productId){
    if(productName !== '日增息'&& productName !== '保险箱'){
      this.$flash('产品名称只能是日增息/保险箱')
      return
    }
    if(productId!=4&&productId!=3){
      this.$flash('产品id只能为3或者4')
      return
    }
    try {
      Jinr.pushOtherAssets(String(productName),String(productId));
    } catch (error) {
      this.$flash(`跳转错误${error}`)
    }
  },

  /**
   * 打电话
   * @author 7175 1504
   * @param {*} phoneNumber 电话号码
   */
  call(phoneNumber) {
    if (!this._isStringFun(phoneNumber)) {
      this.$flash('参数错误')
      return
    }
    try {
      Jinr.call(phoneNumber)
    } catch (error) {
      this.isBug ? this.$flash(i18n[error]) : ''
    }
  },

  /**
   * 保存图片
   * @author 1154 1504
   * @param {*} url 图片的绝对地址
   */
  savePhoto(url) {
    if (!this._isStringFun(url)) {
      this.$flash('参数错误')
      return
    }
    try {
      Jinr.savePhoto(url)
    } catch (error) {
      this.isBug ? this.$flash(i18n[error]) : ''
    }
  },

  /**
   * 选择卡券
   * @author 7175 1504
   * @param {*} couponName 卡券名字
   * @param {*} couponId 卡券id
   * @param {*} couponType 卡券类型
   * @param {*} couponMoney 满足卡券使用条件的金额
   * @param {*} index 选择卡券的下标,不选择默认为“-1”
   */
  selectCoupon(couponName, couponId, couponType, couponMoney, index) {
    if (!this._isStringFun(couponName) ||
      !this._isStringFun(couponId) ||
      !this._isStringFun(couponType) ||
      !this._isStringFun(couponMoney) ||
      !this._isStringFun(index)
    ) {
      this.$flash('参数错误')
      return
    }
    try {
      Jinr.selectCoupon(couponName, couponId, couponType, couponMoney, index)
    } catch (error) {
      this.isBug ? this.$flash(i18n[error]) : ''
    }
  },

  /**
   * 分享
   * @author 1154 1504
   * @param {*} shareType 分享类型参数,"0"是图片分享,"1"是活动分享,不能为空
   * @param {*} type 分享位置参数,"0"是微信好友分享,"1"是微信朋友圈分享,不能为空
   * @param {*} imageUrl 享图片时,图片的Url,分享活动时,分享卡片的小图Url,不能为空
   * @param {*} text 分享的文案,不能为空
   * @param {*} title 分享的标题,不能为空
   * @param {*} url 分享活动时,活动的网站链接地址,分享图片的时候可以为空字符串
   */
  showShare(shareType, imageUrl, text, title, url) {
    console.log(shareType, imageUrl, text, title, url);

    if (!this._isStringFun(shareType) ||
      !this._isStringFun(imageUrl) ||
      !this._isStringFun(text) ||
      !this._isStringFun(title) ||
      !this._isStringFun(url)
    ) {
      this.$flash('参数错误')
      return
    }

    Share({
      title: '',
      message: '',
      showCancelButton: false,
      showConfirmButton: false,
      closeOnClickModal: true,
    }).then((action) => {
      if (action === 'cancel') {
        console.log('cancel');
        try {
          // Jinr.showShare(shareType, type, imageUrl, text, title, url)
          Jinr.showShare(shareType, '0', imageUrl, text, title, url)
        } catch (error) {
          this.isBug ? this.$flash(i18n[error]) : ''
        }

      } else if (action === 'confirm') {
        console.log('confirm');
        try {
          Jinr.showShare(shareType, '1', imageUrl, text, title, url)
        } catch (error) {
          this.isBug ? this.$flash(i18n[error]) : ''
        }
      }
    });


  },

  /**
   * 日增息和保险箱的转让
   * @author 7175 1504
   * @param {*} moneyId 资产id
   * @param {*} productId 产品id
   */
  transfer(moneyId, productId) {
    if (!this._isStringFun(moneyId) ||
      !this._isStringFun(productId)
    ) {
      this.$flash('参数错误')
      return
    }
    try {
      Jinr.transfer(moneyId, productId)
    } catch (error) {
      this.isBug ? this.$flash(i18n[error]) : ''
    }
  },

  /**
   * 日增息和保险箱的转让
   * @author 1154 1504
   * @param {*} orderid 撤销转让订单ID
   */
  undoTransfer(orderid) {
    if (!this._isStringFun(orderid)) {
      this.$flash('参数错误')
      return
    }
    try {
      Jinr.undoTransfer(orderid)
    } catch (error) {
      this.isBug ? this.$flash(i18n[error]) : ''
    }
  },


  /**
   * 添加数据埋点
   * @author 7175 1504
   * @param {*} placeCode 位置编号  参见文档《埋点统计 2017-10-28.xlsx》
   * @param {*} productId 产品ID  有产品ID就传否则传0
   */
  addBuried(placeCode, productId) {
    if (!this._isStringFun(placeCode) ||
      !this._isStringFun(productId)
    ) {
      this.$flash('参数错误')
      return
    }
    try {
      Jinr.addBuried(placeCode, productId)
    } catch (error) {
      this.isBug ? this.$flash(i18n[error]) : ''
    }
  },

  /**
   * 拷贝文本到剪切板
   * @author 7175 1504
   * @param {*} content 需要拷贝的字符串数据
   */
  copy2Clipboard(content) {
    if (!this._isStringFun(content)) {
      this.$flash('参数错误')
      return
    }
    try {
      Jinr.copy2Clipboard(content)
    } catch (error) {
      this.isBug ? this.$flash(i18n[error]) : ''
    }
  },

  /**
   * 跳转到绑卡界面 4.1
   * 此方法增加绑卡状态返回值用于Web端点击跳转至绑卡界面的交互判断,
   * 如Web端调用此方法，
   * 返回值为"1",则需要重新加载界面,"0"和"-1"状态目前暂无需进行别的操作。
   * @author 7175 1504
   * return bindState  "1" : 表示已经绑卡状态;  "0" : 表示还未绑卡状态;  “-1” : 表示未登录状态;
   */
  pushBindCard() {
    try {
      let bindState = Jinr.pushBindCard()
      return bindState
    } catch (error) {
      this.isBug ? this.$flash(i18n[error]) : ''
    }
  },

  /**
   * 修改续投状态（4.1.0增加）
   * @param {*} moneyId  金额ID
   * @param {*} status 续投状态值
   * @param {*} moneyContent 金额内容
   */
  changeContinueStatus(moneyId, status, moneyContent) {
    if (!this._isStringFun(moneyId) ||
      !this._isStringFun(status) ||
      !this._isStringFun(moneyContent)
    ) {
      this.$flash('参数错误')
      return
    }
    try {
      Jinr.changeContinueStatus(moneyId, status, moneyContent)
    } catch (error) {
      this.isBug ? this.$flash(i18n[error]) : ''
    }
  },

  // 检测是否是字符串
  _isStringFun(str) {
    return typeof str === 'string';
  },

  /**
   * 小弹窗
   * @param {*} str
   */
  $flash(str) {
    Flash(str)
  },

  /**
   *
   * 大弹窗
   * @author 7043
   * @param {*} title 标题
   * @param {*} message 文本内容
   * @param {*} callbackCancel 取消回调
   * @param {*} callbackConfirm 确认回调
   * @param {*} showCancelButton 显示取消按钮
   * @param {*} showConfirmButton 显示确认按钮
   * @param {*} closeOnClickModal 消息框在点击模式时会关闭
   */
  $msgBox(title, message, callbackCancel, callbackConfirm, showCancelButton, showConfirmButton, closeOnClickModal) {
    MsgBox({
      title: title,
      message: message,
      showCancelButton: showCancelButton,
      showConfirmButton: showConfirmButton,
      closeOnClickModal: closeOnClickModal,
    }).then((action) => {
      if (action === 'cancel') {
        callbackCancel("cancel")
      } else if (action === 'confirm') {
        callbackConfirm('confirm')
      }
    });
  },
  // 获取url上的所有的查询参数，返回一个对象
  getUrl() {
    var kstr, vstr;
    var url1 = location.href;
    var url = "?" + url1.split('?')[1]
    var url2 = url.split('#')[0]
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url2.indexOf("?") != -1) {
      var str = url2.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        var idx = strs[i].indexOf('=')
        if (idx >= 0) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].substr(idx + 1));
        } else {

        }
      }
    }
    return theRequest;
  }
}
