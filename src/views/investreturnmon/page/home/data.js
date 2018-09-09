export default {
  combinationId: '',
  turnCombinationId: '',
  isShowCoupon: null,
  publicData: {//倒计时
    deadTime: 0,
    day: null,
    hour: null,
    min: null,
    sec: null
  },
  appShareConfig:{
    imgUrl:'',
    text:'',
    title:'',
    url:''
  },
  rollDataList:[
    // {mobile: '180****5252', money: 25, time: '刚刚'},
    // {mobile: '180****9999', money: 12, time: '04/10 20:20'}
  ],//顶部轮播数据
  moneyRate:{//利率
    currentRate: '',
    monRate: '',
    quaRate: '',
    yearRate: ''
  },
  log: false,
  end: true,
  hadGiveMOn: null,//头部已发放现金数
  moneyGetLog: false,//是否有返现记录
  logList: [
    // {productName: '月定期', money: 2000, time: '01/09 23:00', cash: 1.96},
  ],//返现记录
  myMoney: 0,//我得现金
}