<template>
  <article class="index">
    <!-- <back :pageTitle="pageTitle"></back> -->
    <x-header 
      slot="header"
      class="x-header"
      :title="titleOptions"
      
    ></x-header>
    <header>
      <button class="share" @click="shareToggleFun"></button>
      <p class="timer">活动时间：截止至4月8日24点</p>
    </header>
    <main>
      <section>
        <ul>
          <li>
            <span>年定期6.0%</span><span>投多少送多少</span>
            <span data-growing-title="马上就去-年" @click="goToInvest('year')"></span>
          </li>
          <li>
            <span>季定期5.6%</span><span>投多少送多少</span>
            <span data-growing-title="马上就去-季" @click="goToInvest('quarter')"></span>
          </li>
          <li>
            <span>月定期5.4%</span><span>投多少送多少</span>
            <span data-growing-title="马上就去-月" @click="goToInvest('month')"></span>
          </li>
        </ul>
        <p class="tips">温馨提示：仅从以上活动入口投资方可获得相应的理财红包</p>
      </section>
      <section class="award">
        <dl>
          <dt>已有<span v-text="pariticanPeople"></span>人累计获<span v-text="pariticanMoney"></span>元红包</dt>
          <dd id="roll-box" class="roll-box" v-if="rollData.length">
            <dl id="roll-list" :class="[isRuntime ? '' : 'runtime']">
              <dd v-for="roll in rollData">
                <span v-text="roll.timestamp"></span>
                <span v-text="roll.mobile"></span>
                <span>投{{roll.productName}}得{{roll.money}}元理财红包</span>
              </dd>
            </dl>
          </dd>
        </dl>
      </section>
      <section class="rule">
        <h3>活动规则</h3>
        <div class="rule-info">
          <ul>
            <li>1、活动期间通过此活动页面指定投资入口，投资定期产品任意金额，即可获得相应理财红包（例如：投资10万元，送10万元理财红包）；</li>
            <li>2、投资一笔送一个等额理财红包，笔笔都送，不设上限哦!</li>
            <li>3、理财红包可至福利账户中查收，红包体验金有效期1天，收益可提现；(活动期间参与人数较多，红包发放可能会延时，届时请耐心等候)</li>
          </ul>
          <p>本活动最终解释权归鲸鱼金融所有</p>
        </div>
      </section>
    </main>
    <footer>
        活动仅限部分地区部分用户参与<br>
        本活动与苹果公司无关
        <br><br>
        -存钱赚利息，就上鲸鱼APP-<br>
        官方客服热线1010-2015
    </footer>
    <share
      :shareType="shareInfo.shareType"
      :imageUrl="shareInfo.imageUrl"
      :text="shareInfo.text"
      :title="shareInfo.title"
      :url="shareInfo.url"
      :showShare="shareInfo.showShare" 
      @shareToggleFun="shareToggleFun"
  ></share>
  </article>
</template>

<script>
// import Back from '../components/back'
import XHeader from 'components/x-header/index.vue'
import Share from '../components/share'
import app from 'src/jinr-sdk'
export default {
  name: 'index',
  data () {
    return {
      isRuntime: false,
      shareInfo: {
        shareType: '1',
        imageUrl: '',
        text: '',
        title: '',
        url: '',
        showShare: false
      },
      investInfo: {
        year: {
          // 产品ID
          id: '2',
          // 产品名称
          name: '年定期',
          // 产品类型ID
          typeId: '2',
          // 从那个位置跳转入转入
          fromPage: '4',
          // 卡券ID
          couponId: '0',
          // 卡券名称
          couponName: '0',
          // 是否显示选择卡券
          isShowCoupon: '1'
        },
        quarter: {
          // 产品ID
          id: '7',
          // 产品名称
          name: '季定期',
          // 产品类型ID
          typeId: '2',
          // 从那个位置跳转入转入
          fromPage: '4',
          // 卡券ID
          couponId: '0',
          // 卡券名称
          couponName: '0',
          // 是否显示选择卡券
          isShowCoupon: '1'
        },
        month: {
          // 产品ID
          id: '6',
          // 产品名称
          name: '月定期',
          // 产品类型ID
          typeId: '2',
          // 从那个位置跳转入转入
          fromPage: '4',
          // 卡券ID
          couponId: '0',
          // 卡券名称
          couponName: '0',
          // 是否显示选择卡券
          isShowCoupon: '1'
        }
      },
      pageTitle: '投多少送多少',
      combinationId: '',
      token: '',
      isLogin: false,
      pariticanPeople: '',
      pariticanMoney: '',
      rollData: [
        // {
        //   mobile: '',
        //   money: '',
        //   productName: '',
        //   timestamp: ''
        // }
      ],
      gameId: ''
    }
  },
  computed: {
    titleOptions(){
      return {
        name: '投多少送多少'
        // name: this.$root.title
      }
    }
  },
  methods: {
    // share () {
    //   this.shareInfo.showShare = !this.shareInfo.showShare
    // },
    shareToggleFun () {
      this.shareInfo.showShare = !this.shareInfo.showShare
    },
    goToInvest (token) {
      /* global Jinr */
      if (!this.isLogin) {
        this.jr.warningInfo('您尚未登陆，请先去登陆')
        return
      }
      // if (!this.gameOverTimes) {
      //   this.jr.warningInfo('活动已经结束哦')
      //   return
      // }
      const data = this.investInfo[token]
      app.pushProductTurnIn(
        data.id,
        data.name,
        data.typeId,
        data.fromPage,
        this.gameId,
        data.couponId,
        data.couponName,
        data.isShowCoupon)
    },
    transformTime (timestamp) {
      const minute = 1000 * 60
      const hour = minute * 60
      const day = hour * 24
      const halfamonth = day * 15
      const month = day * 30
      return getDateDiff(timestamp)
      function getDateDiff(timestamp){
        const now = new Date().getTime()
        const diffValue = now - timestamp
        if(diffValue < 0){
        //若日期不符则弹出窗口告之
        //alert("结束日期不能小于开始日期！");
        }
        const monthC = diffValue / month
        const weekC = diffValue / (7 * day)
        const dayC = diffValue / day
        const hourC = diffValue / hour
        const minC = diffValue / minute

        if (monthC >= 1) {
          return parseInt(monthC) + "个月前"
        } else if(weekC >= 1) {
          return parseInt(weekC) + "周前"
        } else if(dayC >= 1) {
          return parseInt(dayC) + "天前"
        } else if(hourC >= 1) {
          return parseInt(hourC) + "小时前"
        } else if(minC>=1) {
          return parseInt(minC) + "分钟前"
        } else {
          return "刚刚"
        }
      }
    },
    initData () {
      const params = {
        combinationId: this.combinationId,
        token: this.token
      }
      this.$http('/activity/Youinvestmenttomoney/getInitData', params)
        .then((response) => {
          this.isLogin = Boolean(response.userLogin)
          this.pariticanPeople = response.pariticanPeople
          this.pariticanMoney= response.pariticanMoney
          this.rollData = response.rollData.map((item) => {
            item.timestamp = this.transformTime(item.timestamp * 1000)
            return item
          })
          if (this.rollData.length > 5) {
            setTimeout(() => {
              this.jr.marquee.startPlay('roll-list', 'roll-box', this)
            }, 1000)
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
      this.$http('/activity/common/isGoInvestEnter', params)
        .then((response) => {
          this.gameId = response
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    initShare () {
      const params = {
        combinationId: this.combinationId,
        nowUrl: window.location.origin + window.location.pathname + window.location.search,
        token: this.token
      }
      this.$http('/activity/common/getWechatShare', params)
        .then((response) => {
          this.shareInfo.imageUrl = response.imgUrl
          this.shareInfo.text = response.desc
          this.shareInfo.title = response.title
          this.shareInfo.url = response.shareUrl
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    init () {
      this.combinationId = this.jr.getRequest()['combinationId']
      this.token = this.jr.getRequest()['token']
      this.initData()
      this.initShare()
    }
  },
  created () {
    this.init()
  },
  components: {
    // Back,
    XHeader,
    Share
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root{
  --rootWidth: 750px;
  --sectionWidth: 668px;
}
.index{
  position: relative;
  width: var(--rootWidth);
  font-size: 0;
}
header{
  position: relative;
  width: 100%;
  height: 885px;
  background: url('../assets/images/header_bg.jpg') no-repeat center center;
  background-size: var(--rootWidth);
}
header>.share{
  width: 88px;
  height: 132px;
  background: none;
  outline: none;
  border: none;
  padding: 0;
  position: absolute;
  right: 57px;
}
header>.timer{
	font-size: 24px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 27px;
	letter-spacing: 0px;
	color: #ffffff;
  position: absolute;
  top: 417px;
  left: 0;
  right: 0;
  text-align: center;
}
main{
  width: 750px;
  height: 1546px;
  background: url('../assets/images/body_bg.jpg') no-repeat center center;
  background-size: 750px;
  margin: 0;
  padding: 0;
  /* overflow: hidden; */
}
main>section:first-of-type{
  width: var(--sectionWidth);
  position: relative;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 10px;
  /* overflow: hidden; */
  padding: 24px 0;
}
main>section:first-of-type>ul{
  list-style: none;
  padding: 0;
}
main>section:first-of-type>ul>li{
  position: relative;
  width: 648px;
  height: 119px;
  line-height: 119px;
  background: url('../assets/images/item_bg.png') no-repeat center center;
  background-size: 648px;
  margin: 0 auto 30px;
  vertical-align: middle;
  font-size: 0;
  /* overflow: hidden; */
}
main>section:first-of-type>ul>li:first-of-type:before{
  display: inline-block;
  content: '';
  width: 170px;
  height: 170px;
  position: absolute;
  left: -80px;
  top: -60px;
  background: url('../assets/images/hot.gif') no-repeat center center;
  background-size: 170px;
  z-index: 1;
}
main>section:first-of-type>ul>li>span{
  vertical-align: middle;
}
main>section:first-of-type>ul>li>span:first-of-type{
	display: inline-block;
  font-size: 36px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #ffffff;
}
main>section:first-of-type>ul>li>span:nth-of-type(2){
  display: inline-block;
	font-size: 24px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #ffff00;
  margin-left: 20px;
}
main>section:first-of-type>ul>li>span:nth-of-type(3){
  display: inline-block;
  width: 207px;
  height: 71px;
  background: url('../assets/images/btn_bg.gif') no-repeat center center;
  background-size: 207px;
  font-size: 0;
  padding: 0;
  margin-left: 20px;
}
main>section:first-of-type>ul>li:last-of-type{
  margin-bottom: 0;
}
main>section:first-of-type>p{
	font-size: 24px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 27px;
	letter-spacing: 0px;
	color: #313cbf;
  margin: 24px auto 0;
}
.award{
  margin-top: 70px;
}
.award>dl{
  padding: 0;
  margin: 0;
  position: relative;
}
.award>dl>dt{
	font-size: 30px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #ffffff;
}
.award>dl>dt>span{
  color: #ffff00;
}
.award>dl>dt>dd{
  margin: 70px auto 0;
  width: var(--sectionWidth);
  background: #ffffff;
  border-radius: 10px;
}
.roll-box{
  width: var(--sectionWidth);
  height: 262px;
  background: #ffffff;
  border-radius: 10px;
  margin: 20px auto 0;
  padding: 27px 0 0;
  font-size: 24px;
  color: #000000;
  overflow: hidden;
  position: relative;
}
.roll-box:before,
.roll-box:after{
  display: inline-block;
  content: '';
  width: 100%;
  height: 27px;
  position: absolute;
  left: 0;
  right: 0;
  background: #ffffff;
  z-index: 1;
}
.roll-box:before{
  top: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.roll-box:after{
  bottom: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.roll-box>dl{
  margin: 0;
  padding: 0;
}
.roll-box>dl.runtime{
  transition: transform 1.1s linear; 
}
.roll-box>dl>dd{
  margin: 21px 0 0;
}
.roll-box>dl>dd:first-of-type{
  margin-top: 0;
}
.roll-box>dl>dd>span:nth-of-type(2){
  display: inline-block;
  margin: 0 10px;
}
.rule{
  margin-top: 70px;
}
.rule>h3{
	font-size: 30px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 27px;
	letter-spacing: 0px;
	color: #ffffff;
}
.rule>.rule-info{
  position: relative;
  margin: 0 auto;
  width: var(--sectionWidth);
  border-radius: 10px;
  background: #ffffff;
}
.rule-info{
  padding: 37px 0 41px;
}
.rule-info>ul{
  position: relative;
  margin: 0 auto;
  width: 90%;
  padding: 0;
  list-style: none;
  font-size: 24px;
  color: #313cbf;
  text-align: left;
}
.rule-info>ul>li{
  margin-bottom: 10px;
}
.rule-info>ul>li:last-of-type{
  margin: 0;
}
.rule-info>p{
  font-size: 24px;
  color: #313cbf;
  margin-top: 10px;
}
footer{
	font-size: 21px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 27px;
	letter-spacing: 0px;
	color: #8a6ad1;
  background: #310b82;
  padding: 30px 0;
}
</style>
 