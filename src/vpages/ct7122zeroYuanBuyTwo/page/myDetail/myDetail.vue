<template>
  <div class="myDetail">
    <section class="myDetail-wrap">
      <div class="myDetail-bg1">
        <section v-if="userAddress.address" class="myDetail-mes">
          <i v-text="userAddress.username"></i>
          <i v-text="userAddress.phone"></i>
          <i v-text="userAddress.address"></i>
        </section>
        <p>为确保奖品如实送到您手上，一定要认真认真认真填写收货地址并核对信息确认无误，谢谢您的配合！</p>
        <div @click="toAddress" v-if="userAddress.address">修改收货地址</div>
        <div @click="toAddress" v-else>请填写收货地址</div>
      </div>

      <div class="myDetail-bg2">
        已获得奖品数量：<span v-text="getNum"></span>
      </div>

      <div class="myDetail-bg3">
        <div class="myDetail-bg3-rile">
          <p style="margin-bottom:5px;">由于参与人数较多，奖品状态的更新显示可能有所延迟,请3分钟后刷新查看。</p>
          <p style="margin-bottom:5px;">已获得商品将在活动结束后15个工作日内发货,请耐心等待!</p>
        </div>
        <ul>
          <li v-for="(item,index) in giftList" :key="index">
            <div class="bg3-div1">
              <img :src="item.photo_path">
            </div>
            <div class="bg3-div2">
              <span v-text="item.commodity_name"></span>
              <div>
                <i class="i1" v-if="item.is_pay_full == 0">还差<b style="font-weight:500;" v-text="item.invest_money-item.real_pay_money"></b>元</i>
                <i class="i2" v-if="item.is_pay_full == 0" @click="investAgain( item.productid,item.combination_id )">继续存入</i>
                <i class="i3" v-if="item.is_pay_full == 1">已存<em v-text="item.real_pay_money"></em>元<em v-text="item.product_name"></em></i>
                <i class="i4" v-if="item.is_pay_full == 1">已获得</i>
              </div>
              <p v-if="item.is_pay_full==0">到期赎回本金，再拿<i v-text="item.yeild"></i>元利息<br/>存<i v-text="item.product_name"></i><i v-text="item.invest_money"></i>元即可0元购</p>
              <p v-if="item.is_pay_full==1">
                到期赎回本金，再拿<i v-text="item.yeild"></i>元利息<em v-if="item.is_pay_full == 1" v-text="item.c_time"></em>
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div class="myDetail-bg4" v-if="logs&&giftList.length>0">
        <p>*已获得奖品将在活动结束后15个工作日内发货，请耐心等待。</p>
        <div>-存钱赚利息 就用鲸鱼APP-</div>
      </div>

      <div class="myDetail-bg5" v-else>
        <p>啥也没有</p>
        <p>快去0元抢好货啊</p>
        <div>-存钱赚利息 就用鲸鱼APP-</div>
      </div>
    </section>
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
import alertGift from '../../components/alertGift'
export default {
  name: 'myDetail',
  components: {
    alertGift
  },
  data () {
    return {
      giftList: [],//获奖列表
      getNum: null,
      endTimestamp: 0,
      isEnd: true,
      orderId: 0,
      investMoney: 0,
      commodityName: '',
      needMon: 0,
      logs: 0,
      realPayMoney: 0,
      investNum: 0,
      userAddress: {
        'username': '',
        'phone': '',
        'address': ''
      }
    }
  },
  created () {
    this.$root.title = '我的奖品'
    this.endTimestamp = sessionStorage.getItem('endTimestamp')
    this.isEnd = this.endTimestamp>Date.now()?false:true
    this.logs = parseInt(sessionStorage.getItem('log'))
    this.getUserAddress()
    this.selectMyAllGiftList()
    this.getInvestStatus ()
  },
  mounted () {
    
  },
  methods: {
    getUserAddress() {
      let params = {
        data: this.$route.query.data,
        combinationId: this.$route.query.combinationId
      }
      this.$http( jrUrl.getUserAddress,params ).then( res=>{
        if(res){
          this.userAddress['phone'] = res['phone']
          this.userAddress['username'] = res['username']
          this.userAddress['address'] = res['address']
        }
      } )
    },
    investAgain( productid,combination_id ) {
      if( this.isEnd ){
        Flash( '活动已结束!' )
        return false  
      }
      try {
        combination_id = combination_id.toString()
        sessionStorage.setItem('productids',productid)
        sessionStorage.setItem('combinationIds',combination_id)
        let isShowCoupon = sessionStorage.getItem('isShowCoupon')
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
        let ios = jinrsdk.isiOS
        // let Android = jinrsdk.isAndroid
        // if(this.orderId){
        //   this.getInvestMeaasge( this.orderId )
        // }
      } catch (error) {
        console.log( error )
      }
    },
    getInvestMeaasge( orderId ) {
      let ios = jinrsdk.isiOS
      let params = {
        'orderid': orderId,
        // 'data': sessionStorage.getItem('datas'),
        // 'combinationId': sessionStorage.getItem('combinationIds')
        data: this.$route.query.data,
        combinationId: this.$route.query.combinationId,
      }
      this.$http(jrUrl.investCompleteTipData,params).then(res=>{
        // if(ios){
        //   localStorage.setItem('orderidss',this.orderId)
        // }
        this.$root.alertGiftFlag = true
        this.investMoney = parseFloat(res.invest_money)
        this.commodityName = res.commodity_name
        this.realPayMoney = res.real_pay_money
        this.investNum = res.invest_num
        // this.selectMyAllGiftList()
      })  
    },
    toAddress() {
      //调app接口
      try {
        Jinr.pushAddress()
      } catch (error) {
        
      }
    },
    selectMyAllGiftList() {
      let params = {
        // 'data': sessionStorage.getItem('datas'),
        // 'combinationId': sessionStorage.getItem('combinationIds')
        data: this.$route.query.data,
        combinationId: this.$route.query.combinationId
      }
      this.$http( jrUrl.selectMyAllGiftList,params ).then(res=>{
        this.giftList = res.list
        if( !this.logs ){
          this.giftList = []
        }
        this.getNum = res.count
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/mixin.styl'
  .myDetail
    width 100%
    height 100%
    overflow hidden
    background #39adf7
    position relative
    box-sizing border-box
    padding-top 92px
    background #fff
    .myDetail-wrap
      width 100%
      height 100%
      overflow scroll
      -webkit-overflow-scrolling touch
      position relative
      overflow-x hidden
      box-sizing border-box
      .myDetail-bg1
        width 710px
        height auto
        background #faf8f5
        margin 20px auto 38px
        overflow hidden
        .myDetail-mes
          height auto
          overflow hidden
          i 
            display block
            font-size 26px
            color #f59524
            margin 10px 0 0 28px
        p
          width 652px
          height 60px
          color #f59524
          font-size 26px
          margin 19px auto 22px
        div
          width 650px
          height 59px
          border solid 1px #fda339
          margin 0 auto
          text-align center
          line-height 59px
          font-size 26px
          color #f59524
      .myDetail-bg2
        height 103px
        line-height 103px
        color #333
        overflow hidden
        text-align center
        font-size 30px
        span 
          color #da4a4a
      .myDetail-bg3
        height auto
        overflow hidden
        width 710px
        margin 0 auto
        .myDetail-bg3-rile
          width 95%
          color #f59524
          margin 0 auto
          // white-space nowrap
        ul
          overflow hidden
          height auto
          li
            height 252px
            // line-height 252px
            overflow hidden
            border solid 1px #e7e6e6
            display flex
            margin-bottom 20px
            .bg3-div1
              flex 0.6
              background #f5f5f5
              overflow hidden
              img 
                width 100%
                height 100%
                display block
            .bg3-div2
              flex 1
              overflow hidden
              padding 30px 0 0 30px
              box-sizing border-box
              span 
                font-size 32px
                font-weight bold
              div
                display flex
                width 398px
                height 52px
                overflow hidden
                margin 15px 0
                .i1
                  display inline-block
                  flex 1
                  box-sizing border-box
                  border 1px solid #fda339
                  color #fda339
                  font-size 28px
                  height 100%
                  line-height 52px
                  text-align center
                .i2
                  display inline-block
                  flex 0.5
                  box-sizing border-box
                  height 100%
                  line-height 52px
                  text-align center
                  font-size 30px
                  background linear-gradient(#fda339,#fda339), linear-gradient(#fda339,#fda339)
                  color #fdf8ef
                .i3
                  display inline-block
                  flex 1
                  box-sizing border-box
                  border 1px solid #3f9dda
                  color #3f9dda
                  height 100%
                  line-height 52px
                  text-align center
                .i4
                  display inline-block
                  flex 0.5
                  box-sizing border-box
                  height 100%
                  line-height 52px
                  text-align center
                  font-size 30px
                  color #fff
                  background linear-gradient(#3f9dda,#3f9dda),linear-gradient(#3f9dda,#3f9dda)
              p
                font-size 24px
                color #646464
                i 
                  color #b4282d
      .myDetail-bg4
        height 210px
        overflow hidden
        font-size 20px
        color #909090
        margin-left 20px
        position relative
        margin-bottom 15px
        div
          position absolute
          left 50%
          bottom 0px
          color #909090
          transform translateX(-50%)
      .myDetail-bg5
        height 700px
        overflow hidden
        font-size 30px
        position relative
        p
          text-align center
          color #909090
        p:nth-of-type(1)
          margin-top 200px
        div
          text-align center
          color #909090
          font-size 20px
          position absolute
          left 50%
          bottom 0px
          transform translateX(-50%)
</style>
