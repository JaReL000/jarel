<template>
  <div id="current">
    <div class="invest-banner">
      <h3 class="banner_top">{{headContent}}</h3>
      <div class="invest-rate">
        <h1>{{rateInit}}</h1>
        <h3 v-if="rateExt"><span>{{rateExt}}</span><label>三周年加息</label></h3>
      </div>
      <h5 
        class="banner_bot" 
        v-text="footContent"
      ></h5>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      rateInit: {
        type: [Number, String]
      },
      rateExt: {
        type: [Number, String]
      },
      headContent: {
        type: String
      },
      footContent: {
        type: String
      },
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      choiceCouponFun(index){
        
        this.$emit('choiceCouponFun', index)
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "~style/mixin.styl"

.invest-banner
  width 100%
  height 289px
  // background linear-gradient( #0C72E3,#0A3B78)
  background url('../../../images/banner_top_bg.jpg') no-repeat left  top 
  text-align center
  padding-top 1px
  .banner_top
    width 330px
    margin 0 auto
    line-height 50px
    background url("../assets/banner_line_bg_data64.png") no-repeat center center \/ @width 2px
    color #80b2f5
    margin-top 20px
  .invest-rate
    line-height 120px
    font-size 86px
    color #ffffff
    h1
      display inline-block
      color baise
      &:after
        content: '%'
        font-size 30px
    h3
      position relative
      display inline-block
      margin-left -10px
      padding  0 20px
      span
        font-size 50px
        color #fc9010
        &:before
          content: '+'
          font-size 42px
          vertical-align bottom
        &:after
          content: '%'
          font-size 24px
      label
        position absolute
        // width 100px
        top 2px
        left 20px
        padding 0 10px
        border-radius 6px
        line-height 32px
        font-size 20px
        background-color #fc9010
        color #ffffff  
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
  .banner_bot
    display inline-block
    padding 0 20px
    margin 0 auto
    line-height 44px
    border-radius (@line-height/2)
    background-color #066db1
    color #a5cbe4
    span 
      margin 0 1px
</style>

