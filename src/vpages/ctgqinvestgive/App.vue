<template>
  <div class="investgive">
    <headers :title = "{name: '有球必应 有投必送 '}"></headers>
    <div class="hei_top"></div>
    <div class="investgive-bg1"></div>
    <div class="investgive-bg2">
      <!-- 倒计时 -->
      <div class="investgive-bg2_time">
        <div v-if="!end" class="active_count_down">剩余时间：
          <span v-text="publicData.day"></span>天
          <span v-text="publicData.hour"></span>时
          <span v-text="publicData.min"></span>分
          <span v-text="publicData.sec"></span>秒
        </div>
        <div v-if="end" class="active_end">活动已结束</div>
      </div>
      <div class="investgive-hb">已发放<span v-text="sentMoney"></span>元红包</div>
      <div class="newsList">
        <ul>
          <li v-for="(item,index) in newsList" :key="index"><span v-text="item.mobile"></span> 投<span v-text="item.productName"></span>得到了<span v-text="item.money" class="get_money"></span>元理财红包<span v-text="item.showTime"></span></li>
        </ul>
        <ul>
          <li v-for="(item,index) in newsList" :key="index"><span v-text="item.mobile"></span> 投<span v-text="item.productName"></span>得到了<span v-text="item.money" class="get_money"></span>元理财红包<span v-text="item.showTime"></span></li>
        </ul>
      </div>
    </div>
    <div class="investgive-bg3">
      <div class="investgive-bg3_year">
        <img src="./images/invest_button.gif" alt="" @click="getInvestFun('2','年定期')">
      </div>
      <div class="investgive-bg3_season">
        <img src="./images/invest_button.gif" alt="" @click="getInvestFun('7','季定期')">
      </div>
    </div>
    <div class="investgive-bg4">
      <div class="investgive-bg4_month">
        <img src="./images/invest_button.gif" alt="" @click="getInvestFun('6','月定期')">
      </div>
      <div class="investgive-bg4_week">
        <img src="./images/invest_button.gif" alt="" @click="getInvestFun('9','周定期')">
      </div>
    </div>
    <div class="investgive-bg5">
      <div class="investgive-bg5_invest" v-if="myGetMoney">
        <h6>累计领取：<span v-text="myGetMoney">52000.00</span>元</h6>
        <div class="inList">
        <ul>
          <li v-for="(invest,index) in investList" :key="index">
            <span v-text="invest.showTime"></span>   投<span v-text="invest.productName"></span>领取<span v-text="invest.money"></span>元理财红包</li>
        </ul>
        </div>
      </div>
      <div class="investgive-bg5_uninvest" v-else></div>
    </div>
    <div class="investgive-bg6"></div>
    <div class="investgive-bg7"></div>
    <alertReturn
      v-if="$root.alertGetMoney"
      :productId="$root.productId"
      :productName="$root.productName"
      :money="$root.money"
      @emitInvestes="emitInvestes"
    ></alertReturn>
  </div>
</template>

<script>
  import * as jrUrl from './urlconfig/urlconfig'
  import {getRequest,pattern} from './util/util'
  import Flash from '@/components/flash'
  import jinrsdk from 'src/jinr-sdk/index'
  import headers from './components/x-header'
  import alertReturn from './components/alertReturn.vue'
  export default {
    name: 'carrousel',
    components: {
      headers,
      alertReturn
    },
    data() {
      return {
        newsList:[],
        investList:[],
        end:false,
        publicData: {//倒计时
          deadTime: 0,
          day: null,
          hour: null,
          min: null,
          sec: null
        },
        login:"",//是否登录
        myInvestmentData:[],//我的投资金额列表
        sentMoney:"",//已发放金额
        myGetMoney:"",//我的投资金额
      }
    },
    computed: {
      token(){
        return this.$JinrSDK.token
      },
      orderId(){
        return this.$JinrSDK.orderId 
      },
      isShowCoupon() {
        return this.$JinrSDK.getUrl().isShowCoupon || "1";
      }
    },
    created(){
      this.data = getRequest()["data"];
      this.combinationId = getRequest()["combinationId"]; 
      this.getInitData()
      //  ios客户端 存在bug 返回时无法获取token
      if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        setTimeout(() => {
          this.token = this.$JinrSDK.token          
          this.orderId = this.$JinrSDK.orderId
          this.investAlert()
          }, 500);
        }else{
          this.investAlert()
      }
    },
    mounted() {},
    methods: {
      //初始化数据
      getInitData(){
        let params = {
          combinationId:this.combinationId,
          data:this.data
          // combinationId:"uIzcNadIkXC7VwYsDm8k3w==",
          // data:"+0A3aoqM7SURP0zhmMSE/baCl9HxQ4LS73oCXYU8LTGSZkyZw1HBcw=="
        }
        this.$http(jrUrl.productMessage,params).then(res=>{
          this.newsList = res.rollData//轮播数据
          this.sentMoney = res.allGetTotalMoney//已发放金额
          this.publicData.deadTime = res.countDownTime//倒计时
          this.investList = res.myRecordAwardData//我获得的金额列表
          this.myGetMoney = res.myGetTotalMoney//我获得的金额
          this.login = res.userLogin//是否登录
          this.activityid = res.activity_id//活动ID
          this.deadTime()
          if(res.userLogin === 0){
          // 未登录
          this.$root.log = false
          }else if(res.userLogin === 1){
            this.$root.log = true
          }
          if(res.countDownTime<=0){
            this.end = true
          }
        })
      },
      //投资后弹框
      investAlert(){
        if(this.orderId){       
          let params = {
            v:"1.0.0",
            orderId:this.orderId,
            combinationId:this.combinationId,
            data:this.data
          }
          this.$http(jrUrl.continueInvest,params).then(res=>{
            if(res.isShowDialog==1){
              this.$root.alertGetMoney = true
              this.$root.money = res.trade_money
              this.$root.productName = res.product_name
              this.$root.productId = res.productid.toString()
            }else{
              this.$root.alertGetMoney = false
            }
          })
        }
      },
      //投资
      getInvestFun(productId,productName){
        if(!this.login){
          Flash('请先登录!')
          return false
        }
        if(this.end){
          Flash('活动已结束!')
          return false
        }
        else{        
          let params = {
            combinationId:this.combinationId,        
            // token: this.token,
          }                   
          this.$http(jrUrl.checkUser,params).then(res=>{
            this.eventRefId = res
            this.$JinrSDK.pushProductTurnIn(
              productId.toString(), 
              productName, 
              '2', 
              '4', 
              this.eventRefId, 
              '0', 
              '0',
              this.isShowCoupon
            )
          })
        }
      },
      emitInvestes(productId,productName){
        this.investes(productId,productName)
      },
      investes(productId,productName){
        if(!this.$root.log){
          Flash('请先登录!')
          return false
        }
        if(this.end){
          Flash('活动已结束!')
          return false
        }
        this.getInvestFun(productId,productName)
      },
      //倒计时
      deadTime(){
        let time
        clearInterval(time)
        time = setInterval(()=>{
          this.publicData.day=Math.floor(this.publicData.deadTime/3600/24)
          this.publicData.hour=Math.floor((this.publicData.deadTime-this.publicData.day*3600*24)/3600)
          this.publicData.min=Math.floor((this.publicData.deadTime-this.publicData.day*3600*24-this.publicData.hour*3600)/60)
          this.publicData.sec=Math.floor(this.publicData.deadTime-this.publicData.day*3600*24-this.publicData.hour*3600-this.publicData.min*60)
          this.publicData.deadTime--
          if(this.publicData.deadTime===-1){
            this.end = true
            clearInterval(time)
          }
        },1000)
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
body,
html 
  height 100%
  width 100%
  overflow-x hidden  
  -webkit-overflow-scrolling touch 
  .investgive
    width 100%
    overflow-x hidden
    position relative
    .hei_top
      height 90px
    .investgive-bg1
      width 100%
      height 763px
      background url("./images/bg1.png") no-repeat center/100% 763px
    .investgive-bg2
      width 100%
      height 316px
      background url("./images/bg2.png") no-repeat center/100% 316px
      box-sizing border-box
      padding-top 15px
      overflow hidden
      .investgive-bg2_time
        width 501px
        margin 0 auto 
        font-size 30px
        text-align center
        color #ffffff
      .investgive-hb
        width 446px
        height 86px
        background-image linear-gradient(99deg, #093983 0%, #072e77 32%, #04226a 100%), linear-gradient(#ffffff, #ffffff)
        background-blend-mode normal, normal
        border-radius 43px
        margin 29px auto 0
        text-align center
        line-height 86px
        font-size 30px
        color #ffffff
      >.newsList
        width 709px
        height 120px
        overflow hidden
        margin 11px auto 0
        ul
          animation move 10s linear infinite 2s 
          overflow hidden       
          >li
            width 709px
            height 46px
            background-color rgba(0, 0, 0, 0.4)
            border-radius 23px
            margin-bottom 16px
            font-size 18px
            color #ffffff
            line-height 46px
            box-sizing border-box
            padding 0 43px 0
            >.get_money
              color #e4c483
            >span:last-of-type
              float right 
    .investgive-bg3
      width 100%
      height 735px
      margin-top -3px
      background url("./images/bg3.png") no-repeat center/100% 735px
      >.investgive-bg3_year
        width 679px
        height 324px
        margin 0 auto
        position relative
        >img
          width 250px
          position absolute
          bottom 38px
          right 24px
      >.investgive-bg3_season
        width 679px
        height 324px
        margin 50px auto 0
        position relative
        >img
          width 250px
          position absolute
          bottom 29px
          right 24px
    .investgive-bg4
      width 100%
      height 853px
      background url("./images/bg4.png") no-repeat center/100% 853px
      box-sizing border-box
      padding-top 20px
      >.investgive-bg4_month,
      >.investgive-bg4_week
        width 674px
        height 325px
        position relative
        margin 0 auto 
        >img
          width 250px
          position absolute
          bottom 30px
          right 24px
      >.investgive-bg4_week
        margin-top 50px
    .investgive-bg5
      width 100%
      height 360px
      background url("./images/bg5.png") no-repeat center/100% 360px
      box-sizing border-box
      padding-top 40px
      >.investgive-bg5_invest
        width 677px
        height 306px
        background url("./images/receive.png") no-repeat center/100% 100%
        margin 0 auto
        padding 54px 0 0 
        box-sizing border-box
        >h6
          font-size 36px
          font-weight 600
          text-align center
          color #ffffff
        >.inList
          height 150px
          overflow scroll
          margin-top 10px
          >ul
            width 515px
            overflow-x hidden
            overflow-y scroll
            margin 0 auto 0
            li
              width 515px
              height 34px
              font-size 24px
              line-height 34px
              color #ffffff
              >span:first-of-type
                margin-right 20px
      >.investgive-bg5_uninvest
        width 675px
        height 310px
        background url("./images/uninvest.png") no-repeat center/100% 100%
        margin 10px auto 0
    .investgive-bg6
      width 100%
      height 954px
      background url("./images/bg6.png") no-repeat center/100% 954px
    .investgive-bg7
      width 100%
      height 165px
      background url("./images/tips.png") no-repeat center/100% 165px
@-webkit-keyframes move
  form
    transform translateY(0)
  to
    transform translateY(-100%)
a
  display none
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
.index{
  -webkit-overflow-scrolling: none !important;//iphoneX滑动卡顿处理 
  }
}
/*********** 适配pc ***********/
html body {
  max-width: 980px;
  margin: 0 auto
}
</style>
