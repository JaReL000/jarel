<template>
  <div class="alertGift" @touchmove.prevent.stop="aa">
    <section>
      <div class="close" @click="hides"></div>
      <span class="span1" v-if="status==1||status==2">恭喜您!</span>
      <span class="span2" v-if="status==3">真可惜!</span>
      <div class="div1" v-if="status==1||status==2">
        已获得<i v-text="commodityName"></i><i v-text="investNum"></i>份
      </div>
      <div class="div2" v-if="status==2">
        您还差<i style="color:#df1e26;font-size:28px;" v-text="investMoney-realPayMoney"></i>元可再得<i>1</i>份
      </div>
      <div class="div5" v-if="status==3">
        您还差<i v-text="investMoney-realPayMoney"></i>元可得
      </div>
      <div class="div3" v-if="status==2||status==3" @click="goonInvest">
        继续拿奖品
      </div>
      <div class="div4" v-if="status==1" @click="$root.alertGiftFlag=false">收下啦</div>
    </section>
  </div>
</template>

<script>
import Flash from '@/components/flash'
export default {
  name: 'log',
  props: ['realPayMoney','investMoney','commodityName','investNum'],
  data () {
    return {
      status: 0//弹框状态1：正好投满了2：投满了且超过了3：干脆没投满
    }
  },
  created () {
    if(this.investNum<=0){
      this.status = 3
    }else if(this.realPayMoney<=0&&this.investNum>0) {
      this.status = 1
    }else if(this.realPayMoney>0&&this.investNum>0) {
      this.status = 2
    }else{
      console.log('数据错误！！！')
    }
  },
  mounted () {

  },
  methods: {
    aa(){},
    hides() {
      this.$root.alertGiftFlag = false
    },
    goonInvest() {
      let productids = sessionStorage.getItem('productids')
      let combinationIds = sessionStorage.getItem('combinationIds')
      this.$emit('investAgain',productids,combinationIds)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/mixin.styl'
.alertGift
  width 100%
  height 100%
  background rgba(0,0,0,0.8)
  position absolute
  top 0px
  left 0px
  z-index 1000
  section
    width 600px
    height 545px
    bis1('../images/bg19')
    position absolute
    left 50%
    top 50%
    transform translate(-50%,-50%)
    overflow hidden
    .close
      width 50px
      height 50px
      position absolute
      right 5px
      top 100px
    .span1,.span2
      font-size 32px
      color #1f9ee9
      font-weight bold
      display block
      text-align center
      margin-top 160px
    .div1,.div2,.div5
      font-size 32px
      color #1f9ee9
      font-weight bold
      text-align center
      margin 15px 0 15px
    .div3,.div4
      width 400px
      height 72px
      background #1f9ee9
      border-radius 36px
      margin 0 auto 
      font-size 34px
      color #fff
      text-align center
      line-height 72px
      margin-top 25px
      
</style>
