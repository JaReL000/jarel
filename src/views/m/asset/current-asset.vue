<template>
  <div class="current-asset fixed" v-show="show">
    <jr-banner
        type="asset"
        title="活期"
        titleTop="活期总资产"
        :productid="current.productid"
        money_type="12"
        order_type="0"
        :account="account"
        record="/asset/currentAsset/jrRecord"
      ></jr-banner>
    <div class="mainT">
      <router-link to="/details/1">
      <div class="tabs">
        <div class="tabs-top">
          <h5>活期</h5>
          <p v-if="parseFloat(activeateRaise)">{{activeateRaise}}加息中</p>
        </div>
        <div class="tabs-mainbox">
          <div class="tabs-main">
            <h1>{{productList}}</h1>
            <h2>七日年化收益率</h2>
          </div>
          <div class="tabs-mainright">
            <div class="time">随存随取</div>
            <h2>投资期限</h2>
          </div>
        </div>
      </div>
    </router-link>
    </div>
    <transition name="fold">
      <div class="footer fixed-xm">
        <div class="link-doubel" v-if="productLimit.is_out_open">
          <router-link
            :to="{ path: `/productOut/${$route.query.productid}`, query: {take_money: account.totalAccount}}"
          >转出</router-link>
          <router-link
            :to="{ path: `/productIn/${$route.query.productid}`,}" class="changein"
            v-show="productLimit.is_open"
          >转入</router-link>
          <a href="javascript:;" class="changeinfade"
            v-show="!productLimit.is_open"
          >{{productLimit.content}}</a>
        </div>

        <div class="link-single" v-if="!productLimit.is_out_open">
          <router-link
            :to="{ path: `/productIn/${$route.query.productid}`}" class="changein"
            v-show="productLimit.is_open"
          >转入</router-link>
          <a href="javascript:;" class="changeinfade"
            v-show="!productLimit.is_open"
          >{{productLimit.content}}</a>
        </div>
      </div>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
  import jrBanner from '../components/JrBanner'

  import { assetApi } from '../api'

  export default {
    name: 'current-asset',
    components: {
      jrBanner
    },
    data() {
      return {
        show: false,
        isLogin: false,
        activeateRaise: '',
        current:{
          invest_rate: "5.35",
          invest_rate_finish: "0.00",
          plusyield: "0.88"
        },
        productList: 0.00,
        account: {
          "totalAccount": "2.14",
          "yestodayIncome": "0.00",
          "total_yield": "2.14",
          "showCurrentNotify": 2
        },
        productLimit: {
          content: "", //
          every_money_min: 0, // 0 灰色不可点击
          is_open: 0,
          is_out_open: 0,
          money: 0
        }
      }
    },
    computed: {},
    watch: {},
    created() {
      this.initFun()
    },
    mounted() {
      this.$messagebox.close()
    },

    methods: {

      initFun(){
        this.$http({
          servicename: 'product.productAsset',
          productid:this.$route.query.productid || '',
        }).then((response)=>{
          this.productList = response.asset.yield_rate
          // this.isLogin = this.$root.isLogin = response.data.isLogin
          this.current = response.asset
          this.productLimit = response.productLimit
          this.account.totalAccount = response.asset.total_money
          this.account.yestodayIncome = response.asset.yesterday_yield
          this.account.total_yield = response.asset.total_yield
          this.activeateRaise = response.asset.coupon_rate
          this.show = true
          
        }).catch(function(error){
          console.log("失败了:"+error)
        });
      },
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

  .current-asset
    height 100%
    text-align center
    // background-color baise
    background-color: #f5f5f5
    color wordDfColor
    .main
      padding rem(32) rem(22)
    .downlaod
      background-color #5c5c5c
      &>div
        padding rem(20) rem(29) 0
        img
          float left
          height rem(59)
        h3
          float left
          padding-left rem(26)
          line-height rem(58)
          font-size rem(26)
          color baise
        a.app
          float right
          width rem(218)
          margin-top rem(2)
          border-radius rem(5)
          line-height rem(53)
          font-size rem(24)
          background-color mainColor
          color baise
  .link-doubel
    padding 10px 30px
    overflow hidden
    background #ffffff
    &>a
      width 47%
      height 94px
      border 2px solid #0C72E3
      border-radius 15px
      background none 
      &.changein
        float right
        background #0C72E3
        color #fff
      &.changeinfade
        float right
        background #C7C7C7
        border 2px solid #C7C7C7
        color #fff
  .link-single
    padding 10px 30px
    overflow hidden
    background #ffffff
    a
      width 100%
      height 97px
      border:0px
      border-radius 15px
      background mColor
      color #ffffff
    a.changeinfade
      background #C7C7C7
      color #fff
.mainT
  padding rem(20) rem(22) rem(100)
.tabs
  margin 0 0 rem(20)
  //border 1px solid #ccc
  background-color baise
  //border-radius rem(8)
  //box-shadow 0px 2px 10px 0px rgba(0, 0, 0, 0.2)
  &>p
    font-size rem(26)
    line-height rem(30)
    padding-bottom rem(30)
    color wordSecondColor
  h2
    font-size rem(22)
    line-height rem(66)
    background url("../assets/line_bg.png") no-repeat center center \/ rem(261) 2px
    color #999999
    margin-top rem(-30)
  &-top
    overflow hidden
    text-align left
    padding rem(24) rem(20) rem(16)
    line-height rem(30)
    h5
      position relative
      float left
      height rem(32)
      line-height @height
      padding-left rem(14)
      font-size rem(30)
      border-left rem(6) solid mainColor
      width 50%
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      color #000
    p
      float right
      font-size rem(18)
      border solid rem(2) #fec185
      color #fec185
      border-radius rem(4)
      padding .3em 1.2em .1em 1.2em
    h6
      position: relative;
      float right
      padding-right rem(30)
      font-size rem(26)
      color wordSecondColor
      &:after, &:before
        border: rem(10) solid transparent;
        border-left: rem(10) solid #fff;
        width: 0;
        height: 0;
        position: absolute;
        top: 50%;
        right: 0px;
        transform translate3d(0%, -50%, 0)
        content: ' '
      &:before
        border-left-color: wordSecondColor;
        right: -2px;
  &-main
    line-height rem(80)
    font-size rem(86)
    color mainColor
    h1
      display inline-block
      &:after
        content: '%'
        font-size rem(30)
    h3
      position relative
      display inline-block
      margin-left rem(-10)
      span
        font-size rem(70)
        color #fc9010
        &:before
          content: '+'
          font-size rem(45)
          vertical-align bottom
        &:after
          content: '%'
          font-size rem(24)
      label
        position absolute
        top rem(-32)
        left 50%
        transform: translate3d(-50%,0,0)
        -ms-transform: translate3d(-50%,0,0)
        -moz-transform: translate3d(-50%,0,0)
        -webkit-transform: translate3d(-50%,0,0)
        -o-transform: translate3d(-50%,0,0)
        padding 0 rem(10)
        width rem(120)
        border-radius rem(6)
        line-height rem(32)
        font-size rem(20)
        text-align center
        background-color #fc9010
        color baise
        &:after, &:before
          content ' '
          position absolute
          bottom -51%
          left 50%
          border rem(10) solid transparent
          border-top rem(10) solid #fc9010
          width 0
          height 0
          transform translate(-50%, 0%)
  .inTo
    display block
    /*border-top 1px solid wordSecondColor*/
    line-height rem(66)
    font-size rem(32)
    color mainColor
.tabs-mainbox
  padding 20px 40px 
  position relative
.tabs-main
  text-align left
  padding-right 30%
.tabs-mainright
  position absolute
  right rem(50)
  top rem(20)
  text-align right
  .time
    color #666666
    line-height rem(70)
    font-size rem(40)
  h2
    margin rem(0)
</style>
