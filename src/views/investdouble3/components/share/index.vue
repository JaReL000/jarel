<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.share
  position fixed
  z-index 2
  background-color rgba(255, 255, 255, 0.1)
  .mask
    background-color rgba(0, 0, 0, 0.5)
    // filter: blur(20px)
    // backdrop-filter: blur(10px)
  .content
    position fixed
    bottom 0
    width 100%
    text-align center
    font-size 28px
    padding-top 100px
    padding-bottom 120px
    background  url('./images/home_icon_close@2x.png') no-repeat center 72%
    background-size 30px 30px
    background-color #fff
    .content-wrap 
      display inline-block
      width 33%
    p 
      font-size 30px
      font-weight bold
      line-height 108px
    img 
      width 80px
      height @width

</style>
<template>
<transition name='show'>
  <div 
    class="share fixed" 
    @touchstart.stop.prevent="shareToggleFun"
    v-if="showShare"
  >
    <div class="mask fixed"></div>
    <div class="content fixed-x">
      <div class="bottom-x">
        <div 
          class="content-wrap"
          v-for="(item,index) in shareList" 
          :key='index' 
          @touchstart.stop.prevent="shareFun(index)">
            <img :src='item.iconUrl' :alt="item.name">
            <p>{{item.name}}</p>
          </div>
      </div>
    </div> 
  </div>
</transition>

    
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        shareList:[
          {name:'微信好友',iconUrl: require('./images/share_weixin.png')},
          {name:'朋友圈',iconUrl: require('./images/share_friend.png')}
        ]
      }
    },
    props: {
      showShare: {
        type: Boolean,
      },
      shareType: {
        type: String,
        default: '1'
      },
      text: {
        type: String,
        default: '这是分享文案'
      },
      title: {
        type: String,
        default: '分享的标题'
      },
      imageUrl: {
        type: String,
        default: '分享图片时,图片的Url'
      },
      url: {
        type: String,
        default: '分享活动时,活动的网站链接地址'
      },
    },
    computed: {},
    watch: {
      shareShowOrHide (val) {
        // if(!val){
        //   // 隐藏
        //   document.getElementsByClassName('share-con')[0].style.height=0
        // }else{
        //   // 显示
        //   document.getElementsByClassName('share-con')[0].style.height='100%'
        // }
      }
    },
    created() {},
    mounted() {},
    methods: {
      // shareFun(type){
      //   // 分享
      //   let shareType = '1'
      //   let imageUrl = 'http://hbnew.dev.jingyugame.com/static/yeqi_share.jpg'
      //   let text = this.text
      //   let title = this.title
      //   let url = 'https://weatherpwa.baidu.com/'
      //   try {
      //     Jinr.showShare(shareType, type, imageUrl, text, title, url)
      //     this.hideMask()
      //     // this.$flash('分享成功')
      //   } catch (error) {
      //     this.hideMask()
      //     this.$flash('分享' + error)
      //   }
      // },

      /* 分享
      * @param shareType 分享类型参数,"0"是图片分享,"1"是活动分享,不能为空
      * @param type      分享位置参数,"0"是微信好友分享,"1"是微信朋友圈分享,不能为空
      * @param imageUrl  分享图片时,图片的Url,分享活动时,分享卡片的小图Url,不能为空
      * @param text      分享的文案,不能为空
      * @param title     分享的标题,不能为空
      * @param url       分享活动时,活动的网站链接地址
      * showShare( shareType,  type,  imageUrl,  text,  title,  url)
      **/
      shareFun(type){
        let shareType = this.shareType
        let imageUrl = this.imageUrl
        let text = this.text
        let title = this.title
        let url = this.url
        console.log(shareType, type, imageUrl, text, title, url);
        
        try {
          Jinr.showShare(shareType, type, imageUrl, text, title, url)
          // this.showShare = !this.showShare
          this.$emit('shareToggleFun')
          // this.$flash('分享成功')
        } catch (error) {
          // this.showShare = !this.showShare
          this.$emit('shareToggleFun')
          this.$flash("请前往APP分享")
        }
        
      },
      prevents(){

      },
      shareToggleFun(){
        // if(document.getElementsByClassName('introduce')[0]){
        //   document.getElementsByClassName('introduce')[0].scrollTop=document.getElementsByClassName('introduce')[0].scrollHeight
        // }
        this.$emit('shareToggleFun')
      },
      stopMove(e){
        e.preventDefault()
      }
    },
  }
</script>
