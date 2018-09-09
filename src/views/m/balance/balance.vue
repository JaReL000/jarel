<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.balance
  height 100%
  text-align center
  background-color baise
  .from
    padding rem(64) rem(34)
    input
      width 100%
      margin-bottom rem(22)
      line-height rem(92)
      border-radius rem(8)
      text-align center
      font-size rem(36)
    input.recharge
      border 1px solid mColor
      background-color mColor
      color baise
    input.cash
      border 1px solid #acacac
      background-color baise
      color #666666
    input.recharge:active
      border 1px solid #0089dc
      background-color #0089dc
      color #ececec
    input.cash:active
      border 1px solid #ececec
      background-color #ececec
      color #999
  .other
    position fixed
    left 0
    bottom 0
    width 100%
    span
      padding 0 rem(10) rem(15)
      color #3a8de8
    &>a
      vertical-align middle
      line-height rem(160)
      font-size rem(26)
      color mainColor
</style>
<template>
  <transition name="fate" >
    <div class="balance fixed">
      <jrBanner type="balance" :money="$route.query.money"></jrBanner>
      <div class="from">
        <input
          type="button"
          class="recharge"
          value="充值"
          @click="routerReplace('/balanceIn')"
        >
        <input
          type="button"
          class="cash"
          value="提现"
          @click="routerReplace('/balanceOut')"
        >
      </div>

      <!-- <div class="other">
        <router-link
          to="/explain/balance"
        >余额说明</router-link>
        <span>|</span>
        <router-link
          :to="{ path: 'balance/jrRecord', query: {productid:-1, movetype:1}}"
        >交易记录</router-link>
      </div> -->
      <div class="other fixed-x">
        <router-link
          to="/explain/balance"
        >余额说明</router-link>
        <span>|</span>
        <router-link
          :to="{ path: '/balance/jrRecord', query: {productid:-1, movetype:1}}"
        >交易记录</router-link>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import jrBanner from '../components/JrBanner'
  export default {
    name: 'balance',
    components: {
      jrBanner
    },
    data() {
      return {
      }
    },
    computed: {

    },
    watch: {},
    created() {},
    mounted() {
      this.$messagebox.close()  
    },
    methods: {
      goToPush(path){
        this.$router.push({
          path: path,
          query: {}
        })
        
      },

    },
  }
</script>
