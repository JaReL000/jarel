<template>
  <div class="rule">
    <div class="child">
      <img src="../images/bg20.png">
      <div class="close" @click="$root.alertRule=false"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rule',
  data () {
    return {
      
    }
  },
  created () {
    
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/mixin.styl'
.rule
  width 100%
  height 100%
  background rgba(0,0,0,0.8)
  position absolute
  top 0px
  left 0px
  z-index 1000
  .child
    width 607px
    position absolute
    left 50%
    top 50%
    transform translate(-50%,-50%)
    img 
      width 607px
    .close
      width 60px
      height 60px
      position absolute
      right 0px
      top 0px
</style>
