<template>
  <div class="investThree">
    <x-header>年中冲刺，狂派一亿现金</x-header>
    <section class="investThree-bg1">
      <div class="investThree-bg1_horn">
          <img src="./images/horn.png" alt=""> 
        <ul>
          <li v-for="(item,index) in rollDataList" :key="index">
            恭喜<span v-text="item.mobile"></span> 
            获得<span v-text="item.money"></span>元现金
            <span v-text="item.time" v-if="item.time==='刚刚'"></span>       
            <span v-text="item.time" v-if="item.time!=='刚刚'"></span>
            <img src="./images/min_hb.png" alt="">          
          </li>
        </ul>
        <ul>
          <li v-for="(item,index) in rollDataList" :key="index">
            恭喜<span v-text="item.mobile"></span> 
            获得<span v-text="item.money"></span>元现金
            <span v-text="item.time" v-if="item.time==='刚刚'"></span>            
            <span v-text="item.time" v-if="item.time!=='刚刚'"></span>
            <img src="./images/min_hb.png" alt="">          
          </li>
        </ul>
      </div>
      <div class="investThree-bg1_money">
        <h6 v-text="this.surplusMoney"></h6><span>元</span>
      </div>
      <div class="investThree-bg1_time">
        <div v-if="!end" class="active_count_down">剩余时间：
          <span v-text="publicData.day"></span>天
          <span v-text="publicData.hour"></span>时
          <span v-text="publicData.min"></span>分
          <span v-text="publicData.sec"></span>秒
        </div>
        <div v-if="end" class="active_end">活动已结束</div>
      </div>
      <div class="investThree-bg1_tips">
        温馨提示：通过该活动页面去投资方可获得现金红包哟~
      </div>
    </section>
    <section class="investThree-bg2">
      <div class="investThree-bg2_one">
        <div>我的现金<span v-text="this.myInvestAll"></span>元</div>
        <ul v-if="userinvest">
          <li v-for="(userInfo,index) in myInvestmentData" :key="index">
            <span v-text="userInfo.productName"></span>
            <span>投资<span v-text="userInfo.money"></span>元</span>
            <span v-text="userInfo.time"></span>
            <span>返现<span v-text="userInfo.cash"></span>元</span>
          </li>
        </ul>
        <div v-else class="investThree-bg2_one_uninvest">
          <img src="./images/emjio2.gif" alt="">
          <img src="./images/emjio1.gif" alt="">
          <img src="./images/emjio2.gif" alt="">   
          <p>您暂时无现金奖励哦~<span>去投资，领现金！</span><img src="./images/arrow.png" alt=""></p>       
        </div>
      </div>
      <div class="investThree-bg2_two">
        <div class="invest-year">
          <img src="./images/year.png" alt="">
          <img src="./images/hot.png" alt="">
          <div>
            <h6>年定期 6.0%</h6>
            <div @click="investes('2','年定期')">
              <span>领现金</span>去投资
            </div>
          </div>
        </div>
        <div class="invest-season">
          <img src="./images/season.png" alt="">
          <!-- <img src="./images/hot.png" alt=""> -->
          <div>
            <h6>季定期 5.6%</h6>
            <div @click="investes('7','季定期')">
              <span>领现金</span>去投资
            </div>
          </div>
        </div>
        <div class="invest-month">
          <img src="./images/month.png" alt="">
          <div @click="investes('6','月定期')">
            <h6>月定期 5.4%</h6>
            <div>
              <span>领现金</span>去投资
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="investThree-bg3"></section>
  </div>
</template>

<script>
  import xHeader from '@/views/app/components/x-header/index'
  import * as jrUrl from './urlconfig/urlconfig'
  import {getRequest,pattern} from './util/util'
  import Flash from '@/components/flash'
  import jinrsdk from 'src/jinr-sdk/index'
  var TWEEN = require('@tweenjs/tween.js')
  export default {
    name: 'carrousel',
    components: {
      xHeader,
    },
    data() {
      return {
        rollDataList:[],//顶部轮播数据
        end:false,//活动是否结束
        userinvest:true,//用户是否投资
        myInvestmentData:[],
        myInvestAll:'',//我的总返现金额
        surplusMoney:'',//一亿资金剩余金额
        publicData: {//倒计时
          deadTime: 0,
          day: null,
          hour: null,
          min: null,
          sec: null
        },
        login: false,
        eventRefId:"",
        productId:"",
      }
    },
    computed: {},
    created(){
      this.token = getRequest()['token']
      this.combinationId = getRequest()['combinationId']
      this.isShowCoupon = toString(getRequest()['isShowCoupon'])
      this.getInitData()
      pattern()//时间格式化
    }, 
    mounted() {},
    methods: {
      // 获取信息
      getInitData(){
        let params = {
          combinationId: this.combinationId,
          token: this.token
          // combinationId:'x2Ve8rpwbX6f9nP4qsbCAg==',
          // userId:'3549439',
          // debug:'1'
        }
        this.$http(jrUrl.productMessage,params).then(res=>{
          if(res.userLogin == 0){
            this.login = false
            this.userinvest = false
          }else if(res.userLogin == 1){
            this.login = true
            this.userinvest = true
          }
          this.publicData.deadTime = res.countDownTime
          this.myInvestAll = res.myInvestmentMoney
          this.surplusMoney = 100000000 - res.sendTotalMoney
          if(this.surplusMoney<=0){
            this.surplusMoney = 0
          }
          this.toDecimal2(this.surplusMoney)
          this.deadTime()    
          this.startAnimation()      
          if(res.countDownTime<=0){
            this.end = true
          }else{
            this.end = false
          }
          if(res.rollData.length>0){
            // 顶部轮播
            res.rollData.map((val,i)=>{
              if(i === 0){
                this.rollDataList.push({
                  mobile: val.mobile,
                  money: val.money,
                  time: '刚刚'
                })
              }else{
                let data = new Date(val.timestamp*1000)
                this.rollDataList.push({
                  mobile: val.mobile,
                  money: val.money,
                  time: data.pattern("MM/dd HH:mm")
                })
              }
            })
          }
          if(res.myInvestmentData.length>0){
            this.userinvest = true
            res.myInvestmentData.map((val,i)=>{
              let data = new Date(val.timestamp*1000)
              this.myInvestmentData.push({
                productName: val.productName,
                money: val.investmentMoney,
                time: data.pattern("MM/dd HH:mm"),
                cash: val.cashMoney
              })
            })
          }else{
            this.userinvest = false
          }
        })
      },
      //投资
       investes(productId,productName){
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
            token: this.token,
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
      //数字滚动特效
      startAnimation(){
        let animate = ()=>{
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
        }
        let result1 = {tweeningValue: (this.surplusMoney/2).toFixed(2)}
        new TWEEN.Tween(result1)
          .to({ tweeningValue: this.surplusMoney }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate( ()=> {
            this.surplusMoney = result1.tweeningValue.toFixed(2)
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
      } 
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.investThree
  width 100%
  height auto
  overflow hidden
  background #ddc2af
  -webkit-overflow-scrolling touch
  .investThree-bg1
    width 100%
    height 1101px
    overflow hidden
    background url('./images/invest_return_bg1.png') no-repeat center/100% 100%
    position relative
    .investThree-bg1_horn
      width 9000px
      height 64px
      overflow hidden
      background #554530
      >img 
          width 34px
          height 30px
          float left
          padding 17px 16px 17px 30px
          background-color #554530
          position relative
          z-index 100
      ul
        width 4000px
        height 64px
        overflow hidden
        animation move 30s linear infinite 2s
        float left
        li
          float left
          height 100%
          line-height 64px
          overflow hidden
          font-size 24px
          color #fff
          margin-right 250px
          margin-left 60px
          >img 
            width 20px
            height 29px
            vertical-align middle
            margin-left 8px
    .investThree-bg1_money
      width 600px
      position absolute
      bottom 254px
      left 15%
      font-size 36px
      color #eb4d4c
      text-align center
      left 50%
      transform translateX(-50%)
      h6
        font-size 80px
        display inline-block
    .investThree-bg1_time
      position absolute
      font-size 24px
      color #8f5d1c
      bottom 163px
      left 50%
      transform translateX(-50%)
    .investThree-bg1_tips
      font-size 24px
      color #4d2323
      position absolute
      bottom 0px
      left 10%
      text-align center
  .investThree-bg2
    width 100%
    height 1494px
    background #ddc2af
    .investThree-bg2_one
      width 725px
      height 396px
      background url('./images/my_money.png') no-repeat center/100% 100%
      margin 0 auto
      box-sizing border-box
      padding-top 30px
      >div
        width 464px
        height 70px
        font-size 36px
        color #f9d19d
        line-height 70px
        text-align center
        margin 0 auto
      >ul
        overflow-x hidden
        width 693px
        height 200px
        margin 36px auto 0
        box-sizing border-box
        padding-left 30px
        >li
          font-size 24px
          color #101010
          margin-bottom 5px
          >span 
            display inline-block
          >span:nth-of-type(1)
            width 100px                      
          >span:nth-of-type(2)
            width 190px
          >span:nth-of-type(3)
            width 165px
      .investThree-bg2_one_uninvest
        width auto
        img 
          width 200px
          margin-top 20px          
        p
          font-size 24px
          color #6e6e6e
          margin-top -47px
          >span
            color #ff1616
          >img 
            width 36px
            vertical-align top
    .investThree-bg2_two
      .invest-year,
      .invest-season,
      .invest-month
        width 100%
        height 344px
        background url('./images/invest_bg.png') no-repeat center/100% 100%
        position relative
        >img:nth-of-type(1)
          width 363px
          margin 65px 0 0 75px
        >img:nth-of-type(2)
          width 58px
          position absolute
          top 0px
          right 48px
        >div
          position absolute
          right 63px
          top 70px
          >h6
            font-size 36px
            font-family 'NotoSansHans-Medium'
            font-weight 600
            color #8f5d1c
          >div
            width 220px
            height 114px
            margin-top 30px
            background #eb4d4c
            box-shadow 0px 4px 10px 0px rgba(2, 2, 2, 0.4)
            border-radius 20px
            font-size 30px
            font-family 'MFJianHei_Noncommercial-Regular'
            font-weight 600            
            color #ffe6c6
            box-sizing border-box
            padding 0px 26px 0 37px
            text-align center
            span 
              font-size 48px
  .investThree-bg3
    width 100%
    height 1039px
    background url('./images/invest_return_bg3.png') no-repeat center/100% 100%
  @-webkit-keyframes move
    form
      transform translateX(0)
    to
      transform translateX(-100%)
a
  display none
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .index{
    -webkit-overflow-scrolling: none !important;//iphoneX滑动卡顿处理 
    }
  }
</style>