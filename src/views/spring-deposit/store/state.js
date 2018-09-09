const state = {
  // 用户帮助打了多少元气
  userVitalityNum: 0,
  // 活动ID
  combinationId: '',
  // 抽到奖后，弹框显示奖品信息的弹窗需要使用到的当前抽到的奖品id
  currentPrizeIndex: 0,
  // 微信分享配置
  shareConfig: null,
  // 遮罩层显示后，要弹出的弹窗的名称
  popName: '',
  // 活动结束时间
  gameOverTimes: 0,
  // 当前时间，打开页面时的 时间
  nowTime: Date.now(),
  // app 版本
  version: 410
}

export default state
