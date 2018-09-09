<template>
  <div class="alertReturn" @touchmove.prevent.stop="aa" 
  @click.stop="$root.alertGetMoney = false">
    <section class="alertReturn_mark">
      <div class="close" @click.stop="closeFun"></div>
      <p>获得<span v-text="$root.money">元</span>理财红包</p>
       <!-- v-if="$root.money" -->
      <p>土豪财主，我们做朋友吧！</p>
      <div @click.stop="investss($root.productId,$root.productName)"></div>
      <p class="tips">*将发放至您的福利账户，注意查收</p>
    </section>
  </div>
</template>
<script>
import Flash from '@/components/flash'
  export default{
    props:{},
    data(){
      return{}
    },
    created(){},
    mounted(){},
    methods:{
      aa(){},
      closeFun(){
        this.$root.alertGetMoney = false
        console.log(this.$root.alertGetMoney)
      },
      investss(productId,productName){
        this.$emit('emitInvestes',productId,productName)
        this.$root.alertGetMoney = false
      }
    }
  }
</script>
<style lang="stylus" scoped>
body,
html
  width 100%
  height 100%
  .alertReturn
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.7)
    position fixed
    top 0
    left 0
    z-index 100
    .alertReturn_mark
      width 528px
      height 456px
      background-image url("../images/mark.png") 
      background-position center center
      background-repeat no-repeat
      background-size 100% 100%
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
      text-align center
      border-radius 12px
      >img
        width 111px
        position absolute
        left 30px
        top -50px
      >.close
        width 33px
        height 33px
        background url("../images/close.png") no-repeat center/100% 100%
        position absolute
        top 81px
        right 20px
        margin 0
        box-shadow none
      >p:first-of-type
        margin-top 190px
        font-size 30px
        color #ffffff
        >span:nth-of-type(1)
          font-size 52px
          color #efcd89
         >span:nth-of-type(2)
          font-size 30px
          color #efcd89
      >p
        font-size 24px
        color #6aa4df
      >div
        width 280px
        height 65px
        background url("../images/invest_more.png") no-repeat center/100% 65px
        margin 40px auto 22px
      >.tips
        font-size 22px
        color #487dac
</style>

