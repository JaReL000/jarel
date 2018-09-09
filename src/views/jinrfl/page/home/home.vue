<template>
  <div class="index">
    <section class="index-bg1" v-show="userState==='hbno'">
      <div class="index-bg1-wrap" @touchstart="musicPlay">
        <div class="money"><span v-text="getMoney"></span>元</div>
        <div id="con"></div>
      </div>
      <div class="index-bg1-list">
        <div class="index-bg1-list-title">
          <span>已有<i v-text="totalPeo"></i>人加入了活动</span>
          <span>发出红包<i v-text="totalmon"></i>元</span>
        </div>
        <div class="index-bg1-list-lb">
          <ul :style="{top}" :class="{top}">
            <li v-for="(item,index) in lbListFoot" :key="index">
              <img :src="item.imgUrl">
              <span class="span1" v-text="item.name"></span>
              <span>红包<i v-text="item.money"></i>元</span>
              <em v-text="item.time"></em>
            </li>
          </ul>
        </div>
      </div>
      <audio id="shakeMusic" :src="audio" class="media-audio" preload>您的浏览器不支持音频播放标签。</audio>
    </section>

    <section class="index-bg2" v-if="userState==='noreg'||userState==='reg'">
      <!-- <div class="fixed-top">
        <img src='../../images/fl_bg13.png'>
				<div class="fixed-top-div1">
					<ul :style="{top}" :class="{top}">
						<li v-for="(item,index) in topListData" :key="index">
							尾数<span v-text="item.tel"></span>的用户获得鲸鱼宝送出的<span v-text="item.money"></span>元红包<span v-text="item.time"></span>
						</li>
					</ul>
				</div>
      </div> -->
      <div class="index-bg2-banner">
        <a href="javascript:;" @click="shows">更多红包？</a>
        <img class="index-bg2-img1" src="../../images/fl_bg6.png" alt="" v-if="userState==='noreg'">
        <img class="index-bg2-img2" src="../../images/fl_bg8.png" alt="" v-else>
        <div class="index-bg2-div1">
          <img :src="wxImg">
          <span><i v-text="getMoney"></i>元</span>
        </div>
        <div class="index-bg2-div2">
          <p>红包已存入账户<i v-text="userTel"></i></p>
          <p>打开鲸鱼APP，收益可提现</p>
        </div>
      </div>
      <div class="noreg" @click="toReg" v-if="userState==='noreg'">注册激活账户红包</div>
      <div class="reg" @click="toApp" v-if="userState==='reg'">下载鲸鱼APP领取收益</div>
      <div class="index-bg1-list">
        <div class="index-bg1-list-title">
          <span>已有<i v-text="totalPeo"></i>人加入了活动</span>
          <span>发出红包<i v-text="totalmon"></i>元</span>
        </div>
        <div class="index-bg1-list-lb">
          <ul :style="{top}" :class="{top}">
            <li v-for="(item,index) in lbListFoot" :key="index">
              <img :src="item.imgUrl">
              <span class="span1" v-text="item.name"></span>
              <span>红包<i v-text="item.money"></i>元</span>
              <em v-text="item.time"></em>
            </li>
          </ul>
        </div>
      </div>
      <img class="ad1" src="../../images/fi_bg9.jpg" alt="">
      <img class="ad2" src="../../images/fl_bg10.jpg" alt="">
      <!-- <div class="ad3">
        <div class="ad3-wrap">
          <div class="ad3-div1">
            安全运营：<span v-text="commonData.day"></span>天
          </div>
          <div class="ad3-div2">
            累计注册用户：<span v-text="commonData.peopleNum"></span>人
          </div>
          <div class="ad3-div3">
            累计交易额：<span v-text="commonData.total_money"></span>元
          </div>
          <div class="ad3-div4">
            为用户赚取收益：<span v-text="commonData.total_shouyi"></span>元
          </div>
        </div>
      </div> -->
      <img class="ad4" src="../../images/fl_bg12.jpg" alt="">
      <div class="bot">
        <p>本活动最终解释权归鲸鱼平台所有</p>
        <p>鲸鱼官方客服热线：10102015</p>
        <p>理财有风险，投资需谨慎</p>
      </div>
      <div style="height:70px;"></div>
      <div class="foots">
        <img class="foots-img1" src="../../images/logo.png">
        <div class="foots-div1">
          <span>鲸鱼</span>
          <span>首投最高送50000</span>
        </div>
        <img class="foots-img2" src="../../images/download.png" @click="toApp">
      </div>
    </section>

    <reg
      :combinationId="combinationId"
      :mUrl="mUrl"
      :token="token"
      v-if="alertRegShowOrHide"
      @changeUserState="changeUserState"
      @initData="initData"
      @getActivityShowItem="getActivityShowItem">
    </reg>
    <fl
      v-if="alertFLShowOrHide"
      :isRegister="isRegister"
      :mUrl="mUrl"
      :firstInvest="firstInvest">
    </fl>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import gua from '../../plugin/gua'
import * as jrUrl from '../../urlconfig/urlconfig'
import {getRequest,pattern} from '../../util/util'
import reg from '../../components/alertReg'
import fl from '../../components/alertFL'
import Flash from '@/components/flash'
import {fetchWXconfig} from '../../plugin/fetchWXconfig'

let imgurl = require('../../images/fl_bg3.png')
export default {
  components: {
    reg,
    fl
  },
  name: 'index',
  data () {
    return {
      inviter: '',
      firstInvest: '',//是否首投
      isRegister: '',//是否注册过
      token: '',
      wxImg: '',
      topListData:[//顶部轮播数据
        // {tel: '1243',money: '1222'},
      ],
      combinationId: '',
      commonData:{//平台数据
        peopleNum:null,
        total_money:null,
				day:null,
				total_shouyi:null
      },
      mUrl:'',//m站链接，从公共接口拿
      userTel: '',
      timer: null,
			timerNxit: null,
      activeIndex: 0,
      totalPeo: null,
      totalmon: null,
      audio: require('../../audio/voice.mp3'),
      userState: '',//hbno:未领取过红包，reg:已领取红包，已注册用户,noreg:已领取红包，但未注册的用户
      getMoney: '',//刮出的奖金
      lbListFoot: [
        // {imgUrl: '', name: '心如止水啊啊啊', money: 1000, time:'07/01 09:22'},
      ]//底部轮播
    }
  },
  computed: {
    ...mapState(['alertRegShowOrHide','alertFLShowOrHide']),
    top(){
      let index = this.activeIndex
      if(index){
        return -(index * (0.93)) + 'rem'
      }
      return 0
    },
    tops(){
      let index = this.activeIndex1
      if(index){
        return -(index * (0.74)) + 'rem'
      }
      return 0
    }
  },
  created () {
    pattern()
    this.token = getRequest()['token']
    this.combinationId = getRequest()['combinationId']
    if(!getRequest()['isJump']){
      let domain = process.domain
      let ishttps = 'https:' == document.location.protocol ? true: false
      if(ishttps){
        domain = domain.replace("http", "https")
      }
      location.href = domain + '/activity/Jinrfuli/wechatEnter?combinationId='+this.combinationId+'&token='+this.token
    }
    this.getWechatShare()
    this.getActivityShowItem()
    this.initData()
    this.getPlatformUserStatis()
  },
  mounted () {

  },
  methods: {
    ...mapMutations(['CHANGEalertReg','CHANGEalertFL']),
    getWechatShare(){
      // 获取分享配置信息
      let params={
        combinationId:this.combinationId,
        nowUrl:location.href.split('#')[0]
      }
      if(this.inviter){
        params.inviter = this.inviter
      }
      this.$http(jrUrl.getWechatShare,params).then((res)=>{
        fetchWXconfig(res,this)
      })
    },
    changeUserState(val){
      this.userState = val
    },
    getActivityShowItem(){
      let params= {
        combinationId: this.combinationId,
        token: this.token
      }
      this.$http(jrUrl.getActivityShowItem,params).then(res=>{
        this.mUrl = res.activity_abroad_url+ '&param=' + this.userTel
      })
    },
    initData(){
      let params= {
        combinationId: this.combinationId,
        token: this.token
      }
      this.$http(jrUrl.initData,params).then(res=>{
        this.isRegister = res.isRegister
        this.firstInvest = res.firstInvest
        if(res.game == 1 && res.isRegister == 1){
          // 领取了且注册了
          this.userState = 'reg'
        }else if(res.game == 1 && res.isRegister == 0){
          // 领取了且未注册
          this.userState = 'noreg'
        }else if(res.game == 0){
          // 没领过
          this.userState = 'hbno'
          setTimeout(()=> {
          if(this.userState === 'hbno'){
              this.inits()
            }
          },0)
        }
        this.getMoney = res.money
        this.totalPeo = res.participants
        this.totalmon = res.totalSendMoney
        if(res.bodyRollData.length>0){
          res.bodyRollData.map((val,i)=>{
            let data = new Date(val.timestamp*1000)
            val.time = data.pattern("MM/dd HH:mm")
            this.lbListFoot.push({
              imgUrl: val.wechatHeaderUrl,
              name: val.wechatNickName,
              money: val.money,
              time: val.time
            })
          })
          this.move()
        }
        if(res.mobile){
          this.userTel = res.mobile
        }
        this.getActivityShowItem()
        this.wxImg = res.wechatInfo.wechatHeaderUrl
      })
    },
    shows(){
      this.CHANGEalertFL(true)
    },
    toReg(){
      location.href = this.mUrl
    },
    toApp(){
      location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core'
    },
    _moveUp(){
			let self=this
			clearInterval(this.timer)
			clearTimeout(this.timerNxit)
			this.timer = setInterval(()=> {
				if(self.activeIndex >= self.lbListFoot.length/2) {
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
    },
    inits(){
      let oDiv = document.getElementById('con')
      let self = this
      gua.init(oDiv,{
        fg : imgurl,
        p : 90,
        clear : function(){
          setTimeout(()=> {
            self.CHANGEalertReg(true)
          }, 1500)
        },
        size : 20
      })
    },
    musicPlay(){
      let shakeMusic = document.getElementById("shakeMusic")
      shakeMusic.play()
    },
    getPlatformUserStatis(){
			let params= {
        combinationId: this.combinationId,
        token: this.token
			}
			this.$http(jrUrl.getPlatformUserStatis,params).then((response)=>{
				if(typeof(response.register_number)==='number'){
						this.commonData.peopleNum= Number(response.register_number)
					}
        this.commonData.day= response.day
        this.commonData.total_shouyi= response.total_yield
        this.commonData.total_money = response.total_money
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
    // overflow hidden
    .index-bg1
      width 100%
      height 100%
      bis1('../../images/fl_bg1','.jpg')
      overflow hidden
      // -webkit-overflow-scrolling touch
      .index-bg1-wrap
        width 410px
        height 230px
        bis1('../../images/fl_bg2')
        margin 517px auto 0
        overflow hidden
        position relative
        .money
          font-size 26px
          color #eb1c24
          font-weight 600
          text-align center
          overflow hidden
          position absolute
          left 50%
          top 50%
          transform translate(-50%,-50%)
          -webkit-transform translate(-50%,-50%)
          span
            font-size 50px
            font-weight 600
        #con
          width 376px
          height 191px
          margin 20px auto 0
      .index-bg1-list
        width 99%
        height 427px
        margin 40px auto 0
        bis1('../../images/fl_bg4')
        overflow hidden
        .index-bg1-list-title
          height 65px
          line-height 65px
          overflow hidden
          text-align center
          font-size 22px
          color #ffe3cc
          span
            i
              color #ffe92b
        .index-bg1-list-lb
          overflow hidden
          width 556px
          height 288px
          overflow hidden
          margin 14px auto 0
          .top
            transition: top 0.8s
          ul
            overflow hidden
            position relative
            li
              height 50px
              line-height 50px
              overflow hidden
              margin-bottom 20px
              text-align center
              img
                width 50px
                height 50px
                border-radius 25px
                vertical-align top
                margin-right 24px
              span
                height 100%
                line-height 50px
                display inline-block
                vertical-align top
                margin-right 10px
                color #ffe3cc
                font-size 22px
              .span1
                width 120px
                ellipsis()
                text-align left
                margin-right 10px
              em
                font-style normal
                display inline-block
                height 100%
                line-height 50px
                vertical-align top
                color #ffe3cc
                font-size 22px
    .index-bg2
      width 100%
      height 100%
      background #f43635
      .fixed-top
        height 70px
        width 100%
        overflow hidden
        position fixed
        top 0px
        left 0px
        background rgba(0,0,0,0.6)
        .fixed-top-div1
          height 100%
          overflow hidden
          float left
          font-size 24px
          color #ffc6bc
          box-sizing: border-box
          .top
            transition: top 0.8s
          ul
            width 100%
            position relative
            li
              text-align center
              padding-left 20px
              height 100%
              line-height 70px
              box-sizing border-box
              overflow hidden
              color #ffc6bc
              span
                color #ffc6bc
        img
          display block
          width 30px
          height 25px
          float left
          margin 22.5px 22px 0 18px

      .index-bg2-banner
        height 776px
        bis1('../../images/fl_bg7','.jpg')
        overflow hidden
        a
          display block
          text-decoration underline
          color #ffde02
          font-size 30px
          float right
          margin 80px 25px 0 0
        .index-bg2-img1
          display block
          width 598px
          height 120px
          margin 160px auto 0
        .index-bg2-img2
          display block
          width 605px
          height 130px
          margin 160px auto 0
        .index-bg2-div1
          width 296px
          height 86px
          margin 110px auto 0
          overflow hidden
          text-align center
          img
            width 86px
            height 100%
            line-height 86px
            border-radius 43px
            vertical-align middle
          span
            display inline-block
            height 100%
            line-height 86px
            vertical-align middle
            font-size 28px
            color #fff
            i
              font-size 38px
              font-weight 600
              color #fff
        .index-bg2-div2
          width 425px
          height 89px
          bis1('../../images/circle')
          margin 170px auto 0
          box-sizing border-box
          font-size 26px
          padding-top 5px
          text-align center
          color #fff
          img
            display none!important
          canvas
            display none!important
          p
            i
              color #fff100
      .noreg,.reg
        width 503px
        height 74px
        bis1('../../images/btn')
        margin 0 auto
        text-align center
        line-height 74px
        color #333
        font-size 29px
      .index-bg1-list
        width 99%
        height 427px
        margin 40px auto 0
        bis1('../../images/fl_bg4')
        overflow hidden
        .index-bg1-list-title
          height 65px
          line-height 65px
          overflow hidden
          text-align center
          font-size 22px
          color #ffe3cc
          span
            i
              color #ffe92b
        .index-bg1-list-lb
          overflow hidden
          width 556px
          height 288px
          overflow hidden
          margin 14px auto 0
          .top
            transition: top 0.8s
          ul
            overflow hidden
            position relative
            li
              height 50px
              line-height 50px
              overflow hidden
              margin-bottom 20px
              text-align center
              img
                width 50px
                height 50px
                border-radius 25px
                vertical-align top
                margin-right 24px
              span
                height 100%
                line-height 50px
                display inline-block
                vertical-align top
                margin-right 10px
                color #ffe3cc
                font-size 22px
              .span1
                width 120px
                ellipsis()
                text-align left
                margin-right 10px
              em
                font-style normal
                display inline-block
                height 100%
                line-height 50px
                vertical-align top
                color #ffe3cc
                font-size 22px
      .ad1
        width 100%
        height 660px
        border 0
      .ad2
        width 100%
        height 1262px
      .ad3
        width 100%
        height 454px
        bis1('../../images/fl_bg11','.jpg')
        overflow hidden
        .ad3-wrap
          width 540px
          height 271px
          margin 120px auto 0
          font-size 34px
          box-sizing border-box
          padding-top 30px
          color #fff
          span
            color #fff100
      .ad4
        width 100%
        height 476px
      .bot
        height 130px
        overflow hidden
        margin-bottom 15px
        p
          color #fff
          font-size 26px
          text-align center
        p:nth-of-type(3)
          color #b32625
          font-size 20px
          text-align right
          padding-right 32px
          margin-top 30px
      .foots
        width 100%
        height 126px
        background rgba(0,0,0,0.6)
        position fixed
        bottom 0px
        z-index 2000
        overflow hidden
        .foots-img1
          float left
          width 80px
          height 80px
          margin 23px 14px 0 35px
        .foots-div1
          float left
          overflow hidden
          margin-top 25px
          span
            display block
            font-size 28px
            color #fff
        .foots-img2
          float right
          width 292px
          height 80px
          margin 20px 28px 0 0
</style>

