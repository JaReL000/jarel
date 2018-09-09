<template>
  <transition name="fate">
<div class="banner">
    <!--默认没有登陆-->
    <div class="banner-def" v-if="type==='default'">
      <h3 class="JrBanner-logo"><span></span></h3>
      <div class="banner-def-list">
        <div class="banner-list__item">
          <img
            src="../assets/icon/banner_safe_icon_data64.png"
            alt="安全保障"
          >
          <p>安全保障</p>
        </div>
        <div class="banner-list__item">
          <img
            src="../assets/icon/banner_asset_icon_data64.png"
            alt="优质资产"
          >
          <p>优质资产</p>
        </div>
        <div class="banner-list__item">
          <img
            src="../assets/icon/banner_profit_icon_data64.png"
            alt="稳健收益"
          >
          <p>稳健收益</p>
        </div>
      </div>
    </div>
    <!--资产-->
    <div class="banner-asset" v-if="type==='asset'">
      <div class="top">
        <p v-text="titleTop"></p>
        <h1 v-text="account.totalAccount"></h1>
      </div>
      <div class="main">
        <div>
          <p>昨日收益(元)</p>
          <h4 v-text="account.yestodayIncome"></h4>
        </div>
        <div>
          <p>累计收益(元)</p>
          <h4 v-text="account.total_yield"></h4>
        </div>
      </div>
      <div
        v-if="!index"
        class="search"
        @click="goToPush()"
      ><span>交易查询</span></div>
    </div>
    <!--周&活期-->
    <div class="jr-banner" v-if="type==='week'|| type==='current'|| type==='regular'">
      <h3 class="banner_top" v-if=" type==='current'">七日年化收益率</h3>
      <h3 class="banner_top" v-if="type==='week'|| type==='regular'">预期年化收益率</h3>
      <!--周周盈-->
      <div class="jr-banner-week" v-if="type==='week'">
          <h1 v-text="lilv || 4.85"></h1>
          <h3 v-if="lilv2">
            <span v-text="lilv2"></span><label>三周年加息</label>
          </h3>
      </div>
      <!--活期-->
      <div class="jr-banner-current" v-if="type==='current'">
        <!-- <h1><span v-text="lilv">5.35</span><label>%</label></h1> -->
        <h1 v-text="lilv || 4.85"></h1>
        <h3 v-if="lilv2">
          <span v-text="lilv2"></span><label>三周年加息</label>
        </h3>
      </div>
       <!--定期-->
      <div class="jr-banner-regular"  v-if="type==='regular'">
        <h1 v-text="lilv || 4.85"></h1>
        <h3 v-if="lilv2">
          <span v-text="lilv2"></span><label>三周年加息</label>
        </h3>
      </div>
      <h5 class="banner_bot" >
          <span v-text="titleDetail[0]"></span>
          <span v-text="titleDetail[1]"></span>
          <span v-text="titleDetail[2]"></span>
      </h5>
    </div>
    <!--余额-->
    <div class="banner-balance"  v-if="type==='balance'">
      <p>我的余额(元)</p>
      <h1 v-text="money">10000.00</h1>
    </div>

</div>
  </transition>
</template>

<script>
  export default {
    name: 'banner',
    components: {},
    props: [
      'type',
      'record',
      'title',
      'titleTop',
      'index',
      'account',
      'lilv',
      'lilv2',
      'productid',
      'order_type',
      'money_type',
      "money",
      "titleDetail",
      'good_kind'
    ],
    data() {
      return {

      }
    },
    computed: {
    },
    watch: {},
    created() {

    },
    mounted() {},
    methods: {
      goToPush(){
        this.$router.push({
          path: this.record,
          query: {
            money_type: this.money_type, //11余额 12产品  0或空 表示全部
            order_type: this.order_type, // 1转入  2转出（包括到期转出）3转让 0或空表示全部
            productid: this.productid, //产品传产品id  其他传空或0
          }
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.banner
  // background: linearGradient
  // background url('../assets/m_bg.png')  no-repeat left  top
  background #155e9a url('../../../images/banner_top_bg.jpg') no-repeat left  -2px
  background-size 100% 100%
  color #fff
  .banner-def
    height rem(368)
    // color red
    h3
      line-height rem(197)
      font-size rem(50)
      &.JrBanner-logo
        >span
          display inline-block
          width 180px
          height 59px
          background url('./images/logo.png') no-repeat 100%/100%
          padding 0
      span
        padding 0 rem(12)
        vertical-align middle
        font-size rem(30)
    &-list
      display block
      display box
      display flex
      justify-content space-around
      box-align center
      align-items center
      text-align center
      .banner-list__item
        display block
        width 33.33%
        img
          height rem(60)
        p
          line-height rem(62)
          font-size rem(26)
  .jr-banner
    padding-top rem(50)
    padding-bottom rem(70)
    margin-bottom rem(14)
    text-align center
    background-image linear-gradient(180deg, #004795, #0073b9)
    h3.banner_top
      width rem(330)
      margin 0 auto
      line-height rem(50)
      background url("../assets/banner_line_bg_data64.png") no-repeat center center \/ @width rem(2)
      color #80b2f5
    h5.banner_bot
      width rem(380)
      margin 0 auto
      line-height rem(44)
      border-radius (@line-height/2)
      background-color #066db1
      color #a5cbe4
    .jr-banner-week, .jr-banner-current, .jr-banner-regular
      line-height rem(160)
      font-size rem(86)
      color mainColor
      h1
        display inline-block
        color baise
        &:after
          content: '%'
          font-size rem(30)
      h3
        position relative
        display inline-block
        margin-left rem(-10)
        span
          font-size rem(50)
          color #fc9010
          &:before
            content: '+'
            font-size rem(42)
            vertical-align bottom
          &:after
            content: '%'
            font-size rem(24)
        label
          position absolute
          top rem(28)
          left rem(20)
          padding 0 rem(10)
          border-radius rem(6)
          line-height rem(32)
          font-size rem(20)
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
    .jr-banner-current
      h1
        line-height rem(160)
        font-size rem(129)
        color baise
        label
          font-size rem(39)
  &-asset
    padding rem(48) 0 rem(36) 0
    text-align center
    .main
      overflow hidden
      &>div
        float left
        width 50%
    p
      line-height rem(32)
      font-size rem(26)
      color #b7d4f4
    h1
      margin-bottom rem(46)
      line-height rem(97)
      font-size rem(80)
    h4
      margin-bottom rem(3)
      line-height rem(50)
      font-size rem(40)
    .search
      padding 0 rem(34)
      span
        display inline-block
        width rem(150)
        height rem(38)
        line-height @height
        margin 0 auto
        border 1px solid baise
        border-radius (@height/2)
  &-balance
    padding rem(92) 0 rem(75) 0
    p
      line-height rem(32)
      font-size rem(26)
      background url("../assets/banner_line_bg_data64.png") no-repeat center center \/ rem(261) rem(2)
      color #89b9fb
    h1
      line-height rem(138)
      font-size rem(100)
</style>
