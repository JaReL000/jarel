<template>
  <div class="alertReturn" @touchmove.prevent.stop="aa" 
  @click.stop="$root.alertGetMoney = false">
    <section class="alertReturn_mark">
      <div class="close" @click.stop="closeFun"></div>
      <h5>赚翻啦!</h5>
      <p v-if="$root.money">获得<span v-text="$root.money">100.00</span>元现金红包</p>
      <p>又多了一笔额外的收入!</p>
      <div @click.stop="investss($root.productId,$root.productName)">继续赚更多</div>
      <p class="tips">将发放到你的福利账户请注意查收</p>
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
      width 556px
      height 450px
      background-color #fff
      background-image url("../images/mark-bg.png") 
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
        width 21px
        height 22px
        background url("../images/close.png") no-repeat center/100% 100%
        position absolute
        top 15px
        right 16px
        margin 0
        box-shadow none
      >h5
        font-size 40px
        color #ff5f26
        margin 55px 0 49px
        font-weight 600
      >p
        font-size 26px
        color #781f1d
        >span
          font-size 46px
          color #fe9304
      >div
        width 400px
        height 72px
        background-image linear-gradient(0deg, #fc6732 0%, #fe632c 30%, #ff5f26 50%, #ff7437 75%, #fe8848 100%), linear-gradient(#ff5f26, #ff5f26)
        background-blend-mode normal, normal
        box-shadow 0px 12px 12px 0px rgba(255, 95, 38, 0.34)
        border-radius 36px
        font-size 36px
        line-height 72px
        margin 40px auto 27px
        color #fff
        font-weight 600
      >.tips
        font-size 22px
        color rgba(120, 31, 29, 0.81)
</style>

