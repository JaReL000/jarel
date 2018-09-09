<template>
<!--banner-->
<div class="detail-banner">
  <div class="main" v-if="showType">
    <p v-text="textTop"></p>
    <!-- 利率部分 -->
    <div class="rate">
      <h1 v-text="rateInit"></h1>
      <!-- activeInfo  v-if="rateExt"-->
      <h3 v-if="rateExt">
        <span v-if="rateExt" v-text="rateExt"></span>
        <!-- <div class="rate-text"><label v-text="rateExtText"></label></div> -->
      </h3>
      <div
        v-if="activeInfo"
        class="active-info"
      ><label v-text="activeInfo"></label></div>
    </div>
  </div>
  <!-- 保险箱 日增息 -->
  <div class="zh"  v-if="!showType">
    <h2>
      <label >起步收益率</label>
      <span v-text="rateInit"></span>
    </h2>
    <h6 >
      <label >每天加息</label>
      <span v-text="rateOffset"></span>
    </h6>
    <h2 >
      <label >最高收益率</label>
      <span v-text="rateFinish"></span>
    </h2>
  </div>
  <!-- 底部修饰 -->
  <div class="banner_bot" >
    <span
      v-for="(item, index) in bannerBotList"
      v-text="item"
      :key="index"
    ></span>
  </div>
</div>
</template>

<script>

  export default {
    props:{
      rateInit: {
        type: String
      },
      rateFinish: {
        type: String
      },
      rateOffset: {
        type: Number
      },
      rateExt: {
        type: [String, Number]
      },
      rateExtText: {
        type: String,
        default: '新春限时加息'
      },
      activeInfo:{
        type: String,
        default: ''
      },
      bannerBotList: {
        type: Array,
      },
      showType: {
        type: Boolean
      },
      textTop: {
        type: String
      }
    },
    data () {
      return {}
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style lang="stylus">
@import '~style/mixin.styl'

.detail-banner
  width 100%
  padding 34px 0 54px
  text-align center
  background url('./images/banner_top_bg.jpg') no-repeat left  top
  // background: linearGradient
  background-size  100% 100%
  color mainColor
  .main
    p
      line-height 38px
      font-size 30px
      background url("./images/line_bg.png") no-repeat center center
      background-size 500px 4px
      color #a8caed
    .rate //利率
      overflow hidden
      position relative
      height 160px
      line-height @height
      margin-bottom 20px
      font-size 100px
      h1
        display inline-block
        color baise
        &:after
          content: '%'
          font-size 40px
      h3
        position relative
        display inline-block
        margin-left -10px
        padding 0 18px
        padding-left 0
        span
          vertical-align baseline
          margin-bottom 110px
          font-size 50px
          color #fc9010
          &:before
            content: '+'
            font-size 42px
            margin-right 3px
            vertical-align baseline
          &:after
            content: '%'
            font-size 24px
        .rate-text
          position absolute
          top 24%
          left 50%
          width 100%
          transform translate3d(-50%, -50%, 0)
          line-height 32px
          font-size 20px
          &:after, &:before
            content ' '
            position absolute
            bottom -51%
            left 50%
            border 10px solid transparent
            border-top 10px solid #fc9010
            width 0
            height 0
            transform translate(-50%, 0%)
          label
            display inline-block
            padding 0 8px
            border-radius 6px
            background-color #fc9010
            color baise
      .active-info
        position absolute
        top 6px
        left 180px
        width 100%
        line-height 32px
        font-size 20px
        label
          display inline-block
          padding 0 10px
          border 1px solid rgba(255,255,96,1)
          border-radius 6px
          // background-color #fc9010
          font-size 20px
          color rgba(255,255,96,1)
  .zh
    padding-top 25px
    line-height 70px
    height 168px
    font-size 26px
    text-align center
    color #a8caed
    h2,h6
      display inline-block
    span
      display block
      font-size 84px
      &:after
        content: '%'
        font-size 36px
    h6
      width 240px
      background url("./images/line_g.png") no-repeat center center
      background-size 198px 20px
      span
        display block
        line-height 40px
        font-size 26px
        &:after
          content: '%'
          font-size 26px
    h2
      span
        color baise
  .banner_bot //banner底部
    display block
    // display box
    // display -webkit-box
    // display flex
    // display -webkit-flex
    // justify-content space-around
    // -webkit-justify-content space-around
    // box-align center
    // -webkit-box-align center
    // align-items center
    // -webkit-box-pack center
    font-size 28px
    color #a8caed
    span
      display inline-block
      // width 160px
      height 60px
      margin 0 22px
      padding 0  24px
      line-height @height
      border-radius (60/2)px
      background-color #20538c
      background-color rgba(21, 110, 172, 0.2)
      // background-color #0d5fbf

</style>
