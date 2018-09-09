<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  .jinrTarget
    box-sizing border-box
    padding-bottom 100px
    .jinrTarget-bg1
      height 380px
      background url('./img/app_bg35.jpg') no-repeat center
      background-size 100% 100%
      overflow hidden
      div
        width 43px
        height 41px
        background url('./img/app_bg12.png') no-repeat 100px 37px
        background-size 40px 40px
        float right
        padding 22px 37px 100px 100px 
    .jinrTarget-bg2
      // background:hotpink;
      div
        height 400px
        font-size 28px
        text-align center
        line-height 54px
        padding 71px 0 96px
        p
          color #666
      h6
        // text-align center
        margin 0 117px;
        // background red;
        font-size 0
        display flex
        align-items:center
        justify-content center
        img 
          width 159px
          height 6px
          margin-bottom 8px;
        span 
          font-size 40px
          color #1275d7
          margin 0 18px
          white-space:nowrap;
      ul
        width 574px
        height 517px
        margin 46px 92px 97px
        overflow hidden
        li
          width 243px
          height 105px
          border 1px solid #f4f4f4
          border-radius 10px
          text-align center
          font-size 24px
          line-height 105px
          float left
          margin 0 35px 74px 0
          // background #000
          // background-size 100% 100%
          img 
            width 100%
            vertical-align middle
            // height 100%
          p
            color #808080
            margin-top 17px;
            line-height 30px
        li:nth-of-type(5)
          img
            width 88px
            height 88px
      p
        font-size 30px
        color #0361c1
        text-align center
    .jinrTarget-bg3
      height 160px
      overflow hidden
      button
        display block
        width 690px
        height 103px
        background #2a8bf6
        color #ffffff
        font-size 36px
        line-height 103px
        text-align center
        border-radius 4px
        outline none
        border 0
        margin 0 auto
        margin-top 20px
  .clearfix 
      *zoom 1
  .clearfix:before,
  .clearfix:after 
      display  table
      line-height  0
      content  ""
  .clearfix after 
      clear  both    
</style>
<template>

<div class="scroll-over fixed fixed-x" :class="{'x-header-potop': $root.showHeader}">
  <!-- <scroll class="toplist fixed" ref="toplist" > -->
    <div class="jinrTarget ">
      <section class="jinrTarget-bg1">
        <div @click='shareToggleFun' v-if='token'></div>
      </section>
      <section class="jinrTarget-bg2">
        <div>
          <p>鲸鱼之志，志在蓝海</p>
          <p>鲸鱼颠覆传统金融壁垒</p>
          <p>致力于成为普惠金融时代的革命开创者</p>
          <p>为最广大人民群众的金融利益服务</p>
          <p>鲸鱼努力，成就人民的财富安托帮</p>
          <p>鲸鱼信仰，用时间让财富说话</p>
          <p>鲸鱼相信</p>      
          <p>金融智慧，可以让生活更美好</p> 
        </div>
        <h6><img src="./img/licai4.jpg" alt=""><span>合作伙伴</span><img src="./img/licai5.jpg" alt=""></h6>
        <ul class="clearfix">
          <li v-for="(obj,index) in dataList" :key='index'>
            <img :src="obj.img" alt="">
            <p>{{obj.text}}</p>
          </li>
        </ul>
        <p>存钱赚利息，就用鲸鱼APP！</p>
      </section>
      <section class="jinrTarget-bg3">
        <button @click='toApp'>马上开启我的财富之旅</button>
      </section>
    </div>
  <!-- </scroll> -->

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
  import share from 'components/share'
  export default {
    components: {share},
    data() {
      return {
        shareType: '1',
        time: "2017-11-28",
        text: '图说鲸鱼',
        title: document.title,
        url: '',
        showShare: false,
        imageUrl: document.location.origin + require('../../images/logo.png'),
        dataList:[
          {img:require('./img/zhixiang1.jpg'),text: "中国民生银行"},
          {img:require('./img/zhixiang2.jpg'),text:"阿里云"},
          {img:require('./img/zhixiang3.jpg'),text:"易宝支付"},
          // {img:require('./img/zhixiang4.jpg'),text:"京东支付"},
          {img:require('./img/zhixiang5.jpg'),text:"汇添富基金"},
          {img:require('./img/zhixiang6.jpg'),text:"存证云"}
        ],
        token:''
      }
    },
    computed: {},
    watch: {},
    created() {
      this.token = this.$root.isAPP
    },
    mounted() {
      this.url = document.location.origin + window.location.hash
    },
    methods: {
      toApp(){
        if(this.$root.isAPP){
          // this.showShare = !this.showShare
          this.routerPush('/details/6')
        }else{
          location.href = this.downloadAPP 
        }  
      },
      shareToggleFun(){
        this.showShare = !this.showShare
      },
    }
  }
</script>
