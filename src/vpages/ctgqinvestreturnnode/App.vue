<template>
  <div class="investnode">
    <headers :title = "{name: '激情盛夏立享返现'}"></headers>  
    <img src="./images/qiang.png" alt="" @click="toRush">            
    <div class="investnode-one">
      <div class="newslist">
        <ul>
          <li v-for="(newsList,index) in rollDataList" :key="index">
            恭喜<span v-text="newsList.mobile"></span>获得<span v-text="newsList.returnMoney">8</span>元现金红包
          </li>
        </ul>
        <ul>
          <li v-for="(newsList,index) in rollDataList" :key="index">
            恭喜<span v-text="newsList.mobile"></span>获得<span v-text="newsList.returnMoney">8</span>元现金红包
          </li>
        </ul>
      </div>
      <p><span v-text="sentMoney"></span>元</p>
      <div class="countdown" v-if="!end">倒计时
        <span v-text="day[0]"></span>
        <span v-text="day[1]"></span> 天
        <span v-text="hour[0]"></span>
        <span v-text="hour[1]"></span> 时      
        <span v-text="min[0]"></span>
        <span v-text="min[1]"></span> 分
        <span v-text="sec[0]"></span>
        <span v-text="sec[1]"></span> 秒
        <span v-text="minsec[0]"></span>
        <span v-text="minsec[1]"></span>
      </div>
      <div v-else>活动已结束</div>
    </div>
    <div class="investnode-two">
      <div class="investnode-two_year">
        <h5>年定期<span>6.0</span><span>%</span></h5>
        <div class="year" @click="getInvestFun('2','年定期')">领现金 去投资</div>
      </div>
      <div class="investnode-two_year">
        <h5>季定期<span>5.6</span><span>%</span></h5>
        <div class="year" @click="getInvestFun('7','季定期')">领现金 去投资</div>
      </div>
      <div class="investnode-two_year">
        <h5>月定期<span>5.4</span><span>%</span></h5>
        <div class="year" @click="getInvestFun('6','月定期')">领现金 去投资</div>
      </div>
      <div class="investnode-two_me">
        <h5>我的现金<span v-text="myInvestmentMoney">999.99</span>元</h5>
        <ul v-if="myInvestmentMoney==0?false:true">
          <li v-for="(item,index) in myInvestmentData" :key="index">
            <span class="span1" v-text="item.product_name">月定期</span>
            <span class="span2">投资<span v-text="item.money">50000</span>元</span>
            <span class="span3" v-text="item.time">06/05 12:34</span>
            <span class="span4">返现<span v-text="item.returnMoney">3000.00</span>元</span>
          </li>
        </ul>
        <div v-else>
          <img src="./images/emjio2.gif" alt="">
          <p>您暂时无现金奖励哦~<span>去投资，领现金！</span></p> 
        </div>
      </div>
    </div>
    <div class="investnode-three">
      <div></div>
      <p>官方客服热线1010-2015</p>
      <p>存钱赚利息，就上鲸鱼APP</p>
    </div>
    <rushToBuy v-if="$root.rushBuy"
    @emitInvestes="emitInvestes"
    ></rushToBuy>
    <alertReturn v-if="$root.alertGetMoney"
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
  var TWEEN = require('@tweenjs/tween.js')
  import rushToBuy from './components/rushToBuy'
  import alertReturn from './components/alertReturn'
  export default {
    name: 'carrousel',
    components: {
      headers,
      rushToBuy,
      alertReturn
    },
    data() {
      return {
        rollDataList:[],//顶部轮播数据
        end:false,//活动是否结束
        userinvest:true,//用户是否投资
        login: false,//用户是否登录        
        publicData: {//倒计时
          deadTime: 0,
          day: null,
          hour: null,
          min: null,
          sec: null,
          millisecond:null
        },
        //倒计时
        day:[],
        hour:[],
        min:[],
        sec:[],
        minsec:[],
        sentMoney:"",//发放的金额
        time:"",
        end_time:null,//活动结束时间
        myMoney:false,
        myInvestmentData:[],//我的投资列表
        myInvestmentMoney:"",//我的投资返现总金额
        login:"",
        eventRefId: "",
        activityid:""//活动ID
      }
    },
    computed: {
      // versionFun(){
      //   return this.$JinrSDK._version()
      //   console.log(this.$JinrSDK._version())
      // },
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
        }else{+
          this.investAlert()
      }
    },
    mounted(){},
    methods: {
      //初始化数据
      getInitData(){
        let params = {
          combinationId:this.combinationId,
          data:this.data
          // combinationId:"Bow4hWiDZeWQisJ1gENUYg==",
          // data:"%200A3aoqM7SUuAJAIWQA05BYnHwN%20aCxotZoQaY6HMJkx%20W0pYl91GA=="
        }
        this.$http(jrUrl.productMessage,params).then(res=>{
          this.sentMoney = res.sendTotalMoney
          this.rollDataList = res.rollData
          this.end_time = res.end_time 
          this.myInvestmentData = res.myInvestmentData
          this.myInvestmentMoney = res.myReturnTotalMoney
          this.login = res.userLogin
          this.activityid = res.activity_id//活动ID
          this.deadTime()
          this.startAnimation()
          // this.myInvestmentMoney=this.toDecimal2(this.myInvestmentMoney)  
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
              productId, 
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
      //投资后弹框
      investAlert(){
        if(this.orderId){       
          let params = {
            v:"1.0.0",
            orderId:this.orderId,
            event_ref_id:this.combinationId,
            data:this.data
          }
          // alert(params.orderId)
          this.$http(jrUrl.continueInvest,params).then(res=>{
            this.$root.alertGetMoney = true
            this.$root.money = res.rpcfg_money
            this.$root.productName = res.product_name
            if(this.$root.productName =="年定期"){  
              this.$root.productId = "2"
            }else if(this.$root.productName =="季定期"){
              this.$root.productId = "7"
            }else if(this.$root.productName =="月定期"){ 
              this.$root.productId = "6"
            } 
          })
        }
      },
      //倒计时
      deadTime(){
        clearInterval(this.time)
        this.time = setInterval(()=>{
          let nowTime = Date.now()      
          this.publicData.deadTime = this.end_time - nowTime
          this.publicData.deadTime= Math.floor((this.end_time - nowTime)/1000)
          this.publicData.day = parseInt(this.publicData.deadTime/(60*60*24));
          this.publicData.hour = parseInt(this.publicData.deadTime/(60*60)%24);
          this.publicData.min = parseInt(this.publicData.deadTime/60%60);
          this.publicData.sec = parseInt(this.publicData.deadTime%60);
          this.publicData.millisecond = ((this.end_time - nowTime))%1000;
          this.day = this.publicData.day.toString().split('')
          this.hour = this.publicData.hour.toString().split('')
          this.min = this.publicData.min.toString().split('')
          this.sec = this.publicData.sec.toString().split('')
          this.minsec = this.publicData.millisecond.toString().split('')
          for(var i = 0;i<this.day.length;i++){
            if(this.day.length==1){
              this.day.unshift(0)
            }
          }
          for(var i = 0;i<this.hour.length;i++){
            if(this.hour.length==1){
              this.hour.unshift(0)
            }
          }
          for(var i = 0;i<this.min.length;i++){
            if(this.min.length==1){
              this.min.unshift(0)
            }
          }
          for(var i = 0;i<this.sec.length;i++){
            if(this.sec.length==1){
              this.sec.unshift(0)
            }
          }
          if(this.publicData.deadTime===-1){
            this.end = true
            clearInterval(this.time)
          }
        },10)
      },
      //数字滚动特效9
      startAnimation(){
        let animate = ()=>{
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
        }
        let result1 = {tweeningValue: (this.sentMoney/2).toFixed(2)}
        new TWEEN.Tween(result1)
          .to({ tweeningValue: this.sentMoney }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate( ()=> {
            this.sentMoney = result1.tweeningValue.toFixed(2)
          })
          .start()
          animate()
      },
      //保留两位小数
      toDecimal2(x) { 
        var f = parseFloat(x); 
        if (isNaN(f)) { 
          return false; 
        } 
        var f = Math.round(x*100)/100; 
        var s = f.toString(); 
        var rs = s.indexOf('.'); 
        if (rs < 0) { 
          rs = s.length; 
          s += '.'; 
        } 
        while (s.length <= rs + 2) { 
          s += '0'; 
        } 
        return s;
        console.log(s) 
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
      //抢购按钮
      toRush(){
        this.$root.rushBuy = true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
body,
html 
  height 100%
  width 100%
  background #fecf64
  overflow-x hidden  
  -webkit-overflow-scrolling touch   
  .investnode
    width 100%
    // height 100%
    overflow-x hidden
    position relative
    background url("./images/index.png") no-repeat center 90px/100% 1131px
    >img
      width 111px
      height 108px
      position fixed
      // bottom 400px
      bottom 229px
      right 0 
      z-index 99
      animation bigge 0.5s linear infinite 2s   
    .investnode-one
      width 100%
      height 960px
      position relative
      margin-top 90px
      box-sizing border-box
      >.newslist
        height 120px
        overflow hidden
        >ul
          height 120px
          padding 18px 75px 0 85px
          box-sizing border-box
          overflow hidden
          animation move 10s linear infinite 2s
          >li	
            // width 410px
            height 40px
            background-color rgba(253, 240, 203, 0.5)
            border-radius 19px
            padding 0 22px 0 15px
            box-sizing border-box
            font-size 24px
            line-height 40px
            color #de5002
            margin-bottom 18px
          >li:nth-of-type(2n-1)
            float left
          >li:nth-of-type(2n)
            float right
      >p
        position absolute
        font-size 34px
        color #ff5e0c
        top 410px
        left 50%
        transform translateX(-50%)
        font-weight 600
        >span
          font-size 51px
          vertical-align -6px
      >.countdown
        width 100%
        height 53px
        text-align center
        margin 0 auto 
        line-height 53px
        position absolute
        top 879px
        left 50%
        transform translateX(-50%)
        font-size 30px
        color #781f1d
        >span
          display inline-block
          width 40px
          height 53px
          background #ffffff
          border-radius 4px
          font-size 34px
          font-weight 600
          color #ff5e0c
          vertical-align middle
    .investnode-two
      width 100%
      overflow-x hidden
      >.investnode-two_year
        width 736px
        height 594px
        background url("./images/1.png") no-repeat center/100% 594px
        text-align center
        padding-top 20px
        box-sizing border-box
        position relative
        margin 0 auto         
        >h5
          font-size 37px
          color #fff
        >div
          width 610px
          height 80px
          background-image linear-gradient(0deg, #fc6732 0%, #fe632c 30%, #ff5f26 50%, #ff7437 75%, #fe8848 100%), linear-gradient(#000000, #000000)
          background-blend-mode: normal, normal
          box-shadow 0px 12px 12px 0px rgba(255, 95, 38, 0.34)
          border-radius 40px
          position absolute
          top 442px
          left 50%
          transform translateX(-50%)
          font-size 34px
          color #ffffff
          font-weight 600
          line-height 80px
      >.investnode-two_year:nth-of-type(1){
        padding-top 30px
      }
      >.investnode-two_year:nth-of-type(2)
        background url("./images/2.png") no-repeat center/100% 594px
        >div
          background-image linear-gradient(0deg, #36b8d9 0%, #29b4d7 30%, #1cb0d5 50%, #3abada 75%, #58c3de 100%), linear-gradient(#000000, #000000)
          background-blend-mode normal, normal
          box-shadow 0px 12px 12px 0px rgba(28, 176, 213, 0.34)
      >.investnode-two_year:nth-of-type(3)
        background url("./images/3.png") no-repeat center/100% 594px
        >div
          background-image linear-gradient(0deg, #609ce6 0%, #5895e0 30%, #4f8dd9 50%, #5d99e2 75%, #6aa4eb 100%), linear-gradient(#000000, #000000)
          background-blend-mode normal, normal
          box-shadow 0px 12px 12px 0px rgba(79, 141, 217, 0.34)
      >.investnode-two_me
        width 736px
        height 572px
        background url("./images/mybg.png") no-repeat center/100% 572px
        padding-top 20px
        box-sizing border-box
        >h5
          text-align center
          font-size 37px
          color #fff
        >ul
          width 638px
          height 383px
          margin 30px auto 0
          overflow-x hidden
          overflow-y scroll
          li
            width 638px
            height 73px
            background #fef8ef
            padding 0 18px 0 21px
            box-sizing border-box
            font-size 26px
            line-height 73px
            color #781f1d
            margin-bottom 30px
            >span
              display inline-block
            >.span1
              width 80px
            >.span4
              width 180px
            // >.span2
            //   width 180px
            // >.span3
            //   width 100px
        >div
          text-align center
          margin-top 100px
          >img 
            width 200px
          >p
            font-size 24px
            color #634b23
            margin-top 47px
            >span
              color #ff5f26
    .investnode-three
      width 100%
      height 1110px
      background url("./images/bottom.png") no-repeat center bottom/100% 471px
      >div
        height 946px
        background url("./images/rull.png") no-repeat center bottom/100% 946px
        margin-bottom 50px
      >p
        font-size 30px
        color #8e6608
        text-align center
@-webkit-keyframes move
  form
    transform translateY(0)
  to
    transform translateY(-100%)
@-webkit-keyframes bigge
  0%
    transform scale(1)
  50%
    transform scale(1.2)
  100%
    transform scale(1)  
a 
  display none 
  font-size 0
/*********** 适配pc ***********/
html body {
  max-width: 980px;
  margin: 0 auto
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .index{
    -webkit-overflow-scrolling: none !important//iphoneX滑动卡顿处理  
    }
  }
</style>
