<template>
  <div class="alertGift" @touchmove.prevent.stop="aa">
    <section>
      <h6>恭喜您获得</h6>
      <slot></slot>
      <div @click="$root.alertGift=false">我收下了</div>
      <p v-if="$root.giftType==='xn'">将发放至您的福利账户，请注意查收</p>
      <p v-if="$root.giftType==='sw'">将在活动结束后15个工作日内发货</p>
      <p v-if="$root.giftType==='sw'">请前往APP【设置】</p>
      <p v-if="$root.giftType==='sw'">【收货地址】中填写收货信息</p>
    </section>
  </div>
</template>

<script>
import Flash from '@/components/flash'
export default {
  name: 'log',
  data () {
    return {

    }
  },
  props:{

  },
  created () {

  },
  mounted () {

  },
  methods: {
    aa(){}
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/mixin.styl'
.alertGift
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
    img 
      width 286px
      display block
      margin 0 auto
    div
      width 410px
      height 72px
      background #eb6100
      border-radius 34px
      text-align center
      line-height 72px
      color #ffffff
      margin 14px auto 15px
      font-size 32px
    p
      text-align center
      font-size 25px
      color #4c4c4c
    p:nth-of-type(2)
      color #4610a5
    p:nth-of-type(3)
      color #4610a5
</style>
