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
      <h4 class="look-xq">查看详情</h4>
    </div>
    <div class="tabs-mainbox"> 
      <div class="tabs-main">
        <h1 v-text="item.rate_init"></h1>
        <!-- 补贴收益 -->
        <h3 v-if="item.rate_ext"><span 
          v-text="item.rate_ext"
        ></span><label>三周年加息</label></h3>

        <!-- <h3 v-if="lilv3" class="jixi"><span v-text="lilv3"></span></h3> -->
        <!-- <h2 v-text="'预期年化收益率'"></h2> -->
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
        <div v-if="item.invest_days===0 && item.ptypeid===5" class="time">7天锁定期</div>
        <div v-if="item.invest_days===0 && item.ptypeid===6" class="time">7天锁定期</div>
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
  <div 
    class="zhuanru"
  >
    <input
      class="zhuanru-btn"
      type="button"
      value="立即转入"
      :disabled="highlight"
      @click="zhuanruFun"
    > 
  </div>
  
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
        highlight: false
      }
    },
    computed: {
      productid(){
        return this.productList[1].productid
      }
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
      goToFun(url){
        this.$router.push(url)
      },
      zhuanruFun(){
        let productid = this.productList[0].productid
        
        if(true){
          this.routerPush('/productIn/'+ productid)
        }
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
  .look-xq 
    float right 
  &-top
    overflow hidden
    text-align left
    padding rem(24) rem(55) rem(20) rem(16)
    line-height rem(30)
    h4  
      &:after
        position: relative;
        top rem(-3)
        right rem(-5)
        content: " ";
        display: inline-block;
        height rem(10)
        width @height
        border-width: 4px 4px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
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
        -ms-transform: translate3d(-50%,0,0)
        -moz-transform: translate3d(-50%,0,0)
        -webkit-transform: translate3d(-50%,0,0)
        -o-transform: translate3d(-50%,0,0)
        padding 0 10px
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

.zhuanru 
  padding rem(50) rem(50)
  &-btn
    width 100%
    height rem(92)
    border-radius rem(12)
    font-size rem(32)
    background mColor
    color baise
    &:disabled
      background-color #ccc
    &:active
      background-color #6699ff
</style>
