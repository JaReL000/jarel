<template>
  <div class="wxshare" @touchmove.prevent="aa" @touchstart="hides">
    <img src="../images/in-bg34.png">
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "wxshare",
  data () {
    return {
      
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
    ...mapMutations(['CHANGEalertwxShare']),
    aa(){},
    hides(){
      this.CHANGEalertwxShare(false)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wxshare
  width 100%
  height 100%
  position fixed
  left 0px
  top 0px
  background rgba(0,0,0,0.8)
  z-index 20000
  img
    display block
    width 397px
    height 344px
    float right
</style>
