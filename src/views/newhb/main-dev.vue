<template>
<div class="dev">
  
  <!-- style="width:100%;position:fixed; position: absolute;left:0;top:0;z-index:100;" -->
  <x-header 
    slot="header"
    class="x-header"
    :left-options="leftOptions"
    :right-options="rightOptions"
    :title="titleOptions"
    transition="vux-header-fade-in-left"
    @onClickMore="shareToggleFun"
    @onClickUrl="routerPush"
    v-if="$root.showHeader"
  ></x-header>

  <newhb
    :class="{'x-header-top': $root.showHeader}"
  ></newhb>
  
  <login 
    :telVal="telVal"
    :passwordVal="passwordVal"
    @loginFun="loginFun"
    v-if="(isShowLogin)"
  ></login>

  <share
    :shareType="shareType"
    :imageUrl="imageUrl"
    :text="text"
    :title="title"
    :url="url"
    :showShare="showShare" 
    @shareToggleFun="shareToggleFun"
  ></share>

  <!-- <div 
    class="icon_edit" 
    v-if="(!isShowLogin)"
    @touchstart.stop.prevent="signOutFun"
  >
    <i class="lite-iconf lite-iconf-editor">OUT</i>
  </div> -->
  <palette-button 
    v-if="(!isShowLogin)"
    content="+" 
    @expand="main_log('expand')" 
    @expanded="main_log('expanded')" 
    @collapse="main_log('collapse')"
    direction="lt" 
    class="icon_edit" 
    :radius="80" 
    ref="target_1" 
    mainButtonStyle="color:#fff;background-color:#26a2ff;"
  >
    <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(1)">回收</div>
    <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(2)"></div>
    <div class="my-icon-button indexicon icon-popup" @touchstart="signOutFun">out</div>
  </palette-button>
</div>
</template>

<script>
import xHeader from './components/x-header/index'
import Login from './components/user/login'

import mixins from './mixin'
import share from 'components/share'
import newhb from './newhb'

import { PaletteButton } from '@/jinr-sdk/components'

export default {
  // name: 'index',
  components: {
    Login,
    share,
    xHeader,
    PaletteButton,
    newhb
  },
  data() {
    return {
      telVal: '',
      passwordVal: '',
      isShowLogin: false,

    }
  },
  computed: {},
  mixins: [mixins],
  watch: {},
  created() {
    // 初始化数据
    this.initFun()
    this.$root.isProd = false 
  },
  mounted() {},
  methods: {
    loginFun(telVal, passwordVal){
      // 网络请求token 模拟登陆
      let loginApp = {
        method: "user.login",  //接口名称
        timestamp: Date.parse(new Date()),
        unique_id: "14870610001", //设备唯一码
        mobile: telVal, 
        password: passwordVal,
        type: "pwd"
      }
      this.$http(loginApp).then((res)=>{
        if (res.code===1000000) {
          this.$flash(res.msg)
        }else{
          sessionStorage.setItem('token', res.token)
          this.isShowLogin = sessionStorage.getItem('token') ? false :  true
          window.location.reload()
        }
      })
    },

    //退出登录 user.logout
    signOutFun(){
      sessionStorage.removeItem("token")
      window.location.reload()
    },

    main_log(val) {
      console.log('main_log', val);
    },
    sub_log(val) {
      console.log('sub_log', val);
      this.$refs.target_1.collapse();
    }
  },
}
</script>

<style lang="stylus">
@import "~style/mixin.styl"

html 
  color #343434

img  
  width 100%
  height 100%
  

.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)

// 淡入淡出
.show-enter-active 
  opacity  1
  transition  opacity .3s
.show-leave-active 
  opacity  1
  transition  opacity .3s
.show-enter  
  opacity  0.1
.show-leave-active 
  opacity  0.1

.noData
  text-align center
  color #999
  font-size 30px
  line-height 80px
  &>img 
    padding-top 300px
    width 300px
    // height @width
    height auto

.dev
  .icon_edit
    position: fixed;
    bottom: 100px;
    right: 10px;
    z-index 9999
    width: 100px;
    height: @width;
    line-height @width
    text-align: center;
    border-radius: 50%;
    opacity: .98;
    background: #1b9af4;
    box-shadow: 0 6px 30px 0 rgba(52,96,183,.28);
    cursor: pointer;
    .icon_edit .lite-iconf-editor 
      font-size: 40px;
    .lite-iconf 
      font-size: 35px;
      color: #fff;
  .my-icon-button
    width:30*2px;
    height:30*2px;
    border-radius:50%;
    background-color:#26a2ff;
    color: #fff;
    line-height:30*2px;
    font-size 20px
    text-align:center;
  .mint-main-button
    color: #000;
    line-height 85px
    background-color:#26a2ff;
  
    

    
</style>

