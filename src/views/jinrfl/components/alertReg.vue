<template>
  <div class="reg">
    <div class="reg-wrap">
      <input type="tel" v-model="tel" maxlength="11" placeholder="请输入手机号码">
      <div @click="receives">点击领取</div>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import * as jrUrl from '../urlconfig/urlconfig'
import Flash from '@/components/flash'
export default {
  name: 'reg',
  data () {
    return {
      tel: ''
    }
  },
  props: {
    combinationId: {
      type: [String],
      default: ''
    },
    mUrl: {
      type: [String],
      default: ''
    },
    token: {
      type: [String],
      default: ''
    }
  },
  created () {

  },
  mounted () {
    
  },
  methods: {
    ...mapMutations(['CHANGEalertReg']),
    receives(){
      if(!this.tel){
        Flash('手机号码不能为空！')
        return
      }
      if(!/^1[3|4|5|6|7|8|9]\d{9}$/ig.test(this.tel)){
        Flash('请输入正确的号码!')
        return
      }
      let params = {
        combinationId: this.combinationId,
        mobile: this.tel,
        token: this.token
      }
      this.$http(jrUrl.receiveRandomMoney,params).then(res=>{
        this.$emit('initData')
        if(res == 0){
          // 新用户,未注册,跳未注册结果页
          // if(this.mUrl){
          //   location.href = this.mUrl
          // }
          this.$emit('changeUserState','noreg')
          this.CHANGEalertReg(false)
        }else if(res == 1){
          // 老用户,已注册,跳转显示结果页面【下载鲸鱼APP领取收益】
          this.$emit('changeUserState','reg')
          this.CHANGEalertReg(false)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/mixin.styl'
.reg
  width 100%
  height 100%
  left 0px
  top 0px
  background rgba(0,0,0,0.5)
  position fixed
  z-index 1000
  .reg-wrap
    width 584px
    height 641px
    position absolute
    left 50%
    top 50%
    transform translate(-50%,-50%)
    -webkit-transform translate(-50%,-50%)
    bis1('../images/fl_bg5')
    overflow hidden
    input 
      display block
      box-sizing border-box
      width 500px
      // height 74px
      padding 22px 0 22px 10px
      border-radius 4px
      font-size 30px
      margin 405px auto 20px
    div
      width 500px
      height 74px
      background #fff100
      border-radius 4px
      font-size 30px
      line-height 74px
      text-align center
      margin 0 auto
</style>
