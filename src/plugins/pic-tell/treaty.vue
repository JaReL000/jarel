<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  .jinrTreaty
    box-sizing border-box
    padding-bottom 20px
    .jinrTreaty-bg1
      height 380px
      background url('./img/app_bg61.jpg') no-repeat center
      background-size 100% 100%
      overflow hidden
      div
        width 43px
        height 41px
        background url('./img/app_bg12.png') no-repeat 100px 37px
        background-size 40px 40px
        float right
        padding 22px 37px 100px 100px
    .jinrTreaty-bg2
      width 707px
      height 288px
      // background url('./img/app_bg60.jpg') no-repeat center
      box-shadow: 0px 0px 16px 0px rgba(18, 117, 215, 0.16)
      background-size 100% 100%
      margin 0 auto
      margin-top 19px
      padding-top 57px
      box-sizing border-box
      p
        color #333333
        font-size 32px
        text-align center
        margin-bottom 30px
    .jinrTreaty-bg3
      margin-top 5px
      background-size 100% 100%
      ul
        width 681px
        height 275px
        list-style none
        margin 28px auto
        li
          width 227px
          height 275px
          float left
          text-align center
          div
            width 108px
            height 108px
            border-radius 50%
            box-shadow 0px 2px 16px 0px rgba(18, 117, 215, 0.16)
            text-align center
            line-height 108px
            margin  44px auto 26px
            img
              width 53px
              height 53px
              vertical-align middle
          p
            font-size 28px
            color #666
    .jinrTreaty-bg4
      padding 0 30px 0 36px
      h1
        text-align center
        img
          width 159px
          height 6px
          margin-bottom 8px;
        span
          font-size 40px
          color #1275d7
          margin 0 20px
      h6
        font-size 28px
        color #999
        margin-top 25px
        text-align center
      p
        font-size 28px
        color #333
        letter-spacing 2px
        margin-top 67px
      div
        width 510px
        height 312px
        text-align center
        background-color #ffffff
        box-shadow 0px 2px 16px 0px rgba(18, 117, 215, 0.16)
        padding 45px 87px 34px
        margin-top 70px
        p
          margin-top 55px
          letter-spacing 0px
          span
            color #0c72e3
        img
          width 189px
          height 193px
      .jinrTreaty-two
        height 327px
        padding 30px 87px 34px
        img
          width 75px
          height 207px
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
<div class="scroll-over fixed fixed-x" :class="{'x-header-potop': $root.showHeader}" ref="picTellBox">
  <!-- <div class="gc-test">
    {{scroll}}-{{target}}/{{istouch}}
  </div> -->
  <!-- <scroll class="toplist fixed" ref="toplist"> -->
    <div class="jinrTreaty"  ref="picTellCont">
      <section class="jinrTreaty-bg1" >
        <div @click='shareToggleFun' v-if="token"></div>
      </section>
      <!-- <section class="jinrTreaty-bg2">
        <p><span style="color:#0361c1;">{{data.register_num}}</span>理财用户信任之选</p>
        <p>安全运营<span style="color:#0361c1;">{{data.run_day}}</span>天</p>
        <p> 累计为用户赚取<span style="color:#0361c1;">{{data.total_yield}}</span>元收益</p>
      </section> -->
      <section class="jinrTreaty-bg3 clearfix">
        <ul class="clearfix">
          <li v-for="(obj,index) in dataList" :key='index'>
            <div><img :src="obj.img" alt=""></div>
            <p>{{obj.text}}</p>
          </li>
        </ul>
      </section>
      <section class="jinrTreaty-bg4">
        <h1><img src="./img/licai4.jpg" alt=""><span>鲸鱼是什么</span><img src="./img/licai5.jpg" alt=""></h1>
        <h6>国内领先的理财移动平台</h6>
        <p>鲸鱼致力于通过创新的移动互联网科技和专业化的资产管理，为广大低风险投资爱好者提供低门槛、稳收益、安全可靠的财富增值服务</p>
        <div>
          <img src="./img/licai6.jpg" alt="">
          <p>2016年荣获<span>“中国卓越金融奖”</span> —“年度卓越影响力普惠金融服务机构”</p>
        </div>
        <div class="jinrTreaty-two">
          <img src="./img/licai7.jpg" alt="">
          <p>2017年荣获 <span>“中国资产管理·金贝奖”</span> —“最佳普惠金融创新服务平台”</p>
        </div>
      </section>
      <!-- <div class="next-go" @click="routerReplace('/picTell/jinrAdvantage')"></div> -->
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
import mix from './mixin.js'
export default {
  components: {share},
  data() {
    return {
      shareType: '1',
      time: "2017-11-28",
      text: '图说鲸鱼',
      title: document.title,
      url: document.location.origin + "/#/picTell/jinrTreaty",
      showShare: false,
      imageUrl: document.location.origin + require('../../images/logo.png'),
      dataList:[
          {img:require('./img/licai1.jpg'), text: "低门槛"},
          {img:require('./img/licai2.jpg'),text:"稳收益"},
          {img:require('./img/licai3.jpg'),text:"安全可靠"},
        ],
      register_num:'',
      invest_money:'',
      yield_money:'',
      data: {},
      token:'',
      touchStartY: '',
      touchEndY:'',
      isGoBottom: false
    }
  },
  computed: {},
  watch: {},
  mixins: [mix],
  created() {
    this.token = this.$root.isAPP
    if(this.$root.isAPP || sessionStorage.getItem('token')){
      // this.getPlatData()
    } else {
      // this.initFun()
    }
  },
  mounted() {
  },
  methods: {
    // APP请求方式
    getPlatData(){
      this.$http({
        method: 'system.stats'
      }).then((res)=>{
        this.data = res
      })
    },

    // M站请求方式
    initFun(){
      this.$http({
        servicename: 'Statistics.index',
      }).then((response) => {
          this.data = response
      }).catch(err => {
        this.$flash(err)
      });
    },

    shareToggleFun(){
      this.showShare = !this.showShare
    },
    nextPage(){
      this.routerReplace('/picTell/jinrAdvantage')
    }
  },
}
</script>
