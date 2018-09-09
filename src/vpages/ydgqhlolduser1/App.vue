<template>
  <div class="olduser">
    <!-- <x-header>感谢有你</x-header>     -->
    <div class="olduser-index">
      <div class="year">
        年定期 <span>+</span><span>5.0%</span>
      </div>
      <div class="month">
        月定期 <span>+</span><span>3.0%</span>
      </div>
      <div class="button" @click="showFun">立即领取</div>
    </div>
    <div class="olduser-index_mark" v-show="show">
      <a :href= downloadAPP></a>
    </div>
  </div>
</template>

<script>
  import xHeader from '@/views/app/components/x-header/index'
  import {
  downloadAPP,
  mUrl,
} from "mixins/mixin";
  export default {
    name: 'carrousel',
    components: {
      xHeader,
    },
    data() {
      return {
        show:false
      }
    },
    computed: {
      downloadAPP(){
      return downloadAPP;
    },
      mUrl(){
        return mUrl;
      },
    },
    created(){},
    mounted() {},
    methods: {
      //优惠券显示
      showFun(){
        setTimeout(() => {
          this.show = true
        }, 500);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
html,
body,
.olduser
  width 100%
  height auto
  overflow hidden
  background #fba900
  .olduser-index
    width 100%
    height 1206px
    background url('./images/oldmessage.png') no-repeat center top/100% 1206px
    position relative 
    overflow hidden
    .year,
    .month
      font-size 30px 
      color #ff5719
      position absolute
      top 650px 
      right 60px
      span
        vertical-align middle
      span:nth-of-type(1)
        font-size 75px
      span:nth-of-type(2)
        font-size 107px
    .month
      top 850px
    .button
      width 500px
      height 80px
      background url("./images/button.png") no-repeat center center/100% 100%
      font-size 36px
      color #ffeecd
      line-height 80px
      text-align center
      position absolute
      top 1055px
      left 50%
      transform translateX(-50%)
  .olduser-index_mark
    width 100%
    height 100%
    background-color rgba(0,0,0,0.6)
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-image url('./images/mark.png')
    background-size 542px 572px
    background-repeat no-repeat
    background-position center center
    >a
      display block
      width 362px
      height 160px
      position absolute
      top 62.5%
      left 50%
      transform translate(-50%,-50%)
a
  display none
</style>