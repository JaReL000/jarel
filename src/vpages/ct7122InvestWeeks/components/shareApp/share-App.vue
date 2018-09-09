<template>
  <div id='share' @touchmove.prevent.stop='aa'>
    <section class="con-par">
      <div class="con" @click.stop='aa'>
        <div class="con-child">
          <div class="con-div1" @click.stop='sharePYQ'>
            <!-- 朋友圈 -->
            <img src='./img/share_friend.png'>
            <p>朋友圈</p>
          </div>
          <div class="con-div2" @click='shareFre'>
            <!-- 好友 -->
            <img src='./img/share_weixin.png'>
            <p>微信好友</p>
          </div>
        </div>
      </div>
      <div class="cancel" @click.stop='hide'>取消</div>
    </section>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Flash from '@/components/flash'
export default {
  name:'share',
  components: {Flash},
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['alertToAppShowOrHide']),
  },
  props: {
    appShareConfig: {
      type: Object,
      default: {}
    }
  },
  created () {

  },
  mounted () {
    
  },
  methods: {
    ...mapMutations(['CHANGEalertShareApp']),
    sharePYQ(){
      // 分享朋友圈
      this.hide()
      try {
          Jinr.showShare('1','1',this.appShareConfig.imgUrl,this.appShareConfig.text,this.appShareConfig.title,this.appShareConfig.url)
        } catch (error) {
          Flash(error)
        }
    },
    shareFre(){
      // 分享好友
      this.hide()
      try {
          Jinr.showShare('1','0',this.appShareConfig.imgUrl,this.appShareConfig.text,this.appShareConfig.title,this.appShareConfig.url)
        } catch (error) {
          Flash(error)
        }
    },
    aa(){

    },
    hide(){
      this.CHANGEalertShareApp(false)
    }
  }
}
</script>

<style lang='stylus' scoped>
#share
  background rgba(0,0,0,0.4)
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 1000000
  transition all 2s
  .con-par
    height 286px
    width 100%
    position fixed
    bottom 0
    background #fff
    overflow hidden
    .cancel
      height 70.5px
      text-align center
      line-height 70.5px
      font-size 30px
    .con
      height 215.5px
      background #f0f0f0
      overflow hidden
      position relative
      .con-child
        height 100%
        overflow hidden
        position absolute
        left 50%
        -webkit-transform translateX(-50%)
        transform translateX(-50%)
        .con-div1
          width 140px
          height 100%
          overflow hidden
          float left
          margin-right 30px
          box-sizing border-box
          padding-top 40px
          img
            display block
            width 60px
            height 60px
            margin 20px 0 10px 40px
          p
            font-size 26px
            text-align center
        .con-div2
          width 140px
          height 100%
          overflow hidden
          float left
          padding-top 40px
          img
            display block
            width 60px
            height 60px
            margin 20px 0 10px 40px
          p
            font-size 26px
            text-align center
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)
  .con-par
    height 354px!important
</style>

