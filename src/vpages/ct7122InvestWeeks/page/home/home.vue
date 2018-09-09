<template>
  <div class="index">
    <div class="index-wrap">
      <section class="index-bg1">
        <section class="index-bg1-div">
          <div v-if="!end">剩余时间：<span v-text="publicData.day"></span>天<span v-text="publicData.hour"></span>时<span v-text="publicData.min"></span>分<span v-text="publicData.sec"></span>秒</div>
          <div v-else>活动已结束</div>
        </section>
        <section class="index-bg1-roll">
          <div class="roll-div1">----已送出<span v-text="sendTotalMoney"></span>元理财红包----</div>
          <div class="roll-div2">
            <ul>
              <li v-for='(item,index) in rollData' :key="index">
                <span v-text="item.mobile"></span>
                投资周定期获得666元理财红包
                <span v-text="item.time"></span>
              </li>
            </ul>
            <ul>
              <li v-for='(item,index) in rollData' :key="index">
                <span v-text="item.mobile"></span>
                投资周定期获得666元理财红包
                <span v-text="item.time"></span>
              </li>
            </ul>
          </div>
        </section>
        <section class="index-bg1-hb">
          <div class="index-hb-div1 index-hb-div">
            <div>
              <img v-if="gotHb>0" class="index-hb-div1-img1" src="../../images/w2.png">
              <img v-if="gotHb>0" class="index-hb-div1-img2" src="../../images/w4.png">
              <img v-if="gotHb<=0" class="index-hb-div1-img3" src="../../images/w3.png">
            </div>
            <span v-if="gotHb>0" class="index-hb-div1-span1">领取成功!</span>
            <span v-if="gotHb<=0" class="index-hb-div1-span2">未领取</span>
          </div>
          <div class="index-hb-div2 index-hb-div">
            <div>
              <img v-if="gotHb>1" class="index-hb-div1-img1" src="../../images/w2.png">
              <img v-if="gotHb>1" class="index-hb-div1-img2" src="../../images/w4.png">
              <img v-if="gotHb<=1" class="index-hb-div1-img3" src="../../images/w3.png">
            </div>
            <span v-if="gotHb>1" class="index-hb-div1-span1">领取成功!</span>
            <span v-if="gotHb<=1" class="index-hb-div1-span2">未领取</span>
          </div>
          <div class="index-hb-div3 index-hb-div">
            <div>
              <img v-if="gotHb>2" class="index-hb-div1-img1" src="../../images/w2.png">
              <img v-if="gotHb>2" class="index-hb-div1-img2" src="../../images/w4.png">
              <img v-if="gotHb<=2" class="index-hb-div1-img3" src="../../images/w3.png">
            </div>
            <span v-if="gotHb>2" class="index-hb-div1-span1">领取成功!</span>
            <span v-if="gotHb<=2" class="index-hb-div1-span2">未领取</span>
          </div>
          <div class="index-hb-div4 index-hb-div">
            <div>
              <img v-if="gotHb>3" class="index-hb-div1-img1" src="../../images/w2.png">
              <img v-if="gotHb>3" class="index-hb-div1-img2" src="../../images/w4.png">
              <img v-if="gotHb<=3" class="index-hb-div1-img3" src="../../images/w3.png">
            </div>
            <span v-if="gotHb>3" class="index-hb-div1-span1">领取成功!</span>
            <span v-if="gotHb<=3" class="index-hb-div1-span2">未领取</span>
          </div>
          <div class="index-hb-div5 index-hb-div">
            <div>
              <img v-if="gotHb>4" class="index-hb-div1-img1" src="../../images/w2.png">
              <img v-if="gotHb>4" class="index-hb-div1-img2" src="../../images/w4.png">
              <img v-if="gotHb<=4" class="index-hb-div1-img3" src="../../images/w3.png">
            </div>
            <span v-if="gotHb>4" class="index-hb-div1-span1">领取成功!</span>
            <span v-if="gotHb<=4" class="index-hb-div1-span2">未领取</span>
          </div>
        </section>
        <section class="index-bg1-txt">
          有奖提示：5月7日-5月11日，每投资一笔周定期 就送666元理财红包（计息1天），每人最多领5个。  
        </section>
        <section class="index-bg1-btn">
          <img src="../../images/w5.png" @click="invests">
        </section>
        <section class="index-bg1-bots">PS：本福利仅限周定期，不管是从产品入口还是本活动入口投资都能领红包。</section>
      </section>
      <img class="index-bg2" src="../../images/w6.png">
      <img class="index-bg3" src="../../images/w7.png">
      <img class="index-bg4" src="../../images/w8.png">
    </div>
  </div>
</template>

<script>
// import {mapState,mapMutations} from 'vuex'
import * as jrUrl from '../../urlconfig/urlconfig'
import {getRequest} from '../../util/util'
import Flash from '@/components/flash'
// import {fetchWXconfig} from '../../plugin/fetchWXconfig'
import jinrsdk from 'src/jinr-sdk/index'

export default {
  components: {

  },
  name: 'index',
  data () {
    return {
      // debug: 1,
      // userId: 100131305,
      gotHb: 0,//领取红包个数
      token: '',
      sendTotalMoney: '',
      combinationId: '',
      turnCombinationId: '',
      isShowCoupon: null,
      publicData: {//倒计时
        deadTime: 1,
        day: null,
        hour: null,
        min: null,
        sec: null
      },
      log: false,
      end: false,
      moneyRate:{//利率
        currentRate: '',
        monRate: '',
        quaRate: '',
        yearRate: ''
      },
      rollData: []//轮播数据
    }
  },
  computed: {

  },
  created () {
    this.token = getRequest()['token']
    this.combinationId = getRequest()['combinationId']
    this.isShowCoupon = getRequest()['isShowCoupon'].toString()
    this.inviter = getRequest()['inviter']
    // pattern()
    this.getInitData()
  },
  mounted () {
    this.deadTime()
  },
  methods: {
    invests(){
      if(!this.log){
        Flash('请先登录!')
        return
      }
      if(this.end){
        Flash('活动已结束!')
        return
      }
      if(this.turnCombinationId){
        let combId = this.turnCombinationId.toString()
        jinrsdk.pushProductTurnIn('9','周定期','6','4',combId,'0','0',this.isShowCoupon)
      }
    },
    getInitData(){
      let params = {
        combinationId: this.combinationId,
        token: this.token
        // debug: this.debug,
        // userId: this.userId
      }
      this.$http(jrUrl.getInitData,params).then(res=>{
        console.log(res,'res')
        if(res.userLogin == 1){
          this.log = true
        }else if(res.userLogin == 0){
          this.log = false
        }
        if(res.countDownTime<=0){
          this.end = true
        }else{
          this.end = false
          this.publicData.deadTime = res.countDownTime
        }
        this.turnCombinationId = res.combinationId
        this.sendTotalMoney = res.sendTotalMoney
        this.gotHb = res.userData.length
        res.onLiveRollData.map((val,i)=>{
          this.rollData.push(
            {
              mobile: val.mobile,
              time: val.getTime
            }
          ) 
        })
      })
    },
    toApp(){
      location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core"
    },
    deadTime(){
      clearInterval(this.time)
      this.time = setInterval(()=>{
        this.publicData.day=Math.floor(this.publicData.deadTime/3600/24)
        this.publicData.hour=Math.floor((this.publicData.deadTime-this.publicData.day*3600*24)/3600)
        this.publicData.min=Math.floor((this.publicData.deadTime-this.publicData.day*3600*24-this.publicData.hour*3600)/60)
        this.publicData.sec=Math.floor(this.publicData.deadTime-this.publicData.day*3600*24-this.publicData.hour*3600-this.publicData.min*60)
        this.publicData.deadTime--
        if(this.publicData.deadTime===-1){
          this.end = true
          clearInterval(this.time)
        }
      },1000)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/mixin.styl'
  .index
    width 100%
    height 100%
    overflow hidden
    background #f6f5e6
    position relative
    box-sizing border-box
    padding-top 92px
    .index-wrap
      position relative
      overflow scroll
      -webkit-overflow-scrolling touch
      width 100%
      height 100%
      box-sizing border-box
      .index-bg1
        // width 100%
        height 1333px
        bis1('../../images/w1')
        overflow hidden
        .index-bg1-div
          height 40px
          line-height 40px
          margin-top 160px
          position relative
          overflow hidden
          div
            // bis1('../../images/i-bg4')
            box-sizing border-box
            height 40px
            line-height 40px
            overflow hidden
            text-align left
            font-size 23px
            top 0
            padding 0 35px
            white-space nowrap
            color #333
            font-weight 600
        .index-bg1-roll
          height auto
          margin-top 416px
          overflow hidden
          position relative
          .roll-div1
            font-size 30px
            color #333
            height 50px
            line-height 50px
            text-align center
            font-weight 600
            margin-top 10px
            span 
              color red
          .roll-div2
            height 120px
            overflow hidden
            margin-top 10px
            position relative
            ul
              // width 100%
              // float left 
              padding-left 4.5%
              animation move 20s linear infinite 1s
              overflow hidden
              text-align center
              li
                float left
                border-1px(#333,26px)
                font-size 26px
                color #333
                text-align center
                padding 0 20px
                margin 0 auto
                height 50px
                line-height 50px
                border-radius 24px
                margin-bottom 10px
        .index-bg1-hb
          width 670px
          height 230px
          margin 20px auto 0
          overflow hidden
          display -webkit-flex
          .index-hb-div
            -webkit-flex 1
            overflow hidden
            div
              height 188px
              overflow hidden
              position relative
              .index-hb-div1-img2
                width 100%
                position absolute
                top 0
                left 0px
                animation rorates 5s linear infinite
              .index-hb-div1-img1,.index-hb-div1-img3
                width 113px
                margin 0 auto
                display block
            .index-hb-div1-span1,.index-hb-div1-span2
              font-size 20px
              color #a73010
              width 100%
              display inline-block
              text-align center
            .index-hb-div1-span2
              color #333
        .index-bg1-txt
          font-size 22px
          color #a73010
          padding 0 90px
          margin 13px 0 37px
        .index-bg1-btn
          height auto
          overflow hidden
          img
            display block
            // width 592px
            height 90px
            margin 0 auto
        .index-bg1-bots
          font-size 18px
          color #333
          padding 0 10px
          text-align center
          margin-top 10px
      .index-bg2,.index-bg3,.index-bg4
        display block
        width 100%
  @-webkit-keyframes rorates
    form
      transform rotate(0deg)
    to
      transform rotate(360deg)
  @-webkit-keyframes move
    form
      transform translateY(0)
    to
      transform translateY(-100%)
// @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)
//   .appbot
//     height 322px!important
//   .app-bg6
//     margin-bottom 335px!important
</style>

