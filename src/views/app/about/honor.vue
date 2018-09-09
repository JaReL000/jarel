<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  .honor 
    // overflow scroll
    -webkit-overflow-scrolling touch
    .honor-wrap
      // padding-top 79px
      // margin-bottom 79px
      position absolute
      left 50%
      top 40% 
      transform translate3d(-50%, -50%, 0)
      .honor-name
        width 606px
        height 58px
        background url('./img/app_bg47.jpg') no-repeat center
        background-size 100% 100%
        margin 0 auto 40px
      .swiper-con
        height 754px
        width 635px
        margin 0 auto
        .jinr-swiper
          height 754px!important
          margin-bottom 100px
          overflow auto
          a 
            .jinr-img
              // background-size 100% 100%
              background-size cover
        .custom-bottom
          // position relative
          // overflow hidden
          bottom rem(0)
          z-index 1
          a 
            // position absolute
            float: left;
            display inline-block
            margin-left: 10px;
            text-align center
            .jinr-icon-dot 
              display: inline-block;
              vertical-align: middle;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background-color: #fff 
              border 1px solid  #999fac
              // background-color: rgba(255,255,255,0.4)
              // background-color: rgba(255,255,255,0.4)
              &.active 
                // background-color: $swiper-indicator-active-color
                background-color: #999fac
          
</style>
<template>
  <div class="honor fixed">
    <!-- <head-top>荣誉资质</head-top> -->
    <section class="honor-wrap">
      <div class="honor-name"></div>
      <div class="swiper-con">
        <jinr-swiper
          :threshold="threshold"
          :list="bannerList"  
          dots-class="custom-bottom" 
          dots-position="center" 
        ></jinr-swiper>
      </div>
    </section>
  </div>
</template>

<script>
  import headTop from './components/headtop'

  export default {
    components: {headTop},
    data() {
      return {
        bannerList: [
          {img: require('./img/app_bg46.jpg')},
          {img: require('./img/app_bg43.jpg')},
          {img: require('./img/app_bg45.jpg')},
          {img: require('./img/app_bg42.jpg')},
          {img: require('./img/app_bg41.jpg')},
          {img: require('./img/app_bg44.jpg')},
          {img: require('./img/app_bg39.jpg')},
          {img: require('./img/app_bg40.png')}, 
        ]
      }
    },
    computed: {
      // 滚动距离开始触发
      threshold(){
        return (window.innerWidth/3 || document.body.clientWidth/3)
      }
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {}
    
  }
</script>
