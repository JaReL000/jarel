<template>
  <div class="noChangce" @touchmove.prevent.stop="aa" @click.stop="$root.noChangce=false">
    <section>
      <h6>真遗憾</h6>
      <p class="noChangce-p1">您还未获得抽奖机会</p>
      <div @click.stop="investss('year')"><span v-text="moneyRate.yearRate"></span></div>
      <div @click.stop="investss('quart')"><span v-text="moneyRate.quaRate"></span></div>
      <div @click.stop="investss('mon')"><span v-text="moneyRate.monRate"></span></div>
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
    investss(type){
      this.$emit('emitInvestes',type)
      this.$root.noChangce = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/mixin.styl'
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
    bis1('../images/i-bg33')
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
      width 467px
      height 98px
      margin 0 auto
      overflow hidden
      span 
        display block
    div:nth-of-type(1)
      bis1('../images/i-bg41')
      overflow hidden
      span 
        color #ffffff
        font-size 30px
        margin-left 108px
        margin-top 12px!important
    div:nth-of-type(2)
      bis1('../images/i-bg40')
      span 
        color #ffffff
        font-size 30px
        margin-left 108px
        margin-top 12px!important
    div:nth-of-type(3)
      bis1('../images/i-bg42')
      span 
        color #ffffff
        font-size 30px
        margin-left 108px
        margin-top 12px!important
    .noChangce-p2
      color #333
      font-size 22px
      text-align center
      margin-top 22px
</style>
