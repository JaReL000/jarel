<template>
  <div class="old" @touchmove.prevent="aa">
    <div class="old-wrap">
      <div class="old-top">
        <img v-if="show" class="old-img1" src="../images/in-bg34.png">
      </div>
      <div class="old-bot">
        <img class="old-close" src="../images/close.png" @click="close">
        <div class="old-bot-con">
          <div class="old-content">
            <p>亲爱的财主，</p>
            <p>您<span style="color:#f6614c;">已是注册用户</span>，不可领取</p>
            <p>但您<span style="color:#f6614c;">可邀请好友赚10元现金</span>哦~</p>
            <img src="../images/in-bg35.png" @click="shows">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'old',
  data () {
    return {
      show: false
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
    ...mapMutations(['CHANGEalertold']),
    shows(){
      this.show = true
      this.$emit('getWechatShare')
      this.$emit('changeNewUser',true)
    },
    aa(){},
    close(){
      this.CHANGEalertold(false)
    }
  }
}
</script>

<style lang="stylus" scoped>
.old
  width 100%
  height 100%
  position fixed
  left 0px
  top 0px
  background rgba(0,0,0,0.8)
  z-index 20000
  overflow hidden
  .old-wrap
    width 100%
    height auto
    overflow hidden
    .old-top
      height 348px
      overflow hidden
      .old-img1
        width 400px
        height 348px
        display block
        float right
    .old-bot
      width 584px
      height 412px
      overflow hidden
      margin 50px auto 0
      position relative
      .old-close
        width 66px
        height 66px
        position absolute
        right 0px
        top 0px
      .old-bot-con
        width 559px
        height 377px
        background #314eca
        margin-top 35px
        border-radius 16px
        overflow hidden
        .old-content
          width 512px
          height 316px
          background #fff
          border-radius 16px
          margin 30.5px auto 0
          overflow hidden
          p
            font-size 29px
            color #333
            text-align center
          p:nth-of-type(1)
            margin-top 51px
          img
            width 430px
            display block
            margin 36px auto 0
</style>
