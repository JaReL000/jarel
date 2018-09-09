<template>
  <div class="fl" @touchstart.stop="prevents">
    <img class="img1" src="../images/fl_bg14.png">
    <img class="img2" src="../images/fl_bg16.png">
    <img class="img3" v-if="reg" src="../images/fl_bg21.png">
    <img class="img3" @touchstart.stop="toM" v-else src="../images/fl_bg20.png">
    <img class="img4" src="../images/fl_bg18.png">
    <img class="img5" v-if="!invest" @touchstart.stop="toM" src="../images/fl_bg17.png">
    <img class="img5" v-else src="../images/fl_bg15.png">
    <img class="img6" src="../images/fl_bg19.png">
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
  name: 'fl',
  data () {
    return {
      reg: false,
      invest: false
    }
  },
  props: {
    isRegister: {
      default: null
    },
    firstInvest: {
      default: null
    },
    mUrl: {
      type: [String],
      default: ''
    }
  },
  created () {
    if(this.isRegister == 0){
      // 未注册
      this.reg = false
    }else if(this.isRegister == 1){
      // 注册了
      this.reg = true
    }
    if(this.firstInvest == 0){
      // 未首投
      this.invest = false
    }else if(this.firstInvest == 1){
      // 已首投
      this.invest = true
    }
  },
  mounted () {
    
  },
  methods: {
    ...mapMutations(['CHANGEalertFL']),
    prevents(){
      this.CHANGEalertFL(false)
    },
    toApp(){
      location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core"
    },
    toM(){
      location.href = this.mUrl
    }
  }
}
</script>

<style lang="stylus" scoped>
.fl
  width 100%
  height 100%
  background rgba(0,0,0,0.8)
  position fixed
  left 0px
  top 0px
  z-index 3000
  .img1
    width 680px
    height 300px
    display block
    margin 60px auto 56px
  .img2
    width 670px
    height 153px
    display block
    margin 0 auto 30px
  .img3
    width 500px
    height 74px
    display block
    margin 0 auto
  .img4
    width 670px
    height 190px
    display block
    margin 58px auto 23px
  .img5
    width 500px
    height 74px
    display block
    margin 0 auto
  .img6
    width 670px
    height 60px
    display block
    margin 50px auto 0
</style>
