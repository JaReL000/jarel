<template>
<!-- v-for="item in productList"
      :productid="item.productid"
      :productName="item.product_name"
      :rateInit="item.rate_init"
      :rateExt="item.rate_ext"
      :url="item.url"
      :key="item.productid" -->
<div class="mainT">
  <div
    class="tabs"
    v-for="(item, index) in productList"
    :key="index"
    @click="goToFun(item.url)"
  >
    <div class="tabs-top">
      <h5 v-text="item.product_name"></h5>
    </div>
    <div class="tabs-mainbox">
      <div class="tabs-main">
        <h1 v-text="item.rate_init"></h1>
        <!-- 补贴收益 v-if="item.rate_ext" -->
        <!-- <h3 v-if="item.rate_ext || item.active_info"><span
          v-text="item.rate_ext || '0.00'"
        ></span><label v-if="item.active_info" v-text="item.active_info"></label></h3> -->
        <h3 v-if="item.rate_ext"><span
          v-text="item.rate_ext"
        ></span></h3>

        <h3 class="jixi" v-if="item.active_info"><label v-text="item.active_info"></label></h3>
        <h2
          v-if="item.productid===1"
          v-text="'七日年化收益率'"
        ></h2>
        <h2
          v-if="(item.productid===8 || item.productid===9 || item.productid===2 || item.productid===5 || item.productid === 6 || item.productid === 7)"
          v-text="'预期年化收益率'"
        ></h2>
      </div>
      <div class="tabs-mainright">
        <div v-if="item.invest_days===0 && item.ptypeid===1" class="time">随存随取</div>
        <div v-if="item.invest_days===0 && item.ptypeid===5 || item.ptypeid===6" class="time">7天锁定期</div>
        <div v-if="item.invest_days===30" class="time">30天</div>
        <div v-if="item.invest_days===90" class="time">90天</div>
        <div v-if="item.invest_days===365" class="time">365天</div>
        <div v-if="item.invest_days===1095" class="time">1095天</div>
        <div v-if="item.invest_days===3000" class="time">3000天</div>
        <h2>投资期限</h2>
      </div>
    </div>
    <a class="inTo" href="javascript:;"> </a>
  </div>
  <p class="tips">理财有风险，投资需谨慎</p>
</div>
</template>

<script>
  //import { MessageBox } from '@/plugins';
  export default {
    name: 'tabs',
    components: {},
    props: {
      productList: {
        type: Array
      },
    },
    data() {
      return {
        copy: '新春限时加息'
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      goToFun(url){
        this.$router.push(url)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

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
        vertical-align bottom
        font-size rem(50)
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
        top rem(-15)
        left 50%
        transform: translate3d(-50%,0,0)
        padding 0 10px
        width auto
        white-space nowrap
        word-wrap normal
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
    .jixi
      position absolute
      top 15px
      left 44%
      label
        position absolute
        top 0
        left 0
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
    font-size rem(35)
  h2
    margin rem(0)
</style>
