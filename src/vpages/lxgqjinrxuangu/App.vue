<template>
  <div class="index">
    <div class="index-one">
      <a :href="xuanguDownloadApp" id="index_one_download">
        <img src="./images/download.png" alt="">
      </a>
      <div class="news">
        <img src="./images/horn.png" alt="">
        <ul>
          <li v-for="(item,index) in newsList" :key="index" v-text="item.txt"></li>
        </ul>
        <ul>
          <li v-for="(item,index) in newsList" :key="index" v-text="item.txt"></li>
        </ul>
      </div>
      <!-- 倒计时 -->
      <div class="count-down">
        <span v-text="publicData.hour">23</span>
        <label>:</label>
        <span v-text="publicData.min">59</span>
        <label>:</label>
        <span v-text="publicData.sec">59</span>
        <label>:</label>
        <span v-text="publicData.millisecond">9</span>
      </div>
      <!-- <div v-else>活动已结束</div> -->
      <!-- 领取人数 -->
      <div class="receive-count">
        <span v-text="receiveCount"></span>人已经领取
      </div>
    </div>
    <div class="index-two">
      <h3>当前牛股收益排行榜</h3>
      <img src="./images/top5.png" alt="">
      <ul>
        <li v-for="(shares,index) in sharesList" :key= index>
          <div class="left">
            <img src="./images/1.png" alt="">
            <span>累计收益</span>
            <p>
              +<span v-text="shares.rate">156.31</span>%
            </p>
          </div>
          <div class="rihgt">
            <h6 v-text="shares.title">【个股推荐】《红日战法之一代妖股的即将崛起》</h6>
            <p v-text="shares.department">技术股研究</p>
            <p v-text="shares.time">2018-04-19 14:50</p>
            <a :href="xuanguDownloadApp" :id="index">领取牛股</a>
          </div>
        </li>
      </ul>
      <div class="point">
        <span>持牌机构</span>
        <span>专家投顾</span>
        <span>策略研报</span>
        <span>买卖无忧</span>
        <p>股市有风险 投资需谨慎</p>
      </div>
    </div>
    <div class="index-three">
      <p>如有疑问，请关注 <span>鲸鱼选股（微信号：jyxuangu）</span>咨询</p>
      <div>
        <a :href="xuanguDownloadApp" id="two_botton">马上领取6月强势牛股</a>
      </div>
    </div>
  </div>
</template>

<script>
  import xHeader from '@/views/app/components/x-header/index'
  export default {
    name: 'carrousel',
    components: {
      xHeader,
    },
    data() {
      return {
        newsList:[//轮播新闻
          {txt:"恭喜138****6582的股友成功领取10倍牛股"},
          {txt:"恭喜135****4582的股友成功领取10倍牛股"},
          {txt:"恭喜150****8567的股友成功领取10倍牛股"},
          {txt:"恭喜151****1575的股友成功领取10倍牛股"},
          {txt:"恭喜136****5486的股友成功领取10倍牛股"}
        ],
        receiveCount:'2059',//领取人数
        sharesList:[
          {rate:"156.31",title:"【个股推荐】《红日战法之一代妖股的即将崛起》",department:"技术股研究",time:"2018-04-19 14:50"},
          {rate:"24.90",title:"【个股推荐】当风轻借力，一样入高空",department:"题材股研究",time:"2018-05-07 17:07"},
          {rate:"19.80",title:"【个股推荐】电商后起之秀，他的线上平台注册用户已有3.45亿",department:"成长股研究",time:"2018-04-28 13:23"},
          {rate:"11.55",title:"【个股推荐】降维布局加速，线下是核心，零售云再造奇迹",department:"技术股研究",time:"2018-05-15 16:28"},
          {rate:"11.26",title:"【个股推荐】他与电商巨头合作，新零售转型一步到位",department:"成长股研究",time:"2018-05-14 16:12"},
        ],//推荐股票列表
        xuanguDownloadApp:"http://a.app.qq.com/o/simple.jsp?pkgname=com.goldfish.stocks",
        publicData: {//倒计时
          deadTime: 0,
          day: null,
          hour: null,
          min: null,
          sec: null,
          millisecond:null
        },
        deadShow:true
      }
    },
    computed: {
    },
    created(){
      this.deadTime()
    },
    mounted() {},
    methods: {
            //倒计时
      deadTime(){ 
        let time
        let count = 0
        clearInterval(time)
        time = setInterval(()=>{
          var nowTime = Date.now()
          var nowMon = new Date().getMonth()
          var nowDate = new Date().getDate()
          var zeroTime = new Date(2018,nowMon,nowDate,24).getTime()
          this.publicData.deadTime= Math.floor((zeroTime - nowTime)/1000)
          this.publicData.day = parseInt(this.publicData.deadTime/(60*60*24));
          this.publicData.hour = parseInt(this.publicData.deadTime/(60*60)%24);
          this.publicData.min = parseInt(this.publicData.deadTime/60%60);
          this.publicData.sec = parseInt(this.publicData.deadTime%60);
          this.publicData.millisecond = parseInt(((zeroTime - nowTime)/100)%10);
          count++
          if(count==300||count%300==0){
            this.receiveCount++
            if(this.receiveCount>=5000){
              this.receiveCount = 5000
            }
          }
          if(this.publicData.deadTime===-1){
            clearInterval(time)
          }
          if(zeroTime<=0){
            this.publicData.day = 0;
            this.publicData.hour = 0;
            this.publicData.min = 0;
            this.publicData.sec = 0;
            this.publicData.millisecond = 0;
          }
        },100)
      }, 
      totalFun(){
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?67bbf8d2f1cf6b718c4e4a18eecd79e4";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
body,
html 
  height 100%
  width 100%
  overflow-x hidden
  background #f8f8f8
  -webkit-overflow-scrolling touch  
  .index
    width 100%
    height 100%
    overflow-x hidden
    background #f8f8f8
    position relative
    .index-one
      width 100%
      height 947px
      background url("./images/index.png") no-repeat center 80px/100% 947px
      position relative
      box-sizing border-box
      a
        display block
        img 
          width 100%
        .index-one-now
          width 100%
          height 93px
          background url("./images/download.png") no-repeat center/980px 93px
          position fixed
          top 0
          left 0
          z-index 1
      .news
        width 549px
        height 44px
        background rgba(42, 42, 42, 0.45)
        border solid 1px rgba(255, 255, 255, 0.45)
        border-radius 22px
        overflow hidden
        position absolute
        bottom 200px
        right 8px
        line-height 44px
        padding 0 26px 0 16px
        box-sizing border-box
        >img 
          width 34px
          height 30px
          vertical-align middle
          float left
          margin-right 12px
          margin-top 6px
        ul
          overflow hidden
          animation move 10s linear infinite 2s
          li
            float right 
            font-size 24px
            color #fff
            line-height 44px
      .count-down
        position absolute
        right 28px
        bottom 0px
        font-size 30px
        color #fff
        >span 
          width 42px
          height 48px
          border-radius 4px
          background #5c3410
          position absolute
          bottom 0px
          right 146px
          display inline-block
          text-align center
          line-height 48px
        >label 
          position absolute
          bottom 10px
          right 138px
          font-size 30px
          color #5c3410
        >label:nth-of-type(2)
          right 88px
        >label:nth-of-type(3)
          right 38px
        >span:nth-of-type(2)
          right 96px
        >span:nth-of-type(3)
          right 46px
        >span:nth-of-type(4)
          right -3px
      .receive-count
        position absolute
        bottom 0px
        // left 239px
        font-size 30px
        color #fff
        left 46%
        transform translateX(-50%)
    .index-two
      width 100%
      height 1220px
      margin-top 13px
      background #fff
      padding 45px 59px 26px
      box-sizing border-box
      margin-bottom 170px
      h3
        text-align center
        font-size 48px
        color #f61d4b
        font-weight 600
      ul
        li
          height 142px
          border-bottom 1px solid #bfbfbf
          padding-bottom 19px
          box-sizing border-box
          overflow hidden
          margin-top 32px
          .left
            width 226px
            padding-bottom 35px
            box-sizing border-box
            float left
            >img 
              width 21px
              height 21px
              vertical-align middle
            >span 
              font-size 18px
              color #979eaf
            >p
              font-size 37px
              color #f84f4f
              font-weight 600
              >span
                font-size 82px
                font-family "DINENGSCHRIFTSTD"
          .rihgt
            width 59%
            float right
            margin-left 27px
            position relative
            >h6
              font-size 22px
              color #2e303a
              font-weight 600
              margin-bottom 12px
            >p
              font-size 18px
              color #979eaf 
              line-height 26px
            >a
              display block
              width 168px
              height 46px
              background #3a83ff
              border-radius 12px
              position absolute
              right 0
              top 68px
              font-size 24px
              line-height 46px
              text-align center
              color #fff
      .point  
        margin-top 44px
        text-align center
        >span 
          display inline-block
          width 152px
          height 34px
          background #f4512f
          font-size 22px
          color #fff
          line-height 34px
          text-align center
          border-radius 17px
        >p
          font-size 18px
          color rgba(12, 12, 12, 0.6)
          margin-top 29px
  .index-three
    position fixed
    bottom 0
    right 0
    left 0
    padding 21px 0 26px
    text-align center
    z-index 100
    background #f8f8f8
    >p
      font-size 24px
      color #303030
      >span
        color #fa200d
    div
      margin-top 17px
      animation bigge 0.5s linear infinite 1s
      a
        display block
        width 624px
        height 90px
        margin 0 auto 
        border-radius 45px
        box-shadow 0px 10px 22px 1px rgba(193, 7, 46, 0.4)
        background-image linear-gradient(189deg, #f94313 0%, #f11745 100%)
        font-size 30px
        font-weight 600
        line-height 90px
        letter-spacing 6px
        color #ffffff
html body {
  max-width: 980px;
  margin: 0 auto;
}
@font-face {
	font-family: 'DINENGSCHRIFTSTD';
    src: url('./font/DINENGSCHRIFTSTD.eot'); /* IE9 Compat Modes */
    src: url('./font/DINENGSCHRIFTSTD.woff2'), /* IE6-IE8 */
         url('./font/DINENGSCHRIFTSTD.woff') format('woff'), /* Modern Browsers */
         url('./font/DINENGSCHRIFTSTD.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('./font/DINENGSCHRIFTSTD.svg') format('svg'); /* Legacy iOS */
}
@-webkit-keyframes move
  form
    transform translateY(0)
  to
    transform translateY(-100%)
    
@-webkit-keyframes bigge
  0%
    transform scale(1)
  50%
    transform scale(1.1)
  100%
    transform scale(1)  
    
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .index{
    -webkit-overflow-scrolling: none !important;//iphoneX滑动卡顿处理 
    }
  }
</style>