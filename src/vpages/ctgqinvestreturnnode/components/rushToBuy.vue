<template>
  <div class="rushToBuy" @touchmove.prevent.stop="aa" 
  @click.stop="$root.rushBuy = false" >
    <div class="rushToBuy_mark">
      <img src="../images/icon.png" alt="">
      <div class="close" @click.stop="closeFun"></div>  
      <h5>每笔投资都返现</h5>          
      <div class="year" @click.stop="investss('2','年定期')">抢年定期<span>6.0%</span></div>
      <div class="season" @click.stop="investss('7','季定期')">抢季定期<span>5.6% </span></div>
      <div class="month" @click.stop="investss('6','月定期')">抢月定期<span>5.4%</span></div>
    </div>
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
        this.$root.rushBuy = false
      },
      investss(productId,productName){
        this.$emit('emitInvestes',productId,productName)
        this.$root.rushBuy = false
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
body,
html
  width 100%
  height 100%
  .rushToBuy
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.7)
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 100
    .rushToBuy_mark
      width 556px
      height 484px
      background-color #ffffff
      border-radius 12px
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
      text-align center
      >img
        width 167px
        position absolute
        left 30px
        top -70px
      >.close
        width 21px
        height 22px
        background url("../images/close.png") no-repeat center/100% 100%
        position absolute
        top 16px
        right 20px
      >h5
        font-size 40px
        font-weight 600
        color #fe9504
        margin 70px 0 40px
      >.year,
      >.season
      >.month
        width 400px
        height 72px
        background-image linear-gradient(0deg, #fc6732 0%, #fe632c 30%, #ff5f26 50%, #ff7437 75%, #fe8848 100%), linear-gradient(#ff5f26, #ff5f26);
        border-radius 36px	
        margin 0 auto 30px
        font-size 30px
        color #fff
        line-height 72px
        >span 
          font-size 44px
      >.season
        background-image linear-gradient(0deg, #36b8d9 0%, #29b4d7 30%, #1cb0d5 50%, #3abada 75%, #58c3de 100%), linear-gradient(#ff5f26, #ff5f26);
        box-shadow 0px 12px 12px 0px rgba(28, 176, 213, 0.34)
      >.month
        background-image linear-gradient(0deg, #609ce6 0%, #5895e0 30%, #4f8dd9 50%, #5d99e2 75%, #6aa4eb 100%), linear-gradient(#ff5f26, #ff5f26);
        box-shadow 0px 12px 12px 0px rgba(79, 141, 217, 0.34)
</style>

