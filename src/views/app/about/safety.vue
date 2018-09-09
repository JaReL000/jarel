<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  .safety
    overflow scroll
    -webkit-overflow-scrolling touch
    .safety-bg1
      height 381px
      background url('./img/app_bg19.png') no-repeat center
      background-size 100% 100%
    .safety-bg2
      padding 0 32px 100px
      .safety-top
        width 512px
        height 183px
        padding 48px 86px 57px 86px
        margin-top 46px
        box-shadow 0px 4px 20px 0px rgba(18, 117, 215, 0.12)
        text-align center
        h6
          font-size 30px
          color #333
        ul
          li
            width 33.333%
            margin-top 54px
            text-align center
            float left
            img
              width 49px
              height 49px
            p
              font-size 26px
              color #666
      .safety-content
        text-align center
        margin-top 80px
        h5
          font-size 40px
          img
            width 159px
            height 6px
            margin-bottom 8px;
          span
            font-size 40px
            color #1275d7
            margin 0 18px
        h6
          font-size 28px
          color #999
          margin-top 24px
        div
          div
            padding-bottom 70px
          p
            text-align center
            font-size 27px
            color #333
            line-height 44px
            span
              color #0c72e3

      // height 3916px
      // background url('./img/app_bg20_new.png') no-repeat center
      // background-size 100% 100%
    .seeQue
      display block
      text-align center
      margin-bottom 145px
      font-size 35px
      color #0562d6
</style>
<template>
  <div class="safety fixed">
    <!-- <head-top>安全保障</head-top> -->
    <section class="safety-bg1"></section>
    <section class="safety-bg2">
      <div class="safety-top">
        <h6>三大保障，不辜负每一份选择与信任</h6>
        <ul>
          <li>
            <img src="./img/safety3.jpg" alt="">
            <p>优质资产</p>
          </li>
          <li>
            <img src="./img/safety2.jpg" alt="">
            <p>资金保障</p>
          </li>
          <li>
            <img src="./img/safety1.jpg" alt="">
            <p>技术保障</p>
          </li>
        </ul>
      </div>
      <div class="safety-content">
          <h5><img src="./img/licai4.jpg" alt=""><span>优质资产</span><img src="./img/licai5.jpg" alt=""></h5>
          <h6>甄选金融机构稳健资产</h6>
          <div>
            <!-- <div><img src="./img/advantage4.jpg" alt=""></div> -->
            <p>鲸鱼甄选优质资产配置端</p>
            <p>平台所供资产均是来自</p>
            <!-- <p>如<span>汇添富、华信基金</span>等</p> -->
            <p>实力强劲、风控系统成熟的</p>
            <p>正规金融机构</p>
            <p>从源头上过滤风险</p>
            <p>保证资产的优质、稳健</p>
          </div>
        </div>
        <div class="safety-content">
          <h5><img src="./img/licai4.jpg" alt=""><span>资金保障</span><img src="./img/licai5.jpg" alt=""></h5>
          <h6>资金监管，交易透明</h6>
          <div>
            <div><img src="./img/advantage5.jpg" alt=""></div>
            <p>鲸鱼在民生银行开设专款账户</p>
            <p>用户资金通过易宝等等第三方支付通道</p>
            <p>进入民生银行专款账户</p>
            <p>再由民生银行专项代付</p>
            <p>配置到金融机构的优质理财项目中</p>
            <p>整个交易流程由</p>
            <p>金融风险防控预警平台“存证云”</p>
            <p>进行全程存证备案</p>
          </div>
        </div>
        <div class="safety-content">
          <h5><img src="./img/licai4.jpg" alt=""><span>技术保障</span><img src="./img/licai5.jpg" alt=""></h5>
          <h6>安全预警，数据防护</h6>
          <div>
            <div><img src="./img/advantage6.jpg" alt=""></div>
            <p>SSL证书加密传输数据确保网络传输安全</p>
            <p>账户登录／充值／提现异常操作预警</p>
            <p>多维度的隐私保护机制</p>
            <p>严格保护用户的隐私安全</p>
            <p>实名认证，同卡进出</p>
            <p>为您的账户资金安全加锁</p>
          </div>
        </div>
    </section>
    <a href="javascript:;" class="seeQue" @click="toQues">查看更多安全答疑 ></a>
  </div>
</template>

<script>
  import headTop from './components/headtop'
  export default {
    components: {headTop},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      toQues(){
        this.$router.push('/service/faq')
      }
    },
  }
</script>
