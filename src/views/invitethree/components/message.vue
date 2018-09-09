<template>
  <div class="mes" @touchmove.prevent.stop="aa">
    <div class="mes-wrap">
      <div class="mes-content">
        <div class="mes-div1">
          发送给：
          <span v-text="sendMesTel"></span>
          <i @click="CHANGEalertmes(false)">取消</i>
        </div>
        <div class="mes-div2">
          <div v-if="focus===1">
            【鲸鱼】老铁，别忘了我送你的<span>10元现金红包</span>！现在投<span>定期满1000元</span>就能拿！只有像你这么好看的人才有资格拿哟！<span>X月X日后资格失效</span>! >><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core">http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core</a>
          </div>
          <div v-if="focus===2">
            【鲸鱼】曾经有一个红包摆在我面前，我却没有珍惜，至今后悔莫及！但愿你会珍惜，现在投<span>定期满1000元</span>马上得<span>10元现金红包</span>！>><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core">http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core</a>
          </div>
        </div>
        <div class="mes-div3">
          <span class="mes-div3-span1" :class="{'focus':focus===1,'nofocus':focus===2}" @click="focus=1">提醒文案一</span>|
          <span class="mes-div3-span2" :class="{'focus':focus===2,'nofocus':focus===1}" @click="focus=2">提醒文案二</span>
          <i v-if="!send" @click.stop="sendMes">发送</i>
          <i v-else>正在发送...</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {sendMsgTipFriend} from '../urlconfig/urlconfig'
import Flash from '@/components/flash'
export default {
  name: "mes",
  data () {
    return {
      focus: 1,//1:文案1，2：文案2
      send: false
    }
  },
  props: {
    sendMesTel: {
      default: ''
    },
    combinationId: {
      type: [String],
      default: ""
    },
    token: {
      type: [String],
      default: ""
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
    aa(){},
    ...mapMutations(['CHANGEalertmes']),
    sendMsgTipFriend(){
      let params = {
        combinationId: this.combinationId,
        mobile: this.sendMesTel,
        select: this.focus,
        token: this.token
      }
      this.$http(sendMsgTipFriend,params).then(res=>{
        this.$emit('changeMyInvitaData',this.sendMesTel)
        this.CHANGEalertmes(false)
        Flash('发送成功!')
      })
    },
    sendMes(){
      this.send = true
      this.sendMsgTipFriend()
    }
  }
}
</script>

<style lang="stylus" scoped>
.mes
  width 100%
  height 100%
  background rgba(0,0,0,0.8)
  position fixed
  left 0px
  top 0px
  z-index 20000
  .mes-wrap
    width 612px
    height 509px
    background #314eca
    border-radius 24px
    margin 340px auto 0
    overflow hidden
    .mes-content
      width 570px
      height 455px
      margin 28px auto 0
      overflow hidden
      .mes-div1
        height 32px
        line-height 32px
        font-size 29px
        color #93a7ff
        overflow hidden
        span 
          color #fff
        i 
          color #f8f35d
          float right
          margin-right 10px
      .mes-div2
        height 303px
        background #fff
        overflow hidden
        border-radius 25px
        margin 21px 0 26px
        font-size 26px
        box-sizing border-box
        div
          width 484px
          height 235px
          margin 36px auto 0
          span 
            color #ff7444
          a
            color #0f75ff
            text-decoration underline
            display block
            word-break break-all
            margin-top 16px
      .mes-div3
        height 60px
        line-height 60px
        overflow hidden
        font-size 28px
        color #fff
        span 
          margin-right 19px
          display inline-block
        .focus
          color #fff
        .nofocus
          color #93a7ff
        .mes-div3-span1
          margin-left 12px
        .mes-div3-span2
          margin-left 19px
        i 
          width 174px
          height 60px
          display inline-block
          text-align center
          line-height 60px
          background #ffe454
          border-radius 6px
          color #684a01
          float right
</style>
