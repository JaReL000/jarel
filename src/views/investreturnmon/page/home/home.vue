<template>
  <div class="index">
    <section class="fixed-top">
      <ul class="fixed-top-ul1">
        <img src="../../images/b10.png">
        <li v-for="(item,index) in rollDataList" :key="index">
          <span v-text="item.time" v-if="item.time==='刚刚'"></span>
          恭喜<span v-text="item.mobile"></span> 
          获得<span v-text="item.money"></span>元现金
          <span v-text="item.time" v-if="item.time!=='刚刚'"></span>
        </li>
      </ul>
      <ul class="fixed-top-ul2">
        <img src="../../images/b10.png">
        <li v-for="(item,index) in rollDataList" :key="index">
          恭喜<span v-text="item.mobile"></span>
          <span v-text="item.time"></span>
          获得<span v-text="item.money"></span>元现金
        </li>
      </ul>
    </section>
    <section class="index-bg1">
      <!-- <img class="img-share" src="../../images/b11.png" @click="shares"> -->
    </section>
    <section class="index-bg2">
      <span v-text="hadGiveMOn"></span>元
    </section>
    <section class="index-bg3">
      <div v-if="!end">倒计时：<span v-text="publicData.day"></span>天<span v-text="publicData.hour"></span>时<span v-text="publicData.min"></span>分<span v-text="publicData.sec"></span>秒</div>
      <div v-else>活动已结束</div>
      <p>温馨提示：通过该活动页面去投资方可获得现金红包哟~</p>
    </section>
    <section class="index-bg4" v-if="!moneyGetLog">
      <div class="index-bg4-div1">
        我的现金<span v-text="myMoney"></span>元
      </div>
      <div class="index-bg4-div3">
        <img src="../../images/b14.gif">
        <img src="../../images/b13.gif">
        <img src="../../images/b14.gif">
      </div>
      <div class="index-bg4-div2">
        您暂时无现金奖励哦~<span>去投资，领现金！</span>
        <img src="../../images/b9.png">
      </div>
    </section>
    <section class="index-bg5" v-else>
      <div class="index-bg5-div1">
        我的现金<span v-text="myMoney"></span>元
      </div>
      <ul>
        <li v-for="(item,index) in logList" :key="index">
          <span class="li-span1" v-text="item.productName"></span>
          <span class="li-span2">投资<i v-text="item.money"></i>元</span>
          <span class="li-span3" v-text="item.time"></span>
          <span class="li-span4">返现<i v-text="item.cash"></i>元</span>
        </li>
      </ul>
    </section>
    <section class="index-bg6">
      <div class="index-bg6-div1">年 <span v-text="moneyRate.yearRate"></span>%</div>
      <div class="index-bg6-div2" @click="investes('year')"></div>
    </section>
    <section class="index-bg7">
      <div class="index-bg7-div1">季 <span v-text="moneyRate.quaRate"></span>%</div>
      <div class="index-bg7-div2" @click="investes('quart')"></div>
    </section>
    <section class="index-bg8">
      <div class="index-bg8-div1">月 <span v-text="moneyRate.monRate"></span>%</div>
      <div class="index-bg8-div2" @click="investes('mon')"></div>
    </section>
    <img src="../../images/b8.png" class="index-bg9">
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import * as jrUrl from '../../urlconfig/urlconfig'
import {getRequest,pattern} from '../../util/util'
import Flash from '@/components/flash'
// import {fetchWXconfig} from '../../plugin/fetchWXconfig'
import shareApp from '../../components/shareApp/share-app'
import jinrsdk from 'src/jinr-sdk/index'
import data from './data'
var TWEEN = require('@tweenjs/tween.js')

export default {
  components: {
    shareApp
  },
  name: 'index',
  data () {
    return {
      ...data
    }
  },
  computed: {

  },
  created () {
    this.token = getRequest()['token']
    this.combinationId = getRequest()['combinationId']
    this.isShowCoupon = getRequest()['isShowCoupon'].toString()
    this.inviter = getRequest()['inviter']
    this.isGoInvestEnter()
    pattern()
    this.getWechatShare()
    this.getOnlineProduct()
    this.getInitData()
  },
  mounted () {
    
  },
  methods: {
    ...mapMutations([
      'CHANGEalertShareApp'
    ]),
    getInitData(){
      // 首页数据
      let params = {
        combinationId: this.combinationId,
        token: this.token
      }
      this.$http(jrUrl.getInitData,params).then(res=>{
        if(res.userLogin == 0){
          this.log = false
        }else if(res.userLogin == 1){
          this.log = true
        }
        if(this.countDownTime<=0){
          this.end = true
        }else{
          this.end = false
        }
        this.hadGiveMOn = res.sendTotalMoney
        this.publicData.deadTime = res.countDownTime
        this.myMoney = res.myInvestmentMoney
        this.startAnimation()
        this.deadTime()
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
          this.moneyGetLog = true
          res.myInvestmentData.map((val,i)=>{
            let data = new Date(val.timestamp*1000)
            this.logList.push({
              productName: val.productName,
              money: val.investmentMoney,
              time: data.pattern("MM/dd HH:mm"),
              cash: val.cashMoney
            })
          })
        }else{
          this.moneyGetLog = false
        }
        console.log(res,'首页数据')
      })
    },
    isGoInvestEnter(){
      let params = {
        combinationId: this.combinationId,
        token: this.token
      }
      this.$http(jrUrl.isGoInvestEnter,params).then(res=>{
        this.turnCombinationId = res
      })
    },
    investes(type){
      if(!this.log){
        Flash('请先登录!')
        return false
      }
      if(this.end){
        Flash('活动已结束!')
        return false
      }
      if(this.turnCombinationId){
        let combId = this.turnCombinationId.toString()
        if(type === "year"){
          jinrsdk.pushProductTurnIn('2','年定期','2','4',combId,'0','0',this.isShowCoupon)
        }else if(type === "quart"){
          jinrsdk.pushProductTurnIn('7','季定期','2','4',combId,'0','0',this.isShowCoupon)
        }else if(type === "mon"){
          jinrsdk.pushProductTurnIn('6','月定期','2', '4',combId,'0','0',this.isShowCoupon)
        }
      }
    },
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
    shares(){
      if(!this.log){
        Flash('请先登录!')
        return false
      }
      if(this.end){
        Flash('活动已结束!')
        return false
      }
      this.CHANGEalertShareApp(true)
    },
    startAnimation(){
      let animate = ()=>{
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      let result1 = {tweeningValue: (this.hadGiveMOn/2).toFixed(2)}
      new TWEEN.Tween(result1)
        .to({ tweeningValue: this.hadGiveMOn }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate( ()=> {
          this.hadGiveMOn = result1.tweeningValue.toFixed(2)
        })
        .start()
        animate()
    },
    toApp(){
      location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core"
    },
    getWechatShare(){
      // 获取分享配置信息
      let params={
        combinationId:this.combinationId,
        nowUrl:location.href.split('#')[0],
        token: this.token
      }
      if(this.inviter){
        params.inviter = this.inviter
      }
      this.$http(jrUrl.getWechatShare,params).then((res)=>{
        // console.log(res,'分享信息')
        this.appShareConfig.imgUrl = res.imgUrl
        this.appShareConfig.text = res.desc
        this.appShareConfig.title = res.title
        this.appShareConfig.url = res.shareUrl
        // fetchWXconfig(res,this)
      })
    },
    getOnlineProduct(){
      let params={}
      this.$http(jrUrl.getOnlineProduct,params).then(res=>{
        if(res.length>0){
          res.map((val,i)=>{
            if(val.product_name==='活期'){
              this.moneyRate.currentRate = val.rate_init.slice(0,4)
            }
            if(val.product_name==='月定期'){
              this.moneyRate.monRate = val.rate_init.slice(0,4)
            }
            if(val.product_name==='季定期'){
              this.moneyRate.quaRate = val.rate_init.slice(0,4)
            }
            if(val.product_name==='年定期'){
              this.moneyRate.yearRate = val.rate_init.slice(0,4)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/mixin.styl'
  .index
    width 100%
    height auto
    overflow hidden
    background #ff1616
    position relative
    .fixed-top
      width 6200px
      height 64px
      line-height 64px
      background rgba(0,0,0,0.5)
      overflow hidden
      position absolute
      top 0
      left 0px
      z-index 100
      ul
        overflow hidden
        width 1920px
        float left
        height 100%
        animation move 30s linear infinite 2s
        img 
          width 34px
          left 29px
          float left
          margin 16px 14px 0 30px
        li
          float left
          height 100%
          line-height 64px
          overflow hidden
          font-size 22px
          color #f1d3ad
          margin-right 121px
    .index-bg1
      width 100%
      height 528px
      bis1('../../images/b1','.jpg')
      overflow hidden
      .img-share
        width 128px
        height 132px
        float right
        margin-top 75px
    .index-bg2
      height 216px
      line-height 216px
      overflow hidden
      bis1('../../images/b2','.jpg')
      font-size 42px
      color #ffd97d
      text-align center
      span 
        font-size 83px
    .index-bg3
      height 360px
      bis1('../../images/b3','.jpg')
      position relative
      overflow hidden
      div
        height 70px
        line-height 70px
        background #ffd97d
        border-radius 36px
        overflow hidden
        text-align center
        font-size 30px
        position absolute
        left 50%
        top 177px
        transform translateX(-50%)
        padding 0 55px
        white-space nowrap
        color #dc0606
      p
        font-size 23px
        text-align center
        margin-top 265px
    .index-bg4
      height 351px
      bis1('../../images/b4')
      overflow hidden
      .index-bg4-div1
        width 397px
        height 70px
        line-height 70px
        margin-left 30px
        font-size 32px
        color #4d2222
        overflow hidden
        text-align center
      .index-bg4-div2
        height 36px
        line-height 36px
        text-align center
        overflow hidden
        font-size 23px
        color #6e6e6e
        img 
          width 36px
          vertical-align middle
        span 
          color #ff1616
          font-weight 600
          margin 0 20px
      .index-bg4-div3
        text-align center
        margin-top 30px
        img 
          width 160px
    .index-bg5
      height 360px
      bis1('../../images/b12')
      overflow hidden
      .index-bg5-div1
        width 397px
        height 70px
        line-height 70px
        margin-left 30px
        font-size 32px
        color #4d2222
        overflow hidden
        text-align center
      ul
        width 692px
        height 210px
        overflow-y scroll
        overflow-x hidden
        -webkit-overflow-scrolling touch
        margin 22px auto 0
        li
          height 34px
          line-height 34px
          overflow hidden
          // padding-left 30px
          text-align center
          font-size 22px
          span 
            display inline-block
          .li-span1
            margin-right 35px
          .li-span2
            width 177px
            margin-right 15px
          .li-span3
            margin-right 20px
          .li-span4
            width 170px
        li:nth-of-type(odd)
          background #f7f2d7
        li:nth-of-type(even)
          margin 8px 0
    .index-bg6
      width 727px
      height 273px
      bis1('../../images/b5')
      margin 50px 0 56px
      overflow hidden
      .index-bg6-div1
        font-size 33px
        color #ffd97d
        overflow hidden
        margin-left 397px
        font-weight 600
      .index-bg6-div2
        width 209px
        height 185px
        float right
        margin 7px 24px 0 0
    .index-bg7
      width 727px
      height 273px
      bis1('../../images/b6')
      margin 50px 0 56px
      overflow hidden
      .index-bg7-div1
        font-size 33px
        color #ffd97d
        overflow hidden
        margin-left 397px
        font-weight 600
      .index-bg7-div2
        width 209px
        height 185px
        float right
        margin 7px 24px 0 0
    .index-bg8
      width 727px
      height 273px
      bis1('../../images/b7')
      margin 50px 0 56px
      overflow hidden
      .index-bg8-div1
        font-size 33px
        color #ffd97d
        overflow hidden
        margin-left 397px
        font-weight 600
      .index-bg8-div2
        width 209px
        height 185px
        float right
        margin 7px 24px 0 0
    .index-bg9
      display block
      width 745px
      margin 0 auto 46px
  @-webkit-keyframes move
    form
      transform translateX(0)
    to
      transform translateX(-100%)
// @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)
//   .appbot
//     height 322px!important
//   .app-bg6
//     margin-bottom 335px!important
</style>

