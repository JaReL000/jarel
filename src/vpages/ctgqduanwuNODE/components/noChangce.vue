<template>
  <div class="noChangce" @touchmove.prevent.stop="aa" @click.stop="$root.noChangce=false">
    <section>
      <h6>真遗憾</h6>
      <p class="noChangce-p1">您还未获得抽奖机会</p>
      <div @click.stop="investss('2','年定期')">
        <span>年 6.0%</span>
        <p>每投资1000元</p>
        <div class="times">抽奖3次</div>        
      </div>
      <div @click.stop="investss('7','季定期')">
        <span>季 5.6%</span>
        <p>每投资1000元</p>
        <div class="times">抽奖2次</div>
      </div>
      <div @click.stop="investss('6','月定期')">
        <span>月 5.4%</span>
        <p>每投资1000元</p>
        <div class="times">抽奖1次</div>
      </div>
      <p class="noChangce-p2">*仅通过本活动【投资按钮】投资才能抽奖哦！</p>
    </section>
  </div>
</template>

<script>
import Flash from '@/components/flash'
export default {
  name: 'noChangce',
  props: {
    moneyRate: {
      
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    aa(){},
    investss(productId,productName){
      this.$emit('emitInvestes',productId,productName)
      this.$root.noChangce = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.noChangce
  width 100%
  height 100%
  background rgba(0,0,0,0.8)
  position fixed
  top 0px
  left 0px
  z-index 410000
  section
    width 570px
    height 664px
    // bis1('../images/i-bg33')
    background url("../images/markbg.png") no-repeat center/100% 100% 
    overflow hidden
    margin 355px auto 0
    h6
      font-size 30px
      text-align center
      color #ffee30
      margin 34px 0 58px
    .noChangce-p1
      text-align center
      font-size 33px
      color #4c4c4c
      margin-bottom 43px
    div
      width 471px
      height 102px
      margin 0 auto
      overflow hidden
      position relative
      background url("../images/mark_invest_button.png") no-repeat center/100% 100%       
      span 
        display block
      p
        font-size 24px
        color #ffffff
        display inline-block
        margin-left 64px
      >.times
        font-size 30px
        color #000000
        position absolute
        top 10px
        left 300px
        background none
        line-height 62px
    div:nth-of-type(1)
      overflow hidden
      span 
        color #ffffff
        font-size 34px
        margin-left 64px
        margin-top 5px!important
    div:nth-of-type(2)
      span 
        color #ffffff
        font-size 34px
        margin-left 64px
        margin-top 5px!important
    div:nth-of-type(3)
      span 
        color #ffffff
        font-size 34px
        margin-left 64px
        margin-top 5px!important
    .noChangce-p2
      color #333
      font-size 22px
      text-align center
      margin-top 22px
</style>
