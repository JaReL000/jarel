<template>
   <div class="dogle" @click="show =false">
     <div class="dogle-content" v-model="show" @click.stop="1">
          <p class="header"><span class="close" @click="show=false">×</span> 投保方案</p>
          <!-- <div class="content"> -->
             <slot></slot>
          <!-- </div> -->
     </div>
   </div>
</template>
<script>
export default {
  data(){
    return {
      show: true
    }
  },
  watch:{
    show(isShow){
      if(!isShow){
        this.$emit('input', false)
      }
    }
  }
}
</script>
<style lang="stylus">
  .dogle
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(0,0,0,.5)
  .dogle-content
    position absolute
    bottom 0
    width 100%
    // height 873px
    background white
    .header
      position relative
      text-align center
      line-height 102px
      font-size 32px
      border-bottom 1px solid #cccccc
      >span.close
        position absolute
        left 32px
        top -8px
        font-size 64px





</style>


