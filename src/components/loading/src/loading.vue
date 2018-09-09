<template>
<div class="jinr-loading-wrapper" v-show="visible">
  <transition name="msgbox-bounce">
    <div class="loading" v-show="visible">
      <div class="loading-inner ball-spin-fade-loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </transition>
</div>

</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~style/mixin.styl"

/**
  animation-name  规定需要绑定到选择器的 keyframe 名称。。
  animation-duration 规定完成动画所花费的时间，以秒或毫秒计。
  animation-timing-function 规定动画的速度曲线。
  animation-delay 	规定在动画开始之前的延迟。
  animation-iteration-count 规定动画应该播放的次数。
  animation-direction 规定是否应该轮流反向播放动画。
*/
.jinr-loading-wrapper
  position fixed
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color #fff
  background-color rgba(0, 0, 0, 0)
  z-index 1000
  .loading
    position: absolute;
    top: 50%;
    left: 55%;
    width:80px;
    height: 80px;
    transform: translate3d(-50%, -50%, 0);
    margin:50px auto;
    .ball-spin-fade-loading
      position: relative;
      &>div
        background-color: #0c72e3;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute;
        animation: ball-spin-fade-loading 1s 0s infinite linear;
      &>div:nth-child(1)
        top: 25px;
        left: 0;
        animation-delay 0s
      &>div:nth-child(2)
        top: 17.04545px;
        left: 17.04545px;
        animation-delay 0.12s
      &>div:nth-child(3)
        top: 0;
        left: 25px;
        animation-delay 0.24s
      &>div:nth-child(4)
        top: -17.04545px;
        left: 17.04545px;
        animation-delay 0.36s
      &>div:nth-child(5)
        top: -25px;
        left: 0;
        animation-delay 0.48s
      &>div:nth-child(6)
        top: -17.04545px;
        left: -17.04545px;
        animation-delay 0.6s
      &>div:nth-child(7)
        top: 0;
        left: -25px;
        animation-delay 0.72s
      &>div:nth-child(8)
        top: 17.04545px;
        left: -17.04545px;
        animation-delay 0.84s



  @keyframes ball-spin-fade-loading {
    50% {
      opacity: 0.3;
      -webkit-transform: scale(0.4);
      transform: scale(0.4); }

    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
</style>

<script type="text/babel">
  // import Spinner from 'mint-ui/packages/spinner/index.js';
  // if (process.env.NODE_ENV === 'component') {
  //   // require('mint-ui/packages/spinner/style.css');
  // }

  export default {
    data() {
      return {
        visible: false
      };
    },

    components: {
      // Spinner
    },

    computed: {
      convertedSpinnerType() {
        switch (this.spinnerType) {
          case 'double-bounce':
            return 1;
          case 'triple-bounce':
            return 2;
          case 'fading-circle':
            return 3;
          default:
            return 0;
        }
      }
    },

    props: {
      text: String,
      spinnerType: {
        type: String,
        default: 'snake'
      }
    }
  };
</script>
