<template>
  <div class="index">
    <div class="rull_gift">
      <img src="./images/rull.png" alt="" class="index-bg1_img1" @click="ruleFun">
      <img src="./images/gift.png" alt="" class="index-bg1_img2" @click="giftFun">
    </div>
    <div class="index-bg1">
      <section class="index-bg1-div">
        <div v-if="!end">剩余时间：
          <span v-text="publicData.day"></span>天
          <span v-text="publicData.hour"></span>时
          <span v-text="publicData.min"></span>分
          <span v-text="publicData.sec"></span>秒</div>
        <div v-else>活动已结束</div>
      </section>
      <div class="index-bg1-all">已有<span v-text="allNum"></span>位用户抽取大奖</div>
      <div class="index-bg1-news">
        <ul>
          <li v-for='(item,index) in newsList' :key="index">
            <span v-text="item.txt"></span>
            <span v-text="item.time"></span>
          </li>
        </ul>
        <ul>
          <li v-for='(item,index) in newsList' :key="index">
            <span v-text="item.txt"></span>
            <span v-text="item.time"></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-bg2">
      <div class="niu_danji">
          <!--机器-->
          <div class="game_qu">
            <img src="./images/glass.png" alt="">
            <!-- <img src="./images/glass_shadow.png" alt=""> -->
            <!--go-->
              <div @click="lotto" :class="userSurplusChange==0||userSurplusChange>0&&tenMinEnd?'game_over':'game_go'"></div>
              <div class="game_open" v-if="doorShow"></div>
              <div class="wdjifen">我有<span v-text="userSurplusChange"></span><span>次</span>抽奖机会</div>
          </div>
        <!--球-->
          <div class="dan_gund">
              <span  class="qiu_1 diaol_1"></span>
              <span  class="qiu_2 diaol_2"> </span>
              <span  class="qiu_3 diaol_3"></span>       
              <span  class="qiu_4 diaol_4"></span>
              <span  class="qiu_5 diaol_5"></span>
              <span  class="qiu_6 diaol_6"></span>     
              <span  class="qiu_7 diaol_7"></span>
              <span  class="qiu_8 diaol_8"></span>
              <span  class="qiu_9 diaol_9"></span>
              <span  class="qiu_10 diaol_10"></span> 
              <span  class="qiu_11 diaol_11"></span>     
              <span  class="qiu_12 diaol_12"></span>    
          </div>
        <!--中奖掉落-->
          <div class="zjdl">
              <span></span>
          </div>
      </div>
      <div class="bg2-hb"  @click="exchangeNow" v-if="userSurplusChange>=30">您有兑换红包的机会＞＞</div>
    </div>
    <div class="index-bg3">
      <div class="index-bg2-rank">
        <div class="rank-top"></div>
        <div class="rank-middle">
          <span>排名</span>
          <span>用户</span>
          <span>投资额</span>
          <span>奖品</span>
          <div class="index-two_user" v-show="myLoginShow">
            <span v-text="userRank"></span>
            <span>我</span>
            <div class="invest-money"><span v-text="userMoney">100000.00</span>元</div>
            <span v-text="userPrizes"></span>
            <p v-show="userDiffShow" v-if="userDiffMoneyShow">差<span v-text="userDiffMoney"></span>元可得<span v-text="userPrizesDiff"></span></p>
          </div>
          <ul>
            <li v-for="(rank,index) in rankData" :key="index">
              <span class="rank_index" v-if="index<=2"></span>
              <span class="rank_index" v-if="index>2" v-text="index+1">4</span>
              <i class="rank_mobile"  v-text="rank.mobile">155****7219</i>
              <i class="rank_money" v-text="rank.money">100000.00</i>
              <img :src="rank.imgUrl" alt="" v-if="index<=9">
              <span class="rank-prize" v-else v-text="rank.txt"></span>
              <p v-if="index===0">iPhone 7p、iPad、iWatch</p>
              <p v-if="index===1">美的空调、无叶电风扇、加湿器</p>
            </li>
          </ul>
        </div>
        <div class="rank-bottom"></div>
      </div>
    </div>
    <div class="index-bg4">
      <div class="old-user_prize">过往获奖用户</div>
        <div class="index-three_swipe">
          <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="./images/2 (1).png"></div>
                <div class="swiper-slide"><img src="./images/2 (2).png"></div>
                <div class="swiper-slide"><img src="./images/2 (3).png"></div>
                <div class="swiper-slide"><img src="./images/2 (4).png"></div>
                <div class="swiper-slide"><img src="./images/2 (5).png"></div>
                <div class="swiper-slide"><img src="./images/2 (6).png"></div>
                <div class="swiper-slide"><img src="./images/2 (7).png"></div>
                <div class="swiper-slide"><img src="./images/2 (8).png"></div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="swiper-con">
            <h6 class="swiper-con-h1">恭喜王财主在“母亲节加息又送礼”活动中获得iPhone7</h6>
            <h6 class="swiper-con-h2">2018年5月</h6>
          </div>
        </div>
        <div class="index-three_prizes_tips">
          <span>有奖提示：</span>本活动中凡获实物奖用户拍照发朋友圈，截图给微信鲸鱼-小可爱（xiaojy16）即可领5000元理财红包，限6月30日前。
        </div>
    </div>
    <div class="index-bg5"></div>
    <div class="index-bg6"></div>
    <alertGift v-if="$root.alertGift">
      <!-- 抽奖弹框 -->
      <div v-if="lottEndNum===1" class="markPrize">
        <img src="./images/jp1 (5).png">
        <p>iPhone7 32G</p>
      </div>
      <div v-if="lottEndNum===2" class="markPrize">
        <img src="./images/jp1 (6).png" >
        <p>粽子礼盒</p>
      </div>
      <div v-if="lottEndNum===3" class="markPrize">
        <img src="./images/jp1 (3).png" >
        <p>鲸鱼保温杯</p>
      </div>
      <div v-if="lottEndNum===4" class="markPrize">
        <img src="./images/jp1 (1).png" >
        <p>8.8元现金红包</p>
      </div>
      <div v-if="lottEndNum===5" class="markPrize">
        <img src="./images/jp1 (2).png" >
        <p>8元现金抵扣券</p>
      </div>
      <div  v-if="lottEndNum===6" class="markPrize">
        <img src="./images/jp1 (4).png">
        <p><span style="color:red" v-text="getmoney"></span>元理财红包</p>
      </div>
    </alertGift>
    <noChangce 
      v-if="$root.noChangce"  
      @emitInvestes="emitInvestes"
      ></noChangce>
    <alertExchange v-if="$root.alertExchange"></alertExchange>
    <alertExchangeYes 
      v-show="$root.alertExchangeYes" 
      :combinationId="combinationId"
      :token="token"
      @getActivityFun="getActivityFun">
    </alertExchangeYes>
    <div class="index-bg1-invest">
      <!-- <div class="bg1-invest_year" @click="getInvestFun('10','活动标')"> -->
      <div class="bg1-invest_year" @click="getInvestFun('2','年定期')">
        <img src="./images/hot.png" alt="">
        <h6>年 6.0%</h6>
        <p>每投资1000元</p>
        <div>抽奖3次</div>
      </div>
      <div class="bg1-invest_season" @click="getInvestFun('7','季定期')">
        <h6>季 5.6%</h6>
        <p>每投资1000元</p>
        <div>抽奖2次</div>
      </div>
      <div class="bg1-invest_month" @click="getInvestFun('6','月定期')">
        <h6>月 5.4%</h6>
        <p>每投资1000元</p>
        <div>抽奖1次</div>
      </div>
    </div>
  </div>
</template>

<script>
import xHeader from "@/views/app/components/x-header/index";
import { Swiper } from "./plugin/swiper-4.2.2.min.js";
import "./style/swiper-4.2.2.min.css";
import "./plugin/jquery.min.js";
import Flash from "@/components/flash";
import * as jrUrl from "./urlconfig/urlconfig";
import {getRequest,pattern} from "./util/util"; //获取参数
import alertGift from './components/alertGift'
import noChangce from './components/noChangce'
import alertExchange from './components/alertExchange'
import alertExchangeYes from './components/alertExchangeYes'
export default {
  name: "carrousel",
  components: {
    xHeader,
    alertGift,
    noChangce,
    alertExchange,
    alertExchangeYes
  },
  data() {
    return {
      newsList: [],//轮播数据
      end: false, //活动是否结束
      test: "",
      to_top: false, //回到顶部按钮
      importantTipsShow: false, //重要提示弹框
      userRank: "/", //用户当前排名
      userMoney: "", //用户投资金额
      userPrizes: "", //用户奖品
      userDiffMoney: "", //距离上奖品还差多少金额
      userPrizesDiff: "", //可能获得的上一奖品
      diffPrevIndex: "", //与上一奖品的距离
      userDiffShow: true,
      rankData: [], //排行榜
      ranKDataTop: [], //前三排行榜
      rankDataGift: [],
      userLogin: "", //判断用户是否登录
      allNum:"",//已有用户抽奖人数
      awardIndex:"",//轮播数据为6时返回具体金额
      userSurplusChange:"",//用户的抽奖次数
      luckDrawShow:false,//用户是否能抽奖
      lottEndNum: null,//抽奖结果数字
      doorShow:false,//抽奖小门门
      tenMinEnd: true,//是否活动结束后10分钟,true:即活动彻底结束后
      endTime: 0,//活动结束时间往后延时10分钟
      isTurning:false,//是否在抽奖
      // is_disabled: false,// 点击抽奖后，抽奖按钮禁用token
      turnCombinationId:"",
      getmoney:"",//抽中随机金额
      userDiffMoneyShow:true,//距离奖品是否显示
      publicData: {
        //倒计时
        deadTime: 0,
        day: null,
        hour: null,
        min: null,
        sec: null
      },
      myLoginShow: true,
      moneyRate:{//利率
        currentRate: '',
        monRate: '',
        quaRate: '',
        yearRate: ''
      },
      allGift: [
        "苹果三件套",
        "美的夏日三件套",
        "小米电动滑板车",
        "美的4L电饭锅",
        "飞利浦电动剃须刀",
        "捶背按摩器",
        "美的水果榨汁机",
        "红豆家纺夏日冰丝凉席三件套",
        "七匹狼皮带钱包皮具礼盒",
        "小熊煮蛋器",
        "88元现金红包",
        "88888元理财红包"
      ],
      countDownTime: "", //判断活动是否结束
      productId: "",
      productName: "",
      eventRefId: "",
    };
  },
  computed: {},
  created() {
    this.token = getRequest()["token"];
    this.combinationId = getRequest()["combinationId"];
    this.isShowCoupon = getRequest()["isShowCoupon"];
    // this.inviter = getRequest()['inviter']
    this.getActivityFun();
    pattern() 
  },
  mounted() {
    console.log(this.userDiffMoney)
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
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜王财主在“母亲节加息又送礼”活动中获得iPhone7'
              document.querySelector('.swiper-con-h2').innerHTML = '2018年5月'
            }else if(activeIndex === 1){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜钱财主在“母亲节加息又送礼”活动中获得iPhone7'
              document.querySelector('.swiper-con-h2').innerHTML = '2018年5月'
            }else if(activeIndex === 2){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜张财主在“母亲节加息又送礼”活动中获得周六福手链'
              document.querySelector('.swiper-con-h2').innerHTML = '2018年5月'
            }else if(activeIndex === 3){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜常财主在“母亲节加息又送礼”活动中获得周六福手链'
              document.querySelector('.swiper-con-h2').innerHTML = '2018年5月'
            }else if(activeIndex === 4){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜张财主在“母亲节加息又送礼”活动中获得百雀羚护肤套装'
              document.querySelector('.swiper-con-h2').innerHTML = '2018年5月'
            }else if(activeIndex === 5){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜王财主在“投资抽豪礼”活动中获得iphone 7 plus'
              document.querySelector('.swiper-con-h2').innerHTML = '2018年4月'
            }else if(activeIndex === 6){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜汪财主在“投资抽豪礼”活动中获得小米充电宝'
              document.querySelector('.swiper-con-h2').innerHTML = '2018年4月'
            }else if(activeIndex === 7){
              document.querySelector('.swiper-con-h1').innerHTML = '恭喜杨财主在“投资抽豪礼”活动中获得鲸鱼保温杯'
              document.querySelector('.swiper-con-h2').innerHTML = '2018年4月'
            }
          },
        }
      }) 
  },
  methods: {
    //获取活动信息
    getActivityFun() {
      let params = {
        combinationId:this.combinationId,
        token:this.token
        // combinationId:"5NUVGIcfFo1gWQfOb3eu8w==",
        // debug:"1",
        // userId:"100131554"
      };
      this.$http(jrUrl.productMessage, params).then(res => {
        this.newsList = []
        this.publicData.deadTime = res.countDownTime
        this.countDownTime = res.countDownTime
        this.allNum = res.allUserUsedCount
        this.userLogin = res.userLogin
        this.userDiffMoney = res.userDiffMoney
        this.userMoney = res.userInvestmentMoney//用户投资金额
        this.userRank = res.userRankIndex//用户当前排名
        this.diffPrevIndex = res.diffPrevIndex
        this.userSurplusChange = res.userSurplusChange//抽奖机会
        this.userPrizesFun()
        this.userPrizesDiffFun()
        this.userDiffMoneyFun()
        if(res.userLogin ===0){
          // 未登录
          this.$root.log = false
        }else if(res.userLogin === 1){
          this.$root.log = true
        }
        this.endTime = res.endTimestamp + 600//检测活动是否位于结束10分钟之前
        this.tenMinEnd = false
        if(res.endTime-Date.now()<=0){
          // 活动结束10分钟后
          this.tenMinEnd = true
        }
        if(this.countDownTime<=0){
          // 是否结束
          this.end = true
        }else{
          this.end = false
          this.publicData.deadTime = res.countDownTime
          this.deadTime()
        }
        if(res.allOnliveLiveData.length>0){
          res.allOnliveLiveData.map((val,i)=>{
            let data = new Date(val.awardTimestamp*1000)
            if(this.getGift(val.awardIndex) === '15元现金红包'){
              this.newsList.push({
                txt: val.provinceName+'的'+val.userName+'兑换'+this.getGift(val.awardIndex)+' '+ data.pattern("MM/dd HH:mm")
              })
            }
            if(this.getGift(val.awardIndex) === '6'){
              this.newsList.push({
                txt: val.provinceName+'的'+val.userName+'抽中'+val.awardMoney+'元理财红包'+''+ data.pattern("MM/dd HH:mm")
              })
            }else{
              this.newsList.push({
                txt: val.provinceName+'的'+val.userName+'抽中'+this.getGift(val.awardIndex)+' '+ data.pattern("MM/dd HH:mm")
              })
            }
          })
        }
        //排行榜
          this.rankDataGift=[
            require('./images/ranking1.png'),
            require("./images/ranking2.png"),
            require('./images/ranking3.png'),
            require('./images/ranking4.png'),
            require("./images/ranking5.png"),
            require("./images/ranking6.png"),
            require('./images/ranking7.png'),
            require('./images/ranking8.png'),
            require("./images/ranking9.png"),
            require("./images/ranking10.png"),
            '88元现金红包',
            '88888元理财红包',
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
              }else if(i===5){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  imgUrl:this.rankDataGift[5]
                })
              }else if(i===6){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  imgUrl:this.rankDataGift[6]
                })
              }else if(i===7){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  imgUrl:this.rankDataGift[7]
                })
              }else if(i===8){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  imgUrl:this.rankDataGift[8]
                })
              }
              else if(i===9){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  imgUrl:this.rankDataGift[9]
                })
              }else if(i>=10&&i<=19){
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  txt:this.rankDataGift[10]
                })
              }else{
                this.rankData.push({
                  mobile: val.mobile,
                  money: val.money,
                  txt:this.rankDataGift[11]
                })
              }
            })
          }
      });
    },
    userDiffMoneyFun(){
      if(this.userDiffMoney ==0){
        this.userDiffMoneyShow = false
      }else{
        this.userDiffMoneyShow = true        
      }
    },
    getGift(num){
      if(num == 1){
        return 'iPhone 7plus'
      }else if(num == 2){
        return '粽子礼盒'
      }else if(num == 3){
        return '鲸鱼保温杯'
      }else if(num == 4){
        return '8.8元现金红包'
      }else if(num == 5){
        return '8元现金抵扣券'
      }else if(num == 6){
        return "6"
      }else if(num == 7){
        return '15元现金红包'
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
          this.eventRefId = res
          this.$JinrSDK.pushProductTurnIn(
            productId, 
            productName, 
            '2', 
            '4', 
            this.eventRefId.toString(), 
            '0', 
            '0',
            this.isShowCoupon.toString()
          )
        })
      }
    },
    //倒计时
    deadTime() {
      let time;
      clearInterval(time);
      time = setInterval(() => {
        this.publicData.day = Math.floor(this.publicData.deadTime / 3600 / 24);
        this.publicData.hour = Math.floor(
          (this.publicData.deadTime - this.publicData.day * 3600 * 24) / 3600
        );
        this.publicData.min = Math.floor(
          (this.publicData.deadTime -
            this.publicData.day * 3600 * 24 -
            this.publicData.hour * 3600) /
            60
        );
        this.publicData.sec = Math.floor(
          this.publicData.deadTime -
            this.publicData.day * 3600 * 24 -
            this.publicData.hour * 3600 -
            this.publicData.min * 60
        );
        this.publicData.deadTime--;
        if (this.publicData.deadTime === -1) {
          this.end = true;
          clearInterval(time);
        }
      }, 1000);
    },
    //判断用户是否登录
    loginCheckFun(){
      if(this.userLogin==0||this.userLogin=="0"){
        this.myLoginShow = true
        }else{
          this.myLoginShow = false
        }
    },
    exchangeNow(){
      // 兑换15元现金券
      if(this.endTime*1000-Date.now()<=0){
        Flash('活动已结束!')
        return false
      }
      this.$root.alertExchange=true
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
    //抽奖效果
    luckDrawFun(number){
      if (this.userSurplusChange < 0) {
        for (var i = 1; i <= 12; i++) {
          $(".qiu_" + i).removeClass("wieyi_" + i);
        }
        $("#no_jifeng").show();
      } else {
        this.drawFun(number);
      }
    },
    //抽奖结果效果
    drawFun(number){
      setTimeout(() => {
        for(var i=1;i<=12;i++){
		      $(".qiu_"+i).removeClass("wieyi_"+i);
		    }
      }, 1200);
      setTimeout(() => {
        if(number==1){
        this.doorShow = true  
        $(".zjdl").children("span").addClass("diaL_one");
        for (var i = 1; i <= 12; i++) {
          $(".qiu_" + i).removeClass("wieyi_" + i);
        }
      }else if(number==2){
        this.doorShow = true  
        $(".zjdl").children("span").addClass("diaL_two");
        for (var i = 1; i <= 12; i++) {
          $(".qiu_" + i).removeClass("wieyi_" + i);
        }
      }else if(number==3){
        this.doorShow = true  
        $(".zjdl").children("span").addClass("diaL_three"); 
        for (var i = 1; i <= 12; i++) {
          $(".qiu_" + i).removeClass("wieyi_" + i);
        }       
      }else if(number==4){
        this.doorShow = true  
        $(".zjdl").children("span").addClass("diaL_four");
        for (var i = 1; i <= 12; i++) {
          $(".qiu_" + i).removeClass("wieyi_" + i);
        }
      }else if(number==5){
        this.doorShow = true  
        $(".zjdl").children("span").addClass("diaL_five");
        for (var i = 1; i <= 12; i++) {
          $(".qiu_" + i).removeClass("wieyi_" + i);
        }
      }else if(number==6){
        this.doorShow = true  
        $(".zjdl").children("span").addClass("diaL_six");
        for (var i = 1; i <= 12; i++) {
          $(".qiu_" + i).removeClass("wieyi_" + i);
        }
      }else{
        console.log("参数错误")
      }
      }, 1500);
      $(".zjdl").removeClass("none").addClass("dila_Y");      
    },
    //抽奖
    getLuckFun(){
      if(this.userSurplusChange<=0){
        return
      }else{
        let params = {
        combinationId: this.combinationId,
        token: this.token,
        // combinationId:"5NUVGIcfFo1gWQfOb3eu8w==",
        // token:"123456"
        }
        this.$http(jrUrl.checkLuckDraw,params).then(res=>{
          this.getmoney = res.money
          this.luckDrawFun(res.level)
          for (var i = 1; i <= 12; i++) {
            $(".qiu_" + i).removeClass("diaol_" + i);
            $(".qiu_" + i).addClass("wieyi_" + i);
          }
            setTimeout(() => {
              setTimeout(() => {
                $(".zjdl").addClass("none").removeClass("dila_Y");
                $(".zjdl").children("span").removeAttr('class');
              }, 1000);
              if(res.level == 1){
                this.$root.alertGift = true
                this.lottEndNum = 1
                this.$root.giftType = 'sw'
                this.isTurning = false
                this.doorShow = false
              }else if(res.level == 2){        
                this.$root.alertGift = true
                this.lottEndNum = 2
                this.$root.giftType = 'sw'
                this.isTurning = false  
                this.doorShow = false        
              }else if(res.level == 3){
                this.$root.alertGift = true
                this.lottEndNum = 3
                this.$root.giftType = 'sw'
                this.isTurning = false   
                this.doorShow = false       
              }else if(res.level == 4){
                this.$root.alertGift = true
                this.lottEndNum = 4
                this.$root.giftType = 'xn'
                this.isTurning = false   
                this.doorShow = false       
              }else if(res.level == 5){
                this.$root.alertGift = true
                this.lottEndNum = 5
                this.$root.giftType = 'xn'
                this.isTurning = false     
                this.doorShow = false    
              }else if(res.level == 6){
                this.$root.alertGift = true
                this.lottEndNum = 6
                this.$root.giftType = 'xn'
                this.isTurning = false    
                this.doorShow = false      
              }else{
                console.log('抽奖返回值有误!')
              }
            this.is_disabled = false
            }, 2500);
            this.getActivityFun()
          })
      }
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
      }else if(this.userRank=='5'||this.userRank==6){
        this.userPrizes = this.allGift[5]
      }else if(this.userRank=='7'||this.userRank==7){
        this.userPrizes = this.allGift[6]
      }else if(this.userRank=='8'||this.userRank==8){
        this.userPrizes = this.allGift[7]
      }else if(this.userRank=='9'||this.userRank==9){
        this.userPrizes = this.allGift[8]
      }else if(this.userRank=='10'||this.userRank==10){
        this.userPrizes = this.allGift[9]
      }else if(this.userRank>=11&&this.userRank<=20){
        this.userPrizes = this.allGift[10]
      }else if(this.userRank>=21&&this.userRank<=50){
        this.userPrizes = this.allGift[11]
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
      }else if(this.diffPrevIndex=='5'||this.diffPrevIndex==6){
        this.userPrizesDiff = this.allGift[5]
      }else if(this.diffPrevIndex=='7'||this.diffPrevIndex==7){
        this.userPrizesDiff = this.allGift[6]
      }else if(this.diffPrevIndex=='8'||this.diffPrevIndex==8){
        this.userPrizesDiff = this.allGift[7]
      }else if(this.diffPrevIndex=='9'||this.diffPrevIndex==9){
        this.userPrizesDiff = this.allGift[8]
      }else if(this.diffPrevIndex=='10'||this.diffPrevIndex==10){
        this.userPrizesDiff = this.allGift[9]
      }else if(this.diffPrevIndex>=11&&this.diffPrevIndex<=20){
        this.userPrizesDiff = this.allGift[10]
      }else if(this.diffPrevIndex>=21&&this.diffPrevIndex<=50){
        this.userPrizesDiff = this.allGift[11]
      }else{
        this.userPrizesDiff = "/"
        }  
    },
    lotto () {
      if(!this.$root.log){
        Flash('请先登录!')
        return false;
      }
      if(this.end&&this.userSurplusChange === 0){
        // 活动结束
        Flash('活动已结束!')
        return false;
      }
      if(!this.end&&this.userSurplusChange === 0){
        // 未结束且无机会
        this.$root.noChangce = true
      }

      if(this.tenMinEnd){
        Flash('活动已结束!')
        return false
      }
      if(this.endTime*1000-Date.now()<=0){
        // 活动结束10分钟后
        this.tenMinEnd = true
        Flash('活动已结束!')
        return false
      }
      if (this.is_disabled){
        return false;
      }
      this.isTurning = true
      this.is_disabled = true
      this.getLuckFun()
    },
    //跳转规则页面
    ruleFun() {
      if(!this.isTurning){
        this.$router.push("/rule");        
      }
    },
    //跳转奖品页面
    giftFun() {
      if (!this.isTurning) {
        this.$router.push("/gift");        
      }
    },
  }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
@import './style/animation.styl';
a
  display none
</style>