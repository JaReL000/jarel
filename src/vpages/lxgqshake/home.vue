<template>
  <div class="shake">
    <div class="shake-one" v-show="frist_page">
      <div class="shake-one-img">
        <img src="./images/up_down.png" alt="">
        <p>摇一摇抽红包</p>
      </div>
      <div class="shake-open_logo">
        <img src="./images/start_logo.png" alt="">
        <!-- <p>-理财就上鲸鱼APP-</p> -->
      </div>
    </div>
    <div class="shake-two" v-show="up_down">
      <div class="shake-two-content">
        <img src="./images/up.png" alt="">
        <div>
          <img src="./images/open_logo.png" alt="" class="shake-two_middle_logo">          
        </div>
        <img src="./images/down.png" alt="">
      </div>
      <div class="shake-two_bottom_logo">
        <img src="./images/start_logo.png" alt="">
      </div>
    </div>
    <audio src="./audio/all.mp3" id="audio"></audio>
    <audio src="./audio/result.wav"></audio> 
  </div>
</template>

<script>
  import xHeader from '@/views/app/components/x-header/index'
  import sdk from 'weixin-js-sdk'
  import fetchWXconfig from 'utils/fetchWXconfig'  
  import * as jrUrl from './urlconfig/urlconfig'
  // var Shake = require('shake.js');
  var Shake = require('./shake/shake.js')
  export default {
    name: 'carrousel',
    components: {
      xHeader,
      // hbInfo
    },
    data() {
      return {
        frist_page:true,//摇一摇第一页
        up_down:false,//摇一摇第二页
      }
    },
    computed: {
      
    },
    created(){
      /** 屏蔽分享 */
			function onBridgeReady() {
				WeixinJSBridge.call('hideOptionMenu');
			}
			if (typeof WeixinJSBridge == "undefined") {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			}
			} else {
			 onBridgeReady();
      }
    },
    mounted(){
      this.init()
      },
      methods: {
        //shake.js初始化(摇一摇插件)
        init(){
        var that = this
        var myShakeEvent = new Shake({
        threshold: 5, // 摇动阈值
        timeout: 500 // 事件发生频率，是可选值
        });
        myShakeEvent.start();
        window.addEventListener('shake', shakeEventDidOccur, false);
          function shakeEventDidOccur () {//回调函数
          that.frist_page = false
          that.up_down = true
          that._autoPlayVideo()
          setTimeout(() => {
            that.frist_page = false
            that.up_down = false
            that.$router.push({path: '/hbInfo'});
            myShakeEvent.stop()
            }, 2200);
          }
        },
        //控制音频自动播放
        _autoPlayVideo(){
          var autoplayVideo=document.getElementById("audio");
              autoplayVideo.play()
            sdk.config({
                debug:false,
                appId:"",
                timestamp:1,
                nonceStr:"",
                signature:"",
                jsApiList:[]
            });
            sdk.ready(function(){
                var autoplayVideo=document.getElementById("audio");
                autoplayVideo.play()
            })
        },

      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  html,
  body
    height 100%
    width 100%
    .shake
      width 100%
      height 100%
      background #c83737
      .shake-one
        width 100%
        height 100%
        background #c83737
        .shake-one-img
          text-align center
          position relative
          top 50%
          transform translateY(-50%)
          img 
            width 270px
            height 270px
          p
            font-size 46px
            color #dcdcdc
            line-height 60px
        .shake-open_logo
          text-align center 
          position absolute
          bottom 67px
          left 50%
          transform translateX(-50%)
          img 
            width 203px
            height 67px
          p
            font-size 22px
            color #881f27
      .shake-two
        width 100%
        height 100%
        overflow hidden
        background #c83737
        .shake-two-content
          position absolute
          top -100px
          img 
            width 100%
            height 602px
            vertical-align middle
            // z-index -1
            // position absolute
            // top 49%
            // left 50%
            // transform translateX(-50%)
          img:nth-of-type(1)
            width 100%
            height 602px
            vertical-align middle
            animation down_up 2s linear infinite 0.1s
            position relative
            z-index 2
          img:nth-of-type(2)
            animation up_down 2s linear infinite 0.1s
          div
            width 100%
            height 269px
            background #393333
            text-align center 
            line-height 269px
            .shake-two_middle_logo 
              width 203px
              height 67px
              vertical-align middle
              position relative
              z-index 0
        .shake-two_bottom_logo
          img 
            width 242px
            height 77px
            position absolute
            bottom 67px
            left 50%
            transform translateX(-50%)

@-webkit-keyframes up_down 
    0%
      transform translateY(0)
    50%
      transform translateY(-24%)
    100%
      transform translateY(0)
@-webkit-keyframes  down_up 
  0%
      transform translateY(0)
    50%
      transform translateY(24%)
    100%
      transform translateY(0)
</style>