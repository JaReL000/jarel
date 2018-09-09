<template>
<div class="turn-in" v-if="show">
  <!-- 周周盈专用 -->
  <div 
    class="week" 
    v-if="productid==='5'"
  >
    <h2
      v-if="product.is_take_day"
    >今天为转出日，还可免费转出<span v-text="product.take_times"></span>次</h2>
    <h2
      v-if="!product.is_take_day"
    >今天为非转出日，使用火箭券转出</h2>
    <!-- 转入 选择卡券 -->
    <div 
      class="card" 
      @click="goToCouponList"
      v-if="!product.is_take_day"
    >
      <span  class="span1">卡券</span>
      <span 
        class="span2" 
        :class="{h: !enableTotal}"
        v-text="selectedName || '暂无可使用卡券'"
      ></span>
    </div>
    
  </div>

  <!-- 主体区域 -->
  <number-keyboard
    :type="type"
    :money="money"
    :sumMax="parseFloat(product.take_money)"
    :moneyMin="product.money_min || 0.00"
    :moneyMax="product.take_money"
    :expectedTime="product.expected_time"
    :placeholder="placeholder"
    :product="product"
    :isOk="isOk"
    @confirmPayment="confirmPayment"
    @complete="complete"
    @onInputChange="onInputChange"
  ></number-keyboard>

  <!-- 密码输入键盘 -->
  <pay-keyboard
    :type="type"
    :money="money"
    :showKeyboard="showKeyboard"
    :payType="payType"
    :cuserid="cuserid"
    :payProductid="payProductid"
    :productid="productid"
    @closekeyBoardFun="closekeyBoardFun"
    @goToDone="goToDone"
  ></pay-keyboard>

  <!-- 卡券列表 -->
  <coupon-choice
    :showCoupon="showCoupon"
    :productid="productid"
    :money="(money)"
    :couponList="couponList"
    @selectNameFun="selectNameFun"
  ></coupon-choice>

  <!-- 路由组件 -->
  <router-view 
    :productid="productid"
    :money="parseFloat(money)"
    :orderList="orderList"
  ></router-view>
</div>
</template>

<script>
import PayList from './pay-list'
import CouponChoice from './coupon-choice'

import NumberKeyboard from './number-keyboard'
import PayKeyboard from './pay-keyboard'

export default {
  components:{
    PayList,
    CouponChoice,
    NumberKeyboard,
    PayKeyboard
  },
  data(){
    return {
      show: false,
      type: 2, // 1转入 2转出 3充值  4提现
      agreement: true, //服务协议控制
      money: '', //用户输入的金额

      // 产品字段
      product: {
        money_min: '0.00', //最小购买金额
        money_max: '0.00', //还可购买金额
        sum_max: '', //最高限额   
        expected_time: '',	 //预计收益时间 
        take_money: '0.00'	  
      },
       
      // 支付键盘
      showKeyboard: false,
      payType: null,
      payProductid: null, //产品类型id

      // 订单
      orderList: [],
      placeholder: '',
      dataOut:{
        // 转出
        // "take_money": "1,800.00",//转出最大金额
        // "check_out_day": 0,//是否检查转出日   0  不检查
        // "is_take_day": 0,//是否转出日
        // "take_times": 0,//可转出次数
        // "lock_principal": '1.00',// 冻结金额 没有为0.00
        // "lock_reason": "转入中待计息的金额1.00不可转出(2017-10-1解冻)",//冻结原因 没有为空
        // "product_name": "活期",//产品名
        // "productid": 1,//产品id
        // "profit_time": "2017-09-02 24:00:00",//预计到账时间
        // "content": "http://local.jinrapp.jinr.com/homeAssetDetail?id=1"//转出说明链接
      },

      // 卡券
      showCoupon: false, //显示卡券列表
      couponList: [],
      cuserid: 0,  //卡券id

      // 文案
      selectedName: '',
      enableTotal: 0, //可选几张
      
    }
  },
  computed: {
    // placeholder(){
    //   let m = this.money
    //   let mDef = `可转出金额${this.dataOut.unlock_principal}元`
    //   return ( m ? m : mDef)
    // },
    productid(){    
      return this.$route.params.productid
    },

    /**
     * 周周盈转出限制
     * isOk 是周周盈 => 非转出日且有卡券
     * 非周周盈为true
     */
    isOk(){
      if(this.productid==='5'){
        return ( this.product.is_take_day || this.cuserid )
      }
      
      return true
    },

  }, 
  created() {
    this.initFun()
    if(this.productid==='5'){
      this.welfareBestCoupon()
      this.selectCouponListFun()
    }
    
  },
  mounted(){
    // this.setWxOrderCacheData()
    // console.log( this.isOk);  
  },
  methods:{

    // 初始化请求
    initFun(){
      let params={
        servicename: 'api.assetTransaction',
        type: this.type || '',
        productid: this.productid || '', 
      }
      this.$http(params).then((res)=>{
        console.log(res);
        
        let title = res.product_name ?  res.product_name + "转出" : "转出"
        this.changeTitle(title)
         if(res===1000303){
          this.$messagebox({
            title: '实名认证' ,
            message: '为了保证您的资金安全，需要身份验证',
            showCancelButton: false,
            closeOnClickModal: false,
          }).then((action) => {
            if(action==='cancel'){
              // this.$router.go(-1)
            }else if(action==='confirm'){
              this.routerReplace('/certification')
            }
          });
        }
        
        this.product = res
        this.placeholder = `可转出金额${res.take_money?res.take_money: '0' }元`
        this.show = true
      }).catch((error)=>{
        this.placeholder = `可转出金额0.00元`
        this.show = true
      })
    },

    //最佳匹配卡券
    welfareBestCoupon(){ 
      //this.responseing = true //请求中

      this.$http({
        servicename : 'Welfare.bestCoupon',
        money: this.money || 50000,
        productid: this.productid  || '',
        action: 2,
      }).then((res)=>{
        console.log(res);
        
        this.enableTotal = res.enable_total
        this.selectedName = res.selected_name
      }).catch((error)=>{
        console.log(res.msg)
      });
    },

     //获取卡券列表数据
    selectCouponListFun(){ 
      //this.responseing = true //请求中
      let params = {
        servicename : 'Welfare.selectCouponList',
        money: this.money || 50000,
        productid: this.productid  || '',
        action: 2,
      }

      this.$http(params).then((res)=>{
        this.couponList = res.list
        let hasCoupon = `有${this.couponList.length}优惠券可用`
        this.selectedName = this.couponList.length ? hasCoupon : ''
      }).catch((error)=>{
        console.log(res.msg)
      });
    },


    // 前往选择卡券
    goToCouponList(){
      if(this.enableTotal){
        // this.$router.push(`${this.$route.path}/choice`)
        this.showCoupon = !this.showCoupon
      } 
    },

     // 选择卡券回调
    selectNameFun(index){
      if(index!==-1){
        this.couponList.forEach((value, index) => {
          
          value.select = false 
        });
        
        this.$set(this.couponList[index], 'select', true)
        this.selectedName = this.couponList[index].selected_name
        this.cuserid = this.couponList[index].cuserid
      }else{
        this.couponList.forEach((value, index) => {
          value.select = false 
        });
        this.selectedName = '不使用卡券'
        // this.enableTotal = 0
        this.cuserid = 0
      }
      this.showCoupon = !this.showCoupon
      
    },

    // 键盘回收触发
    complete(){
      console.log('键盘回收触发');
    },

    // 确定转入 调出支付列表
    confirmPayment(){
      this.showKeyboard = true 
    },

    // 键盘回收 键盘数字回调
    onInputChange(val){
      let bool = parseInt(val) > this.product.sum_max
      if(bool){
        this.money = this.product.sum_max
        return
      }
      this.money = val    
    },

    // 关闭支付键盘
    closekeyBoardFun(bool){
      this.payIndex = null
      this.payType = null
      this.showKeyboard = bool
    },

    // 微信支付跳转
    setWxOrderCacheData(){
      let params={
        servicename : 'wxPay.getWxOrderParams',
        type: this.$route.query.type  || '',
      }

      this.$http(params).then((res)=>{
        let url ={
          // token: '',
          money: this.money,
          // passwd: '',
          // platform: '',
          cuserid: this.cuserid, //卡券id
          event_ref_id: '',
          pay_type: this.payType,
          src_ref_id: this.payProductid,
          productid: this.productid,
          // openid: '',
          redirectUrl: document.location.href, //本页url
        }
        
        let urlHref = `${res.orderFields.redirectUrl}/?${this.urlEncode(url)}`
        console.log(urlHref);
        window.location.href = urlHref

      }).catch(function(error){
        console.log(res.msg)
      });
    },

    /** 
     * param 将要转为URL参数字符串的对象 
     * key URL参数字符串的前缀 
     * encode true/false 是否进行URL编码,默认为true 
     * return URL参数字符串 
     */  
    urlEncode(param, key, encode) {  
      if(param==null) return '';  
      var paramStr = '';  
      var t = typeof (param);  
      if (t == 'string' || t == 'number' || t == 'boolean') {  
        paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);  
      } else {  
        for (var i in param) {  
          var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);  
          paramStr += this.urlEncode(param[i], k, encode);  
        }  
      }  

      return paramStr.substr(0, paramStr.length);  
    },

    // 跳转至结果页
    goToDone(list){
      this.orderList = list
      this.$router.replace(`${this.$route.path}/Done`)
    },

    // 选择卡券回调
    selectNameFun(index){
      if(index!==-1){
        this.couponList.forEach((value, index) => {
          
          value.select = false 
        });
        
        this.$set(this.couponList[index], 'select', true)
        this.selectedName = this.couponList[index].selected_name
        this.cuserid = this.couponList[index].cuserid
      }else{
        this.couponList.forEach((value, index) => {
          value.select = false 
        });
        this.selectedName = '不使用卡券'
        // this.enableTotal = 0
        this.cuserid = 0
      }
      this.showCoupon = !this.showCoupon
      
    },
    

  }
}
</script>

<style lang="stylus" >
.turn-in
  .week 
    margin-bottom 20px
    line-height @height
    text-align center
    font-size 32px
    color #333333
    h2
      height 100px
      line-height @height
      margin-bottom 15px
      background-color #fff
      span 
        color #187ee7
    .card
      line-height 69px
      padding-left 32px
      font-size 30px
      overflow hidden
      background-color #fff
      margin-bottom 30px
      .span1
        float left
        padding-left 46px
        color #333333
        background-image url("../assets/cardicon.png")
        background-position left 18px
        background-repeat no-repeat
        background-size 34px 26px
      .span2
        float right
        padding-right 37px
        background-image url("../assets/arowright.png")
        background-position right 17px
        background-repeat no-repeat
        background-size 17px 30px
        margin-right 13px
        color #F03C3C
        &.h 
          color #b3b3b3
  .investcontent
    padding 11px 30px
    .explain
      line-height 40px
      font-size 28px
      color #999999
    .invest-confirm
      padding-top 50px
      button
        width 100%
        height 96px
        border-radius 10px
        background #CCCCCC
        border none
        color #ffffff
        font-size 32px
      button.agreexy
        background #0C72E3
      .fwxy
        line-height 60px
        color #333333
        font-size 18px
        .xesm
          float right
        .agreebtn
          display inline-block
          width 22px
          height 22px
          background-image url("../assets/xybtn0.png")
          background-repeat no-repeat
          background-size 100% 100%
          margin-right 10px
          position relative
          top 2px
        .agreebtnyes
          background-image url("../assets/xybtn1.png")
          background-repeat no-repeat
          background-size 100% 100%
        a
          color #0C72E3
      

</style>

