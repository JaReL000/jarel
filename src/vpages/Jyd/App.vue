<template>
  <div class="jyd">
    <x-header 
      slot="header"
      class="x-header"
      :left-options="leftOptions"
      :right-options="rightOptions"
      :title="titleOptions"
      @onClickUrl="routerPush"
      transition="vux-header-fade-in-left"
    ></x-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import xHeader from './components/x-header/index'

  export default {
    name: 'carrousel',
    components: {
      xHeader,
    },
    data() {
      return {}
    },
    computed: {
      // 分享
      title(){
        return this.$root.shareTitle //鲸鱼——低门槛、稳收益、安全可靠
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
        return {
          showBack: this.$route.path !== '/'
        }
      },
      rightOptions () {
        return {
          showMore: this.$route.meta.isShowMore,
          textCopy: this.$route.meta.textCopy,
          textUrl: this.$route.meta.textUrl,
        }
      },
      titleOptions(){
        return {
          name: this.$route.meta.title || this.$root.title || this.$root.twoTitle
          // name: this.$root.title
        }
      },
    },
    
    created(){},
    mounted() {},
    methods: {
      
    }
  }
</script>
<style lang="stylus">

/*********** 适配pc ***********/
html body {
  max-width: 980px;
  margin: 0 auto;
  background-color #f5f5f5
}

.jyd
  font-weight: normal
</style>

