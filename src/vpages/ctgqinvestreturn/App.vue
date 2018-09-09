<template>
  <div class="investreturn">
    <x-header>投送又加息，开心过五一</x-header>
    <div class="investreturn-bg1">
      <div class="count-down" v-show="tipsShow">
        <span>活动剩余时间 ：</span><span v-text="publicData.day"></span>天<span v-text="publicData.hour"></span>时<span v-text="publicData.min"></span>分<span v-text="publicData.sec"></span>秒
      </div>
      <div class="count-down2" v-text="Flashtext"></div>
      <div class="investreturn-news">
        <div class="news-total">累计发放：<span v-text="pariticanMoney"></span><span>元</span>理财红包</div>
        <div class="newsList">
          <ul>
            <li v-for="(newsHbList,index) in newsList" :key="index">
              <span v-text="newsHbList.showTime"></span>
              <span v-text="newsHbList.mobile"></span>
              <span>投<span v-text="newsHbList.productName"></span>得到了<span v-text="newsHbList.money"></span>理财红包 
              </span>
            </li>
          </ul>
          <ul>
            <li v-for="(newsHbList,index) in newsList" :key="index">
              <span v-text="newsHbList.showTime"></span>
              <span v-text="newsHbList.mobile"></span>
              <span>投<span v-text="newsHbList.productName"></span>得到了<span v-text="newsHbList.money"></span>理财红包 
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="investreturn-bg2">
      <div class="investreturn-year">
        <p>4.2%
          <span>+1.8%</span>
        </p>
        <div @click="getInvestFun('2','年定期')"></div>
      </div>
      <div class="investreturn-season">
        <p>4.2%
          <span>+1.4%</span>
        </p>
        <div @click="getInvestFun('7','季定期')"></div>
      </div>
      <div class="investreturn-month">
        <p>4.2%
          <span>+1.2%</span>
        </p>
        <div @click="getInvestFun('6','月定期')"></div>
      </div>
      <div class="investreturn-tips">温馨提示：仅从以上活动入口投资方可获得相应的理财红包哟~</div>
      <div class="investreturn-receive" v-show="myGetShow">
        <h3>累计领取：<span v-text="myGetTotalMoney"></span><span>元理财红包</span></h3>
        <ul>
          <li v-for="(myReceive,index) in myReceiveList" :key="index">
            <span v-text="myReceive.showTime"></span>
            <span v-text="myReceive.showTxt"></span>
          </li>
        </ul>
      </div>
      <div class="investreturn-not" v-show="!myGetShow&&!myLoginShow">暂未有领取记录</div>
      <div class="investreturn-no_login" v-show="myLoginShow">请登录后查看</div>
    </div>
    <div class="investreturn-bg3">
      <p>1、活动期间通过此活动页面指定投资入口，投资定期产品任意金额，即可获得相应理财红包（例如：投资10万元，送10万元理财红包,有效期1天）；举个栗子</p>
      <p>2、投资一笔送一个等额理财红包，笔笔都送，不设上限哦!</p>
      <p>3、理财红包可至福利账户中查收，红包体验金有效期1天，收益可提现；(活动期间参与人数较多，红包发放可能会延时，届时请耐心等候.)</p>
    </div>
  </div>
</template>

<script>
  import xHeader from '@/views/app/components/x-header/index'
  import * as jrUrl from './urlconfig/urlconfig'
  import {getRequest,pattern} from './util/util'//获取参数
  import Flash from '@/components/flash'
  // import { truncate } from 'fs';
  export default {
    name: 'carrousel',
    components: {
      xHeader,
    },
    data() {
      return {
        //滚动投资列表
        newsList:[
          // {time:"04/23 14:23",phoneNum:"155****7219",type:"年定期",money:"10000.00元"},
          // {time:"04/23 14:23",phoneNum:"155****7219",type:"月定期",money:"100000.00元"}         
        ],
        //用户投资数据
        myReceiveList:[
          // {receiveTime:"04/23 14:23",receiveText:"投年定期领取500.00元理财红包"},
          // {receiveTime:"04/23 14:23",receiveText:"投季定期领取50000.00元理财红包"},
          // {receiveTime:"04/23 14:23",receiveText:"投年定期领取500.00元理财红包"},
          // {receiveTime:"04/23 14:23",receiveText:"投年定期领取1500.00元理财红包"}
        ],
        // data:'',
        combinationId:'',//url中的
        eventRefId:"",//活动事件id
        isShowCoupon:'',//活动事件id
        publicData: {//倒计时
          deadTime: 0,
          day: null,
          hour: null,
          min: null,
          sec: null
        },
        userLogin:"",//判断用户是否登录
        countDownTime:"",//倒计时用于判断活动是否结束
        pariticanMoney:"",//累计获得的红包
        myGetTotalMoney:"",//用户个人累计获取的红包
        myGetShow:false,//判断用户是否投资，显示的我的投资记录
        myLoginShow:false,//判断用户是否登录显示我的投资记录
        Flashtext:'',
        tipsShow:true
      }
    },
    computed: {},
    created(){
      this.token = getRequest()['token']
      this.combinationId = getRequest()['combinationId']
      this.isShowCoupon = getRequest()['isShowCoupon']
      this.getInitMessage()//获取页面信息
      this.deadTime()//倒计时
    },
    mounted() {},
    methods: {
      //获取页面信息
      getInitMessage(){
        let params = {
          combinationId:this.combinationId,
          // combinationId: "/MswOfx/8j9t0I/qhEhsCw==",
          token: this.token,
          // debug:1,
          // userId:100131500
        }
        this.$http(jrUrl.productMessage,params).then(res=>{
          console.log(res.myRecordAwardData)
          this.newsList = res.rollData
          console.log(this.newsList)
          this.newsList = res.rollData
          this.myReceiveList = res.myRecordAwardData//我的获奖记录
          this.eventRefId = res.combinationId
          this.publicData.deadTime = res.countDownTime//倒计时时间
          this.countDownTime = res.countDownTime
          console.log(this.publicData.deadTime)
          this.userLogin = res.userLogin
          this.pariticanMoney = res.pariticanMoney
          this.myGetTotalMoney = res.myGetTotalMoney//用户个人投资总累计金额
          this.investCheckFun()//判断用户是否投资
          this.loginCheckFun()//判断用户是否登录
          this.flashTextFun()//活动结束提示语
        })
      },
      //判断用户是否能投资
      getInvestFun(productId,productName){
        if(this.userLogin==0||this.userLogin=="0"){
          // alert(this.userLogin)
          Flash("请先登录")
          return
        }else if(this.countDownTime=='0'||this.countDownTime==0){
          Flash("活动已结束")
          return
        }else{
          let params = {
            combinationId:this.combinationId,
            // combinationId: "/MswOfx/8j9t0I/qhEhsCw==",          
            token: this.token,
          }
          this.$http(jrUrl.checkUser,params).then(res=>{
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
      //判断用户是否投资
      investCheckFun(){
        if(this.myGetTotalMoney==""||this.myGetTotalMoney==null){
          this.myGetShow=false
        }else{
          this.myGetShow=true
        }
      },
      loginCheckFun(){
        if(this.userLogin==0||this.userLogin=="0"){
          this.myLoginShow = true
          }else{
            this.myLoginShow = false
          }
      },
      flashTextFun(){
        if(this.countDownTime==""||this.countDownTime==null){
          this.tipsShow = false
          this.Flashtext='活动已结束'
          // document.getElementsByClassName("count-down")[0].style.margin = "0 0 0 60px";
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.investreturn
  .investreturn-bg1
    height 1337px
    background url("./images/investreturn_bg1.png") no-repeat center center/100% 100%
    position relative
    .count-down
      position absolute
      top 375px
      left 39px
      font-size 24px
      color #000
      text-align center
    .count-down2
      position absolute
      top 375px
      left 110px
      font-size 24px
      color #000
      text-align center
    .investreturn-news
      position absolute
      top 86%
      left 36px
      .news-total
        width 400px
        height 50px
        background-color rgba(0, 0, 0, 0.6)
        border-radius: 25px
        border solid 1px rgba(255, 255, 255, 0.6)
        font-size 24px
        color #ffffff
        line-height 50px
        padding 0 36px 0 23px
        span 
          font-size 30px
          color #fcf374
        span 
          font-size 24px
      .newsList
        height 100px
        overflow hidden        
        ul
          animation move 20s linear infinite 1s
          li
            height 40px
            background-color rgba(0, 0, 0, 0.6)
            border-radius: 25px
            border solid 1px rgba(255, 255, 255, 0.6)
            font-size 20px
            color #ffffff
            line-height 40px
            padding 0 23px
            margin-top 10px
  .investreturn-bg2
    height 1296px
    background url("./images/investreturn_bg2.png") no-repeat center center/100% 100%
    box-sizing border-box
    padding 58px 0 0 0px
    position relative
    div
      // width 687px
      height 236px
      position relative
      // left 50%
      // transform translateX(-50%)
      // margin-bottom 68px
      margin 0 auto 68px
      overflow hidden
      p
        position absolute
        font-size 36px
        color #c81a15
        font-weight 600
        top 20px
        left 196px
        span 
          font-size 60px
      div
        width 313px
        height 85px
        background url("./images/button.png") no-repeat center center/100% 100%
        position absolute
        top 97px
        right 20px
    .investreturn-year
      background url("./images/year.png") no-repeat center center/100% 100%
    .investreturn-season
      background url("./images/season.png") no-repeat center center/100% 100%
    .investreturn-month
      background url("./images/month.png") no-repeat center center/100% 100%
      margin-bottom 20px
    .investreturn-receive
      margin-top 126px
      text-align left 
      position absolute
      bottom -40px
      h3
        font-size 30px
        margin-bottom 10px
        padding-top 20px
        text-align center
        span 
          color #c51a15
      ul
        padding-left 66px
        height 138px
        overflow-y scroll
        margin-left 40px
        li
          font-size 24px
          color #000
          span
            margin-right 30px
    .investreturn-tips
      text-align center 
      font-size 20px
    .investreturn-not
      position absolute
      top 87%
      left 33%
      font-size 40px
    .investreturn-no_login
      position absolute
      top 87%
      left 33%
      font-size 40px
  .investreturn-bg3
    height 940px
    background url("./images/investreturn_bg3.png") no-repeat center center/100% 100%
    position relative
    // padding 0 80px 
    box-sizing border-box
    overflow hidden
    p
      font-size 24px
      line-height 27px
      position absolute
      padding 0 80px 
    p:nth-of-type(1)
      top 156px
    p:nth-of-type(2)
      bottom 300px
    p:nth-of-type(3)
      bottom 176px
a
  display none;
@-webkit-keyframes move
    form
      transform translateY(0)
    to
      transform translateY(-100%)
</style>