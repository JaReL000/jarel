<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.jr-side
  text-align left
  color wordDfColor
  .menu
    position fixed
    right rem(0)
    top rem(0)
    padding rem(40) rem(50)
    width rem(50)
    height rem(60)
    &:active span
      background-color rosybrown
    span
      display block
      height rem(6)
      margin-bottom rem(10)
      background-color #fff
  .scrolled 
    span
      background-color mColor
  &-mask
    position fixed
    right 0
    top 0
    width 100%
    height 100%
    background-color rgba(7, 17, 27, 0.6)
  &-main
    position fixed
    right 0
    top 0
    height 100%
    width 55%
    padding-left rem(56)
    // background: linearGradientSide
    background baise
    .nameDiv
      height rem(100)
    &>a.name
      display block
      margin-bottom: rem(26)
      border-bottom 1px solid wordSecondColor
      line-height rem(99)
      font-size rem(32)
      text-indent rem(4)
      color wordDfColor
    ul
      font-size rem(30)
      line-height rem(108)
      text-indent rem(6)
      li:active
        background-color #0a6991
  &-f
    position absolute
    left 0
    bottom 0
    width 100%
    height rem(104)
    line-height @height
    text-align center
    color #fff
    img
      width rem(38)
      margin-bottom rem(8)
      margin-right rem(10)
      vertical-align middle
    span
      display inline-block
  a  
    color wordDfColor


.slide-fade-enter-active {
  transition: all .25s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}




</style>
<template>
    <div class="jr-side" >
      <!--导航三道杠队长-->
      <div
        class="menu"
        @click="menuFun"
        :class="{scrolled}"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <transition-group name="slide-fade" tag="div">
        <!--遮罩层-->
        <div
          class="jr-side-mask"
          v-if="sildShow"
          @click="menuFun"
          key="jr-side-mask"
        ></div>
        <!--内容区域-->
        <div
          class="jr-side-main"
          v-if="sildShow"
          key="jr-side-main"
        >
          <div class="nameDiv"></div>
          <!-- <router-link class="name" v-if="user.userName===''" v-text="'你好, 请登陆'"  to="/login">登录</router-link>
          <router-link v-if="user.userName!==''" v-text="'您好，'+user.userName" to="/">登录</router-link> -->
          <a   to="/login"></a>
          <a ></a>
          <ul>
            <li
              v-for="(item, index) in sideList"
              v-text="item.name"
              @click="routerToPush(index, item.path)"
              :key="index"
            ></li>
          </ul>
          <a href="tel:10102015" class="jr-side-f"><img
            src="../assets/icon_service.png"
            alt="客服icon"><span
            v-text="customerService"
          ></span></a>
        </div>
      </transition-group>
    </div>

</template>

<script>
  export default {
    name: 'side',
    components: {},
    props: {
      user: Object,
      isLogin: {
        type: Boolean
      },
      scrolled: {
        type: Boolean
      }
    },
    data() {
      return {
        sildShow: false,
        sideList: [
          {name: "我的资产", path: 'asset/myAsset'},
          {name: "个人中心", path: 'personalCenter'},
          {name: "我的福利", path: 'welfare/myCore'},
          // {name: "安全保障", path: '/security'},
          {name: "关于我们", path: 'picTell/jinrTreaty'},
          {name: "下载APP", path: 'downloadAPP'},
        ],
        customerService: '客服电话 10102015',
      }
    },
    computed: {
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
      menuFun(){
        this.sildShow = !this.sildShow
      },
      routerToPush(index, pathName){
        let bool = !this.isLogin
          && (pathName==='myAsset' || pathName==='personalCenter' || pathName==='welfare/myCore' || pathName === 'asset/myAsset')
        if(bool){
          //this.$flash('请先登陆');
          // this.$router.replace('/login')
           this.$router.push('/login')
          // this.menuFun()
          return
        }

        if(pathName==='downloadAPP'){
          window.location.href = this.downloadAPP
          return
        }

        if(this.sideList[index].url){
          window.location.href = this.sideList[index].path
          return
        }

        this.$router.push({
          path: pathName,
          query: {}
        })
      }

    },
  }
</script>
