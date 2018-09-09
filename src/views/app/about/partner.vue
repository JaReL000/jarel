<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  .partner
    overflow scroll 
    -webkit-overflow-scrolling touch
    .partner-bg1
      ul
        li
          // height 198px
          border-top 1px solid #e5e5e5
          padding 50px 50px 100px
          text-align left 
          img 
            width 130px
            height 130px 
            margin-top 80px
            // margin-right 28px
          .partner-content
            width 60%
            // padding-left 28px
            float right 
            h6
              font-size 32px
              color #333
            p
              font-size 24px
              line-height 38px
              margin-top 20px
              color #777
  .clearfix 
      *zoom 1
  .clearfix:before,
  .clearfix:after 
      display  table
      line-height  0
      content  ""
  .clearfix after 
      clear  both         
            
    //   background url('./img/app_bg27.jpg') no-repeat center
    //   background-size 100% 100%
    // .partner-bg2
    //   height 292px
    //   background url('./img/app_bg28.jpg') no-repeat center
    //   background-size 100% 100%
    // .partner-bg3
    //   height 296px
    //   background url('./img/app_bg29.jpg') no-repeat center
    //   background-size 100% 100%
    // .partner-bg4
    //   height 326px
    //   background url('./img/app_bg50.jpg') no-repeat center
    //   background-size 100% 100%
    // .partner-bg5
    //   height 332px
    //   background url('./img/app_bg30.jpg') no-repeat center
    //   background-size 100% 100%
    // .partner-bg6
    //   height 336px
    //   background url('./img/app_bg31.jpg') no-repeat center
    //   background-size 100% 100%
</style>
<template>
    <div class="partner fixed fixed-x">
      <!-- <head-top>合作伙伴</head-top> -->
      <section class='partner-bg1'>
        <ul>
          <li v-for="(obj,index) in dataList" :key='index' class="clearfix">
            <img :src="obj.img" alt="">
            <div class="partner-content clearfix">
               <h6>{{obj.title}}</h6>
                <p>{{obj.text}}</p>
            </div>
          </li>
        </ul>
      </section>
      <section class='partner-bg2'></section>
      <section class='partner-bg3'></section>
      <section class='partner-bg4'></section>
      <section class='partner-bg5'></section>
      <section class='partner-bg6'></section>
    </div>
</template>

<script>
  import headTop from './components/headtop'
  export default {
    components: {headTop},
    data() {
      return {
        dataList:[
          {img:require('./img/partner1.jpg'),title:"中国民生银行",text: "中国民生银行股份公司是中国大陆第一家由民间资本设立的全国性商业银行，成立于1996年1月12日。2016年9月鲸鱼与中国民生银行签订代付协议，确保用户资金更安全。"},
          {img:require('./img/partner2.jpg'),title:"存证云",text: "存证云，国内领先的电子证据综合服务平台,由厦门市美亚柏科信息股份有限公司开发。2016年8月鲸鱼与存证云达成合作，为鲸鱼用户的交易提供交易提供全程监控及司法鉴定凭证。"},
          {img:require('./img/partner3.jpg'),title:"阿里云",text: "阿里云，阿里巴巴集团旗下云计算品牌，全球卓越的云计算技术和服务提供商。阿里云为鲸鱼提供了DDoS高防IP、安骑士、加密服务等技术保障，保证了系统稳定性和数据安全性。"},
          {img:require('./img/partner4.jpg'),title:"易宝支付",text: "易宝支付是中国支付行业的开创者和领导者，也是互联网金融（ITFIN）和移动互联领军企业。用户在鲸鱼平台的资金交易通过易宝支付等第三方支付通道进入民生银行专项账户，交易更透明。"},
          // {img:require('./img/partner5.jpg'),title:"京东支付",text: "京东支付是京东金融针对移动互联网市场推出的兼容PC、无线端主流环境的跨平台安全便捷的支付产品。用户在鲸鱼平台的资金交易通过易宝支付、京东支付等第三方支付通道进入民生银行专项账户，交易更透明。"},
          {img:require('./img/partner6.jpg'),title:"沃通电子认证服务",text: "沃通电子商务服务有限公司是一家由留学美国和英国的留学归国人员创办的高科技企业，创立于 2002 年 3 月。沃通为鲸鱼平台提供了SSL证书服务，采用128加密技术传输数据，确保网络传输安全性。"}
        ],
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  }
</script>
