<template>
  <div class="nolog" @touchmove.prevent.stop="aa">
    <div class="nolog-wrap">
      <img class="imgs" src="../images/close.png" @click="close">
      <div class="nolog-content">
        <p>-我的邀请记录-</p>
        <div class="nolog-content-child">
          <img class="nolog-img1" src="../images/in-bg22.png">
          <img class="nolog-img2" src="../images/in-bg23.png" @click="invite">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Flash from '@/components/flash'
export default {
  name: "nolog",
  data () {
    return {
      
    }
  },
  created () {
    
  },
  props: {
    isEnds: {

    }
  },
  mounted () {
    
  },
  methods: {
    ...mapMutations(['CHANGEalertnoLog','CHANGEalertShareApp']),
    aa(){},
    close(){
      this.CHANGEalertnoLog(false)
    },
    invite(){
      if(this.isEnds){
        Flash('活动已结束！')
        return
      }
      this.CHANGEalertShareApp(true)
      this.close()
    }
  }
}
</script>

<style lang="stylus" scoped>
.nolog
  width 100%
  height 100%
  background rgba(0,0,0,0.8)
  position fixed
  left 0px
  top 0px
  z-index 20000
  .nolog-wrap
    width 653px
    height 604px
    margin 322px auto 0
    overflow hidden
    position relative
    .imgs
      display block
      width 66px
      height 66px
      position absolute
      right 0px
      top 0px
    .nolog-content
      height 578px
      width 627px
      background #314eca
      border-radius 25px
      margin-top 27px
      overflow hidden
      p
        text-align center
        font-size 33px
        color #fff
        margin 38px 0 26px
      .nolog-content-child
        width 570px
        height 451px
        background #fff
        margin 0 auto
        border-radius 25px
        overflow hidden
        .nolog-img1
          display block
          width 338px
          margin 50px auto 36px
        .nolog-img2
          display block
          width 496px
          margin 0 auto
</style>
