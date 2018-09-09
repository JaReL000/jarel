<template>
  <div class="jingyudai">
   <headers :title = "{name: '鲸鱼贷重磅上线'}"></headers>
    <!-- <div class="jingyudai-index1">
      <a :href="downloadUrl" class="download"></a>
    </div>
    <img src="./images/indexbg2.png" alt="">
    <img src="./images/indexbg3.png" alt="">
    <div class="bottom-download" v-if="toDownload">
      <a :href="downloadUrl" class="download"></a>
      <p>仅限安卓用户优先体验，iOS用户敬请期待哦~</p>
    </div> -->
    <img src="./images/index_3.png" alt="">
    <img src="./images/index_1.png" alt="">
    <img src="./images/index_2.png" alt="">
    <img src="./images/index_4.png" alt="" @click="saveImg">
  </div>
</template>

<script>
  import headers from './components/x-header'
  import './plugin/jquery.min.js'
  export default {
    name: 'carrousel',
    components: {
      headers,
    },
    data() {
      return {
        downloadUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=com.jinrloan.core&fromcase=40002",
        toDownload:false,
        imgUrl:""
      }
    },
    computed: {},
    created(){
      
      this.imgUrl = "http://jinrfe.jinr.com/xfgqjingyudai/img/index_4.ac61278.png"
    },
    mounted() {
      this.goTopFun() 
      // this.saveImg()   
    },
    methods: {
    //顶部按钮显示
      goTopFun(){ 
        var that = this
        $(window).scroll(function(){
          if($(window).scrollTop()>525){
            that.toDownload = true
          }else{
            that.toDownload = false
          }
        })
      },
      //保存图片
      saveImg(){
        // this.$JinrSDK.$flash(this.imgUrl)
        this.$JinrSDK.savePhoto(this.imgUrl)
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
body,
html 
  height 100%
  width 100%
  .jingyudai
    width 100%
    overflow-x hidden
    >img
      width 100%
      vertical-align middle
    >img:nth-of-type(1)
      margin-top 80px
    // .jingyudai-index1
    //   width 100%
    //   height 1251px
    //   background url("./images/indexbg1.png") no-repeat center/100% 100%
    //   position relative
    //   margin-top 80px
    //   .download
    //     width 614px
    //     height 126px
    //     display block
    //     background url("./images/downloadButton.png") no-repeat center /100% 100%
    //     position absolute
    //     bottom 225px
    //     left 50%
    //     transform translateX(-50%)
    // img 
    //   width 100%
    //   vertical-align middle
    // .bottom-download
    //   width 100%
    //   height 196px
    //   background #fff
    //   position fixed
    //   bottom 0
    //   left 0
    //   text-align center
    //   z-index 1
    //   padding-bottom 28px
    //   box-sizing border-box
    //   >a
    //     width 614px
    //     height 126px
    //     display block
    //     background url("./images/downloadButton.png") no-repeat center /100%
    //     margin 22px auto 0
    //   >p
    //     font-size 26px 
    //     color #393939
a
  display none 
html body {
  max-width: 980px;
  margin: 0 auto
}
</style>
