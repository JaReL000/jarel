<template>
  <div class="index">
    <xHeader>5月百强榜</xHeader>
    <div class="index-warp">
      <div class="index-notice">
        <img src="./images/horn.png" alt="">
        <ul>
          <li v-for="(newsItem,index) in newsList" :key="index">
            <span v-text="newsItem.mobile"></span><span>投资</span><span v-text="newsItem.productName"></span><span v-text="newsItem.money"></span>元
            <span v-text="newsItem.time"></span>          
          </li>
        </ul>
        <ul>
          <li v-for="(newsItem,index) in newsList" :key="index">
            <span v-text="newsItem.mobile"></span><span>投资</span><span v-text="newsItem.productName"></span><span v-text="newsItem.money"></span>元
            <span v-text="newsItem.time"></span>          
          </li>
        </ul>
      </div>
      <div class="index_one">
        <div v-if="!end" class="active_count_down">剩余时间：
          <span v-text="publicData.day"></span>天
          <span v-text="publicData.hour"></span>时
          <span v-text="publicData.min"></span>分
          <span v-text="publicData.sec"></span>秒
        </div>
        <div v-if="end" class="active_end">活动已结束</div>
        <div class="index-type">
          <div class="index-type_one">
            <img src="./images/hot.gif" alt="">
            <h6><span>6</span>.00%</h6>
            <p>年定期（365天）</p>
            <div @click="getInvestFun('2','年定期')">点击投资</div>
          </div>
          <div class="index-type_two">
            <h6><span>5.40</span>%</h6>
            <p>月定期（30天）</p>
            <div @click="getInvestFun('6','月定期')">点击投资</div>
          </div>
          <div class="index-type_three">
            <h6><span>5.60</span>%</h6>
            <p>季定期（90天）</p>
            <div @click="getInvestFun('7','季定期')">点击投资</div>
          </div>
        </div>
        <div class="index_one_tips">*仅通过本活动【投资按钮】投资才算有效参与哦!</div>
      </div>
      <div class="index-two">
        <div class="rank_top_bg"></div>
        <div class="index-two_title">
          <span>排名</span>
          <span>用户</span>
          <span>投资额</span>
          <span>奖品</span>
        </div>
        <div class="index-two_user" v-show="myLoginShow">
          <span v-text="userRank"></span>
          <span>我</span>
          <span v-text="userMoney">100000.00</span>
          <span v-text="userPrizes"></span>
          <p v-show="userDiffShow">差<span v-text="userDiffMoney"></span>元可得<span v-text="userPrizesDiff"></span></p>
        </div>
        <div class="index-two_topUser"> 
          <div class="topUser_box" v-for="(rankTop,index) in ranKDataTop" :key="index" v-if="index<=2">
            <img src="./images/prize2.png" alt="" v-if="index===0">
            <div class="prize-name" v-if="index===0">海尔3件套</div>
            <img src="./images/prize1.png" alt="" v-if="index===1">
            <div class="prize-name" v-if="index===1">苹果3件套</div>
             <img src="./images/prize3.png" alt="" v-if="index===2">
            <div class="prize-name" v-if="index===2">苏泊尔15件套</div>
            <div class="user-phoneNum" v-text="rankTop.mobile"></div>
            <div class="user-money">投资<span v-text="rankTop.money"></span></div>
          </div>
          <!-- <div class="topUser_box">
            <img src="./images/prize1.png" alt="">
            <div class="prize-name">苹果3件套</div>
            <div class="user-phoneNum" v-text="rankData[1].mobile"></div>
            <div class="user-money">投资<span v-text="rankData[1].money"></span></div>
          </div>
          <div class="topUser_box">
            <img src="./images/prize3.png" alt="">
            <div class="prize-name">苏泊尔15件套</div>
            <div class="user-phoneNum" v-text="rankData[2].mobile"></div>
            <div class="user-money">投资<span v-text="rankData[2].money"></span></div>
          </div> -->
        </div>
        <ul>
          <li v-for="(rank,index) in rankData" :key="index">
            <span class="rank_index" v-if="index>=3" v-text="index+1">4</span>
            <i class="rank_mobile" v-if="index>=3" v-text="rank.mobile">155****7219</i>
            <i class="rank_money" v-if="index>=3" v-text="rank.money">100000.00</i>
            <img :src="rank.imgUrl" alt="" class="rank_img" v-if="index>=3&&index<=9">
            <span class="rankList-span2" v-else v-text="rank.txt"></span>
          </li>
        </ul>
      </div>
      <div class="index-three">
        <div class="index-three_rule">
          <h5>——活动规则——</h5>
          <ul>
            <li v-for="(ruleitme,index) in ruleList" :key="index">
              <div class="rule_rank" v-text="ruleitme.rule_rank"></div>
              <p class="rule_prize" v-text="ruleitme.rule_prize"></p>
            </li>
          </ul>
        </div>
        <div class="index-three_prize" @click="importantTipsFun">奖品详情＞＞</div>
        <div class="index-three_rule_details">
          <p>1、活动时间：截止至5月31日24点</p>
          <p>2、排行榜根据本活动投资额进行排名，投得越多排名越前；</p>
          <p>3、排行榜前100名均可获奖，同等投资额则较先达到者靠前；</p>
          <p>4、排行榜每3分钟刷新一次，最终排名以最后一次刷新为准；</p>
          <p>5、所有实物奖品不指定颜色，视库存随机发货，以收到为准；</p>
          <p>6、所有奖品将在活动结束后15个工作日内发放（特殊情况另行通知）；</p>
          <p>7、本活动最终解释权归鲸鱼所有。</p>
        </div>
        <div class="old-user_prize">——过往获奖用户——</div>
        <div class="index-three_swipe">
          <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="./images/user (1).png"></div>
                <div class="swiper-slide"><img src="./images/user (2).png"></div>
                <div class="swiper-slide"><img src="./images/user (3).png"></div>
                <div class="swiper-slide"><img src="./images/user (4).png"></div>
                <div class="swiper-slide"><img src="./images/user (5).png"></div>
                <div class="swiper-slide"><img src="./images/user (6).png"></div>
                <div class="swiper-slide"><img src="./images/user (7).png"></div>
                <div class="swiper-slide"><img src="./images/user (8).png"></div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="swiper-con">
            <h6 class="swiper-con-h1">恭喜李财主在“投资送iPhoneX”活动中获得iPhoneX</h6>
            <h6 class="swiper-con-h2">2018年1月</h6>
          </div>
        </div>
        <div class="index-three_prizes_tips">
          <span>有奖提示：</span>本活动中凡获实物奖用户拍照发朋友圈，截图给微信鲸鱼-小可爱（xiaojy16）即可领5000元理财红包，限6月30日前。
        </div>
      </div>
    </div>
    <div class="go-to-top" v-show="to_top" @click="toTopFun"></div>
    <div class="improtant_tips" v-show="importantTipsShow">
        <div class="improtant_tips_hide" @click="importantTipsHideFun"></div>
      </div>
  </div>
</template>

<script>
  import xHeader from '@/views/app/components/x-header/index'
  import {Swiper} from './plugin/swiper-4.2.2.min.js'
  import './style/swiper-4.2.2.min.css'
  import './plugin/jquery.min.js'
  import Flash from '@/components/flash'
  import * as jrUrl from './urlconfig/urlconfig'
  import {getRequest,pattern} from './util/util'//获取参数
  export default {
    name: 'carrousel',
    components: {
      xHeader,
    },
    data() {
      return {
        newsList:[],
          end:false,//活动是否结束
          test:"",
          ruleList:[
            {rule_rank:"第1-5名",rule_prize:"相应的实物大奖"},
            {rule_rank:"第6-10名",rule_prize:"鲸鱼新版公仔4个装"},
            {rule_rank:"第11-20名",rule_prize:"鲸鱼定制保温杯"},
            {rule_rank:"第21-50名",rule_prize:"10万理财红包"},
            {rule_rank:"第51-100名",rule_prize:"5万理财红包"}
          ],
          to_top:false,//回到顶部按钮
          importantTipsShow:false,//重要提示弹框
          userRank:'/',//用户当前排名
          userMoney:"",//用户投资金额
          userPrizes:"",//用户奖品
          userDiffMoney:"",//距离上奖品还差多少金额
          userPrizesDiff:'',//可能获得的上一奖品
          diffPrevIndex:"",//与上一奖品的距离
          userDiffShow:true,
          rankData:[],//排行榜
          ranKDataTop:[],//前三排行榜
          rankDataGift:[],
          userLogin:"",//判断用户是否登录
          publicData: {//倒计时
            deadTime: 0,
            day: null,
            hour: null,
            min: null,
            sec: null
        },
        myLoginShow:true,
        allGift:['苹果三件套','海尔三件套','苏泊尔15件套','爱华仕5件套','玉兰油3件套','鲸鱼公仔四只装','鲸鱼定制保温杯','10万元理财红包','5万元理财红包'],
        countDownTime:"",//判断活动是否结束
        productId:"",
        productName:'',
        eventRefId:""
      }
    },
    computed: {},
    created(){
      this.token = getRequest()['token']
      this.combinationId = getRequest()['combinationId']
      this.isShowCoupon = getRequest()['isShowCoupon']
      this.getInitMessage()
      this.deadTime()  
    }, 
    mounted() {
      let mySwiper = new Swiper('.swiper-container',{
        autoplay: {
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
        },
        on: {
          transitionEnd: function(swiper){
            let activeIndex
            $('.swiper-slide').each(function(i,val){
              if($(this).hasClass('swiper-slide-active')){
                activeIndex = $(this).index()
              }
            })
            if(activeIndex === 0){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜占财主在“投资送iPhoneX”活动中获得iPhoneX'
              document.querySelector('.swiper-con-h2').innerHTML = '2018年1月'
            }else if(activeIndex === 1){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜张财主在“投资送iPhoneX”活动中获得iPad'
              document.querySelector('.swiper-con-h2').innerHTML = '2018年1月'
            }else if(activeIndex === 2){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜李财主在“投资送iPhoneX”活动中获得iPhoneX'
              document.querySelector('.swiper-con-h2').innerHTML = '2018年1月'
            }else if(activeIndex === 3){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜高财主在“投资送iPhoneX”活动中获得iPad'
              document.querySelector('.swiper-con-h2').innerHTML = '2018年1月'
            }else if(activeIndex === 4){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜李财主在“投资狂欢派对”活动中获得TCL冰箱'
              document.querySelector('.swiper-con-h2').innerHTML = '2016年3月'
            }else if(activeIndex === 5){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜社群VIP用户在社群活动中获得鲸鱼宝宝'
              document.querySelector('.swiper-con-h2').innerHTML = '2017年6月'
            }else if(activeIndex === 6){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜社群VIP用户在社群活动中获得鲸鱼宝宝和保温杯'
              document.querySelector('.swiper-con-h2').innerHTML = '2017年8月'
            }else if(activeIndex === 7){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜社群VIP用户在社群活动中获得鲸鱼保温杯'
              document.querySelector('.swiper-con-h2').innerHTML = '2017年8月'
            }
          },
        }
      })   
      this.goTopFun()       
    },
    methods: {
      //重要提示显示隐藏
      importantTipsFun(){
        this.importantTipsShow = true
      },
      importantTipsHideFun(){
        this.importantTipsShow = false
      },
      //顶部按钮显示
      goTopFun(){ 
        var that = this
        $(".index-warp").scroll(function(){
          if($(".index-warp").scrollTop()>1620){
            that.to_top = true
          }else{
            that.to_top = false
          }
        })
      },
      //回到顶部
      toTopFun(){
        $(".index-warp").scrollTop(0)
      },
      //获取活动信息数据
      getInitMessage(){
        let params = {
          combinationId:this.combinationId,
          token:this.token
          // combinationId:"jflNKUzPaFrCrCVXjaqNjQ==",
          // debug:1,
          // userId:"100008857"
        }
        this.$http(jrUrl.productMessage,params).then(res=>{
          this.newsList = res.allOnlineLiveData
          this.userRank = res.userRankIndex//用户当前排名
          this.userMoney = res.userInvestmentMoney//用户投资金额
          this.userDiffMoney = res.userDiffMoney
          this.userLogin = res.userLogin
          this.publicData.deadTime = res.countDownTime
          this.countDownTime = res.countDownTime
          this.diffPrevIndex =res.diffPrevIndex
          this.eventRefId = res.combinationId
         
          // 如果超过两个 调换第一 第二名位置
          if(res.rankData.length>=2){
            let one = res.rankData[0]
            let two = res.rankData[1]
            res.rankData[0] = two
            res.rankData[1] = one

          }
          
          this.ranKDataTop = res.rankData

          this.userPrizesFun()
          this.userDiffFun()
          this.userPrizesDiffFun()
          console.log(res)
          //排行榜
          this.rankDataGift=[
            require('./images/prize1.png'),
            require("./images/prize2.png"),
            require('./images/prize3.png'),
            require('./images/prize4.png'),
            require("./images/prize5.png"),
            require("./images/prize6.png"),
            '鲸鱼定制保温杯',
            '10万元理财红包',
            '5万元理财红包'
          ]
          if(res.rankData.length>0){
            res.rankData.map((val,i)=>{
              if(i===0){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  imgUrl:this.rankDataGift[0]
                })
              }else if(i===1){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  imgUrl:this.rankDataGift[1]
                })
              }else if(i===2){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  imgUrl:this.rankDataGift[2]
                })
              }else if(i===3){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  imgUrl:this.rankDataGift[3]
                })
              }else if(i===4){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  imgUrl:this.rankDataGift[4]
                })
              }else if(i>=3&&i<=9){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  imgUrl:this.rankDataGift[5]
                })
              }else if(i>=10&&i<=19){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  txt:this.rankDataGift[6]
                })
              }else if(i>=20&&i<=49){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  txt:this.rankDataGift[7]
                })
              }else{
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  txt:this.rankDataGift[8]
                })
              }
            })
          }
        })
      },
      //判断用户当前排名获取奖品
      userPrizesFun(){
        if(this.userRank=='1'||this.userRank==1){
          this.userPrizes = this.allGift[0]
        }else if(this.userRank=='2'||this.userRank==2){
          this.userPrizes = this.allGift[1]
        }else if(this.userRank=='3'||this.userRank==3){
          this.userPrizes = this.allGift[2]
        }else if(this.userRank=='4'||this.userRank==4){
          this.userPrizes = this.allGift[3]
        }else if(this.userRank=='5'||this.userRank==5){
          this.userPrizes = this.allGift[4]
        }else if(6<=this.userRank&&this.userRank<=10){
          this.userPrizes = this.allGift[5]
        }else if(11<=this.userRank&&this.userRank<=20){
          this.userPrizes = this.allGift[6]
        }else if(21<=this.userRank&&this.userRank<=50){
          this.userPrizes = this.allGift[7]
        }else if(51<=this.userRank&&this.userRank<=100){
          this.userPrizes = this.allGift[8]
        }else{
          this.userPrizes = "/"
        }
      },
      //距离上一个奖品类别的名次
      userPrizesDiffFun(){
        if(this.diffPrevIndex=='1'||this.diffPrevIndex==1){
          this.userPrizesDiff = this.allGift[0]
        }else if(this.diffPrevIndex=='2'||this.diffPrevIndex==2){
          this.userPrizesDiff = this.allGift[1]
        }else if(this.diffPrevIndex=='3'||this.diffPrevIndex==3){
          this.userPrizesDiff = this.allGift[2]
        }else if(this.diffPrevIndex=='4'||this.diffPrevIndex==4){
          this.userPrizesDiff = this.allGift[3]
        }else if(this.diffPrevIndex=='5'||this.diffPrevIndex==5){
          this.userPrizesDiff = this.allGift[4]
        }else if(6<=this.diffPrevIndex&&this.diffPrevIndex<=10){
          this.userPrizesDiff = this.allGift[5]
        }else if(11<=this.diffPrevIndex&&this.diffPrevIndex<=20){
          this.userPrizesDiff = this.allGift[6]
        }else if(21<=this.diffPrevIndex&&this.diffPrevIndex<=50){
          this.userPrizesDiff = this.allGift[7]
        }else if(51<=this.diffPrevIndex&&this.diffPrevIndex<=100){
          this.userPrizesDiff = this.allGift[8]
        }else{
          this.userPrizesDiff = "/"
        }
      },
      //是否提示用户距离上一奖品差多少
      userDiffFun(){
        if(this.userRank==1){
          this.userDiffShow = false
        }
      },
      //判断用户是否能投资
      getInvestFun(productId,productName){
        if(this.userLogin==0||this.userLogin=="0"){
          Flash("请登录后再从此入口投资")
          return
        }else if(this.countDownTime=='0'||this.countDownTime==0){
          Flash("活动已结束")
          return
        }else{
          let params = {
            combinationId:this.combinationId,        
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
      //判断用户是否登录
      loginCheckFun(){
        if(this.userLogin==0||this.userLogin=="0"){
          this.myLoginShow = true
          }else{
            this.myLoginShow = false
          }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
html,body 
  height 100%
  width 100%
  background-color #3b0651
  overflow-x hidden
.index
  position relative
  width 100%
  height 100%
  overflow hidden
  background-color #3b0651
  -webkit-overflow-scrolling touch
  .index-warp
    width 100%
    height 100%
    overflow scroll
    box-sizing border-box
    position relative
    .index-notice
      width 100%
      height 64px
      background rgba(0, 0, 0, 0.4)
      line-height 64px
      overflow hidden
      position absolute
      top 0px
      img 
        width 30px
        height 34px
        vertical-align middle
        float left
        padding 15px 17px 0 30px
        z-index 1
        position relative
        background #1f0b32
      ul
        width 2700px
        line-height 64px
        // overflow hidden
        white-space nowrap
        animation move 20s linear infinite 2s     
        // float left     
        li
          width 540px
          // float left
          font-size 24px
          color #fff2c6
          margin-right 150px
          display inline-block
    .index_one
      width 100%
      height 1248px
      overflow hidden
      background url("./images/top_bg1.png") no-repeat center center
      background-size 100% 100%
      .active_count_down
        width 360px
        height 40px
        background-color #0156ad
        font-size 24px
        color #ffffff
        line-height 40px   
        text-align center
        border-radius 20px
        position absolute
        top 646px
        left 50%
        transform translateX(-50%)  
      .active_end
        width 360px
        height 40px
        background-color #0156ad
        font-size 24px
        color #ffffff
        line-height 40px   
        text-align center
        border-radius 20px
        position absolute
        top 646px
        left 50%
        transform translateX(-50%) 
      .index-type
        height 1205px
        position relative
        .index-type_one
          width 435px
          height 220px
          position absolute
          top 765px
          left 50%
          transform translateX(-50%)
          text-align center
          img 
            width 130px
            height 130px
            position absolute
            top -75px
            right -50px
          h6
            font-size 64px 
            color #c15815
            font-family 'Georgia'
            span 
              font-size 64px
          p
            font-size 21px
            color #75512d
            margin 8px 0 16px
          div
            width 257px
            height 50px
            background url("./images/year_button.png") no-repeat center /100% 100%
            margin 0 auto
            font-size 26
            color #ffd79f
            line-height 50px
        .index-type_two
          width 262px
          height 209px
          position absolute
          top 987px
          left 95px
          text-align center
          h6
            font-size 32px 
            color #c15815
            font-family 'Georgia'
            span 
              font-size 64px
          p
            font-size 21px
            color #75512d
            margin 8px 0 16px
          div
            width 176px
            height 50px
            background url("./images/button.png") no-repeat center /100% 100%
            margin 0 auto
            font-size 26
            color #ffd79f
            line-height 50px
        .index-type_three
          width 262px
          height 209px
          position absolute
          top 987px
          right  85px
          text-align center
          h6
            font-size 32px 
            color #c15815
            font-family 'Georgia'
            span 
              font-size 64px
          p
            font-size 21px
            color #75512d
            margin 8px 0 16px
          div
            width 176px
            height 50px
            background url("./images/button.png") no-repeat center /100% 100%
            margin 0 auto
            font-size 26
            color #ffd79f
            line-height 50px
      .index_one_tips
        font-size 20px
        color #fddc86
        text-align center
    .index-two
      width 100%
      height 2240px
      background url('./images/top_bg2.png') no-repeat center 
      background-size 100% 100%
      box-sizing border-box
      position relative
      .rank_top_bg
        width 96%
        height 154px
        position absolute
        background url("./images/rankings.png") no-repeat center/100% 100%
        left 50%
        transform translateX(-50%)
        top 450px
        z-index 0
        display none
      .index-two_title
        padding-top 96px
        padding-left 68px
        font-size 30px
        color #fddc86
        span:nth-of-type(1)
          margin-right 60px
        span:nth-of-type(2)
          margin-right 133px
        span:nth-of-type(3)
          margin-right 138px
      .index-two_user
        width 697px
        margin 0 auto
        span 
          display inline-block
          text-align center
          font-size 24px
          color #fff
        span:nth-of-type(1)
          width 115px 
        span:nth-of-type(2)
          width 138px 
        span:nth-of-type(3)
          width 240px 
        span:nth-of-type(4)
          width 174px 
        p 
          font-size 24px
          color #fddc86
          text-align center
          line-height 46px
          border-bottom 1px solid rgba(255, 255, 255, 0.5)
          margin 12px 25px 15px
          span 
            display inline
            color #fddc86
      .index-two_topUser
        width 679px
        overflow hidden
        margin 0 auto
        .topUser_box
          float left 
          width 220px
          height 392px
          text-align center
          img 
            width 160px
            height 285px
          .prize-name
            font-size 24px
            color #fff
            // margin-bottom 43px
          .user-phoneNum
            font-size 24px
            color #fddc86
            // margin 38px 0 25px
          .user-money
            font-size 24px 
            color #fff  
        .topUser_box:nth-of-type(1)
          margin-top 62px
        .topUser_box:nth-of-type(2)
          img
            width 220px
            height 348px
        .topUser_box:nth-of-type(3)
          margin-top 79px
          img
            width 162px
            height 273px
      ul
        height 1430px
        width 600px
        overflow scroll
        margin 0 auto
        text-align center
        // padding 0 30px
        position relative
        z-index 1
        box-sizing border-box
        padding-bottom 63px
        li
          width 600px
          height 194px
          font-size 24px
          color #fff
          text-align left 
          margin 0 auto
          overflow hidden
          vertical-align middle
          box-sizing border-box
          line-height 194px
          .rank_index
            width 43px
            display inline-block
            // margin-right 44px
            text-align left 
            margin-left 20px
          .rank_mobile
            display inline-block
            width 138px
            margin-right 46px
          .rank_money
            display inline-block
            width 150px
          .rank_img
            width 174px
            height 173px
            vertical-align middle
            margin 13px 0 8px
        li:nth-of-type(2n)  
          background url("./images/rankings.png") no-repeat center center/717px 333px   
        li:nth-of-type(1)
          height 0  
        li:nth-of-type(2)
          height 0 
        li:nth-of-type(3)
          height 0   
        li:nth-of-type(11+n)
          height 100px   
          line-height 100px 
    .index-three
      width 100%
      height 1765px
      background url("./images/top_bg3.png") no-repeat center/100% 100%
      margin-bottom 80px
      .index-three_rule
        padding-top 45px
        box-sizing border-box
        h5
          font-family 'SourceHanSansCN-Medium'
          font-size 30px
          color #ffd100
          text-align center
        ul
          overflow hidden
          width 671px
          margin 0 auto
          li
            width 130px
            height 133px
            background #4c0472
            border-radius 10px
            float left
            margin-right 5px
            text-align center
            box-sizing border-box
            padding 20px 0px
            font-size 24px
            .rule_rank
              color #ffd100
            .rule_prize
              color #fff
              margin 8px 6px 0
          li:nth-of-type(5)
            margin-right 0
      .index-three_prize
        width 244px
        height 60px
        background #ffd100
        border-radius 20px
        margin 27px auto
        font-size 30px
        color #000000
        line-height 60px
        text-align center
      .index-three_rule_details
        width 646px
        height 350px
        margin 0 auto
        font-size 24px
        color #fff
      .old-user_prize
        font-size 30px
        color #ffd100
        text-align center
        margin 55px 0
      .swiper-container
        width 472px
        height 520px
        .swiper-wrapper
          .swiper-slide
            text-align center
            img
              width 472px
              height 471px
        .swiper-pagination-bullets
          bottom 0px
          .swiper-pagination-bullet
            width 16px
            height 16px
            background rgba(133, 56, 177, 0.4)
          .swiper-pagination-bullet-active
            background #8538b1
      .swiper-con
        text-align center
        font-size 24px
        color #fff
    .index-three_prizes_tips
      width 584px
      margin 15px auto 0
      font-size 24px
      color #fddc86
      span 
        font-size 30px
  .go-to-top
    width 74px
    height 93px
    position absolute
    right 0
    bottom 350px
    background url("./images/to_top.png") no-repeat center/100% 100%
  .improtant_tips
      width 100%
      height 100%
      background-color rgba(0,0,0,.8)
      background-image url("./images/tips.png")
      background-position center 10px
      background-repeat no-repeat
      background-size 697px 1130px
      position absolute
      top 90px
      z-index 1
      overflow-y scroll
      .improtant_tips_hide
        width 79px
        height 79px
        position absolute
        top  1044px
        left 50%
        transform translateX(-50%)
a
  display none
@-webkit-keyframes move
  form
    transform translateX(0)
  to
    transform translatex(-100%)
</style>