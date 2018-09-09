<template>
  <div class="log" @touchstart.prevent.stop="aa">
    <div class="log-wrap">
      <img class="imgs" src="../images/close.png" @touchstart.stop="close">
      <div class="log-content">
        <div class="log-content-wrap">
          <p>-我的邀请记录-</p>
          <div class="log-child">
            <div class="log-child-top">
              <div class="log-child-top-div1">
                <div class="log-div1">
                  <img src="../images/in-bg19.jpg">
                  <div>
                    <span>成功注册</span>
                    <i v-text="fiveHundrade"></i>人
                  </div>
                </div>
                <div class="log-div2">
                  <img src="../images/in-bg20.jpg">
                  <div>
                    <span>理财红包</span>
                    <i v-text="fiveHundradeMoney"></i>元
                  </div>
                </div>
              </div>
              <div class="log-child-top-div2">
                <div class="log-div3">
                  <img src="../images/in-bg18.jpg">
                  <div>
                    <span>成功投资</span>
                    <i v-text="ten"></i>人
                  </div>
                </div>
                <div class="log-div4">
                  <img src="../images/in-bg20.jpg">
                  <div>
                    <span>现金红包</span>
                    <i v-text="tenMoney"></i>元
                  </div>
                </div>
              </div>
            </div>
            <div class="log-child-bot">
              <div class="bot-title">
                <img src="../images/in-bg21.png">
              </div>
              <ul @touchstart.stop="bb($event)">
                <li v-for="(item,index) in reverseMyInvitaData" :key="index">
                  <span class="log-span1" v-text="item.tel"></span>
                  <span class="log-span2" v-text="item.state" :class="{fontCol:item.state==='未投资',fontCol1:item.state==='未投满1000'}"></span>
                  <span class="log-span3" v-text="item.moneyReg"></span>
                  <span class="log-span4" v-text="item.moneyInvest" v-if="item.state==='已投满1000'"></span>
                  <i class="log-i1" v-if="item.state==='未投资'&&item.tell===0||item.state==='未投满1000'&&item.tell===0" @click.stop="tellTA(item.tel)">提醒TA赚钱</i>
                  <i class="log-i2" v-if="item.state==='未投资'&&item.tell===1||item.state==='未投满1000'&&item.tell===1">已提醒</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Flash from '@/components/flash'
export default {
  name: 'log',
  data () {
    return {
      inviteList: [//tel:0:未提醒,1已提醒
        // {tel: '185****1111' ,state: '已投满1000' ,moneyReg: 500, moneyInvest: 10},
        // {tel: '185****2222' ,state: '未投资' ,moneyReg: 500, moneyInvest: 10, tell: 0},
        // {tel: '185****3333' ,state: '未投满1000' ,moneyReg: 500, moneyInvest: 10, tell: 0}
      ],
      fiveHundradeMoney: null,
      tenMoney: null,
      reverseMyInvitaData: []
    }
  },
  props:{
    fiveHundrade: {
      default: 0
    },
    ten: {
      default: 0
    },
    myInvitaData: {
      type: [Array],
      default: []
    },
    isEnds: {

    }
  },
  created () {
    if(this.fiveHundrade<=50){
      this.fiveHundradeMoney = this.fiveHundrade*500
    }else{
      this.fiveHundradeMoney = 25000
    }
    if(this.ten<=30){
      this.tenMoney = this.ten*10
    }else{
      this.tenMoney = 300
    }
    this.changeInviteList()
  },
  mounted () {
    console.log(this.myInvitaData,'loglog')
    // alert(this.myInvitaData[11].showSendMsgTip)
    // alert(this.myInvitaData[11].showStandardTxt)
  },
  methods: {
    ...mapMutations([
      'CHANGEalertLog',
      'CHANGEalertnoLog',
      'CHANGEalertmes'
    ]),
    aa(){

    },
    changeInviteList(){
      if(this.myInvitaData.length>0){
        this.myInvitaData.map((val,i)=>{
          if(val.showSendMsgTip === 1&&val.showStandardTxt === '未投资'||val.showSendMsgTip === 1&&val.showStandardTxt === '未投满1000'){
              // 可以提醒
              if(i<=29){
                  this.inviteList.push({
                  tel: val.mobile,
                  state: val.showStandardTxt,
                  moneyReg: 500,
                  moneyInvest: 10,
                  tell: 0
                })
              }else if(i>29&&i<=49){
                this.inviteList.push({
                  tel: val.mobile,
                  state: val.showStandardTxt,
                  moneyReg: 500,
                  moneyInvest: 0,
                  tell: 0
                })
              }else{
                this.inviteList.push({
                  tel: val.mobile,
                  state: val.showStandardTxt,
                  moneyReg: 0,
                  moneyInvest: 0,
                  tell: 0
                })
              }
          }else if(val.showSendMsgTip === 0&&val.showStandardTxt === '未投资'||val.showSendMsgTip === 0&&val.showStandardTxt === '未投满1000'){
            // 已提醒
            if(i<=29){
              this.inviteList.push({
                tel: val.mobile,
                state: val.showStandardTxt,
                moneyReg: 500,
                moneyInvest: 10,
                tell: 1
              })
            }else if(i>29&&i<=49){
              this.inviteList.push({
                tel: val.mobile,
                state: val.showStandardTxt,
                moneyReg: 500,
                moneyInvest: 0,
                tell: 1
              })
            }else{
              this.inviteList.push({
                tel: val.mobile,
                state: val.showStandardTxt,
                moneyReg: 0,
                moneyInvest: 0,
                tell: 1
              })
            }
          }else{
            // 不用提醒
            if(val.showStandardTxt === "已投满1000"&&val.showAwardDefaultTxt===0){
              // 投满1000时有可能显示10,有可能显示0
              if(i<=29){
                this.inviteList.push({
                  tel: val.mobile,
                  state: val.showStandardTxt,
                  moneyReg: 500,
                  moneyInvest: 0
                })
              }else if(i>29&&i<=49){
                this.inviteList.push({
                  tel: val.mobile,
                  state: val.showStandardTxt,
                  moneyReg: 500,
                  moneyInvest: 0
                })
              }else{
                this.inviteList.push({
                  tel: val.mobile,
                  state: val.showStandardTxt,
                  moneyReg: 0,
                  moneyInvest: 0
                })
              }
            }else{
              if(i<=29){
                this.inviteList.push({
                  tel: val.mobile,
                  state: val.showStandardTxt,
                  moneyReg: 500,
                  moneyInvest: 10
                })
              }else if(i>29&&i<=49){
                this.inviteList.push({
                  tel: val.mobile,
                  state: val.showStandardTxt,
                  moneyReg: 500,
                  moneyInvest: 0
                })
              }else{
                this.inviteList.push({
                  tel: val.mobile,
                  state: val.showStandardTxt,
                  moneyReg: 0,
                  moneyInvest: 0
                })
              }
            }
          }
        })
      }
      this.reverseMyInvitaData = this.inviteList.reverse()
    },
    close(){
      this.CHANGEalertLog(false)
    },
    bb(e){
      e.returnValue = true
    },
    tellTA(mobile){
      // 调用短信通道
      if(this.isEnds){
        Flash('活动已结束')
        return
      }
      this.close()
      this.$emit('changeSendMesTel',mobile)
      this.CHANGEalertmes(true)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/mixin.styl'
.log
  width 100%
  height 100%
  background rgba(0,0,0,0.8)
  position fixed
  top 0px
  left 0px
  z-index 200000
  .log-wrap
    height 1048px
    overflow hidden
    margin 88px auto 0
    position relative
    .imgs
      width 66px
      height 66px
      position absolute
      right 0px
      top 0px
      z-index 20000
    .log-content
      width 706px
      height 1020px
      background #314eca
      margin 28px auto 0
      border-radius 22px
      overflow hidden
      .log-content-wrap
        width 654px
        height 960px
        overflow hidden
        margin 37px auto 0
        p
          color #ffffff
          text-align center
          font-size 34px
          margin-bottom 26px
        .log-child
          height 894px
          background #fff
          border-radius 22px
          overflow hidden
          .log-child-top
            height 303px
            overflow hidden
            .log-child-top-div1
              height 50%
              overflow hidden
              border-1px(#faa094,0,dashed)
              .log-div1
                width 50%
                height 100%
                overflow hidden
                float left
                img 
                  display block
                  width 53px
                  float left
                  margin 49px 22px 0 34px
                div
                  height 90px
                  float left
                  font-size 32px
                  margin-top 30px
                  span 
                    display block
                  i 
                    color #dd462a
              .log-div2
                width 50%
                height 100%
                overflow hidden
                float left
                img 
                  display block
                  width 53px
                  float left
                  margin 49px 22px 0 34px
                div
                  height 90px
                  float left
                  font-size 32px
                  margin-top 30px
                  span 
                    display block
                  i 
                    color #dd462a
            .log-child-top-div2
              height 50%
              overflow hidden
              .log-div3
                width 50%
                height 100%
                overflow hidden
                float left
                img 
                  display block
                  width 53px
                  float left
                  margin 49px 22px 0 34px
                div
                  height 90px
                  float left
                  font-size 32px
                  margin-top 30px
                  span 
                    display block
                  i 
                    color #dd462a
              .log-div4
                width 50%
                height 100%
                overflow hidden
                float left
                img 
                  display block
                  width 53px
                  float left
                  margin 49px 22px 0 34px
                div
                  height 90px
                  float left
                  font-size 32px
                  margin-top 30px
                  span 
                    display block
                  i 
                    color #dd462a
          .log-child-bot
            height 563px
            overflow hidden
            .bot-title
              height 90px
              background #ededed
              overflow hidden
              img 
                width 562px
                display block
                margin 32px auto 0
            ul
              height 360px
              overflow scroll
              -webkit-overflow-scrolling touch
              li
                height 90px
                line-height 90px
                overflow hidden
                font-size 26px
                span 
                  display inline-block
                i 
                  display inline-block
                  text-align center
                  width 148px
                  border-radius 16px
                .log-span1
                  width 186px
                  text-align center
                  margin-right 18px
                .log-span2
                  width 154px
                  text-align center
                .fontCol
                  color #999999
                .fontCol1
                  color #0e9ee9
                .log-span3
                  width 107px
                  text-align center
                .log-span4
                  text-align center
                  width 110px
                  color #11b100
                .log-i1
                  border 1px solid #dd462a
                  height 39px
                  line-height 39px
                  color #dd462a
                .log-i2
                  width 118px
                  border 1px solid #999999
                  color #999
                  height 39px
                  line-height 39px
                  margin-left 13px
              li:nth-of-type(even)
                background #ededed
</style>
