<template>
  <div class="alertExchange" @touchmove.prevent.stop="aa">
    <section>
      <h6>您需要兑换吗？</h6>
      <p>抽奖机会满30次</p>
      <p>可直接兑换15元现金红包</p>
      <p>兑换后抽奖次数相应减少</p>
      <div @click="exchange">确认兑换</div>
      <div @click="$root.alertExchange=false">不需要</div>
    </section>
  </div>
</template>

<script>
import Flash from '@/components/flash'
export default {
  name: 'alertExchange',
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
    exchange(){
      this.$root.alertExchange = false
      this.$root.alertExchangeYes = true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/mixin.styl'
.alertExchange
  width 100%
  height 100%
  background rgba(0,0,0,0.8)
  position fixed
  top 0px
  left 0px
  z-index 1000
  section
    width 570px
    height 664px
    bis1('../images/i-bg33')
    overflow hidden
    margin 215px auto 0
    h6
      font-size 30px
      text-align center
      color #ffee30
      margin 34px 0 58px
    p
      font-size 28px
      color #4610a5
      text-align center
    p:nth-of-type(3)
      color #eb6100
    div
      width 406px
      height 72px
      margin 0 auto
      background #eb6100
      text-align center
      line-height 72px
      border-radius 34px
      font-size 34px
      color #fff
    div:nth-of-type(1)
      margin 50px auto 60px
    div:nth-of-type(2)
      background #797979
</style>
