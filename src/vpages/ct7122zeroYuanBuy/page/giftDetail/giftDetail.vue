<template>
  <div class="giftDetail">
    <section class="giftDetail-wrap">
      <div class="giftDetail-bg1">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in exhibitionPhoto" :key="index">
              <img :src="item" alt="">
            </div>
          </div>
        </div>
        <div class="pages">
          <span v-text="currentPage"></span>/<span v-text="totalPage"></span>
        </div>
      </div>

      <div class="giftDetail-bg2">
        <div class="giftDetail-bg2-div1">
          <div>¥<span>0</span></div>
          <div>
            <span>已抢<i v-text="gotGiftNum"></i>件</span>
            <span>市场价<a href="javascript" v-text="market_price"></a></span>
          </div>
        </div>
        <div class="giftDetail-bg2-div2">
          <i>抢购倒计时</i>
          <section class="index-bg1-div">
            <div>
              <span v-text="publicData.day"></span>:<span v-text="publicData.hour"></span>:<span v-text="publicData.min"></span>:<span v-text="publicData.sec"></span>
            </div>
          </section>
        </div>
      </div>

      <div class="giftDetail-bg3">
        <p v-text="commodity_name"></p>
        <div v-text="commodity_desc"></div>
      </div>

      <div class="giftDetail-bg4">
        <p>产品信息</p>
        <p>PRODUCT INFORMATION</p>
      </div>

      <div class="giftDetail-bg5">
        <div>
          <img :src="item" v-for="( item,index ) in exhibitionPhoto" :key="index">
        </div>
      </div>

      <div class="giftDetail-bg6">
        <p>购买流程</p>
        <p>PURCHASE PROCESS</p>
      </div>

      <div class="detail-pic">
        <img src="../../images/bg17.png">
      </div>
    </section>
    <div class="giftDetail-bg7">
      <!-- <img src="../../images/bg18.png"> -->
      <div>
        <span v-if="btnStatus == 1" @click="investAgain()">立即0元购</span>
        <span v-if="btnStatus == 3">已抢光</span>
        <span v-if="btnStatus == 2" @click="investAgain()">还差<i v-text="need_pay_money-real_pay_money"></i>元,可继续投资</span>
      </div>
      <p>投资<span v-text="productType"></span><span style="color:#da4a4a;" v-text="invest_moneys"></span>元，到期赎回本金，再拿<span style="color:#da4a4a;" v-text="yeild"></span>元收益</p>
    </div>
    <alertGift 
      :investMoney='investMoney'
      :commodityName='commodityName'
      :realPayMoney="realPayMoney"
      :investNum='investNum'
      @investAgain="investAgain"
      v-if="$root.alertGiftFlag"></alertGift>
  </div>
</template>

<script>
import * as jrUrl from '../../urlconfig/urlconfig'
import {getRequest,pattern} from '../../util/util'
import Flash from '@/components/flash'
import jinrsdk from 'src/jinr-sdk/index'
import {Swiper} from '../../plugin/swiper-4.2.2.min.js'
import '../../style/swiper-4.2.2.min.css'
import alertGift from "../../components/alertGift"

export default {
  components: {
    alertGift
  },
  name: 'giftDetail',
  data () {
    return {
      totalPage: null,
      currentPage: null,
      exhibitionPhoto: [],//展示图
      time1: null,
      publicData: {//倒计时
        day: null,
        hour: null,
        min: null,
        sec: null
      },
      deadTimes: 0,
      gotGiftNum: 0,//已领取数量
      market_price: null,
      commodity_name: '',
      commodity_desc: '',
      real_pay_money: 0,
      is_online: 0,
      is_pay_full: 1,
      yeild: null,
      need_pay_money: null,
      productid: null,
      combination_id: 0,
      productType: '',
      btnStatus: null,//1:立即0元购,2:还差多少元可得，可继续投资,3:已抢光
      orderId: 0,
      investMoney: 0,
      commodityName: '',
      realPayMoney: 0,
      investNum: 0,
      invest_moneys: null
    }
  },
  created () {
    this.$root.title = '好货0元购'
    let $commodityid = sessionStorage.getItem( 'commodityid' )
    this.deadTimes = parseInt( sessionStorage.getItem('deadTime') )
    this.getCommondityDetail( $commodityid )
    this.getInvestStatus ()
  },
  mounted () {
    this.deadTime()
  },
  methods: {
    investAgain() {
      if( this.isEnd ){
        Flash( '活动已结束!' )
        return false  
      }
      let logs = parseInt(sessionStorage.getItem('log'))
      if( !logs ){
        Flash( '请先登录!' )
        return false  
      }
      try {
        let combination_id = sessionStorage.getItem('combination_id').toString()
        let productid = parseInt(sessionStorage.getItem('product_id'))
        // sessionStorage.setItem('productids',productid)
        // sessionStorage.setItem('combinationIds',combination_id,'productid',productid)
        let isShowCoupon = sessionStorage.getItem('isShowCoupon')
        console.log( 'combination_id:',combination_id )
        if( productid == 2 ){
          jinrsdk.pushProductTurnIn('2','年定期','2','4',combination_id,'0','0',isShowCoupon)
        }else if(productid == 7){
          jinrsdk.pushProductTurnIn('7','季定期','2','4',combination_id,'0','0',isShowCoupon)
        }else if(productid == 6){
          jinrsdk.pushProductTurnIn('6','月定期','2', '4',combination_id,'0','0',isShowCoupon)
        }else if(productid == 9) {
          jinrsdk.pushProductTurnIn('9','月定期','2', '4',combination_id,'0','0',isShowCoupon)
        }else{
          throw new Error('产品类型错误!')
        }
      } catch (error) {
        console.log(error)
      }

    },
    getInvestStatus () {
      try {
        //记得改回来
        this.orderId = jinrsdk.orderId
        // this.orderId = 8888
        // if( this.orderId ){
        //   this.getInvestMeaasge( this.orderId )
        // }
      } catch (error) {
        console.log( error )
      }
    },
    getInvestMeaasge( orderId ) {
      let params = {
        'orderid': orderId,
        'data': sessionStorage.getItem('datas'),
        'combinationId': sessionStorage.getItem('combinationIds')
      }
      this.$http(jrUrl.investCompleteTipData,params).then(res=>{
        this.$root.alertGiftFlag = true
        this.investMoney = parseFloat(res.invest_money)
        this.commodityName = res.commodity_name
        this.realPayMoney = res.real_pay_money
        this.investNum = res.invest_num
      })  
    },
    // toInvest() {
    //   //确定底部按钮状态
    //   let logs = parseInt(sessionStorage.getItem('log'))
    //   if( logs ){
    //     //登录
    //     if( this.btnStatus ==1||this.btnStatus ==2 ){
    //       // app调用投资

    //     }
    //   }else{
    //     //未登录
    //     Flash('请先登录!')
    //     return false
    //   }
    // },
    findBtnStatus () {
      //判断底部按钮状态
      let logs = parseInt(sessionStorage.getItem('log'))
      if( logs ){
        //登录
        if( this.real_pay_money>0 ){
          //还差多少元可领
          this.btnStatus = 2
        }else{
          if(this.is_online == 0){
            //已抢光
            this.btnStatus = 3
          }else{
            this.btnStatus = 1
          }
        }
      }else{
        //未登录
        if( this.is_online ==0 ){
          //已抢光
          this.btnStatus = 3
        }else{
          this.btnStatus = 1
        }
      }
    },
    getCommondityDetail ( $commondityId ) {
      let params = {
        'commodityid': $commondityId,
        'data': sessionStorage.getItem('datas'),
        'combinationId': sessionStorage.getItem('combinationIds')
      }
      this.$http( jrUrl.getCommondityDetail,params ).then( res=>{
        this.exhibitionPhoto = res.exhibitionPhoto
        this.totalPage = res.exhibitionPhoto.length
        setTimeout(() => {
          this.initSwiper()
        }, 0)

        this.gotGiftNum = res.gotGiftNum

        this.market_price = '¥' + res.market_price + '元'
        this.commodity_name = res.commodity_name
        this.commodity_desc = res.commodity_desc
        this.real_pay_money = res.real_pay_money
        this.productid = res.productid
        this.combination_id = res.combination_id
        this.transformProductId( this.productid )
        this.need_pay_money = res.need_pay_money
        this.yeild = res.yeild
        this.invest_moneys = res.invest_money
        this.is_pay_full = res.is_pay_full
        this.is_online = res.is_online
        this.findBtnStatus()

      } )
    },
    transformProductId( $productid ) {
      switch ($productid) {
        case 2:
          this.productType = '年定期'
          break
        case 7:
          this.productType = '季定期'
          break
        case 6:
          this.productType = '月定期'
          break
        case 9:
          this.productType = '周定期'
          break
      }
    },
    initSwiper() {
      let self = this
      let mySwiper = new Swiper('.swiper-container', {
        autoplay: {
          disableOnInteraction : false,
          delay:2500
        },
        
        on: {
          slideChangeTransitionEnd: function(){
            self.currentPage = this.activeIndex + 1
          },
          init: function(){
            self.currentPage = this.activeIndex + 1
          }
        }
      })
    },
    deadTime(){
      clearInterval(this.time1)
      this.time1 = setInterval(()=>{
        this.publicData.day=Math.floor(this.deadTimes/3600/24)
        if( this.publicData.day<10 ){
          this.publicData.day = '0' + this.publicData.day
        }
        this.publicData.hour=Math.floor((this.deadTimes-this.publicData.day*3600*24)/3600)
        if(this.publicData.hour<10){
          this.publicData.hour = '0' + this.publicData.hour
        }
        
        this.publicData.min=Math.floor((this.deadTimes-this.publicData.day*3600*24-this.publicData.hour*3600)/60)
        if(this.publicData.min<10){
          this.publicData.min = '0' + this.publicData.min
        }
        
        this.publicData.sec=Math.floor(this.deadTimes-this.publicData.day*3600*24-this.publicData.hour*3600-this.publicData.min*60)
        if(this.publicData.sec<10){
          this.publicData.sec = '0' + this.publicData.sec
        }
        
        this.deadTimes--
        if(this.deadTimes===-1){
          clearInterval(this.time1)
        }
      },1000)
    }
  },
  destroyed () {
    clearInterval(this.time1)
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/mixin.styl'
.giftDetail
  width 100%
  height 100%
  overflow hidden
  background #39adf7
  position relative
  box-sizing border-box
  padding-top 92px
  background #f4f4f4
  .giftDetail-wrap
    width 100%
    height 100%
    overflow scroll
    -webkit-overflow-scrolling touch
    position relative
    overflow-x hidden
    padding-bottom 190px
    box-sizing border-box
    .giftDetail-bg1
      height 800px
      overflow hidden
      position relative
      .swiper-container
        height 100%
        .swiper-wrapper
          height 100%
          .swiper-slide
            height 100%
            img 
              height 100%
      .pages
        width 58px
        height 40px
        line-height 40px
        overflow hidden
        background rgb(255, 255, 255)
        border-radius 6px
        position absolute
        right 20px
        bottom 20px
        z-index 10
        text-align center
        color #6f6f6f
        font-size 28px
    .giftDetail-bg2
      height 98px
      overflow hidden
      bis1('../../images/bg16')
      display flex
      .giftDetail-bg2-div1
        flex 1
        overflow hidden
        display flex
        div:nth-of-type(1)
          flex 1
          overflow hidden
          color #ffffff
          font-size 48px
          text-align center
          span 
            font-size 90px
            color #fff
        div:nth-of-type(2)
          flex 2
          overflow hidden
          span 
            font-size 28px
            color #fff
            a
              color #ffffff
              text-decoration line-through
          span:nth-of-type(1)
            display block
            margin-top 14px
      .giftDetail-bg2-div2
        flex 0.6
        overflow hidden
        i 
          font-size 28px
          color #ffffff
          display block
          text-align center
          margin-top 4px
        .index-bg1-div
          height 50px
          position relative
          overflow hidden
          div
            box-sizing border-box
            overflow hidden
            text-align center
            font-size 30px
            position absolute
            left 50%
            top 0
            transform translateX(-50%)
            padding 0 55px
            white-space nowrap
            color #7fe7fd
            span 
              display inline-block
              width 38px
              height 42px
              line-height 46px
              background  #f1f1f1
              border-radius 8px
              vertical-align middle
              color #2397e1
    .giftDetail-bg3
      height 166px
      background #fff
      overflow hidden
      p
        font-size 38px
        color #333333
        font-weight 600
        margin 15px 0 15px 20px
      div
        font-size 28px
        color #909090
        margin-left 20px
    .giftDetail-bg4
      height 150px
      background #fff
      margin-top 20px
      overflow hidden
      p:nth-of-type(1)
        text-align center
        font-size 40px
        font-weight bold
        margin 15px 0 15px
      p:nth-of-type(2)
        text-align center
        font-size 40px
        color #666
    .giftDetail-bg5
      height auto
      overflow hidden
      background #fff
      div
        width 95%
        margin 0 auto
        img 
          width 100%
    .detail-pic
      padding-top 40px
      background #ffffff
      overflow hidden
      height auto
      img 
        display block
        width 100%
    .giftDetail-bg6
      height 150px
      background #fff
      overflow hidden
      padding-top 20px
      p:nth-of-type(1)
        text-align center
        font-size 40px
        font-weight bold
        margin 15px 0 15px
      p:nth-of-type(2)
        text-align center
        font-size 40px
        color #666
  .giftDetail-bg7
    width 100%
    height 190px
    background #ffffff
    overflow hidden
    box-shadow: 0px -1px 27px 0px rgba(77, 68, 57, 0.2)
    position absolute
    bottom 0px
    div
      width 690px
      height 110px
      bis1('../../images/bg18')
      margin 20px auto 0
      span 
        display block
        height 100%
        line-height 90px
        font-size 36px
        color #fff
        text-align center
    p
      font-size 26px
      text-align center
</style>
