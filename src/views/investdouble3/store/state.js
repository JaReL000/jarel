const state = {
  // 遮罩层显示后，要弹出的弹窗的名称
  popName: '',
  // 活动结束时间
  gameOverTimes: 0,
  // 当前时间，打开页面时的 时间
  nowTime: Date.now(),
  // app 信息对象
  appData: {
    token: '',
    platform: '',  // 操作平台 3-IOS|4-Android
    v: '',  // 接口的升级通过版本来号区别。如：3.6.3
    appid: '',  // 应用标识
    app_v: '4.1.0',  // APP 版本号
    longitude: '',  // 经度
    latitude: '',  // 纬度
    sign: ''  // 暂不使用
  },
  // app 版本号
  appVersion: 410
}

export default state
