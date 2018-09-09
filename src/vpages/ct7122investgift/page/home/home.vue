<template>
  <div class="index">
    <img class="index-bg1-img1" @click="toRule" style="top:70px;" src="../../images/i-bg3.png">
    <img class="index-bg1-img2" @click="toGift" style="top:120px;" src="../../images/i-bg2.png">
    <div class="index-wrap">
      <section class="index-bg1">
        <!-- <img class="index-bg1-img1" @click="$router.push('/rule')" style="top:70px;" src="../../images/i-bg3.png">
        <img class="index-bg1-img2" @click="$router.push('/gift')" style="top:120px;" src="../../images/i-bg2.png"> -->
        <section class="index-bg1-div">
          <div v-if="!end">剩余时间：<span v-text="publicData.day"></span>天<span v-text="publicData.hour"></span>时<span v-text="publicData.min"></span>分<span v-text="publicData.sec"></span>秒</div>
          <div v-else>活动已结束</div>
        </section>
        <section class="index-bg1-roll">
          <div class="roll-div1">已有<span v-text="getNum"></span>位用户抽取大奖</div>
          <div class="roll-div2">
            <ul>
              <li v-for='(item,index) in rollData' :key="index">
                <span v-text="item.txt"></span>
                <span v-text="item.time"></span>
              </li>
            </ul>
            <ul>
              <li v-for='(item,index) in rollData' :key="index">
                <span v-text="item.txt"></span>
                <span v-text="item.time"></span>
              </li>
            </ul>
          </div>
        </section>
      </section>
      <section class="index-bg2">
        <div class="index-bg2-div1">我有<span v-text="chance"></span><span>次</span>抽奖机会</div>
        <div class="game">
          <div class="item" :class="pointer===0 ? 'current' : ''"></div>
          <div class="item" :class="pointer===1 ? 'current' : ''"></div>
          <div class="item" :class="pointer===2 ? 'current' : ''"></div>
          <div class="item" :class="pointer===7 ? 'current' : ''"></div>
          <!-- <button class="item" id="run-btn" @click="lotto"></button> -->
          <img class="item" id="run-btn" @click="lotto" :src="chance===0||tenMinEnd&&chance>0?nochanceImg:chanceImg">
          <div class="item" :class="pointer===3 ? 'current' : ''"></div>
          <div class="item" :class="pointer===6 ? 'current' : ''"></div>
          <div class="item" :class="pointer===5 ? 'current' : ''"></div>
          <div class="item" :class="pointer===4 ? 'current' : ''"></div>
        </div>
        <a href="javascript:;" v-if="chance>=30" @click="exchangeNow">您有兑换红包的机会>></a>
      </section>
      <section class="index-bg3">
        <div class="index-bg3-div1" v-if="$root.log">
          <div>
            <span v-text="userData.rank">2</span>
            <span>我</span>
            <span v-text="userData.money">0</span>
            <!-- <span v-if='userData.rank>50'>\</span> -->
            <span v-text="userData.gift"></span>
          </div>
          <div v-if="userData.rank>1">差<span v-text="differMoney"></span>元可得<span v-text="differGift"></span></div>
        </div>
        <ul :class="{logTrue:!$root.log,'index-bg3-ul':$root.log}">
          <li v-for="(item,index) in rankList" :key="index">
            <div class="rankList-div1" v-if="index===0">iPhone 7p、iPad、iWatch</div>
            <div class="rankList-div2" v-if="index===1">小米电视、小米Note3、小米AI音箱</div>
            <img class="rankList-img1" v-if="index<=2" :src="item.rank">
            <span class="rankList-span1" v-else v-text="item.rank"></span>
            <i class="rankList-i1" v-text="item.mobile"></i>
            <i class="rankList-i2" v-text="item.money"></i>
            <img class="rankList-img2" v-if="index<=9" :src="item.imgUrl">
            <span class="rankList-span2" v-else v-text="item.txt"></span>
          </li>
        </ul>
      </section>
      <section class="index-bg4"></section>
      <section class="index-bg5">
        <p>过往获奖用户</p>
        <div class="index-bg5-swipe">
          <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="../../images/i-bg49.png"></div>
                <div class="swiper-slide"><img src="../../images/i-bg45.png"></div>
                <div class="swiper-slide"><img src="../../images/i-bg47.png"></div>
                <div class="swiper-slide"><img src="../../images/i-bg43.png"></div>
                <div class="swiper-slide"><img src="../../images/i-bg44.png"></div>
                <div class="swiper-slide"><img src="../../images/i-bg46.png"></div>
                <div class="swiper-slide"><img src="../../images/i-bg48.png"></div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="swiper-con">
            <h6 class="swiper-con-h1">恭喜李财主在“投资送iPhoneX”活动中获得iPhoneX</h6>
            <h6 class="swiper-con-h2">2018年1月</h6>
          </div>
        </div>
        <div class="index-bg5-div">
          <span>有奖提示：</span>本活动中凡获实物奖用户拍照发朋友圈，截图给微信鲸鱼-小可爱（xiaojy16）即可领5000元理财红包，限5月31日前
        </div>
      </section>
      <section class="index-bg6">
        <p>本活动最终解释权归鲸鱼所有,活动仅限部分地区部分用户参与</p>
        <p>官方客服热线1010-2015 -存钱赚利息，就上鲸鱼APP-</p>
        <p>本活动与苹果公司无关</p>
        <p>投资有风险，理财需谨慎</p>
      </section>
    </div>
    <alertGift v-if="$root.alertGift">
      <!-- 抽奖弹框 -->
      <img src="../../images/i-bg34.png" v-if="lottEndNum===3">
      <img src="../../images/i-bg35.png" v-if="lottEndNum===5">
      <img src="../../images/i-bg36.png" v-if="lottEndNum===1">
      <img src="../../images/i-bg37.png" v-if="lottEndNum===2">
      <img src="../../images/i-bg38.png" v-if="lottEndNum===4">
      <img src="../../images/i-bg39.png" v-if="lottEndNum===6">
    </alertGift>
    <noChangce 
      v-if="$root.noChangce" 
      :moneyRate="moneyRate" 
      @emitInvestes="emitInvestes"
      ></noChangce>
    <alertExchange v-if="$root.alertExchange"></alertExchange>
    <alertExchangeYes 
      v-show="$root.alertExchangeYes" 
      :combinationId="combinationId"
      :token="token"
      @getInitData="getInitData">
    </alertExchangeYes>
    <section class="index-bg7">
      <div @click="investes('year')">年<span v-text="moneyRate.yearRate"></span></div>
      <div @click="investes('quart')">季<span v-text="moneyRate.quaRate"></span></div>
      <div @click="investes('mon')">月<span v-text="moneyRate.monRate"></span></div>
    </section>
  </div>
</template>

<script>
// import {mapState,mapMutations} from 'vuex'
import * as jrUrl from '../../urlconfig/urlconfig'
import {getRequest,pattern} from '../../util/util'
import Flash from '@/components/flash'
// import {fetchWXconfig} from '../../plugin/fetchWXconfig'
import jinrsdk from 'src/jinr-sdk/index'
import {Swiper} from '../../plugin/swiper-4.2.2.min.js'
import '../../style/swiper-4.2.2.min.css'
import '../../plugin/jquery.min.js'
import alertGift from '../../components/alertGift'
import noChangce from '../../components/noChangce'
import alertExchange from '../../components/alertExchange'
import alertExchangeYes from '../../components/alertExchangeYes'

export default {
  components: {
    alertGift,
    noChangce,
    alertExchange,
    alertExchangeYes
  },
  name: 'index',
  data () {
    return {
      debug: 1,
      userId: 100131129,
      isTurning: false,//转盘是否在转动
      token: '',
      combinationId: '',
      endTime: 0,//活动结束时间往后延时10分钟
      lottEndNum: null,//抽奖结果数字
      tenMinEnd: true,//是否活动结束后10分钟,true:即活动彻底结束后
      turnCombinationId: '',
      nochanceImg: require('../../images/i-bg12.png'),
      chanceImg: require('../../images/i-bg13.png'),
      isShowCoupon: null,
      publicData: {//倒计时
        deadTime: 0,
        day: null,
        hour: null,
        min: null,
        sec: null
      },
      userData: {
        rank: null,
        money: null,
        gift: ''
      },//用户排名信息
      // log: true,
      end: true,
      moneyRate:{//利率
        currentRate: '',
        monRate: '',
        quaRate: '',
        yearRate: ''
      },
      time: null,
      differMoney: 0,//差多少钱
      differGift: '',//可得什么礼品
      getNum: 0,//中奖人数
      rollData: [//轮播数据
      ],
      rankList: [],//排行榜数据
      chance: 0,    // 用户的抽奖次数
      pointer:0,   // 抽奖时转动的指针
      temporaryPointer: 0, // 记录本次抽奖已经转动的次数
      ring: 3,      // 抽奖时的转动圈数
      currentIndex: 0, // 当前第几次抽奖
      distance: 0,    // 抽奖需要转动的次数
      cutoff: 0,      // 每次抽奖的目标位置
      prizeLength: 8, // 奖品池的奖品数量
      speedFlag: 5,   // 抽奖时加减速度的标志位
      speedParam: 150, // 抽奖时速度递增递减的参数(timingTime 加减 speedParam)
      timer: '',    // 定时器
      is_disabled: false, // 点击抽奖后，抽奖按钮禁用token
      runPlay: '',
      commentsRunPlay: '',
      transitiontoken: true,
      timingTime: 700,   // 初始的定时器间隔1000毫秒
    }
  },
  computed: {

  },
  created () {
    this.token = getRequest()['token']
    this.combinationId = getRequest()['combinationId']
    this.isShowCoupon = getRequest()['isShowCoupon'].toString()
    this.inviter = getRequest()['inviter']
    this.getOnlineProduct()
    pattern()
    this.getInitData()
  },
  mounted () {
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
            document.querySelector('.swiper-con-h1').innerHTML = '恭喜李财主在“投资送iPhoneX”活动中获得iPhoneX'
            document.querySelector('.swiper-con-h2').innerHTML = '2018年1月'
          }else if(activeIndex === 1){
            document.querySelector('.swiper-con-h1').innerHTML = '恭喜高财主在“投资送iPhoneX”活动中获得iPad'
            document.querySelector('.swiper-con-h2').innerHTML = '2018年1月'
          }else if(activeIndex === 2){
            document.querySelector('.swiper-con-h1').innerHTML = '恭喜李财主在“投资狂欢派对”活动中获得TCL冰箱'
            document.querySelector('.swiper-con-h2').innerHTML = '2016年3月'
          }else if(activeIndex === 3){
            document.querySelector('.swiper-con-h1').innerHTML = '恭喜社群VIP用户在社群活动中获得鲸鱼保温杯'
            document.querySelector('.swiper-con-h2').innerHTML = '2017年8月'
          }else if(activeIndex === 4){
            document.querySelector('.swiper-con-h1').innerHTML = '恭喜社群VIP用户在社群活动中获得鲸鱼宝宝'
            document.querySelector('.swiper-con-h2').innerHTML = '2017年6月'
          }else if(activeIndex === 5){
            document.querySelector('.swiper-con-h1').innerHTML = '恭喜社群VIP用户在社群活动中获得鲸鱼宝宝'
            document.querySelector('.swiper-con-h2').innerHTML = '2017年6月'
          }else if(activeIndex === 6){
            document.querySelector('.swiper-con-h1').innerHTML = '恭喜社群VIP用户在社群活动中获得鲸鱼宝宝和保温杯'
            document.querySelector('.swiper-con-h2').innerHTML = '2017年8月'
          }
        },
      }
    })
  },
  methods: {
    toGift(){
      if(!this.isTurning||this.chance === 0){
        this.$router.push('/gift')
      }
    },
    toRule(){
      if(!this.isTurning||this.chance === 0){
        this.$router.push('/rule')
      }
    },
    getInitData(){
      let params = {
        // combinationId: this.combinationId,
        // token: this.token
        debug: this.debug,
        userId: this.userId
      }
      this.$http(jrUrl.getInitData,params).then(res=>{
        this.rankList = []
        this.rollData = []
        if(res.userLogin ===0){
          // 未登录
          this.$root.log = false
        }else if(res.userLogin === 1){
          this.$root.log = true
        }
        this.endTime = res.endTimestamp + 600//检测活动是否位于结束10分钟之前
        this.tenMinEnd = false
        if(this.endTime*1000-Date.now()<=0){
          // 活动结束10分钟后
          this.tenMinEnd = true
        }
        if(res.countDownTime<=0){
          // 是否结束
          this.end = true
        }else{
          this.end = false
          this.publicData.deadTime = res.countDownTime
          this.deadTime()
        }
        // 已有用户抽奖人数
        this.getNum = res.allUserUsedCount
        if(res.allOnliveLiveData.length>0){
          res.allOnliveLiveData.map((val,i)=>{
            let data = new Date(val.awardTimestamp*1000)
            if(val.provinceName == '广西壮族自治区'){
              val.provinceName = '广西'
            }else if(val.provinceName == '宁夏回族自治区'){
              val.provinceName = '宁夏'
            }else if(val.provinceName == '西藏自治区'){
              val.provinceName = '西藏'
            }else if(val.provinceName == '新疆维吾尔自治区'){
              val.provinceName = '新疆'
            }else if(val.provinceName == '内蒙古自治区'){
              val.provinceName = '内蒙古'
            }
            if(this.getGift(val.awardIndex) === '15元现金红包'){
              this.rollData.push({
                txt: val.provinceName+'的'+val.userName+'兑换'+this.getGift(val.awardIndex)+' '+ data.pattern("MM/dd HH:mm")
              })
            }else{
              this.rollData.push({
                txt: val.provinceName+'的'+val.userName+'抽中'+this.getGift(val.awardIndex)+' '+ data.pattern("MM/dd HH:mm")
              })
            }
          })
        }
        // 用户抽奖次数
        this.chance = res.userSurplusChange
        this.userData.money = res.userInvestmentMoney
        if(typeof(res.userRankIndex)==='number'&&res.userRankIndex<=50){
          this.userData.rank = res.userRankIndex
          this.userData.gift = this.findUserGift(res.userRankIndex,res.rankData)
          if(this.userData.rank>1){
            this.differMoney = res.userDiffMoney
            this.differGift = this.findUserGift(res.diffPrevIndex,res.rankData)
          }
        }else{
          this.userData.rank = "/"
          this.userData.gift = "/"
        }
        // 排行榜
        if(res.rankData.length>0){
          res.rankData.map((val,i)=>{
            if(i===0){
              this.rankList.push({
                rank: require('../../images/i-bg15.png'),
                mobile: val.mobile,
                money: val.money,
                imgUrl: require('../../images/i-bg18.png')
              })
            }else if(i===1){
              this.rankList.push({
                rank: require('../../images/i-bg16.png'),
                mobile: val.mobile,
                money: val.money,
                imgUrl: require('../../images/i-bg19.png')
              })
            }else if(i===2){
              this.rankList.push({
                rank: require('../../images/i-bg17.png'),
                mobile: val.mobile,
                money: val.money,
                imgUrl: require('../../images/i-bg20.png')
              })
            }else if(i>=3&&i<=9){
              this.rankList.push({
                rank: i+1,
                mobile: val.mobile,
                money: val.money,
                imgUrl: require('../../images/i-bg'+ (i+18) +'.png')
              })
            }else if(i>=10&&i<=19){
              this.rankList.push({
                rank: i+1,
                mobile: val.mobile,
                money: val.money,
                txt: '66元现金红包'
              })
            }else{
              this.rankList.push({
                rank: i+1,
                mobile: val.mobile,
                money: val.money,
                txt: '6.6万理财红包'
              })
            }
          })
        }
        console.log(res)
      })
    },
    exchangeNow(){
      // 兑换15元现金券
      if(this.endTime*1000-Date.now()<=0){
        Flash('活动已结束!')
        return false
      }
      this.$root.alertExchange=true
    },
    luckDraw(){
      let params = {
        combinationId: this.combinationId,
        token: this.token,
      }
      this.$http(jrUrl.luckDraw,params).then(res=>{
        console.log(res,'抽奖结果')
        this.getInitData()
        if(res === 1){
          this.lottEndNum = 1
          this.cutoff = 0
          this.$root.giftType = 'sw'
        }else if(res === 2){
          this.lottEndNum = 2
          this.$root.giftType = 'xn'
          this.cutoff = 1
        }else if(res === 3){
          this.lottEndNum = 3
          this.$root.giftType = 'sw'
          this.cutoff = 2
        }else if(res === 4){
          this.lottEndNum = 4
          this.$root.giftType = 'xn'
          this.cutoff = 7
        }else if(res === 5){
          this.lottEndNum = 5
          this.$root.giftType = 'xn'
          this.cutoff = 5
        }else if(res === 6){
          this.lottEndNum = 6
          this.$root.giftType = 'sw'
          this.cutoff = 6
        }else{
          console.log('抽奖返回值有误!')
        }
        this.resetCurrentIndex()
        this.resetDistance()
        // 启动抽奖定时器
        this.timer = setTimeout(this.timerMethod, this.timingTime)
      })
    },
    findUserGift(rank,arr){
      // 由用户排名在排行榜查找奖品
      let _arrays = ['苹果三件套','小米三件套','小米滑板车','小米血压计','小米小爱音箱','小米体脂秤','小米手环2','小米耳机','小米移动电源','小米路由器','66元现金红包','6.6万理财红包']
      
      if(arr.length>0){
        arr.map((val,i)=>{
          if( i<10 ){
            arr[i]['gift'] = _arrays[i]
          }else if(i>=10&&i<20){
            arr[i]['gift'] = _arrays[10]
          }else{
            arr[i]['gift'] = _arrays[11]
          }
        })
      }

      if( rank >10 && rank<=20 ){
         return '66元现金红包';
      }else if(rank>20){
        return '6.6万理财红包';
      }else{
        return _arrays[ rank-1 ]
      }
    },
    getGift(num){
      if(num == 1){
        // iPhone 7plus
        return 'iPhone 7plus'
      }else if(num == 2){
        return '1688元理财红包'
      }else if(num == 3){
        return '鲸鱼公仔4个装'
      }else if(num == 4){
        return '6.6万理财红包'
      }else if(num == 5){
        return '6元现金抵扣券'
      }else if(num == 6){
        return '鲸鱼保温杯'
      }else if(num == 7){
        return '15元现金红包'
      }
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
    },
    resetCurrentIndex () {
      this.currentIndex += 1
    },
    resetIsDisabled () {
        this.is_disabled = !this.is_disabled
    },
    changeLotto(){
      this.lotto()
    },
    lotto () {
      if(!this.$root.log){
        Flash('请先登录!')
        return false;
      }
      if(this.end&&this.chance === 0){
        // 活动结束
        Flash('活动已结束!')
        return false;
      }
      if(!this.end&&this.chance === 0){
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
      clearInterval(this.time)
      this.giftListBtnNotCanClick=true;
      this.resetIsDisabled();
      this.luckDraw()
    },
    timerMethod () {
      let self = this
      if (self.distance === self.temporaryPointer) {
        self.lottoEnd()
        return
      }
      self.pointer += 1
      self.temporaryPointer += 1

      // 如果已经超出了奖品池数量的长度，则初始化为0
      if (self.pointer === self.prizeLength){
        self.pointer = 0
      }
      if (self.temporaryPointer < self.speedFlag) {
        self.timingTime -= self.speedParam
      } else if (self.distance - self.temporaryPointer < self.speedFlag - 1) {
        self.timingTime += self.speedParam
      }
      self.timer = setTimeout(self.timerMethod, this.timingTime)
    },
    lottoEnd () {
      let self = this
      clearTimeout(self.timer)
      self.temporaryPointer = 0
      self.resetIsDisabled()
      this.giftListBtnNotCanClick=false
      self.lottoShow()
    },
    lottoShow () {
      this.isTurning = false
      this.$root.alertGift = true
    },
    resetDistance () {
      // 算出总计需要转动多少次
      let distances = this.prizeLength * this.ring   // 固定需要转动的次数
      if (this.cutoff > this.pointer) {
        this.distance = distances + (this.cutoff - this.pointer)
      } else {
        this.distance = distances + (this.prizeLength - (this.pointer - this.cutoff))
      }
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
    isGoInvestEnter(type){
      let params = {
        combinationId: this.combinationId,
        token: this.token
      }
      this.$http(jrUrl.isGoInvestEnter,params).then(res=>{
        this.turnCombinationId = res
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
      })
    },
    emitInvestes(type){
      this.investes(type)
    },
    investes(type){
      if(!this.$root.log){
        Flash('请先登录!')
        return false
      }
      if(this.end){
        Flash('活动已结束!')
        return false
      }
      this.isGoInvestEnter(type)
    },
    getOnlineProduct(){
      let params={}
      this.$http(jrUrl.getOnlineProduct,params).then(res=>{
        if(res.length>0){
          res.map((val,i)=>{
            if(val.product_name==='活期'){
              this.moneyRate.currentRate = val.rate_init.slice(0,4)+'%'
            }
            if(val.product_name==='月定期'){
              this.moneyRate.monRate = val.rate_init.slice(0,4)+'%'
            }
            if(val.product_name==='季定期'){
              this.moneyRate.quaRate = val.rate_init.slice(0,4)+'%'
            }
            if(val.product_name==='年定期'){
              this.moneyRate.yearRate = val.rate_init.slice(0,4)+'%'
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
    height 100%
    overflow hidden
    background #3a037b
    position relative
    box-sizing border-box
    padding-top 92px
    // .index-mask
    //   width 100%
    //   height 100%
    //   overflow hidden
    //   background rgba(0,0,0,0.7)
    //   position absolute
    //   left 0
    //   top 0
    //   z-index 400000
    .index-bg1-img1,.index-bg1-img2
      width 108px
      height 72px
      position absolute
      right 0
      -webkit-transform translateZ(0)
      z-index 900
    .index-wrap
      position relative
      overflow scroll
      -webkit-overflow-scrolling touch
      width 100%
      height 100%
      box-sizing border-box
      padding-bottom 178px
      .index-bg1
        width 100%
        height 1132px
        bis1('../../images/i-bg1','.jpg')
        overflow hidden
        .index-bg1-div
          height 40px
          line-height 40px
          margin-top 352px
          position relative
          overflow hidden
          div
            bis1('../../images/i-bg4')
            box-sizing border-box
            height 40px
            line-height 40px
            overflow hidden
            text-align center
            font-size 23px
            position absolute
            left 50%
            top 0
            transform translateX(-50%)
            padding 0 55px
            white-space nowrap
            color #fff
        .index-bg1-roll
          height 185px
          margin-top 54px
          overflow hidden
          position relative
          .roll-div1
            font-size 29px
            color #fff
            border 1px solid #b9acc9
            position absolute
            left 23px
            top 0
            border-radius 24px
            height 50px
            line-height 50px
            background rgba(0,0,0,0.4)
            padding 0 23px
          .roll-div2
            height 125px
            overflow hidden
            margin-top 60px
            position relative
            ul
              float left 
              margin-left 23px
              animation move 20s linear infinite 2s
              overflow hidden
              li
                border 1px solid #b9acc9
                background rgba(0,0,0,0.4)
                font-size 29px
                color #fff
                padding 0 10px
                height 50px
                line-height 50px
                border-radius 24px
                margin-bottom 10px
      .index-bg2
        height 749px
        overflow hidden
        bis1('../../images/i-bg5')
        .index-bg2-div1
          font-size 26px
          color #ffffff
          text-align center
          margin-top 32px
          span 
            font-size 36px
            color #ffee30
        .game
          width 532px
          height 527px
          margin 0 auto
          margin-top 40px
          overflow hidden
          box-sizing border-box
          .current::before
            display block
            box-sizing border-box
            z-index 10
            content ''
            position absolute
            width 100%
            height 100%
            top 0
            left 0
            border-radius 16px
            border 4px solid #813aff
          .item
            width 165px
            height 165px
            position relative
            border-radius 4px
            background #fff
            float left
            margin-right 15px
            margin-bottom 15px
            overflow hidden
            box-sizing border-box
          div:nth-of-type(1)
            bis1('../../images/i-bg6')
          div:nth-of-type(2)
            bis1('../../images/i-bg7')
          div:nth-of-type(3)
            bis1('../../images/i-bg8')
            margin-right 0
          div:nth-of-type(4)
            bis1('../../images/i-bg9')
          div:nth-of-type(5)
            bis1('../../images/i-bg9')
            margin-right 0
          div:nth-of-type(6)
            bis1('../../images/i-bg10')
          div:nth-of-type(7)
            bis1('../../images/i-bg11')
          div:nth-of-type(8)
            bis1('../../images/i-bg6')
            margin-right 0
          #run-btn
            display block
            width 167px
            height 160px
            border 0
            // bis1('../../images/i-bg13')
        a
          display block
          color #e95300
          font-size 26px
          text-align center
          margin-top 10px
      .index-bg3
        width 693px
        // min-height 1978px
        height auto
        margin 0 auto 35px
        padding-bottom 30px
        overflow hidden
        bis1('../../images/i-bg14')
        // position relative
        .index-bg3-div1
          width 635px
          // transform translateX(-50%)
          min-height 76px
          background #e4d4ff
          // position absolute
          // left 50%
          // top 214px
          margin 264px auto 0
        .index-bg3-div1>div:nth-of-type(1)
          height 74px
          line-height 74px
          overflow hidden
          font-size 26px
          color #4610a5
          span
            display inline-block
            text-align center
            height 100%
            line-height 100%
          span:nth-of-type(1)
            width 145px
          span:nth-of-type(2)
            width 108px
            margin-left 21px
          span:nth-of-type(3)
            width 120px
            margin-left 21px
          span:nth-of-type(4)
            width 193px
        .index-bg3-div1>div:nth-of-type(2)
          text-align center
          font-family 22px
          color #bc6d49
        .index-bg3-ul,.logTrue
          width 635px
          overflow scroll 
          -webkit-overflow-scrolling touch
          height 1744px
          background #f4f0ff
          margin 0 auto
          margin-top 6px
          li
            width 602px
            height 167px
            box-sizing border-box
            margin 0 auto
            border-bottom 1px solid #3a037b
            overflow hidden
            font-size 26px
            color #4610a5
            position relative
            span
              display inline-block
            i 
              display inline-block
            .rankList-span1
              width 95px
              height 100%
              line-height 167px
              text-align center
            .rankList-span2
              width 190px
              height 100%
              line-height 167px
              font-size 24px
              text-align center
            .rankList-i1
              height 100%
              line-height 167px
              margin 0 10px 0 10px
            .rankList-i2
              width 110px
              height 100%
              line-height 167px
              text-align center
              // margin 0 15px 0 10px
            .rankList-img1
              width 45px
              vertical-align middle
              margin 0 38px 0 25px
            .rankList-div1
              font-size 18px
              position absolute
              left 50%
              transform translateX(-70%)
              bottom 8px
            .rankList-div2
              font-size 18px
              position absolute
              left 50%
              transform translateX(-70%)
              bottom 8px
            .rankList-img2
              width 144px
              margin-left 20px
              vertical-align middle
          li:last-child
            border-bottom 0
        .logTrue
          margin-top 214px
        .index-bg3-ul::-webkit-scrollbar
          display none
      .index-bg4
        width 641px
        height 807px
        bis1('../../images/i-bg28')
        margin 0 auto 29px
      .index-bg5
        width 641px
        height auto
        margin 0 auto
        background #ffffff
        padding-bottom 30px
        margin-bottom 32px
        overflow hidden
        p
          font-size 32px
          color #3a037b
          text-align center
          margin-top 33px
        .index-bg5-swipe
          width 590px
          height auto
          margin 20px auto 28px
          border-bottom 1px solid #3a037b
          .swiper-container
            height auto
            .swiper-slide
              width 260px
              height auto
              border-radius 10px
              text-align center
              img
                width 80%
                // height 100%
          .swiper-con
            margin-top 20px
            h6
              text-align center
              color #3a037b
              font-size 22px
        .index-bg5-div
          font-size 25px
          color #3a037b
          width 590px
          margin 0 auto
          span
            font-size 30px
            color #3a037b
      .index-bg6
        // width 670px
        height 135px
        margin 0 auto
        p
          text-align center
          font-size 18px
          color #ababab
    .index-bg7
        width 100%
        height 172px
        bis1('../../images/i-fixed')
        position absolute
        bottom 0
        z-index 50
        // pointer-events none
        overflow hidden
        -webkit-transform translateZ(0)
        div
          float left
          width 232px
          height 108px
          margin-right 10px
          padding-top 25px
          font-size 26px
          color #fff
          box-sizing border-box
          padding-left 18px
        div:first-child
          margin-left 18px
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

