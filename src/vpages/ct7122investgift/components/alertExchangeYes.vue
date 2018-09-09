<template>
  <div class="alertExchangeYes" @touchmove.prevent.stop="aa">
    <section>
      <h6>兑换成功</h6>
      <p>15元现金红包已发放至您的</p>
      <p>账户，请注意查收！</p>
      <div @click="confirms">确定</div>
    </section>
  </div>
</template>

<script>
import Flash from '@/components/flash'
import * as jrUrl from '../urlconfig/urlconfig'
export default {
  name: 'alertExchangeYes',
  props: {
    moneyRate: {
      
    },
    combinationId: {

    },
    token: {

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
    confirms(){
      let params = {
        combinationId: this.combinationId,
        token: this.token
      }
      this.$http(jrUrl.exchangeAward,params).then(res=>{
        this.$root.alertExchangeYes = false
        Flash('兑换成功!')
        this.$emit('getInitData')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/mixin.styl'
.alertExchangeYes
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
      font-size 26px
      color #eb6100
      text-align center
    div
      width 409px
      height 72px
      line-height 72px
      background #eb6100
      border-radius 32px
      font-size 34px
      color #fff
      margin 80px auto 0
      text-align center
</style>
