<template>
  <div>
    <x-header
      slot="header"
      class="x-header"
      :left-options="leftOptions"
      :right-options="rightOptions"
      :title="titleOptions"
      transition="vux-header-fade-in-left"
      @onClickMore="shareToggleFun"
      @onClickUrl="routerPush"
    ></x-header>
      <!-- swiper  @slideChangeTransitionEnd="callbackFun" -->
      <swiper
        :options="swiperOption"
        ref="mySwiper"

      >
        <swiper-slide>
          <one></one>
        </swiper-slide>
        <swiper-slide>
          <two></two>
        </swiper-slide>
        <swiper-slide>
          <three></three>
        </swiper-slide>
        <swiper-slide>
          <four></four>
        </swiper-slide>
        <swiper-slide>
          <five></five>
        </swiper-slide>
        <swiper-slide>
          <six></six>
        </swiper-slide>
        <swiper-slide>
          <seven></seven>
        </swiper-slide>
        <swiper-slide>
          <eight></eight>
        </swiper-slide>
        <swiper-slide>
          <nine></nine>
        </swiper-slide>
        <swiper-slide>
          <ten></ten>
        </swiper-slide>
        <div
          class="swiper-pagination" slot="pagination"
        ></div>
    </swiper>
    <share
      :shareType="shareType"
      :imageUrl="imageUrl"
      :text="text"
      :title="title"
      :url="url"
      :showShare="showShare"
      @shareToggleFun="shareToggleFun"
    ></share>
  </div>
</template>

<script>
  import xHeader from '@/views/app/components/x-header/index'
  import share from 'components/share'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  import one from './components/one'
  import two from './components/two'
  import three from './components/three'
  import four from './components/four'
  import five from './components/five'
  import six from './components/six'
  import seven from './components/seven'
  import eight from './components/eight'
  import nine from './components/nine'
  import ten from './components/ten'

  export default {
    name: 'carrousel',
    components: {
      swiper,
      swiperSlide,
      xHeader,
      share,

      one,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine,
      ten,
    },
    data() {
      return {

        shareType: '1',
        showShare: false,
        swiperOption: {
          direction: 'vertical',
          slidesPerView: 1,
          spaceBetween: 30,
          height : window.innerHeight-48,
          mousewheel: true,
          params: {
            debugger: true,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'progressbar'
          },
          on: {
            slideChangeTransitionEnd() {
              console.log('slideChangeTransitionEnd- ', this.activeIndex);
            },
          }

        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      // 分享
      title(){
        return this.$root.shareTitle //鲸鱼理财——低门槛、稳收益、安全可靠
      },
      text(){
        return this.$root.shareContent
      },
      url(){
        return this.$root.shareUrl
      },
      isShow(){
        let bool = (!this.isLogin  && !this.$root.isAPP)
        return bool
      },
      imageUrl(){
        let url = document.location.origin + require('../../images/logo.png')

        return url
      },
      leftOptions () {
        // return {
        //   showBack: this.$route.path !== '/'
        // }
      },
      rightOptions () {
        return {
          showMore: true,
          textCopy: false,
          textUrl: false,
        }
      },
      titleOptions(){
        return {
          name: '运营报告'
        }
      }
    },
    created(){


    },
    mounted() {
      // // current swiper instance
      // // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      // console.log('this is current swiper instance object', this.swiper)
      // this.swiper.slideTo(0, 1000, false)
    },
    methods: {
      shareToggleFun(){

      },
      routerPush(path, query, name) {
        // console.log(path, query, name);

        if (path) {
          this.$router.push({
            path: path,
            query: query,
            name: name,
          })
        }
      },

      callbackFun(){
        console.log(this.activeIndex);

      },

      shareToggleFun(){
        // this.$JinrSDK.showShare('1', 'http://192.168.28.82:8999/img/logo.3c482af.png', '鲸鱼超级新手福利：6000体验金+200元现金抵扣券', '鲸鱼理财——低门槛、稳收益、安全可靠', 'https://hbnew.jingyugame.com/activity/Activity/enter?combinationId=xvjErjR71VVoi0BxdGb82g==')
        this.showShare = !this.showShare
        // this.$JinrSDK.$flash('鲸鱼理财——低门槛、稳收益、安全可靠')
        // this.$indicator.open('Loading...')
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>