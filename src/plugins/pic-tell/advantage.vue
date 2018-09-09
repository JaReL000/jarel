<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  .jinrAdvantage
    box-sizing border-box
    padding-bottom 20px
    .jinrAdvantage-bg1
      height 380px
      background url('./img/app_bg33.jpg') no-repeat center
      background-size 100% 100%
      overflow hidden
      div
        width 43px
        height 41px
        background url('./img/app_bg12.png') no-repeat 100px 37px
        background-size 40px 40px
        float right
        padding 22px 37px 100px 100px
    .jinrAdvantage-bg2
      // height 6389px
      margin-bottom 100px
      div
        background-repeat no-repeat
        background-position center center
      &>div:nth-of-type(1),
      &>div:nth-of-type(2),
      &>div:nth-of-type(3)
        h5
          margin-top 68px
          text-align center
          img
            width 159px
            height 6px
            margin-bottom 8px;
          span
            font-size 40px
            color #1275d7
            margin 0 33px;
        h6
          text-align center
          margin 24px 0 41px
          span
            font-size 28px
            color #999
            margin-right  21px
        .jinrAdvantage-slogn
          width 660px
          height 100px
          box-shadow 0px 2px 16px 0px rgba(18, 117, 215, 0.16)
          margin 0 auto 47px
          font-size 30px
          text-align center
          line-height 100px
          color #333
        .jinrAdvantage-pic1
          width 538px
          height 620px
          margin  0 auto
          img
            width 100%
        .jinrAdvantage-txt
          width 667px
          height 392px
          margin 0 auto
          font-size 28px
          line-height 41px
          letter-spacing 2px
          p
            color #333
            margin-bottom 49px
            span
              color #0c72e3
        .jinrAdvantage-txt2
          height 137px
      &>div:nth-of-type(2),
      &>div:nth-of-type(3)
        h6
          font-size 28px;
          color #999
        .jinrAdvantage-pic2
          width 610px
          height 427px
          margin 0 auto
          img
            width 100%
        .jinrAdvantage-pic3
          width 520px
          height 356px
          margin 0 auto
          img
            width 100%
        .jinrAdvantage-txt
          margin-top 65px
      &>div:nth-of-type(3)
        .jinrAdvantage-safe
          padding 0 42px
          margin-bottom 88px
          h6
            font-size 40px
            color #1275d7
            text-align left
          p
            font-size 28px
            color #999
          div
            width 572px
            height 283px
            margin 84px auto 79px
            img
              width 100%
          .jinrAdvantage-pic4
            width 686px
            height 701px
            margin: 0 auto 60px;
          .jinrAdvantage-pic5
            width 686px
            height 373px
          .jinrAdvantage-content
            font-size 27px
            color #333333
            span
              color #0c72e3
      // background-image url('./img/advantage003.png')
      // &>div:nth-of-type(4)
      //   height 1126px
      //   background-size 750px 1126px
      //   // background-image url('./img/advantage004.png')
      // &>div:nth-of-type(5)
      //   height 1131px
      //   background-size 750px 1131px
      //   // background-image url('./img/advantage005.png')
      // &>div:nth-of-type(6)
      //   height 817px
      //   background-size 750px 817px
      //   // background-image url('./img/advantage006.png')
</style>
<template>
<div class="scroll-over fixed fixed-x" :class="{'x-header-potop': $root.showHeader}" ref="picTellBox">
  <!-- <scroll class="toplist fixed" ref="toplist"> -->
    <div class="jinrAdvantage"  ref="picTellCont">
      <section class="jinrAdvantage-bg1">
        <div @click='shareToggleFun' v-if='token'></div>
      </section>
      <section class="jinrAdvantage-bg2">
        <div>
          <h5><img src="./img/licai4.jpg" alt=""><span>低门槛</span><img src="./img/licai5.jpg" alt=""></h5>
          <h6><span>一元起投</span><span>随存随取</span></h6>
          <div class="jinrAdvantage-slogn">优质的理财服务不该只是富人的特权</div>
          <div class="jinrAdvantage-pic1"><img src="./img/advantage1.jpg" alt=""></div>
          <div class="jinrAdvantage-txt">
            <p>从信用等级、风控能力、收益回报多方面考虑，银行、证券等大型金融机构无疑是资产配置的优质选择，但机构理财起投门槛动辄十万百万，这决定了仅仅只有<span>20%的富人</span>可以享受此类优质理财服务，<span>80%的普通老百姓</span>被拒之门外。</p>
            <p>鲸鱼的产品本质就是通过互联网技术手段和创新型服务模式，<span>让80%的普通老百姓也能平等享受信用等级高、风控能力强、收益回报多的“优质机构理财服务”。</span></p>
          </div>
        </div>
        <div>
          <h5><img src="./img/licai4.jpg" alt=""><span>稳收益</span><img src="./img/licai5.jpg" alt=""></h5>
          <h6>预期年化收益5%起 每日结息</h6>
          <div class="jinrAdvantage-slogn">收益稳健，才能睡得更安稳</div>
          <div class="jinrAdvantage-pic2"><img src="./img/advantage2.jpg" alt=""></div>
          <div class="jinrAdvantage-txt">
            <p>大部分普通投资者不是冒险家，他们的投资偏好是厌恶风险的。相比高利率高风险的理财产品，他们更希望持有低风险、合理利率的稳健产品。</p>
            <p>鲸鱼整合基金、债权、保险等金融机构的优质资产，利用互联网科技，降低机构理财的高门槛，打破传统金融行业壁垒，让普通老百姓享受到更合理的稳健理财收益。</p>
          </div>
          <div class="jinrAdvantage-pic3">
            <img src="./img/advantage3.jpg" alt="">
          </div>
           <div class="jinrAdvantage-txt jinrAdvantage-txt2"><p>比银行、货币基金收益高，比股票收益稳健，<span>闲钱不闲置，安稳赚收益。</span></p></div>
        </div>
        <div>
          <h5><img src="./img/licai4.jpg" alt=""><span>安全可靠</span><img src="./img/licai5.jpg" alt=""></h5>
          <h6>安全运营3年 100%本息兑付</h6>
          <div class="jinrAdvantage-slogn">三大保障，不辜负每一份信任与选择</div>
          <div class="jinrAdvantage-safe">
            <h6>（一）优质资产</h6>
            <p>甄选金融机构稳健资产</p>
            <!-- <div><img src="./img/advantage4.jpg" alt=""></div> -->
            <!-- <p class="jinrAdvantage-content">鲸鱼理财甄选优质资产配置端，平台所供资产均是来自如<span>汇添富、华信基金</span>等实力强劲、风控系统成熟的，正规金融机构，从源头上过滤风险，保证资产的优质、稳健。</p> -->
            <p class="jinrAdvantage-content">鲸鱼甄选优质资产配置端，平台所供资产均是来自实力强劲、风控系统成熟的，正规金融机构，从源头上过滤风险，保证资产的优质、稳健。</p>
          </div>
          <div class="jinrAdvantage-safe">
            <h6>（二）资金保障</h6>
            <p>资金监管，交易透明</p>
            <div class="jinrAdvantage-pic4"><img src="./img/advantage5.jpg" alt=""></div>
            <p class="jinrAdvantage-content">鲸鱼在民生银行开设专项账户，用户投资资金通过易宝等第三方支付通道进入民生银行专项账户，再由民生银行专款代付到指定项目中，整个交易流程由金融风险防控预警平台“存证云”进行全程存证备案。</p>
          </div>
          <div class="jinrAdvantage-safe">
            <h6>（三）技术保障</h6>
            <p>安全预警，数据防护</p>
            <div class="jinrAdvantage-pic5"><img src="./img/advantage6.jpg" alt=""></div>
            <p class="jinrAdvantage-content">SSL证书加密传输数据，确保网络传输安全；账户登录/充值/提现异常操作预警，24小时严防盗刷；多维度的隐私保护机制，严格保护用户的隐私安全；实名认证，同卡进出，为您的账户资金安全加锁。</p>
          </div>
        </div>
      </section>
      <!-- <div class="next-go" @click="routerReplace('/picTell/jinrWelfare')"></div> -->
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
        this.routerReplace('/picTell/jinrWelfare')
      }
    }
  }
</script>
