<template>
  <div class="alertwx" @touchmove.prevent.stop="aa">
    <div class="alertwx-wrap">
      <img class="close" src="../images/close.png" @click="close">
      <div class="alertwx-con">
        <p>-加入鲸鱼究竟能赚多少钱？-</p>
        <div class="alertwx-content" @touchmove.stop="bb($event)">
          <img src="../images/in-bg36.png">
        </div>
        <p>-存钱赚利息，就用鲸鱼APP-</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "alertwx",
  components: {
    
  },
  data () {
    return {
      
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
    ...mapMutations(['CHANGEalertwx']),
    aa(){},
    bb(e){
      e.returnValue = true
    },
    close(){
      this.CHANGEalertwx(false)
    }
  }
}
</script>

<style lang="stylus" scoped>
.alertwx
  width 100%
  height 100%
  position fixed
  left 0px
  top 0px
  background rgba(0,0,0,0.8)
  z-index 20000
  .alertwx-wrap
    width 700px
    height 1100px
    overflow hidden
    margin 48px auto 0
    position relative
    .close
      width 66px
      height 66px
      position absolute
      right 0px
      top 0px
    .alertwx-con
      width 675px
      height 1067px
      margin-top 33px
      background #314eca
      border-radius 24px
      overflow hidden
      .alertwx-content
        width 624px
        background #ffffff
        height 880px
        border-radius 24px
        margin 0 auto
        overflow scroll
        -webkit-overflow-scrolling touch
        img 
          display block
          width 90%
          margin 33px auto
      p
        color #ffffff
        font-size 30px
        text-align center
      p:nth-of-type(1)
        margin 26px 0
      p:nth-of-type(2)
        margin-top 25px

</style>
