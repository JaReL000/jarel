
<template>
<div class="index">
  <loading v-if="!show"></loading>
  <transition name="foldleft">
    <section class="index-icon" v-if="iconshoworhide" @click="tojinr"></section>
  </transition>
  <div v-show="show">
    <!-- banner -->
    <div @click="goToAsset">
      <jr-banner
        :type="$root.isLogin ? 'asset' : 'default'"
        titleTop="账户总资产(元)"
        index="true"
        :account="account"
      ></jr-banner>
    </div>

    <!-- 产品列表 -->
    <tabs
      :productList="productList"
    ></tabs>

    <!-- 未登陆 -->
    <transition name="fold">
      <div class="footer fixed-xm" v-if="!$root.isLogin && show">
        <router-link  to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
    </transition>

    <!-- 已经登陆 -->
    <transition name="fold">
      <div class="footer downlaod fixed-xm" v-if="$root.isLogin  && show">
        <div>
          <img src="../assets/small_logo_data64.png" alt="logo">
          <h3>存钱赚利息，就上鲸鱼APP</h3>
          <a class="app" :href="downloadAPP">下载APP赚利息</a>
        </div>
      </div>
    </transition>

    <!-- 侧边栏 -->
    <side
      :user="user"
      :isLogin="$root.isLogin"
      :scrolled="scrolled"
    ></side>
    </div>
  </div>
</template>

<script>
  import side from './jr-side'
  import tabs from './jr-tabs'
  import jrBanner from '../components/JrBanner'

  import {
    typeName,
  } from '../api/urlConfig'


  import { indexApi } from '../api'
  import router from '../router/routes'

  export default {
    name: 'index',
    components: {
      side,
      tabs,
      jrBanner
    },
    data() {
      return {
        iconshoworhide:false,
        show: false,
        isLogin: false,
        productList: [],
        account: {
          "total_money": "2.14",
          "yesterday_total": "0.00",
          "income_total": "2.14",
          "showCurrentNotify": 2
        },
        user: {
          userName: ''
        },
        scrolled: false
      }
    },
    computed: {
      // downloadAPP(){
      //   return downloadAPP
      // },
      typeName(){
        return typeName
      }
    },
    watch: {},
    created() {
      this.storage()
      this.initFun()
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
      this.$messagebox.close()
    },
    component: {
      iconshoworhide(){
        return this.$route.query.combination_id==='cunpiao'
      }
    },
    methods: {
      tojinr(){

        window.location.href = window.location.origin + '/#/picTell/jinrTreaty'
      },
      handleScroll () {
        this.scrolled =  window.scrollY > (document.getElementsByClassName('banner')[0].offsetHeight-40)
      },
      initFun(){
        this.$http({servicename: 'api.index'}).then((response)=>{
          if(response.notice){ // 网站维护升级时的提示语
            this.$messagebox({
              title: response.notice.title ,
              message: response.notice.msg,
              showCancelButton: false,
              // showConfirmButton: false,
              // closeOnClickModal: false,
            })
          }
          this.productList = response.productList.list
          this.$root.isLogin = response.isLogin
          this.account = response.account
          // this.user = response.data.user

          this.show = true

        }).catch((error)=>{
          this.show = true
          console.log("失败了:"+error)
        });
      },
      prefixStr(str){
        return parseFloat(str.substr(0, str.length-1))
      },

      goToAsset(){
        if(this.$root.isLogin){
          let obj = {path: '/asset/myAsset'}
          this.$route.query.event_key
            ? (obj.query = { event_key: this.$route.query.event_key })
            : null
          this.$router.push(obj)
          // this.$router.push('/myAsset')
        }
      },

      /**
       * gousi的逻辑写完连自己都看不懂
       * @author weizihua
       */
      storage(){
        // 当 投资·绑卡·注册
        let combination_id = this.$route.query['combination_id'] // 活动标识
        let param = this.$route.query['param']  // 手机号
        let isShowCoupon = this.$route.query['is_show_coupon']  // 传入页面是否显示卡券


        let bool_id = sessionStorage.getItem('combination_id');
        let bool_param = sessionStorage.getItem('param');

        if(combination_id==='cunpiao'){
          this.iconshoworhide=true
          sessionStorage.setItem('combination_id', combination_id)
          return
        }

        if(combination_id && param){
          let bool = (bool_id==='undefined' || bool_id===null || bool_id==='')
            && (bool_param==='undefined' || bool_param===null || bool_param==='')
          let bool_ban = (combination_id === bool_id) || (bool_param ===bool_param)

          if(bool || bool_ban){
            sessionStorage.setItem('combination_id', combination_id)
            sessionStorage.setItem('param', param)
            isShowCoupon ? sessionStorage.setItem('is_show_coupon', isShowCoupon) : '1'
          }

        }

      },


    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.index
  // height 100%
  text-align center
  //background-color baise
  color wordDfColor
  .tips
    color #b6b6b6
    margin-bottom rem(20)
  .index-icon
    position fixed
    right 0px
    bottom 150px
    z-index 100
    transition: all .7s
    width 181px
    height 159px
    background  url('./images/m_icon1.png') no-repeat top left
    background-size 100% 100%
    &.foldleft-enter
      transform: translate3d(100%, 0, 0)
    &.foldleft-leave
      transform: translate3d(0, 0, 0)
    &.foldleft-leave-active
      transform: translate3d(100%, 0, 0)
  .footer
    position fixed
    bottom 0
    width 100%
    height rem(98)
    line-height @height
    border-top 1px solid wordSecondColor
    background-color #fff
    transform: translate3d(0,0,0)
    transition: all .7s
    &:before
      display inline-block
      content: ''
      position absolute
      top 15%
      width .3vw
      height 70%
      background wordSecondColor
    &.fold-enter
      transform: translate3d(0, 100%, 0)
    &.fold-leave
      transform: translate3d(0, 0, 0)
    &.fold-leave-active
      transform: translate3d(0, 100%, 0)
    a
      float left
      width 50%
      font-size rem(40)
      color mainColor
    a:active
      background-color #ececec
      color wordDfColor
  .downlaod
    border-top: 1px solid #155e9a
    background-color #155e9a
    &:before
      display none
    &>div
      padding rem(20) rem(29) 0
      img
        float left
        height rem(59)
      h3
        float left
        padding-left rem(26)
        line-height rem(58)
        font-size rem(26)
        color baise
      a.app
        float right
        width rem(218)
        margin-top rem(2)
        border-radius rem(5)
        line-height rem(53)
        font-size rem(24)
        background-color #2280c1
        color baise
</style>
