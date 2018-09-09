<template>
  <div class="index" @touchmove="starts">
    <section class="appbot" v-if="app&&flag1">
      <div class="appbot-div1">
        您还有<span v-text="userData.arestlcHb"></span>个理财红包，<span v-text="userData.arestcashHb"></span>个现金红包未赚，剩余时间
        <span v-text="userData.deadTime"></span>
        <i v-if='day'>天!</i>
        <i v-if='hou'>时!</i>
        <i v-if='min'>分!</i>
        <i v-if='sec'>秒!</i>
      </div>
      <div class="appbot-div2">
        <img src="../../images/in-bg8.png" @click="invites">
        <div>提示：好友必须通过您的邀请链接注册才有奖励~</div>
      </div>
    </section>
    <section class="applb" v-if="app">
      <ul :style="{top}" :class="{top}">
        <li v-for="(item,index) in appTopList" :key="index">
          <!-- 刚刚<span class="span1" v-text="item.tel"></span>赚了
          <em v-text="item.money"></em>元现金 -->
          <span v-text="item.time"></span>
          <span v-text="item.txt"></span>
        </li>
      </ul>
    </section>
    <section class="app" v-if="app">
      <div class="app-bg1">
        <div>4月4日-5月4日</div>
        <transition name="fold" @after-leave="afterLeave" @after-enter="afterEnter">
          <img class="img1" @click="invites" v-if="moves" src="../../images/in-bg2.png">
        </transition>
        <img class="img2" v-if="moves1" @click="backAni" src="../../images/in-bg2.png">
      </div>
      <img class="img3" src="../../images/in-bg3.jpg">
      <div class="app-bg2">
        <img class="img4" src="../../images/in-bg4.jpg">
        <a href="javascript:;" @click="$router.push('/detail')">赚钱攻略>></a>
      </div>
      <div class="app-bg3">
        <div class="app-bg3-wrap">
          <div>500元理财红包：<span v-text="userData.fiveHundrade"></span>个</div>
          <div>10元现金红包：<span v-text="userData.ten"></span>个</div>
          <div>排行榜奖励：<span v-text="userData.gift"></span></div>
        </div>
        <img src="../../images/in-bg5.png" @click="seeLog">
      </div>
      <div class="app-bg4">
        <img class="imgs" src="../../images/in-bg9.png">
        <div class="app-bg4-wrap">
          <div class="div1">
            <p><span>前30名</span>可得额外大奖</p>
            <p>根据邀请好友的<span>月/季/年定期累计投资额</span>排名</p>
          </div>
          <img class="div2" src="../../images/in-bg10.png">
          <div class="div3" v-if="log">
            <span class="div3-span1" v-if="userData.inTop" v-text="userData.rank"></span>
            <span class="div3-span2" v-else>/</span>
            <span class="div3-span3">我</span>
            <span class="div3-span4" v-text="userData.friendInvest">100</span>
            <span class="div3-span5" v-if="userData.inTop" v-text="userData.myGift"></span>
            <span class="div3-span6" v-else>/</span>
          </div>
          <div class="div4">
            <ul>
              <li v-for="(item,index) in appScrollList" :key="index">
                <img class="img-left" v-if="index===0||index===1||index===2" :src="item.rank">
                <i class="i1" v-text="item.rank" v-if="index>2"></i>
                <i class="i2" v-text="item.tel"></i>
                <i class="i3" v-text="item.money"></i>
                <img class="img-rig" v-if="index===0||index===1||index===2" :src="item.gift">
                <i class="i4" v-text="item.gift" v-if="index>2"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <img class="app-bg5" src="../../images/in-bg17.jpg">
      <div class="app-bg6">
        <div>官方客服热线1010-2015</div>
        <div>本活动最终解释权归鲸鱼所有</div>
        <div>-活动仅限部分地区部分用户参与-</div>
        <div>*投资有风险，理财需谨慎,本活动与苹果公司无关</div>
      </div>
    </section>
    <section class="wx" v-if="!app">
      <!-- <section class="wx-bg-new1"></section> -->
      <img class="aaa" v-if="result" src="../../images/in-bg47.jpg">
			<img v-if="!result" class="wx-bg-new2-top-img" src="../../images/in-bg32.png">
			<section class="wx-bg-new2" v-if="!result">
				<div class="wx-bg-new2-top">
					<img src="../../images/logos.png">
					<div v-if="!result">
						<span>您的好友</span>
						<i v-text="inviterTel"></i>
					</div>
				</div>
				<div class="wx-bg-new2-bot" v-if="!result">
					<section v-if="registerTime>=10">
						好消息！鲸鱼新手福利升级啦！！！我使用鲸鱼<i v-text="registerTime" style="color:#fff1bb;"></i>天，感觉挺靠谱的，现在刚好有新人邀请活动，快来加入，领<span style="color:#f8f35d;">10元现金红包</span>！
					</section>
          <section v-else>
            好消息！鲸鱼新手福利升级啦！！！我正在使用鲸鱼，感觉蛮靠谱的，现在刚好有新人邀请活动，快来加入，我送你<span style="color:#f8f35d;">10元现金红包</span>！
          </section>
				</div>
			</section>
			<section class="wx-result-bg1" v-if="result">
				<div class="wx-result-div1"></div>
				<div class="wx-result-div2">
					<p>抵扣券和红包已发放至<i v-text="userMobile"></i>鲸鱼</p>
					<p>账户中，请打开鲸鱼APP查收~</p>
				</div>
				<div class="wx-result-div3"></div>
				<div class="wx-result-div4" v-if="!inviteFirst">
					<!-- 没首投 -->
          <img class="wx-result-img1" src="../../images/in-bg39.png">
          <img class="wx-result-img2" src="../../images/in-bg40.png">
          <img class="wx-result-img3" src="../../images/in-bg41.png">
          <div class="wx-result-div4-btn">
            <img class="wx-result-btn1" src="../../images/in-bg43.png" @click="toSharewx">
            <img class="wx-result-btn2" src="../../images/in-bg42.png" @click="toApp">
          </div>
				</div>
				<div class="wx-result-div5" v-else>
					<!-- 首投了 -->
          <img class="wx-result-div5-img1" src="../../images/in-bg39.png">
          <img class="wx-result-div5-img2" src="../../images/in-bg44.png">
          <img class="wx-result-div5-img3" src="../../images/in-bg45.png">
          <img class="wx-result-div5-img4" src="../../images/in-bg46.png" @click="toSharewx">
				</div>
				<a href="javascript:;" @click="CHANGEalertwx(true)">加入鲸鱼究竟能赚多少钱？＞＞</a>
			</section>
			<article v-if="!result">
				<section class="wx-bg3">
					<!-- 注册框 -->
					<div class="wx-bg3-div1"></div>
					<register 
						v-show='!result'
            :token="token"
            :activIsEnd="activIsEnd"
            @changeResult="changeResult"
            @getWechatFriendAward="getWechatFriendAward"
            @changeUserMobile="changeUserMobile"
            @changeNewUser="changeNewUser"
            @getWechatShare="getWechatShare"
						>
					</register>
				</section>
			</article>
			<div>
				<section class="wx-bg11"></section>
				<section class="wx-bg12">
					<h2>温馨提示：</h2>
					<div class="wx-bg12-div1"><i>1</i>活动时间：4月4日-5月4日，本活动仅针对活动期间内在本页面注册的新用户；</div>
					<div class="wx-bg12-div2"><i>2</i>注册成功即可获得6000元理财红包(收益可提现)和200元现金抵扣券（投资即可抵扣）；</div>
					<div class="wx-bg12-div3"><i>3</i>在活动期间<span style="font-weight:600;color:#f8f163;">投资定期（30天/90天/365天可选）满1000元</span>，即可获得<span style="font-weight:600;color:#f8f163;">10元现金红包</span>(可直接提现)；</div>
					<div class="wx-bg12-div4"><i>4</i>所有奖励将发放至您手机号注册的鲸鱼账户中；</div>
					<div class="wx-bg12-div5"><i>5</i>每个新用户仅可参与一次，如有任何恶意刷奖，将取消所有奖励。</div>
          <div class="wx-bg12-div6">PS：您注册后也可邀请好友，送TA10元现金，当您的好友 投资成功，你可再拿10元现金奖励。</div>
				</section>
				<section class="wx-bg6"></section>
				<section class="wx-bg7"></section>
				<section class="wx-bg8"></section>
				<section class="wx-bg9"></section>
				<section class="wx-bg10">
					<div>
						<span v-text="moneyRate.currentRate"></span>%
					</div>
					<div>
						<span v-text="moneyRate.monRate"></span>%
					</div>
					<div>
						<span v-text="moneyRate.quaRate"></span>%
					</div>
					<div>
						<span v-text="moneyRate.yearRate"></span>%
					</div>
				</section>
			</div>
			<div class="wx-contact">
				<p>官方客服热线1010-2015</p>
				<p>本活动最终解释权归鲸鱼所有</p>
        <p>-活动仅限部分地区部分用户参与-</p>
        <p>*投资有风险，理财需谨慎,本活动与苹果公司无关</p>
			</div>
      <div class="backTop" @click="backTop">
        <div>
          <span style="display:block;">回到</span>
          顶部
        </div>
      </div>
    </section>
    <share-app v-if='alertToAppShowOrHide' :appShareConfig="appShareConfig"></share-app>
    <log 
      v-if="alertLogShowOrHide"
      :fiveHundrade="userData.fiveHundrade"
      :isEnds="isEnds"
      :ten="userData.ten"
      :myInvitaData="myInvitaData"
      @changeSendMesTel="changeSendMesTel"></log>
    <nolog v-if="alertnoLogShowOrHide" :isEnds="isEnds"></nolog>
    <mes
      :sendMesTel="sendMesTel" 
      :combinationId="combinationId" 
      v-if="alertmesShowOrHide"
      :token="token"
      @changeMyInvitaData="changeMyInvitaData"></mes>
    <old 
      v-show="alertoldShowOrHide" 
      @getWechatShare="getWechatShare" 
      @changeNewUser="changeNewUser"></old>
    <wx v-if="alertwxShowOrHide"></wx>
    <wxshare v-if="alertwxShareShowOrHide"></wxshare>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import * as jrUrl from '../../urlconfig/urlconfig'
import {getRequest,pattern,randomWord} from '../../util/util'
import Flash from '@/components/flash'
import {fetchWXconfig} from '../../plugin/fetchWXconfig'
import shareApp from '../../components/shareApp/share-app'
import log from '../../components/alertLog'
import nolog from '../../components/alertnoLog'
import mes from '../../components/message'
import register from '../../components/register/register'
import old from '../../components/alertOld'
import wx from '../../components/alertwx'
import wxshare from '../../components/alertwxshare'

export default {
  components: {
    shareApp,
    log,
    nolog,
    mes,
    register,
    old,
    wx,
    wxshare
  },
  name: 'index',
  data () {
    return {
      moneyRate:{//利率
        currentRate: '',
        monRate: '',
        quaRate: '',
        yearRate: ''
      },
      cliflag: false,//判断非渠道微信用户是否有点击分享按钮或者渠道老用户,shareurl有区别
      userMobile: '',//微信结果页显示用户手机号码
      inviteFirst: false,//新用户是否首投，首投了右边红包置灰
      registerTime: null,
      inviterTel: '',
      result: false,
      // 以上是微信端数据
      appScrollList: [//app滑动列表
        // {rank: require('../../images/in-bg14.png'),tel: '150****1236', money: 999999999, gift: require('../../images/in-bg11.jpg')},
        // {rank: 4,tel: '150****1111', money: 52625, gift: '88现金红包'},
      ],
      appShareConfig:{
        imgUrl:'',
        text:'',
        title:'',
        url:''
      },
      time:0,//倒计时时间差
      day:null,
      hou:null,
      min:null,
      sec:null,
      // 以上是app端分享的参数
      flag1: false,
      userData: {//我已累计赚得
        fiveHundrade: 0,
        ten: 0,
        gift: '',
        arestlcHb: 0,
        arestcashHb: 0,
        deadTime: 0,
        inTop: true,//是否上榜
        rank: null,//排名
        friendInvest: null,//好友总投资
        myGift: ''
      },
      sendMesTel: '',//发送短信提醒的手机号码
      log: false,
      isEnds: true,
      activIsEnd: false,//微信端活动是否结束
      moves1: false,
      moves: true,
      inviter: '',
      token: '',
      combinationId: '',
      timer: null,
			timerNxit: null,
      activeIndex: 0,
      myInvitaData: [],//用户邀请列表
      app: true,//是否是app
      appTopList: [//app顶部轮播数据
        // {tel: '185****4562', money: 10}
      ]
    }
  },
  computed: {
    ...mapState([
      'alertToAppShowOrHide',
      'alertLogShowOrHide',
      'alertnoLogShowOrHide',
      'alertmesShowOrHide',
      'alertoldShowOrHide',
      'alertwxShowOrHide',
      'alertwxShareShowOrHide'
    ]),
    top(){
      let index = this.activeIndex
      if(index){
        return -(index * (1.08)) + 'rem'
      }
      return 0
    }
  },
  created () {
    this.token = getRequest()['token']
    this.combinationId = getRequest()['combinationId']
    this.inviter = getRequest()['inviter']
    this.app = getRequest()['version']
    if(!this.token){
      this.token = randomWord(false, 25)
    }
    if(!this.app){
      this.getOnlineProduct()
      this.getWechatData()
      this.CHANGEIsApp(false)
      this.getCombinationTimeInfo()
    }
    if(this.app){
      this.getAppInitData()
      this.CHANGEIsApp(true)
    }
    this.getWechatShare()
  },
  mounted () {
    this.move()
  },
  methods: {
    ...mapMutations([
      'CHANGEalertShareApp',
      'CHANGEalertLog',
      'CHANGEalertnoLog',
      'CHANGEalertwx',
      'CHANGEalertwxShare',
      'CHANGEIsApp'
    ]),
    getCombinationTimeInfo(){
      let params = {
        combinationId: this.combinationId
      }
      this.$http(jrUrl.getCombinationTimeInfo,params).then(res=>{
        if(res.countDownTimestamp<=0){
          this.activIsEnd = true
        }else{
          this.activIsEnd = false
        }
      })
    },
    afterLeave(el) {
      // 消失后
      this.moves1 = true
    },
    afterEnter(el){
      // 显示后
      
    },
    changeNewUser(val){
      this.cliflag = val
    },
    changeUserMobile(val){
      this.userMobile = val
    },
    getWechatFriendAward(){
      // 微信端获取用户是否首投
      let params = {
        combinationId: this.combinationId,
        inviter: this.inviter,
        token: this.token
      }
      this.$http(jrUrl.getWechatFriendAward,params).then(res=>{
        if(res === 0){
          // 未领取
          this.inviteFirst = false
        }else if(res === 1){
          // 领取了
          this.inviteFirst = true
        }
      })
    },
    changeResult(val){
      this.result = val
    },
    getWechatData(){
      // 获取微信端信息
      let params = {
        combinationId: this.combinationId,
        inviter: this.inviter,
        token: this.token
      }
      this.$http(jrUrl.getWechatData,params).then(res=>{
        this.inviterTel = res.mobile
        this.registerTime = res.registerDay
      })
    },
    changeMyInvitaData(tel){
      // 当发送短信成功后要把提醒TA赚钱按钮变成已提醒
      this.myInvitaData.map((val,i)=>{
        if(tel === val.mobile){
          val.showSendMsgTip = 0
        }
      })
    },
    changeSendMesTel(val){
      // 用户邀请列表点击提醒后获取对应投资人的手机号码
      this.sendMesTel = val
    },
    changeAppTopListTime(time){
      // 修改app顶部轮播
      let _temp = Math.floor((Date.now()-time*1000)/86400/1000)
      if(_temp>0){
        // 大于1天，显示天
        return _temp+"天前"
      }else{
        // 小于一天，大于一小时
        let _temp1 = Math.floor((Date.now()-time*1000)/3600/1000)
        if(_temp1>0){
          return _temp1+"小时前"
        }
        // 大于一分钟，小于一小时
        let _temp2 = Math.floor((Date.now()-time*1000)/60/1000)
        if(_temp2>0){
          return _temp2+"分钟前"
        }
        return "刚刚"
      }
    },
    getAppInitData(){
      // app初始化数据
      let params ={
        combinationId: this.combinationId,
        token: this.token
      }
      this.$http(jrUrl.getAppInitData,params).then(res=>{
        if(res.userLogin == 0){
          this.log = false
        }else if(res.userLogin == 1){
          this.log = true
        }
        if(res.countDownTime<=0){
          this.isEnds = true
          this.userData.deadTime = '0天'
        }else{
          this.isEnds = false
          this.time = res.countDownTime
          this.deadTimes()
        }

        this.userData.fiveHundrade = res.invitaRegisterUserCount
        this.userData.ten = res.invitaInvestmentUserCount
        if(res.showData.length>0){
          res.showData.map((val,i)=>{
            this.appTopList.push({
              time: this.changeAppTopListTime(val.getTimestamp),
              txt: val.showTxt
            })
          })
        }
        if(res.myRankIndex === '-'){
          // 排名未上榜，无奖励
          this.userData.gift = '暂无'
          this.userData.myGift = '/'//我的奖励
          this.userData.rank = '/'
        }else{
          // 已上排行榜奖励，需遍历排行版res.rankData查找
          this.userData.rank = res.myRankIndex
        }

        // 用户邀请记录
        this.myInvitaData = res.myInvitaData

        if(res.rankData.length>0){
          // 排行榜数据
          res.rankData.map((val,i)=>{
            if(i === 0){
              // 第一名
              this.appScrollList.push({
                rank: require('../../images/in-bg14.png'),
                tel: val.mobile,
                money: val.money,
                gift: require('../../images/in-bg11.jpg')
              })
            }else if(i === 1){
              // 第二名
              this.appScrollList.push({
                rank: require('../../images/in-bg15.png'),
                tel: val.mobile,
                money: val.money,
                gift: require('../../images/in-bg12.jpg')
              })
            }else if(i === 2){
              // 第三名
              this.appScrollList.push({
                rank: require('../../images/in-bg16.png'),
                tel: val.mobile,
                money: val.money,
                gift: require('../../images/in-bg13.jpg')
              })
            }else if(i>=3&&i<=9){
              // 88元现金红包
              this.appScrollList.push({
                rank: i+1,
                tel: val.mobile,
                money: val.money,
                gift: '88元现金红包'
              })
            }else if(i>=10&&i<=19){
              // 88888元理财红包
              this.appScrollList.push({
                rank: i+1,
                tel: val.mobile,
                money: val.money,
                gift: '88888元理财红包'
              })
            }else if(i>=20&&i<=29){
              this.appScrollList.push({
                rank: i+1,
                tel: val.mobile,
                money: val.money,
                gift: '8888元理财红包'
              })
            }
          })
        }
        if(this.appScrollList.length>0){
          this.appScrollList.map((val,i)=>{
            if(res.myRankIndex !== '-'){
              if(res.myRankIndex === i+1){
                if(res.myRankIndex === 1){
                  // 第一名
                  this.userData.gift = 'iphoneX64G'
                  this.userData.myGift = 'iphoneX64G'
                }else if(res.myRankIndex === 2){
                  // 第二名
                  this.userData.gift = 'ipad32G'
                  this.userData.myGift = 'ipad32G'
                }else if(res.myRankIndex === 3){
                  // 第三名
                  this.userData.gift = 'AppleWatch'
                  this.userData.myGift = 'AppleWatch'
                }else if(res.myRankIndex>=4&&res.myRankIndex<=10){
                  this.userData.gift = '88元现金红包'
                  this.userData.myGift = '88元现金红包'
                }else if(res.myRankIndex>=11&&res.myRankIndex<=20){
                  this.userData.gift = '88888元理财红包'
                  this.userData.myGift = '88888元理财红包'
                }else if(res.myRankIndex>=21&&res.myRankIndex<=30){
                  this.userData.gift = '8888元理财红包'
                  this.userData.myGift = '8888元理财红包'
                }
              }
            }
          })
        }
        this.userData.friendInvest = res.myInvitaMoney
        this.userData.arestlcHb = 50 - res.invitaRegisterUserCount//底部剩余可领理财红包
        this.userData.arestcashHb = 30 - res.invitaInvestmentUserCount//底部剩余可领现金红包

      })
    },
    deadTimes(){
      let a;
      clearInterval(a)
      a=setInterval(()=>{
        if(Math.floor(this.time/86400)>0){
          //大于一天,只显示天
          this.userData.deadTime=Math.floor(this.time/86400)
          this.day='天'
          this.hou=null
          this.min=null
          this.sec=null
        }else{
          //小于一天
          if(Math.floor(this.time/3600)>0){
            //显示小时
            this.userData.deadTime=Math.floor(this.time/3600)
            this.day=null
            this.hou='时'
            this.min=null
            this.sec=null
          }else{
            //不足一小时,显示分
            if(Math.floor(this.time/60)>0){
              this.userData.deadTime=Math.floor(this.time/60)
              this.day=null
              this.hou=null
              this.min='分'
              this.sec=null
            }else{
              //不足一分，显示秒
              this.userData.deadTime=this.time
              this.day=null
              this.hou=null
              this.min=null
              this.sec='秒'
              if(this.time===0){
                clearInterval(a)
                this.isEnds=true
              }
            }
          }
        }
        this.time--
      },1000)
    },
    rollDataChange(time){
      // app转变时间
      let seconds = new Date(time)
    },
    toSharewx(){
      this.CHANGEalertwxShare(true)
    },
    toApp(){
      location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core"
    },
    backTop(){
      window.scroll(0,0)
    },
    seeLog(){
      // 邀请记录
      if(!this.log){
        Flash('请先登录!')
        return 
      }
      if(this.myInvitaData.length<=0){
        this.CHANGEalertnoLog(true)
      }else{
        this.CHANGEalertLog(true)
      }
    },
    starts(){
      this.moves = false
      this.flag1 = true
    },
    invites(){
      if(!this.log){
        Flash('请先登录!')
        return
      }
      if(this.isEnds){
        Flash('活动已结束!')
        return
      }
      this.CHANGEalertShareApp(true)
    },
    backAni(){
      this.moves1 = false
      this.moves = true
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
        console.log(res,'分享信息')
        this.appShareConfig.imgUrl = res.imgUrl
        this.appShareConfig.text = res.desc
        this.appShareConfig.title = res.title
        this.appShareConfig.url = res.shareUrl
        fetchWXconfig(res,this)
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
    },
    _moveUp(){
			let self=this
			clearInterval(this.timer)
			clearTimeout(this.timerNxit)
			this.timer = setInterval(()=> {
				if(self.activeIndex >= self.appTopList.length/2) {
					self.activeIndex =  0 
					self.timerNxit = setTimeout(()=> {
						self.activeIndex ++
					}, 20)
				}else{
					self.activeIndex ++
				}   
			}, 2200);
		},
    move(){
			this.timerNxit = setTimeout(()=> {
				this._moveUp()
			}, 1000);
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
    .appbot
      height 234px
      width 100%
      overflow hidden
      position fixed
      bottom 0px
      z-index 10000
      .appbot-div1
        width 90%
        height 64px
        bis1('../../images/in-bg7')
        margin 0 auto
        text-align center
        line-height 60px
        font-size 23px
        color #664200
        span 
          color #f84406
      .appbot-div2
        height 160px
        background rgba(0,0,0,0.6)
        margin-top 10px
        overflow hidden
        img 
          width 90%
          height 90px
          display block
          margin 20px auto 8px
        div
          font-size 24px
          text-align center
          color #a9a9a9
    .applb
      // width 552px
      padding 0 10px
      height 62px
      background rgba(0,0,0,0.7)
      position absolute
      right 32px
      top 155px
      border-radius 32px
      overflow hidden
      z-index 10000
      .top
        transition: top 0.8s 
      ul
        overflow hidden
        position relative
        li
          height 100%
          line-height 62px
          overflow hidden
          margin-bottom 20px
          text-align center
          color #fff
          font-size 26px
          span 
            height 100%
            line-height 62px
            display inline-block
            margin-right 10px
            color #ffe3cc
            font-size 26px
    .app
      height 100%
      overflow hidden
      .app-bg1
        height 792px
        overflow hidden
        bis1('../../images/in-bg1','.jpg')
        div
          text-align center
          font-size 24px
          color #fff
          margin-top 385px
        .fold-enter
          transform translate3d(100%,0, 0)
          opacity 1
        .fold-leave
          transform translate3d(0, 0, 0)
        .fold-leave-active
          transform translate3d(70%,0, 0)
          opacity 0.5
        .img1
          display block
          width 110px
          height 120px
          position fixed
          right 0px
          top 376px
          transition all .7s
          z-index 10000
        .img2
          display block
          width 110px
          height 120px
          position fixed
          right 0px
          top 376px
          transform translateX(70%)
          opacity 0.5
          z-index 10000
      .app-bg2
        height 40px
        overflow hidden
        margin 40px 0 74px
        text-align center
        img
          width 40px
          height 40px
          vertical-align middle
          margin-right 5px
        a
          font-size 30px
          color #f8f35d
          vertical-align middle
          text-decoration underline
      .img3
        display block
        width 100%
      .app-bg3
        width 690px
        height 270px
        bis1('../../images/in-bg6')
        margin 0 auto 76px 
        overflow hidden
        .app-bg3-wrap
          width 356px
          overflow hidden
          height 164px
          float left
          margin 62px 0 0 38px
          div
            font-size 24px
            color #fff
            line-height 50px
        img
          float right
          width 255px
          height 47px
          margin 113px 32px 0 0
      .app-bg4
        width 695px
        height 1613px
        margin 0 auto
        overflow hidden
        position relative
        .imgs 
          display block
          width 225px
          height 70px
          position absolute
          top 0
          left 50%
          transform translateX(-50%)
        .app-bg4-wrap
          height 1580px
          background #fff
          overflow hidden
          margin-top 35px
          border-radius 20px
          .div1
            width 566px
            height 114px
            background #fff1f1
            border-radius 10px
            margin 75px auto 47px
            overflow hidden
            font-size 28px
            box-sizing border-box
            padding-top 17px
            p:nth-of-type(1)
              text-align center
              span 
                font-weight 600
            p:nth-of-type(2)
              text-align center
              span 
                color #ff7444
          .div2
            display block
            width 620px
            height 28px
            margin 0 auto 40px
          .div3
            width 662px
            height 80px
            background #ebedf2
            margin 0 auto
            overflow hidden
            span 
              display inline-block
              height 100%
              line-height 80px
              font-size 24px
            .div3-span1
              width 82px
              text-align center
              margin-right 50px
            .div3-span2
              width 82px
              text-align center
              margin-right 50px
            .div3-span3
              width 77px
              text-align center
              margin-right 66px
            .div3-span4
              width 136px
              text-align center
            .div3-span5
              width 192px
              text-align center
              color #ff7444
            .div3-span6
              width 30px
              text-align center
              margin-left 93px
          .div4
            height 1130px
            margin-top 30px
            overflow auto
            -webkit-overflow-scrolling touch
            ul
              overflow hidden
              li
                width 676px
                height 90px
                line-height 90px
                overflow hidden
                margin 0 auto
                padding-left 25px
                box-sizing border-box
                font-size 26px
                i 
                  display inline-block
                .i1 
                  text-align center
                  width 50px
                  height 100%
                  line-height 90px
                  color #a9a9a9
                  margin-right 43px
                .i2
                  margin-right 10px
                .i3
                  width 148px
                  text-align center
                  margin-right 10px
                .i4
                  color #ff7444
              li:nth-of-type(1),li:nth-of-type(2),li:nth-of-type(3)
                height 162px
                line-height 162px
                .img-left
                  width 43px
                  height 58px
                  vertical-align middle
                  margin-right 46px
                .img-rig
                  width 117px
                  // height 120px
                  vertical-align middle
                  margin-left 20px
          .div5
            display block
            width 693px
            margin 0 auto
      .app-bg5
        width 693px
        display block
        margin 40px auto 36px
      .app-bg6
        height 180px
        margin-bottom 240px
        overflow hidden
        text-align center
        font-size 26px
        div:nth-of-type(1),div:nth-of-type(2)
          color #fff
        div:nth-of-type(2)
          margin-bottom 15px
        div:nth-of-type(3)
          color #001b90
          margin-bottom 20px
        div:nth-of-type(4)
          text-align right
          padding-right 24px
          font-size 20px
          color #122b98
    .wx
      width 100%
      height auto
      background #314eca
      overflow hidden
      position relative
      .aaa
        width 100%
        height 115px
        border 0
        display block
      .wx-result-bg1
        width 90%
        height auto
        background #fefdf3
        margin 0 auto
        overflow hidden
        border-radius 20px
        .wx-result-div1
          width: 190px
          height 40px
          bis1('../../images/in-bg37')
          margin 46px auto 0
        .wx-result-div2
          width 588px
          height 292px
          bis1('../../images/in-bg38')
          margin 0 auto 50px
          overflow hidden
          p:nth-of-type(1)
            margin-top: 220px
          p
            font-size 24px
            text-align center
            color #404040
            i
              color #ececec
        .wx-result-div3
          height 0
          border-bottom 1px dashed #dad9d2
          // margin-bottom 44px
        .wx-result-div4
          width 620px
          height 530px
          margin 30px auto 0
          overflow hidden
          .wx-result-img1
            width 198px
            height 264px
            margin 0 114px 0 45px
          .wx-result-img2
            width 198px
            height 264px
          .wx-result-img3
            width 621px
            height 92px
            margin-top 20px
          .wx-result-div4-btn
            height 140px
            margin 0 auto 24px
            overflow hidden
            .wx-result-btn1
              width 290px
              float left
            .wx-result-btn2
              width 282px
              float right
        .wx-result-div5
          width 620px
          height 560px
          margin 0 auto 35px
          overflow hidden
          .wx-result-div5-img1
            width 198px
            height 264px
            margin 0 114px 0 45px 
          .wx-result-div5-img2
            width 250px
            height 295px
          .wx-result-div5-img3
            width 528px
            height 91px
            margin 21px auto 10px
            display block
          .wx-result-div5-img4
            height 141px
            display block
            margin 0 auto
        a
          font-size 26px
          color #d9281f
          text-decoration underline
          display block
          text-align center
          margin-bottom 50px
      .wx-bg-new1
        height 40px
        // @include bis('../../assets/a_bg50.png')
      .wx-bg-new2-top-img
        width 113px
        height 38px
        position absolute
        right 24px
        top 48px
        z-index 8000
      .wx-bg-new2
        width 100%
        height 406px
        background #d9281f
        overflow hidden
        position relative
        bis1('../../images/in-bg31')
        margin-top 20px
        .wx-bg-new2-top
          height 94px
          margin-top 45px
          padding-left 45px
          padding-top 10px
          color: #fff
          img
            width 80px
            height 80px
            float left
            margin-right 16px
          div
            float left
            span
              display block
              color #fff
              font-size 30px
            i
              color #fff
              font-size 30px
        .wx-bg-new2-bot
          width 672px
          height 160px
          bis1('../../images/in-bg33')
          margin 0 auto
          font-size 27px
          position relative
          margin-top 20px
          section
            width 90%
            position absolute
            left 50%
            top 53%
            transform: translate(-50%,-50%)
            color #fff
      .wx-bg1
        height 207px
        position relative
        overflow hidden
        margin-top 26px
        .wx-bg1-img1
          width 168px
          position absolute
          left 20px
          top 0
        div
          width 258px
          height 195px
          overflow hidden
          margin 0 auto
          margin-top 10px
          .wx-bg1-img2
            width 120px
            height 120px
            border-radius 60px
            display block
            margin 0 auto
            margin-bottom 20px
          p
            text-align center
            font-size 30px
            color #ffc148
        .wx-getSuccess
          width: 182px
          height: 40px
          // @include bis('../../assets/a_bg38.png')
          margin 0 auto
          margin-top 127px
      .wx-bg2
        width: 650px
        height: 120px
        // @include bis('../../assets/a_bg15.png')
        margin 0 auto
        margin-bottom 50px
        overflow hidden
        div
          width 604px
          font-size 28px
          color #b35806
          margin 0 auto
          margin-top 34px
          span
            color:#b35806
      .wx-bg3
        width 670px
        height auto
        background #fefdf3
        margin 0 auto
        // margin-top 70px
        border-radius 40px
        overflow hidden
        .wx-bg3-div1
          width 550px
          height 338px
          overflow hidden
          margin 0 auto
          margin-bottom 50px
          margin-top 40px
          bis1('../../images/in-bg30')
      .wx-alertSuccess
        width 652px
        height 544px
        // @include bis('../../assets/a_bg39.png')
        margin 0 auto
        margin-bottom 40px
        overflow hidden
        p
          text-align center
          font-size 30px
          color #a27425
        p:nth-of-type(1)
          margin-top 282px
          span
            color #a27425
        p:nth-of-type(2)
          margin-bottom: 62px
        div
          width 583px
          height 88px
          background #dd462a
          text-align center
          line-height 88px
          border-radius 4px
          color #fff
          margin 0 auto
          font-size 30px
      .wx-bg4
        width 650px
        height 545px
        // @include bis('../../assets/a_bg19.png')
        overflow hidden
        margin 0 auto
        margin-top 50px
        #chai
          display block
          width 200px
          height 200px
          margin 0 auto
          margin-top 242px
      .wx-bg5
        width 685px
        height 494px
        border-radius 40px
        background #fff
        margin 0 auto
        margin-top 40px
        margin-bottom 40px
        overflow hidden
        .wx-bg5-div1
          height 95px
          background #ffc148
          overflow hidden
          div
            width 376px
            height 35px
            // @include bis('../../assets/a_bg25.png')
            margin 0 auto
            margin-top 30px
        .wx-bg5-div2
          width 612px
          height 338px
          margin 0 auto
          margin-top 30px
          .wx-bg5-div2-left
            width 306px
            height 100%
            float left
            overflow hidden
            .img1
              width 266px
              height 210px
              display block
              margin 0 auto
              margin-bottom 20px
            .img2
              width 266px
              height 210px
              display block
              margin 0 auto
              margin-bottom 20px
            h2
              text-align center
              font-size 31px
            p
              font-size: 29px
              text-align: center
          .wx-bg5-div2-right
            width 306px
            height 100%
            float left
            overflow hidden
            .img3
              width 266px
              height 210px
              display block
              margin 0 auto
              margin-bottom 20px
            .img4
              width 266px
              height 210px
              display block
              margin 0 auto
              margin-bottom 20px
            h2
              text-align center
              font-size 31px
              color #b55f0a
            p
              font-size 29px
              text-align center
      .wx-bg11
        height 354px
        width 674px
        bis1('../../images/in-bg29','.jpg')
        margin 0 auto
        margin-top 26px
      .wx-bg12
        width 674px
        margin 0 auto
        margin-top 40px
        h2
          color: #fff
          font-size: 32px
          font-weight 600
        div
          color #fff
          font-size 27px
        .wx-bg12-div1
          margin-top 28px
        .wx-bg12-div1,.wx-bg12-div2,.wx-bg12-div3,.wx-bg12-div4
          margin-bottom 42px
          i
            display: inline-block
            width 28px
            height 28px
            border-radius 14px
            background #ff7444
            text-align center
            line-height 28px
            color #fff
            font-size 22px
            margin-right 30px
        .wx-bg12-div5
          i
            display inline-block
            width 28px
            height 28px
            border-radius: 14px
            background #ff7444
            text-align center
            line-height 28px
            color #fff
            font-size 22px
            margin-right: 30px
        .wx-bg12-div6
          font-size 25px
          color #f8f35d
          margin-top 39px
      .wx-bg6
        width 672px
        height 308px
        border-radius 40px
        overflow hidden
        margin 0 auto
        background #fff
        margin-bottom 40px
        margin-top 50px
        bis1('../../images/in-bg24')
      .wx-bg7
        width 672px
        height 683px
        bis1('../../images/in-bg25')
        margin 0 auto
        margin-bottom 40px
      .wx-bg8
        width 672px
        height 701px
        bis1('../../images/in-bg26')
        margin 0 auto
        margin-bottom 40px
      .wx-bg9
        width 672px
        height 351px
        bis1('../../images/in-bg27')
        margin 0 auto
        margin-bottom 40px
      .wx-bg10
        width 672px
        height 1034px
        bis1('../../images/in-bg28')
        margin 0 auto
        margin-bottom 40px
        position relative
        div
          position absolute
          font-size 40px
          color #f94b4f
          span
            color: #f94b4f
        div:nth-of-type(1)
          left 90px
          top 200px
        div:nth-of-type(2)
          left 90px
          top 420px
        div:nth-of-type(3)
          left 90px
          top 640px
        div:nth-of-type(4)
          left 90px
          top 865px
      .wx-contact
        margin-bottom 12px
        overflow hidden
        p
          color: #bac7ff
          font-size 24px
          text-align center
        p:nth-of-type(3)
          color #001b90
          margin 16px 0 23px
        p:nth-of-type(4)
          color #1933a2
          text-align right
          padding-right 44px
      .backTop
        width 80px
        height 80px
        border-radius 40px
        border 1px solid #c8c8c8
        background rgba(214,220,244,0.6)
        overflow hidden
        position fixed
        right 40px
        bottom 135px
        z-index 10000
        div
          color #404040
          font-size 20px
          text-align center
          width 60px
          height 60px
          margin 10px auto 0
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)
  .appbot
    height 322px!important
  .app-bg6
    margin-bottom 335px!important
</style>

