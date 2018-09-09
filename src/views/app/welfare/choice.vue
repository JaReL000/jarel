<template>
  <div class="choice fixed" v-if="show">
    <choice
      :lists="lists"
      @choiceCouponFun="choiceCouponFun"
      @noChoiceFun="noChoiceFun"
    ></choice>
  </div>
</template>

<script>
import {
  Choice
} from 'plugins/welfare'

export default {
  components: {
    Choice
  },
  data() {
    return {
      show: false,
      topActive: false,
      responseing: false,
      lists: []
    }
  },
  computed: {
    index(){
      return parseInt(this.$route.query.index)
    }
  },
  watch: {},
  created() {
    this.responseing = true //请求中
    this.show = false
    let data = {
      method: 'user.coupon.select.list',
      token: this.$root.appData.token,
      money: this.$route.query.money || 500000,
      productid: this.$route.query.productid || 7,
      action: this.$route.query.action || 1,
    }

    this.$http(data).then((response) => {
      this.responseing = false
      this.lists = response.list

      // 选中的卡券为-1 初试为-1标示没有选中卡券
      if(this.index !== -1){
        this.$nextTick(()=>{
          this.$set(response.list[this.index], 'select', true)
        })
      }
      this.show = true

    })
  },
  mounted() {},
  methods: {
    noChoiceFun(){
      try {
        Jinr.selectCoupon('', '', '', '', '-1')
      } catch (error) {
        this.$flash('请在APP环境运行')
      }

    },

    // 选择卡券
    choiceCouponFun(couponName, couponId, couponType, couponMoney, index){
      couponName = couponName || ''
      couponId = couponId || ''
      couponType = couponType || ''
      couponMoney = couponMoney || ''
      index = index || '-1'
      try {
        // this.$flash(this.changeI18n(error))
        if(this.lists[index].is_select ){
          // this.couponList.forEach((value, index) => {
          //   value.select = false
          // });
          this.$set(this.lists[index], 'select', true)
          Jinr.selectCoupon(couponName, couponId, couponType, couponMoney, index)
        }else{
          this.$flash('不能使用该卡券')
        }
      } catch (error) {
        if(index!==-1 && this.lists[index].is_select ){
          // this.lists[index].select = !this.lists[index].select
          this.$set(this.lists[index], 'select', true)
        }else{
          this.$flash('不能使用该卡券')
        }
      }



    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/index"

</style>
