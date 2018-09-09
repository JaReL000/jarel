<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  .jinrWelfare
    box-sizing border-box
    padding-bottom 20px
    .jinrWelfare-bg1
      height 380px
      background url('./img/app_bg67.jpg') no-repeat center
      background-size 100% 100%
      overflow hidden
      div
        width 43px
        height 41px
        background url('./img/app_bg12.png') no-repeat 100px 37px
        background-size 40px 40px
        float right
        padding 22px 37px 100px 100px 
    .jinrWelfare-bg2
      ul
        padding 40px 
        li  
          // width: 670px
          height 379px
          box-shadow 0px 2px 16px 0px rgba(18, 117, 215, 0.16)
          padding 30px 
          text-align center
          line-height 34px
          margin-bottom 41px
          img 
            width 607px
            height 310px
          p
            font-size 24px
            color #333
            margin-top 33px

          // li:last-child
          //   margin-bottom 100px

</style>
<template>
<div class="scroll-over fixed fixed-x" :class="{'x-header-potop': $root.showHeader}" ref="picTellBox">
  <!-- <scroll :data="dataList"  class="toplist fixed" ref="toplist"> -->
    <div class="jinrWelfare" ref="picTellCont">
      <section class="jinrWelfare-bg1">
        <div @click='shareToggleFun' v-if="token"></div>
      </section>
      <section class="jinrWelfare-bg2">
        <ul>
          <li v-for="(obj,index) in dataList" :key='index'>
              <img :src="obj.img">
              <p>{{obj.text}}</p>            
          </li>
        </ul>
      </section>
      <!-- <div class="next-go" @click="routerReplace('/picTell/jinrTarget')"></div> -->
      <div class="next-go"></div>
      
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
  import mix from './mixin'
  export default {
    components: {share},
    mixins: [mix],
    data() {
      return {
        shareType: '1',
        time: "2017-11-28",
        text: '图说鲸鱼',
        title: document.title,
        url: "",
        showShare: false,
        imageUrl: document.location.origin + require('../../images/logo.png'),

        dataList:[
          {img: require('./img/gongyi1.jpg'), text: "2017鲸鱼携手湖北经视送农民工回家"},
          {img:require('./img/gongyi2.jpg'),text:"鲸鱼携手厦门何厝边防派出所开展反诈骗宣传活动"},
          {img:require('./img/gongyi3.jpg'),text:"“欢聚抗战胜利70周年——福建抗战老兵见面会”"},
          {img:require('./img/gongyi4.jpg'),text:"“情系重阳，鲸鱼在行动”"},
          {img:require('./img/gongyi5.jpg'),text:"向阳花青少年助梦计划"}
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
      shareToggleFun(){
        this.showShare = !this.showShare
      },
      nextPage(){
        this.routerReplace('/picTell/jinrTarget')
      }
    },
  }
</script>
