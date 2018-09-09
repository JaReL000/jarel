<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  .introduce
    overflow scroll
    -webkit-overflow-scrolling touch
    .introduce-bg1
      height 380px
      background url('./img/app_bg21.jpg') no-repeat center
      background-size 100% 100%
    .introduce-bg2
      padding 120px 52px 114px
      // height 2044px
      // background url('./img/app_bg22.jpg') no-repeat center
      // background-size 100% 100%
      .company-profile,
      // .our-proposition,
      .product-introduction,
        h6
          text-align center
          background url('./img/introduce1.jpg') no-repeat center/383px 31px
          font-size 40px
          color #1275d7
          padding-bottom 10px
        .line
          width 50px
          height 4px
          background-color #0c72e3
          margin 0 auto
        p
          padding 50px 0 100px
          line-height 44px
          font-size 28px
          color #666
      .our-proposition
        padding-bottom 120px
        h6
          background url('./img/introduce2.jpg') no-repeat center/371px 31px
        .jinr-our
          width 448px
          height 260px
          box-shadow 0px 4px 20px 0px  rgba(18, 117, 215, 0.12)
          text-align center
          margin 40px auto
          padding  36px 53px
          p
            padding 0
          img
            width 82px
            height 74px
          h5
            font-size 34px
            color #333
            padding-bottom 14px
      .product-introduction
        h6
          background url('./img/introduce3.jpg') no-repeat center/511px 31px
        p
          padding-bottom 0
    .introduce-a
      width 276px
      height 34px
      display block
      background url('./img/app_bg48.jpg') no-repeat center
      background-size 100% 100%
      margin-left 370px
    .introduce-bg3
      .company-history
        h6
          background url('./img/introduce4.jpg') no-repeat center/394px 31px
          text-align center
          font-size 40px
          color #1275d7
          padding-bottom 10px
        .line
          width 50px
          height 4px
          background-color #0c72e3
          margin 0 auto
        .warp
          background url('./img/line.jpg') repeat-y 115px 180px/1px 1px
          padding-left 50px
          padding-right 30px
          .year
            width 70px
            height 70px
            border 2px solid #3b96fb
            border-radius 50%
            position relative
            margin-left 30px
            background #fff
            z-index 1
            div
              width 58px
              height 58px
              border-radius 50%
              background #3b96fb
              font-size 20px
              color #fff
              text-align center
              line-height 58px
              position absolute
              top 50%
              left 50%
              transform translate(-50%,-50%)
          p
            text-align left
            position relative
            padding 50px 0
            margin-bottom 0
            span:nth-of-type(1)
              font-size 26px
              color #999
              margin-right  50px
              position absolute
              left -5px
            span:nth-of-type(2)
              position absolute
              top 3px
              left  25px
              width 20px
              height 20px
              border-radius 50%
              border 1px solid #3b96fb
              margin-left 28px
              margin-top 50px
            span:nth-of-type(2):after
              content ''
              display block
              width 14px
              height 14px
              background #3b96fb
              border-radius 50%
              position absolute
              top 50%
              left 50%
              transform translate(-50%,-50%)
            span:nth-of-type(3)
              display inline-block
              width 79%
              color #333
              font-size 26px
              margin-left 90px

    .introduce-bg4
      height 712px
      background url('./img/app_bg24.png') no-repeat center
      background-size 100% 100%
      overflow hidden
      box-sizing border-box
      padding-top 175px
      margin-top 114px;
      .introduce-bg4-div
        width 564px
        height 390px
        background  #fff
        margin 0 auto
        box-sizing border-box
        overflow hidden
        .introduce-bg4-div-wap
          width 540px
          height 407px
          margin 10px 0 0 12px
          .jinr-swiper-desc
            padding 0!important
            height 0px!important
    .introduce-bg5
      width 273px
      height 50px
      // background url('./img/app_bg49.jpg') no-repeat center
      // background-size 100% 100%
      margin 148px auto 66px auto
      .contact-us
        h6
          text-align center
          background url('./img/introduce5.jpg') no-repeat center/261px 31px
          font-size 40px
          color #1275d7
          padding-bottom 10px
        .line
          width 50px
          height 4px
          background-color #0c72e3
          margin 0 auto
    .introduce-img
      display block
      width 350px
      height 350px
      margin 0 auto
      margin-bottom 55px
    p
      text-align center
      font-size 27px
      color #666666
    p:nth-of-type(2)
      margin-bottom 75px
    button
      display block
      box-shadow 5px 10px 5px #e0ebf8
      width 691px
      height 100px
      background #2a8bf6
      border-radius 4px
      outline none
      border 0
      color #ffffff
      text-align center
      line-height 100px
      margin 0 auto
      margin-bottom 100px
      font-size 34px
</style>
<template>
    <div class="introduce fixed">
      <!-- <head-top>公司介绍</head-top> -->
      <section class="introduce-bg1"></section>
      <section class="introduce-bg2">
        <div class="company-profile">
          <h6>公司简介</h6>
          <div class="line"></div>
          <p>鲸鱼，创立于2013年。鲸鱼，以普惠金融为基础，以互联网为平台，致力于构建集理财、基金销售、保险、互联网银行等金融业务于一体的新金融生态链。公司总部位于厦门。注册资本1亿元人民币。</p>
        </div>
        <div class="our-proposition">
          <h6>鲸鱼主张</h6>
          <div class="line"></div>
            <div class="jinr-our" v-for="(obj,index) in dataList" :key='index'>
              <img :src="obj.img" alt="">
              <h5>{{obj.title}}</h5>
              <p>{{obj.text1}}</p>
              <p>{{obj.text2}}</p>
            </div>
        </div>
        <div class="product-introduction">
          <h6>产品介绍</h6>
          <div class="line"></div>
          <p>鲸鱼是鲸鱼倾力打造的理财APP。平台致力于通过创新的移动互联网科技和专业化的资产管理，为广大普通老百姓提供低门槛、稳健收益、安全可靠的财富增值服务。APP于2014年11月正式上线，累计注册用户350多万，累计交易金额180亿人民币。</p>
          <a class="introduce-a" href="javascript:;" @click="liaojieJinr"></a>
        </div>
      </section>

      <section class="introduce-bg3">
        <div class="company-history">
          <h6>公司历程</h6>
          <div class="line"></div>
          <div class="warp" v-for="(arrs, page) in thingList" :key='page'>
            <div class="year">
              <div>{{arrs.year}}</div>
            </div>
            <!-- <div class="line"></div> -->
            <p
              v-for="(arr, index) in arrs.date"
              :key='index'
            ><span >{{arr.month}}</span><span></span><span>{{arr.content}}</span></p>
            <ul>
              <li></li>
            </ul>

            <!-- </div> -->
            <!-- <div class="line"></div> -->
          </div>
        </div>
      </section>
      <section class="introduce-bg4">
        <div class="introduce-bg4-div">
          <div class="introduce-bg4-div-wap">
            <jinr-swiper
              :list="bannerList"
              dots-class="custom-bottom"
              dots-position="center"
            ></jinr-swiper>
          </div>
        </div>
      </section>
      <section class="introduce-bg5">
        <div class="contact-us">
          <h6>关于我们</h6>
          <div class="line"></div>
        </div>
      </section>
      <img class="introduce-img" src="./img/app_bg26.jpg">
      <p>识别以上二维码或搜索“鲸鱼”微信</p>
      <p>公众号就能找到我们</p>
      <button @click="toApp">立即分享</button>
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
  import headTop from './components/headtop'
  import share from 'components/share'
  export default {
    components: {headTop,share},
    data() {
      return {
        shareType: '1',
        time: "2017-11-28",
        text: '图说鲸鱼',
        title: document.title,
        // url: window.location.href,
        url: document.location.origin + "/app/4.0/index.html#/about/introduce",
        showShare: false,
        imageUrl: document.location.origin + require('../../../images/logo.png'),

        shareShowOrHide:false,
        bannerList:[
          {img:require('./img/app_bg62.png')},
          {img:require('./img/app_bg63.png')},
          {img:require('./img/app_bg64.png')},
          {img:require('./img/app_bg65.png')},
          {img:require('./img/app_bg66.png')}
        ],
        dataList:[
          {img:require('./img/introduce7.jpg'),title:"企业理念",text1: "时间投资哲学的践行者 用时间",text2:"智慧改变人民生活"},
          {img:require('./img/introduce8.jpg'),title:"企业使命",text1: "为最广大人民提供安全稳健的",text2:"理财服务"},
          {img:require('./img/introduce9.jpg'),title:"企业愿景",text1: "打造中国最具影响力的新金融",text2:"生态链"},
        ],
        thingList:[
          {
            year:'2013',
            date:[
              {month:"6月",content:"鲸鱼创立"}
            ]
          },
          {
            year:'2014',
            date:[
              {month:"9月",content:"鲸鱼网站正式上线"},
              {month:"11月",content:"鲸鱼APP正式亮相APP STORE及Android市场"}
            ]
          },
          {
            year:'2015',
            date:[
              {month:"1月",content:"鲸鱼注册用户超过26万交易总额突破1亿元"},
              {month:"10月",content:"单日交易金额突破9千万"}
            ]
          },
          {
            year:'2016',
            date:[
              {month:"4月",content:"接入存证云系统"},
              {month:"8月",content:"平台累计交易额突破100亿"},
              {month:"9月",content:"民生银行达成合作,签订代付协议"},
              {month:"12月",content:"荣获“中国卓越影响力·普惠金融服务机构”大奖"}
            ]
          },
          {
            year:'2017',
            date:[
              {month:"3月",content:"中央媒体记者团专访鲸鱼深入报道人民安全利率风险防控预警平台"},
              {month:"6月",content:"著名财经评论人叶檀走访鲸鱼"},
              {month:"7月",content:"荣获中国资产管理“金贝奖” ——最佳普惠金融创新服务平台"},
              {month:"8月",content:"鲸鱼获得ITRUST互联网信用评价中心授予的AA级信用认证"},
              {month:"8月",content:"战略携手北京大学著名经济学家曹和平教授 "}
              ]
            },
          ]
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      liaojieJinr(){
        this.$router.push('/picTell/jinrTreaty')
      },
      // showShare(){
      //   document.getElementsByClassName('introduce')[0].scrollTop=0
      //   this.changeShareFlag(true)
      // },
      changeShareFlag(val){
        this.shareShowOrHide=val
      },
      toApp(){
        if(this.$root.isAPP){
          this.showShare = !this.showShare
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
