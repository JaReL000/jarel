<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.tell 
  padding 0  32px 
  .tell-top  
    overflow hidden
    padding  44px 0 44px
    .logo_img
      float left
      width 44px 
      height @width
      line-height 0
      img 
        margin 0  
        padding 0  
    h3 
      float left
      height 44px
      padding 0 24px
      line-height @height
      font-size 34px
    span 
      height 44px
      line-height @height
      float left
      font-size 26px
      color #999999
  .main 
    top 0px
    left 0 
    bottom 100px
    right 0
    // width 100%
    // transform translate3d(-50%, -50%, 0)
    .scroll
      position relative
      height 100%
      background-color #ececec
      background-repeat no-repeat
      background-position center center
      background-size contain
      .nav 
        a
          position absolute
          top 50%
          transform translate3d(0, -50%, 0)
          width 80px
          height @width 
          border-radius (@width/2)
          background-color rgba(0,0,0,0.3)
          background-size 43px 59px
          background-repeat no-repeat
          background-position center center
        a:nth-child(1)
          left 20px 
          background-image url('../images/icons8-expand_arrow.png')
          background-position-x 16px
        a:nth-child(2)
          right 20px 
          background-image url('../images/icons8-expand_arrow_r.png')
    h1 
      margin-bottom 34px
      line-height 100px
      text-align center
      font-size 26px
      color #999999
    p 
      line-height 34px
      color #333333
      font-size 28px
    h6  
      float right
      padding-right 40px
      line-height 86px 
      font-size 28px
  .footer 
    position fixed
    bottom  0
    left 0
    width 100%
    text-align center
    .worper
      padding 22px  0 15px
      overflow hidden
      &>div 
        float left
        height 66px
        width 50%
        line-height @height
        font-size 34px
        color #0c72e3


</style>
<template>
  <div class="tell fixed" v-if="show">
    {{indexPage}}
    <!-- <div class="tell-top">
      <div class="logo_img"><img src="../images/logo_min.png" alt=""></div>
      <h3>鲸鱼说</h3>
      <span>{{list[indexPage].issue_time}}</span>
    </div> -->
    <div class="main fixed main-x">
      <!-- banner -->
      
      <div class="scroll" :style="{backgroundImage: buildBackgroundUrl(list[indexPage].photo)}">
        <div class="nav">
          <a href="javascript:;"  @touchstart.stop.prevent="preFun"></a>
          <a href="javascript:;"  @touchstart.stop.prevent="nextFun"></a>
        </div>
      </div>
      <!-- 名人警句 -->
      <!-- <h1 v-text="list[indexPage].title"></h1> -->
      <!--<div v-html="text"></div>
      <h6 v-text="nameT"></h6> -->
    </div>
    <!-- 底部 保存与分享 -->
    <div class="footer border-top-1px fixed-x">
      <div class="worper">
        <div class="border-right-1px" @touchstart.stop.prevent="storageFun">保存</div>
        <div @touchstart.stop.prevent="shareToggleFun">分享</div>

      </div>  
    </div>

    <share
      :shareType="shareType"
      :imageUrl="list[this.indexPage].photo"
      :text="text"
      :title="list[this.indexPage].title"
      :url="url"
      :showShare="showShare" 
      @shareToggleFun="shareToggleFun"
    ></share>
  </div>
</template>

<script>
  import share from 'components/share'
  export default {
    components: {
      share
    },
    data() {
      return {
        show: false,
        shareType: '0',
        time: "2017-11-28",
        text: '鲸鱼说',
        url: '',
        showShare: false,
        
        page: 1, //页码
        indexPage: 0, //当前页面
        terminal: 1, //终端 1-APP|2-M站|4-PC端。

        total: 0,
        list: [],
        end: true,
        start: true,
      }
    },
    computed: {},
    watch: {},
    created() {
      this.initFun()
    },
    mounted() {},
    methods: {
      initFun(){
        this.$http({
          method: 'ikon.list',
          terminal: 1,
          page: this.page,
        }).then((response) => {
          this.total = response.total  //总条数
          this.list = response.list
          this.show = true
        })
      },

      preFun(){
        if(this.indexPage<=0){
          if(this.start){
            this.start = false
            this.$flash('已经是第一张')
            return
          }  
        }else{
          this.$nextTick(()=>{

            this.indexPage--
            this.end = true
          })
          
        }
        
      },
      nextFun(){
        // 当前数组之内
        if(this.indexPage < (this.total-1)){
          
          this.$nextTick(()=>{
            this.indexPage++
          })
          this.start = true
        }else{
          if(this.total.length < this.total){
            console.log('请求数据。。。。。');
            return
          }else{
            if(this.end){
              this.end = false
              this.$flash('已经是最后一张')
              return
            }  
            
          }
        }       
      },

      // 保存
      storageFun(){
        let url = this.list[this.indexPage].photo
        try {
          Jinr.savePhoto(url)
          // bool ? this.$flash('保存成功') : this.$flash('保存不成功')
        } catch (error) {
          this.$flash('不保存')
        }
        
        
      },

      shareToggleFun(){
        this.showShare = !this.showShare
      },

      // buildBackgroundUrl (url) {
      //   if(url){
      //     return `url(${url})`
      //   }
      // },
    },
  }
</script>
